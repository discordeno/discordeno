import { Channel as ChannelPayload } from "../../../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../../../types/gateway/gateway_payload.ts";
import { Ready } from "../../../../types/gateway/ready.ts";
import { snowflakeToBigint } from "../../../../util/bigint.ts";
import Channel from "../Channel.ts";
import Client from "../Client.ts";
import Member from "../Member.ts";
import Shard from "./Shard.ts";

export class GatewayEvents {
    client: Client;
  
    constructor(client: Client) {
      this.client = client;
    }
  
    missing(type: string, data: unknown) {
      this.client.emit("DEBUG", "MISSING_GATEWAY_EVENT_HANDLER", type, data);
    }
  
    READY(data: DiscordGatewayPayload, shardId: number) {
      // Triggered on each shard
      this.client.emit("shardReady", shardId);
  
      // The bot has already started, the last shard is resumed, however.
      if (this.client.gateway.isReady) return;
  
      const shard = this.client.gateway.get(shardId);
      if (!shard) return;
  
      const payload = data.d as Ready;
      this.client.id = snowflakeToBigint(payload.user.id);
      this.client.applicationId = snowflakeToBigint(payload.application.id);
  
      // Set ready to false just to go sure
      shard.ready = false;
      // All guilds are unavailable at first
      shard.unavailableGuildIds = new Set(
        payload.guilds.map((g) => snowflakeToBigint(g.id))
      );
      // Set the last available to now
      shard.lastAvailable = Date.now();
  
      // Start ready check in 2 seconds
      setTimeout(() => {
        this.client.emit("DEBUG", "loop", `1. Running setTimeout in READY file.`);
        this.checkReady(payload, shard);
      }, 2000);
    }
  
    /** This function checks if the shard is fully loaded */
    checkReady(payload: Ready, shard: Shard) {
      // Check if all guilds were loaded
      if (!shard.unavailableGuildIds.size) return this.loaded(shard);
  
      // If the last GUILD_CREATE was received 5 seconds ago, the remaining guilds are most likely not available
      if (shard.lastAvailable + 5000 < Date.now()) {
        this.client.emit(
          "shardFailedToLoad",
          shard.id,
          shard.unavailableGuildIds
        );
        // Force execute the loaded function to prevent infinite loop
        return this.loaded(shard);
      }
  
      // Not all guilds were loaded but 5 seconds haven't passed so check again
      setTimeout(() => {
        this.client.emit("DEBUG", "loop", `2. Running setTimeout in READY file.`);
        this.checkReady(payload, shard);
      }, 2000);
    }
  
    loaded(shard: Shard) {
      shard.ready = true;
  
      // If it is not the last shard we can't go full ready
      if (shard.id !== this.client.gateway.lastShardId) return;
  
      // Still some shards are loading so wait another 2 seconds for them
      if (this.client.gateway.some((shard) => !shard.ready)) {
        setTimeout(() => {
          this.client.emit(
            "DEBUG",
            "loop",
            `3. Running setTimeout in READY file.`
          );
          this.loaded(shard);
        }, 2000);
  
        return;
      }
  
      this.client.gateway.isReady = true;
      this.client.emit("ready");
    }
  
     CHANNEL_CREATE(data: DiscordGatewayPayload) {
      const payload = data.d as ChannelPayload;
  
      const channel = new Channel(
        this.client,
        payload,
      );
      if (channel.guildId) this.client.guilds.get(channel.guildId)?.channels.set(channel.id, channel);
  
      this.client.emit("channelCreate", channel);
    }
  
    async CHANNEL_DELETE(data: DiscordGatewayPayload) {
      const payload = data.d as ChannelPayload;
  
      const cachedChannel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.id)
      );
      if (!cachedChannel) return;
  
      if (
        cachedChannel.type === DiscordChannelTypes.GuildVoice &&
        payload.guildId
      ) {
        const guild = await this.client.cache.get(
          "guilds",
          cachedChannel.guildId
        );
  
        if (guild) {
          return Promise.all(
            guild.voiceStates.map(async (vs, key) => {
              if (vs.channelId !== cachedChannel.id) return;
  
              // Since this channel was deleted all voice states for this channel should be deleted
              guild.voiceStates.delete(key);
  
              const member = await this.client.cache.get("members", vs.memberId);
              if (!member) return;
  
              this.client.emit("voiceChannelLeave", member, vs.channelId);
            })
          );
        }
      }
  
      if (
        [
          DiscordChannelTypes.GuildText,
          DiscordChannelTypes.DM,
          DiscordChannelTypes.GroupDm,
          DiscordChannelTypes.GuildNews,
        ].includes(payload.type)
      ) {
        await this.client.cache.delete("channels", snowflakeToBigint(payload.id));
        this.client.cache.forEach("messages", (message) => {
          this.client.emit(
            "DEBUG",
            "loop",
            `Running forEach messages loop in CHANNEL_DELTE file.`
          );
          if (message.channelId === snowflakeToBigint(payload.id)) {
            this.client.cache.delete("messages", message.id);
          }
        });
      }
  
      await this.client.cache.delete("channels", snowflakeToBigint(payload.id));
  
      this.client.emit("channelDelete", cachedChannel);
    }
  
    async CHANNEL_PINS_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as ChannelPinsUpdate;
  
      const channel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.channelId)
      );
      if (!channel) return;
  
      const guild = payload.guildId
        ? await this.client.cache.get(
            "guilds",
            snowflakeToBigint(payload.guildId)
          )
        : undefined;
  
      this.client.emit(
        "channelPinsUpdate",
        channel,
        guild,
        payload.lastPinTimestamp
      );
    }
  
    async CHANNEL_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as ChannelPayload;
      const cachedChannel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.id)
      );
      if (!cachedChannel) return;
  
      const discordenoChannel = new UniversityChannel(
        this.client,
        payload,
        payload.guildId
      );
      await this.client.cache.set(
        "channels",
        discordenoChannel.id,
        discordenoChannel
      );
  
      this.client.emit("channelUpdate", discordenoChannel, cachedChannel);
    }
  
    APPLICATION_COMMAND_CREATE(data: DiscordGatewayPayload) {
      this.client.emit(
        "applicationCommandCreate",
        data.d as ApplicationCommandCreateUpdateDelete
      );
    }
  
    APPLICATION_COMMAND_DELETE(data: DiscordGatewayPayload) {
      this.client.emit(
        "applicationCommandDelete",
        data.d as ApplicationCommandCreateUpdateDelete
      );
    }
  
    APPLICATION_COMMAND_UPDATE(data: DiscordGatewayPayload) {
      this.client.emit(
        "applicationCommandUpdate",
        data.d as ApplicationCommandCreateUpdateDelete
      );
    }
  
    async GUILD_BAN_ADD(data: DiscordGatewayPayload) {
      const payload = data.d as GuildBanAddRemove;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      const member = await this.client.cache.get(
        "members",
        snowflakeToBigint(payload.user.id)
      );
      this.client.emit("guildBanAdd", guild, payload.user, member);
    }
  
    async GUILD_BAN_REMOVE(data: DiscordGatewayPayload) {
      const payload = data.d as GuildBanAddRemove;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      const member = await this.client.cache.get(
        "members",
        snowflakeToBigint(payload.user.id)
      );
      this.client.emit("guildBanRemove", guild, payload.user, member);
    }
  
    async GUILD_CREATE(data: DiscordGatewayPayload, shardId: number) {
      const payload = data.d as Guild;
      // When shards resume they emit GUILD_CREATE again.
      if (await this.client.cache.has("guilds", snowflakeToBigint(payload.id))) {
        return;
      }
  
      const guild = new UniversityGuild(this.client, payload, shardId);
      await this.client.cache.set("guilds", guild.id, guild);
  
      const shard = this.client.gateway.get(shardId);
  
      if (shard?.unavailableGuildIds.has(guild.id)) {
        await this.client.cache.delete("unavailableGuilds", guild.id);
        shard.unavailableGuildIds.delete(guild.id);
        shard.lastAvailable = Date.now();
  
        return this.client.emit("guildAvailable", guild);
      }
  
      if (!this.client.gateway.isReady) {
        return this.client.emit("guildLoaded", guild);
      }
      this.client.emit("guildCreate", guild);
    }
  
    async GUILD_DELETE(data: DiscordGatewayPayload, shardId: number) {
      const payload = data.d as UnavailableGuild;
  
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.id)
      );
      if (!guild) return;
  
      await this.client.cache.delete("guilds", guild.id);
  
      if (payload.unavailable) {
        const shard = this.client.gateway.get(shardId);
        if (shard) shard.unavailableGuildIds.add(guild.id);
        await this.client.cache.set("unavailableGuilds", guild.id, Date.now());
  
        this.client.emit("guildUnavailable", guild);
      } else {
        this.client.emit("guildDelete", guild);
      }
  
      this.client.cache.forEach("messages", (message) => {
        this.client.emit(
          "DEBUG",
          "loop",
          `1. Running forEach messages loop in CHANNEL_DELTE file.`
        );
        if (message.guildId === guild.id) {
          this.client.cache.delete("messages", message.id);
        }
      });
  
      this.client.cache.forEach("channels", (channel) => {
        this.client.emit(
          "DEBUG",
          "loop",
          `2. Running forEach channels loop in CHANNEL_DELTE file.`
        );
        if (channel.guildId === guild.id) {
          this.client.cache.delete("channels", channel.id);
        }
      });
  
      this.client.cache.forEach("members", (member) => {
        this.client.emit(
          "DEBUG",
          "loop",
          `3. Running forEach members loop in CHANNEL_DELTE file.`
        );
        if (!member.guilds.has(guild.id)) return;
  
        member.guilds.delete(guild.id);
  
        if (!member.guilds.size) {
          return this.client.cache.delete("members", member.id);
        }
  
        this.client.cache.set("members", member.id, member);
      });
    }
  
    async GUILD_EMOJIS_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as GuildEmojisUpdate;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      const cachedEmojis = guild.emojis;
      guild.emojis = new Collection(
        payload.emojis.map((emoji) => [snowflakeToBigint(emoji.id!), emoji])
      );
  
      await this.client.cache.set("guilds", guild.id, guild);
  
      this.client.emit("guildEmojisUpdate", guild, guild.emojis, cachedEmojis);
    }
  
    async GUILD_INTEGRATIONS_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as GuildIntegrationsUpdate;
  
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      this.client.emit("guildIntegrationsUpdate", guild);
    }
  
    async GUILD_MEMBER_ADD(data: DiscordGatewayPayload) {
      const payload = data.d as GuildMemberAdd;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      guild.memberCount++;
      const discordenoMember = new Member(
        this.client,
        payload,
        guild.id
      );
      await this.client.cache.set(
        "members",
        discordenoMember.id,
        discordenoMember
      );
  
      this.client.emit("guildMemberAdd", guild, Member);
    }
  
    async GUILD_MEMBER_REMOVE(data: DiscordGatewayPayload) {
      const payload = data.d as GuildMemberRemove;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      guild.memberCount--;
      const member = await this.client.cache.get(
        "members",
        snowflakeToBigint(payload.user.id)
      );
      this.client.emit("guildMemberRemove", guild, payload.user, member);
  
      member?.guilds.delete(guild.id);
      if (member && !member.guilds.size) {
        await this.client.cache.delete("members", member.id);
      }
    }
  
    async GUILD_MEMBER_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as GuildMemberUpdate;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      const cachedMember = await this.client.cache.get(
        "members",
        snowflakeToBigint(payload.user.id)
      );
      const guildMember = cachedMember?.guilds.get(guild.id);
  
      const newMemberData = {
        ...payload,
        premiumSince: payload.premiumSince || undefined,
        joinedAt: new Date(guildMember?.joinedAt || Date.now()).toISOString(),
        deaf: guildMember?.deaf || false,
        mute: guildMember?.mute || false,
        roles: payload.roles,
      };
      const discordenoMember = new Member(
        this.client,
        newMemberData,
        guild.id
      );
      await this.client.cache.set(
        "members",
        discordenoMember.id,
        discordenoMember
      );
  
      if (guildMember) {
        if (guildMember.nick !== payload.nick) {
          this.client.emit(
            "nicknameUpdate",
            guild,
            Member,
            payload.nick!,
            guildMember.nick ?? undefined
          );
        }
  
        if (payload.pending === false && guildMember.pending === true) {
          this.client.emit("membershipScreeningPassed", guild, Member);
        }
  
        const roleIds = guildMember.roles || [];
  
        roleIds.forEach((id) => {
          this.client.emit(
            "DEBUG",
            "loop",
            `1. Running forEach loop in GUILD_MEMBER_UPDATE file.`
          );
          if (!payload.roles.includes(bigintToSnowflake(id))) {
            this.client.emit("roleLost", guild, Member, id);
          }
        });
  
        payload.roles.forEach((id) => {
          this.client.emit(
            "DEBUG",
            "loop",
            `2. Running forEach loop in GUILD_MEMBER_UPDATE file.`
          );
          if (!roleIds.includes(snowflakeToBigint(id))) {
            this.client.emit(
              "roleGained",
              guild,
              Member,
              snowflakeToBigint(id)
            );
          }
        });
      }
  
      this.client.emit(
        "guildMemberUpdate",
        guild,
        Member,
        cachedMember
      );
    }
  
    async GUILD_MEMBERS_CHUNK(data: DiscordGatewayPayload) {
      const payload = data.d as GuildMembersChunk;
  
      const guildId = snowflakeToBigint(payload.guildId);
  
      const members = await Promise.all(
        payload.members.map(async (member) => {
          const discordenoMember = new Member(
            this.client,
            member,
            guildId
          );
          await this.client.cache.set(
            "members",
            discordenoMember.id,
            discordenoMember
          );
  
          return discordenoMember;
        })
      );
  
      // Check if its necessary to resolve the fetchmembers promise for this chunk or if more chunks will be coming
      if (payload.nonce) {
        const resolve = this.client.fetchAllMembersProcessingRequests.get(
          payload.nonce
        );
        if (!resolve) return;
  
        if (payload.chunkIndex + 1 === payload.chunkCount) {
          this.client.fetchAllMembersProcessingRequests.delete(payload.nonce);
          // Only 1 chunk most likely is all members or users only request a small amount of users
          if (payload.chunkCount === 1) {
            return resolve(new Collection(members.map((m) => [m.id, m])));
          }
  
          return resolve(
            await this.client.cache.filter("members", (m) =>
              m.guilds.has(guildId)
            )
          );
        }
      }
    }
  
    async GUILD_ROLE_CREATE(data: DiscordGatewayPayload) {
      const payload = data.d as GuildRoleCreate;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      const role = new UniversityRole(this.client, payload.role, guild.id);
      guild.roles = guild.roles.set(snowflakeToBigint(payload.role.id), role);
      await this.client.cache.set("guilds", guild.id, guild);
  
      this.client.emit("roleCreate", guild, role);
    }
  
    async GUILD_ROLE_DELETE(data: DiscordGatewayPayload) {
      const payload = data.d as GuildRoleDelete;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      const roleId = snowflakeToBigint(payload.roleId);
  
      const cachedRole = guild.roles.get(roleId)!;
      guild.roles.delete(roleId);
  
      if (cachedRole) this.client.emit("roleDelete", guild, cachedRole);
  
      // For bots without GUILD_MEMBERS member.roles is never updated breaking permissions checking.
      this.client.cache.forEach("members", (member) => {
        this.client.emit(
          "DEBUG",
          "loop",
          `1. Running forEach members loop in GUILD_ROLE_DELETE file.`
        );
        // Not in the relevant guild so just skip.
        if (!member.guilds.has(guild.id)) return;
  
        member.guilds.forEach((g) => {
          this.client.emit(
            "DEBUG",
            "loop",
            `2. Running forEach loop in CHANNEL_DELTE file.`
          );
          // Member does not have this role
          if (!g.roles.includes(roleId)) return;
          // Remove this role from the members cache
          g.roles = g.roles.filter((id) => id !== roleId);
          this.client.cache.set("members", member.id, member);
        });
      });
    }
  
    async GUILD_ROLE_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as GuildRoleUpdate;
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      const cachedRole = guild.roles.get(snowflakeToBigint(payload.role.id));
      if (!cachedRole) return;
  
      const role = new UniversityRole(this.client, payload.role, guild.id);
      guild.roles.set(snowflakeToBigint(payload.role.id), role);
      await this.client.cache.set("guilds", guild.id, guild);
  
      this.client.emit("roleUpdate", guild, role, cachedRole);
    }
  
    async GUILD_UPDATE(data: DiscordGatewayPayload, shardId: number) {
      const payload = data.d as Guild;
      const oldGuild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.id)
      );
      if (!oldGuild) return;
  
      const keysToSkip = [
        "id",
        "roles",
        "guildHashes",
        "guildId",
        "maxMembers",
        "emojis",
      ];
  
      const newGuild = new UniversityGuild(this.client, payload, shardId);
  
      const changes = Object.entries(newGuild)
        .map(([key, value]) => {
          if (keysToSkip.includes(key)) return;
  
          // @ts-ignore index signature
          const cachedValue = oldGuild[key];
  
          if (cachedValue === value) return;
          // Guild create sends undefined and update sends false.
          if (!cachedValue && !value) return;
  
          if (Array.isArray(cachedValue) && Array.isArray(value)) {
            const different =
              cachedValue.length !== value.length ||
              cachedValue.find((val) => !value.includes(val)) ||
              value.find((val) => !cachedValue.includes(val));
            if (!different) return;
          }
  
          return { key, oldValue: cachedValue, value };
        })
        .filter((change) => change) as GuildUpdateChange[];
  
      await this.client.cache.set("guilds", newGuild.id, newGuild);
  
      this.client.emit("guildUpdate", newGuild, changes);
    }
  
    INTERACTION_CREATE(data: DiscordGatewayPayload) {
      let payload;
      const d = data.d as Interaction;
      switch (d.type) {
        case DiscordInteractionTypes.ApplicationCommand: {
          payload = new UniversitySlashInteraction(this.client, d);
          break;
        }
        case DiscordInteractionTypes.MessageComponent: {
          switch (d.data?.componentType) {
            case MessageComponentTypes.Button: {
              payload = new UniversityButtonInteraction(this.client, d);
              break;
            }
            case MessageComponentTypes.SelectMenu: {
              payload = new UniversityDropdownInteraction(this.client, d);
              break;
            }
          }
          break;
        }
      }
      if (!payload) return;
      const discordenoMember =
        payload.member && payload.guildId
          ? new Member(
              this.client,
              payload.member,
              snowflakeToBigint(payload.guildId)
            )
          : undefined;
      if (!discordenoMember) {
        this.client.emit("interactionDMCreate", payload);
      }
  
      this.client.emit("interactionCreate", payload, discordenoMember);
    }
  
    INVITE_CREATE(data: DiscordGatewayPayload) {
      this.client.emit("inviteCreate", data.d as InviteCreate);
    }
  
    INVITE_DELETE(data: DiscordGatewayPayload) {
      this.client.emit("inviteDelete", data.d as InviteDelete);
    }
  
    async MESSAGE_CREATE(data: DiscordGatewayPayload) {
      const payload = data.d as Message;
      const channel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.channelId)
      );
      if (channel) channel.lastMessageId = snowflakeToBigint(payload.id);
  
      const guild = payload.guildId
        ? await this.client.cache.get(
            "guilds",
            snowflakeToBigint(payload.guildId)
          )
        : undefined;
      if (payload.member && guild) {
        // If in a guild cache the author as a member
        const discordenoMember = new Member(
          this.client,
          { ...payload.member, user: payload.author } as GuildMemberWithUser,
          guild.id
        );
        await this.client.cache.set(
          "members",
          discordenoMember.id,
          discordenoMember
        );
      }
  
      if (payload.mentions && guild) {
        await Promise.all(
          payload.mentions.map((mention) => {
            // Cache the member if its a valid member
            if (mention.member) {
              const discordenoMember = new Member(
                this.client,
                { ...mention.member, user: mention } as GuildMemberWithUser,
                guild.id
              );
  
              return this.client.cache.set(
                "members",
                snowflakeToBigint(mention.id),
                discordenoMember
              );
            }
          })
        );
      }
      const message = new UniversityMessage(this.client, data.d as Message);
      // Cache the message
      await this.client.cache.set(
        "messages",
        snowflakeToBigint(payload.id),
        message
      );
  
      this.client.emit("messageCreate", message);
    }
  
    async MESSAGE_DELETE_BULK(data: DiscordGatewayPayload) {
      const payload = data.d as MessageDeleteBulk;
      const channel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.channelId)
      );
      if (!channel) return;
  
      return Promise.all(
        payload.ids.map(async (id) => {
          this.client.emit(
            "messageDelete",
            { id, channel },
            await this.client.cache.get("messages", snowflakeToBigint(id))
          );
          await this.client.cache.delete("messages", snowflakeToBigint(id));
        })
      );
    }
  
    async MESSAGE_DELETE(data: DiscordGatewayPayload) {
      const payload = data.d as MessageDelete;
      const channel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.channelId)
      );
      if (!channel) return;
  
      this.client.emit(
        "messageDelete",
        { id: payload.id, channel },
        await this.client.cache.get("messages", snowflakeToBigint(payload.id))
      );
  
      await this.client.cache.delete("messages", snowflakeToBigint(payload.id));
    }
  
    async MESSAGE_REACTION_ADD(data: DiscordGatewayPayload) {
      const payload = data.d as MessageReactionAdd;
      const message = await this.client.cache.get(
        "messages",
        snowflakeToBigint(payload.messageId)
      );
  
      if (message) {
        const reactionExisted = message.reactions?.find(
          (reaction) =>
            reaction.emoji.id === payload.emoji.id &&
            reaction.emoji.name === payload.emoji.name
        );
  
        if (reactionExisted) reactionExisted.count++;
        else {
          const newReaction = {
            count: 1,
            me: snowflakeToBigint(payload.userId) === botId,
            emoji: { ...payload.emoji, id: payload.emoji.id || undefined },
          };
          message.reactions = message.reactions
            ? [...message.reactions, newReaction]
            : [newReaction];
        }
  
        await this.client.cache.set(
          "messages",
          snowflakeToBigint(payload.messageId),
          message
        );
      }
  
      if (payload.member && payload.guildId) {
        const guild = await this.client.cache.get(
          "guilds",
          snowflakeToBigint(payload.guildId)
        );
        if (guild) {
          const discordenoMember = new Member(
            this.client,
            payload.member,
            guild.id
          );
          await this.client.cache.set(
            "members",
            discordenoMember.id,
            discordenoMember
          );
        }
      }
  
      this.client.emit("reactionAdd", payload, message);
    }
  
    async MESSAGE_REACTION_REMOVE_ALL(data: DiscordGatewayPayload) {
      const payload = data.d as MessageReactionRemoveAll;
      const message = await this.client.cache.get(
        "messages",
        snowflakeToBigint(payload.messageId)
      );
  
      if (message?.reactions) {
        message.reactions = [];
  
        await this.client.cache.set(
          "messages",
          snowflakeToBigint(payload.messageId),
          message
        );
      }
  
      this.client.emit("reactionRemoveAll", payload, message);
    }
  
    async MESSAGE_REACTION_REMOVE_EMOJI(data: DiscordGatewayPayload) {
      const payload = data.d as MessageReactionRemoveEmoji;
      const message = await this.client.cache.get(
        "messages",
        snowflakeToBigint(payload.messageId)
      );
  
      if (message?.reactions) {
        message.reactions = message.reactions.filter(
          (reaction) =>
            !(
              // MUST USE == because discord sends null and we use undefined
              (
                reaction.emoji.id == payload.emoji.id &&
                reaction.emoji.name === payload.emoji.name
              )
            )
        );
  
        if (!message.reactions.length) message.reactions = [];
  
        await this.client.cache.set("messages", message.id, message);
      }
  
      this.client.emit(
        "reactionRemoveEmoji",
        payload.emoji,
        snowflakeToBigint(payload.messageId),
        snowflakeToBigint(payload.channelId),
        payload.guildId ? snowflakeToBigint(payload.guildId) : undefined
      );
    }
  
    async MESSAGE_REACTION_REMOVE(data: DiscordGatewayPayload) {
      const payload = data.d as MessageReactionRemove;
      const message = await this.client.cache.get(
        "messages",
        snowflakeToBigint(payload.messageId)
      );
  
      if (message) {
        const reaction = message.reactions?.find(
          (reaction) =>
            // MUST USE == because discord sends null and we use undefined
            reaction.emoji.id == payload.emoji.id &&
            reaction.emoji.name === payload.emoji.name
        );
  
        if (reaction) {
          reaction.count--;
          if (reaction.count === 0) {
            message.reactions = message.reactions?.filter((r) => r.count !== 0);
          }
          if (!message.reactions?.length) message.reactions = [];
  
          await this.client.cache.set("messages", message.id, message);
        }
      }
  
      this.client.emit("reactionRemove", payload, message);
    }
  
    async MESSAGE_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as Message;
      const channel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.channelId)
      );
      if (!channel) return;
  
      const oldMessage = await this.client.cache.get(
        "messages",
        snowflakeToBigint(payload.id)
      );
      if (!oldMessage) return;
  
      // Messages with embeds can trigger update but they wont have edited_timestamp
      if (!payload.editedTimestamp || oldMessage.content === payload.content) {
        return;
      }
  
      const message = new UniversityMessage(this.client, payload);
  
      await this.client.cache.set(
        "messages",
        snowflakeToBigint(payload.id),
        message
      );
  
      this.client.emit("messageUpdate", message, oldMessage);
    }
  
    async PRESENCE_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as PresenceUpdate;
  
      const oldPresence = await this.client.cache.get(
        "presences",
        snowflakeToBigint(payload.user.id)
      );
      await this.client.cache.set(
        "presences",
        snowflakeToBigint(payload.user.id),
        payload
      );
  
      this.client.emit("presenceUpdate", payload, oldPresence);
    }
  
    TYPING_START(data: DiscordGatewayPayload) {
      this.client.emit("typingStart", data.d as TypingStart);
    }
  
    async USER_UPDATE(data: DiscordGatewayPayload) {
      const userData = data.d as User;
  
      const member = await this.client.cache.get(
        "members",
        snowflakeToBigint(userData.id)
      );
      if (!member) return;
  
      // Update username
      member.username = userData.username;
      // Update discriminator
      member.discrim = Number(userData.discriminator);
  
      // Check if a avatar is available
      const hash = userData.avatar
        ? iconHashToBigInt(userData.avatar)
        : undefined;
      // Update the avatar
      member.avatar = hash?.bigint || 0n;
      // Update the animated status if its animated
      if (hash?.animated) member.bitfield.bits |= memberToggles.animatedAvatar;
      else member.bitfield.bits &= ~memberToggles.animatedAvatar;
  
      member.flags = userData.flags;
      member.premiumType = userData.premiumType;
      member.publicFlags = userData.publicFlags;
  
      await this.client.cache.set(
        "members",
        snowflakeToBigint(userData.id),
        member
      );
  
      this.client.emit("botUpdate", userData);
    }
  
    async VOICE_SERVER_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as VoiceServerUpdate;
  
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      this.client.emit("voiceServerUpdate", payload, guild);
    }
  
    async VOICE_STATE_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as VoiceState;
      if (!payload.guildId) return;
  
      const guild = await this.client.cache.get(
        "guilds",
        snowflakeToBigint(payload.guildId)
      );
      if (!guild) return;
  
      const member = payload.member
        ? new Member(this.client, payload.member, guild.id)
        : await this.client.cache.get(
            "members",
            snowflakeToBigint(payload.userId)
          );
      if (!member) return;
  
      // No cached state before so lets make one for em
      const cachedState = guild.voiceStates.get(
        snowflakeToBigint(payload.userId)
      );
  
      guild.voiceStates.set(
        snowflakeToBigint(payload.userId),
        new UniversityVoiceState(this.client, guild.id, payload)
      );
  
      await this.client.cache.set("guilds", guild.id, guild);
  
      if (
        cachedState?.channelId !==
        (payload.channelId ? snowflakeToBigint(payload.channelId) : null)
      ) {
        // Either joined or moved channels
        if (payload.channelId) {
          if (cachedState?.channelId) {
            // Was in a channel before
            this.client.emit(
              "voiceChannelSwitch",
              member,
              snowflakeToBigint(payload.channelId),
              cachedState.channelId
            );
          } else {
            // Was not in a channel before so user just joined
            this.client.emit(
              "voiceChannelJoin",
              member,
              snowflakeToBigint(payload.channelId)
            );
          }
        } // Left the channel
        else if (cachedState?.channelId) {
          guild.voiceStates.delete(snowflakeToBigint(payload.userId));
          this.client.emit("voiceChannelLeave", member, cachedState.channelId);
        }
      }
  
      this.client.emit("voiceStateUpdate", member, payload);
    }
  
    WEBHOOKS_UPDATE(data: DiscordGatewayPayload) {
      const options = data.d as WebhookUpdate;
      this.client.emit(
        "webhooksUpdate",
        snowflakeToBigint(options.channelId),
        snowflakeToBigint(options.guildId)
      );
    }
  
    INTEGRATION_CREATE(data: DiscordGatewayPayload) {
      this.client.emit("integrationCreate", data.d as IntegrationCreateUpdate);
    }
  
    INTEGRATION_DELETE(data: DiscordGatewayPayload) {
      this.client.emit("integrationDelete", data.d as IntegrationDelete);
    }
  
    INTEGRATION_UPDATE(data: DiscordGatewayPayload) {
      this.client.emit("integrationUpdate", data.d as IntegrationCreateUpdate);
    }
  
    STAGE_INSTANCE_CREATE(data: DiscordGatewayPayload) {
      this.client.emit("stageInstanceCreate", data.d as StageInstance);
    }
  
    STAGE_INSTANCE_DELETE(data: DiscordGatewayPayload) {
      this.client.emit("stageInstanceDelete", data.d as StageInstance);
    }
  
    STAGE_INSTANCE_UPDATE(data: DiscordGatewayPayload) {
      this.client.emit("stageInstanceUpdate", data.d as StageInstance);
    }
  
    async THREAD_CREATE(data: DiscordGatewayPayload) {
      const payload = data.d as ChannelPayload;
  
      const discordenoChannel = new UniversityChannel(
        this.client,
        payload,
        payload.guildId
      );
      await this.client.cache.set(
        "channels",
        discordenoChannel.id,
        discordenoChannel
      );
  
      this.client.emit("threadCreate", UniversityChannel);
    }
  
    async THREAD_DELETE(data: DiscordGatewayPayload) {
      const payload = data.d as ChannelPayload;
  
      const cachedChannel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.id)
      );
      if (!cachedChannel) return;
  
      await this.client.cache.delete("channels", snowflakeToBigint(payload.id));
      this.client.cache.forEach("messages", (message) => {
        this.client.emit(
          "DEBUG",
          "loop",
          `Running forEach messages loop in CHANNEL_DELTE file.`
        );
        if (message.channelId === snowflakeToBigint(payload.id)) {
          this.client.cache.delete("messages", message.id);
        }
      });
  
      this.client.emit("threadDelete", cachedChannel);
    }
  
    async THREAD_LIST_SYNC(data: DiscordGatewayPayload) {
      const payload = data.d as ThreadListSync;
  
      const discordenoChannels = await Promise.all(
        payload.threads.map(async (thread) => {
          const discordenoChannel = new UniversityChannel(
            this.client,
            thread,
            payload.guildId
          );
  
          await this.client.cache.set(
            "channels",
            discordenoChannel.id,
            discordenoChannel
          );
  
          return discordenoChannel;
        })
      );
  
      const threads = new Collection<bigint, UniversityChannel>(
        discordenoChannels.map((t) => [t.id, t])
      );
  
      this.client.emit(
        "threadListSync",
        threads,
        payload.members,
        snowflakeToBigint(payload.guildId)
      );
    }
  
    async THREAD_MEMBERS_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as ThreadMembersUpdate;
      const thread = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.id)
      );
      if (!thread) return;
  
      thread.memberCount = payload.memberCount;
      await this.client.cache.set("channels", thread.id, thread);
  
      this.client.emit("threadMembersUpdate", payload);
    }
  
    async THREAD_MEMBER_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as ThreadMember;
      const thread = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.id)
      );
      if (!thread) return;
  
      thread.member = payload;
  
      await this.client.cache.set("channels", thread.id, thread);
  
      this.client.emit("threadMemberUpdate", payload);
    }
  
    async THREAD_UPDATE(data: DiscordGatewayPayload) {
      const payload = data.d as ChannelPayload;
      const oldChannel = await this.client.cache.get(
        "channels",
        snowflakeToBigint(payload.id)
      );
      if (!oldChannel) return;
  
      const discordenoChannel = new UniversityChannel(
        this.client,
        payload,
        payload.guildId
      );
      await this.client.cache.set(
        "channels",
        discordenoChannel.id,
        discordenoChannel
      );
  
      this.client.emit("threadUpdate", discordenoChannel, oldChannel);
    }
  }
  
  export default GatewayEvents;