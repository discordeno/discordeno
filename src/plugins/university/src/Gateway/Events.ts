import { PresenceUpdate } from "../../../../types/activity/presence_update.ts";
import { Channel as ChannelPayload } from "../../../../types/channels/channel.ts";
import { ChannelPinsUpdate } from "../../../../types/channels/channel_pins_update.ts";
import { DiscordChannelTypes } from "../../../../types/channels/channel_types.ts";
import { StageInstance } from "../../../../types/channels/stage_instance.ts";
import { ThreadListSync } from "../../../../types/channels/threads/thread_list_sync.ts";
import { ThreadMember } from "../../../../types/channels/threads/thread_member.ts";
import { ThreadMembersUpdate } from "../../../../types/channels/threads/thread_members_update.ts";
import { GuildUpdateChange } from "../../../../types/discordeno/guild_update_change.ts";
import { GuildEmojisUpdate } from "../../../../types/emojis/guild_emojis_update.ts";
import { DiscordGatewayPayload } from "../../../../types/gateway/gateway_payload.ts";
import { Ready } from "../../../../types/gateway/ready.ts";
import { Guild as GuildPayload } from "../../../../types/guilds/guild.ts";
import { GuildBanAddRemove } from "../../../../types/guilds/guild_ban_add_remove.ts";
import { GuildRoleCreate } from "../../../../types/guilds/guild_role_create.ts";
import { GuildRoleDelete } from "../../../../types/guilds/guild_role_delete.ts";
import { GuildRoleUpdate } from "../../../../types/guilds/guild_role_update.ts";
import { UnavailableGuild } from "../../../../types/guilds/unavailable_guild.ts";
import { GuildIntegrationsUpdate } from "../../../../types/integrations/guild_integrations_update.ts";
import { IntegrationCreateUpdate } from "../../../../types/integrations/integration_create_update.ts";
import { IntegrationDelete } from "../../../../types/integrations/integration_delete.ts";
import { ApplicationCommandCreateUpdateDelete } from "../../../../types/interactions/commands/application_command_create_update_delete.ts";
import { Interaction } from "../../../../types/interactions/interaction.ts";
import { DiscordInteractionTypes } from "../../../../types/interactions/interaction_types.ts";
import { InviteCreate } from "../../../../types/invites/invite_create.ts";
import { InviteDelete } from "../../../../types/invites/invite_delete.ts";
import { GuildMemberWithUser } from "../../../../types/members/guild_member.ts";
import { GuildMembersChunk } from "../../../../types/members/guild_members_chunk.ts";
import { GuildMemberAdd } from "../../../../types/members/guild_member_add.ts";
import { GuildMemberRemove } from "../../../../types/members/guild_member_remove.ts";
import { GuildMemberUpdate } from "../../../../types/members/guild_member_update.ts";
import { MessageComponentTypes } from "../../../../types/messages/components/message_component_types.ts";
import { Message as MessagePayload } from "../../../../types/messages/message.ts";
import { MessageDelete } from "../../../../types/messages/message_delete.ts";
import { MessageDeleteBulk } from "../../../../types/messages/message_delete_bulk.ts";
import { MessageReactionAdd } from "../../../../types/messages/message_reaction_add.ts";
import { MessageReactionRemove } from "../../../../types/messages/message_reaction_remove.ts";
import { MessageReactionRemoveAll } from "../../../../types/messages/message_reaction_remove_all.ts";
import { MessageReactionRemoveEmoji } from "../../../../types/messages/message_reaction_remove_emoji.ts";
import { TypingStart } from "../../../../types/misc/typing_start.ts";
import { User } from "../../../../types/users/user.ts";
import { VoiceServerUpdate } from "../../../../types/voice/voice_server_update.ts";
import { VoiceState as VoiceStatePayload } from "../../../../types/voice/voice_state.ts";
import { WebhookUpdate } from "../../../../types/webhooks/webhooks_update.ts";
import { bigintToSnowflake, snowflakeToBigint } from "../../../../util/bigint.ts";
import { Collection } from "../../../../util/collection.ts";
import { iconHashToBigInt } from "../../../../util/hash.ts";
import Channel from "../Channel.ts";
import Client from "../Client.ts";
import { Guild } from "../Guild.ts";
import ApplicationCommand from "../Interactions/ApplicationCommand.ts";
import Button from "../Interactions/Button.ts";
import Dropdown from "../Interactions/Dropdown.ts";
import Member from "../Member.ts";
import Message from "../Message.ts";
import Role from "../Role.ts";
import VoiceState from "../VoiceState.ts";
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
    shard.unavailableGuildIds = new Set(payload.guilds.map((g) => snowflakeToBigint(g.id)));
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
      this.client.emit("shardFailedToLoad", shard.id, shard.unavailableGuildIds);
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
        this.client.emit("DEBUG", "loop", `3. Running setTimeout in READY file.`);
        this.loaded(shard);
      }, 2000);

      return;
    }

    this.client.gateway.isReady = true;
    this.client.emit("ready");
  }

  CHANNEL_CREATE(data: DiscordGatewayPayload) {
    const payload = data.d as ChannelPayload;

    const channel = new Channel(this.client, payload);
    if (channel.guildId) this.client.guilds.get(channel.guildId)?.channels.set(channel.id, channel);
    else this.client.dmChannels.set(channel.id, channel);

    this.client.emit("channelCreate", channel);
  }

  CHANNEL_DELETE(data: DiscordGatewayPayload) {
    const payload = data.d as ChannelPayload;

    const id = snowflakeToBigint(payload.id);

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId!));
    const cachedChannel = guild?.channels.get(id);
    if (!cachedChannel) return;

    if (cachedChannel.type === DiscordChannelTypes.GuildVoice && guild) {
      guild.voiceStates.forEach((vs, key) => {
        if (vs.channelId !== cachedChannel.id) return;

        // Since this channel was deleted all voice states for this channel should be deleted
        guild.voiceStates.delete(key);

        this.client.emit("voiceChannelLeave", vs, vs.member);
      });
    }

    if (guild) guild.channels.delete(id);
    else this.client.dmChannels.delete(id);

    this.client.emit("channelDelete", cachedChannel);
  }

  CHANNEL_PINS_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as ChannelPinsUpdate;

    const channel = this.client.guilds
      .get(snowflakeToBigint(payload.guildId!))
      ?.channels.get(snowflakeToBigint(payload.channelId));
    if (!channel) return;

    this.client.emit("channelPinsUpdate", channel, payload.lastPinTimestamp);
  }

  CHANNEL_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as ChannelPayload;
    const guild = payload.guildId ? this.client.guilds.get(snowflakeToBigint(payload.guildId)) : undefined;
    if (!guild) return;

    const cachedChannel = guild.channels.get(snowflakeToBigint(payload.id));

    const discordenoChannel = new Channel(this.client, payload);
    guild.channels.set(discordenoChannel.id, discordenoChannel);

    if (!cachedChannel) return;

    this.client.emit("channelUpdate", discordenoChannel, cachedChannel);
  }

  APPLICATION_COMMAND_CREATE(data: DiscordGatewayPayload) {
    this.client.emit("applicationCommandCreate", data.d as ApplicationCommandCreateUpdateDelete);
  }

  APPLICATION_COMMAND_DELETE(data: DiscordGatewayPayload) {
    this.client.emit("applicationCommandDelete", data.d as ApplicationCommandCreateUpdateDelete);
  }

  APPLICATION_COMMAND_UPDATE(data: DiscordGatewayPayload) {
    this.client.emit("applicationCommandUpdate", data.d as ApplicationCommandCreateUpdateDelete);
  }

  GUILD_BAN_ADD(data: DiscordGatewayPayload) {
    const payload = data.d as GuildBanAddRemove;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const member = guild.members.get(snowflakeToBigint(payload.user.id));
    this.client.emit("guildBanAdd", guild, payload.user, member);
  }

  GUILD_BAN_REMOVE(data: DiscordGatewayPayload) {
    const payload = data.d as GuildBanAddRemove;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const member = guild.members.get(snowflakeToBigint(payload.user.id));
    this.client.emit("guildBanRemove", guild, payload.user, member);
  }

  GUILD_CREATE(data: DiscordGatewayPayload, shardId: number) {
    const payload = data.d as GuildPayload;
    // When shards resume they emit GUILD_CREATE again.
    if (this.client.guilds.has(snowflakeToBigint(payload.id))) return;

    const guild = new Guild(this.client, payload, shardId);
    this.client.guilds.set(guild.id, guild);

    const shard = this.client.gateway.get(shardId);

    if (shard?.unavailableGuildIds.has(guild.id)) {
      this.client.unavailableGuildIds.delete(guild.id);
      shard.unavailableGuildIds.delete(guild.id);
      shard.lastAvailable = Date.now();

      return this.client.emit("guildAvailable", guild);
    }

    if (!this.client.gateway.isReady) {
      return this.client.emit("guildLoaded", guild);
    }
    this.client.emit("guildCreate", guild);
  }

  GUILD_DELETE(data: DiscordGatewayPayload, shardId: number) {
    const payload = data.d as UnavailableGuild;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.id));
    if (!guild) return;

    this.client.guilds.delete(guild.id);

    if (payload.unavailable) {
      const shard = this.client.gateway.get(shardId);
      if (shard) shard.unavailableGuildIds.add(guild.id);
      this.client.unavailableGuildIds.set(guild.id, Date.now());

      this.client.emit("guildUnavailable", guild);
    } else {
      this.client.emit("guildDelete", guild);
    }
  }

  GUILD_EMOJIS_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as GuildEmojisUpdate;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const cachedEmojis = guild.emojis;
    guild.emojis = new Collection(payload.emojis.map((emoji) => [snowflakeToBigint(emoji.id!), emoji]));

    this.client.emit("guildEmojisUpdate", guild, guild.emojis, cachedEmojis);
  }

  GUILD_INTEGRATIONS_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as GuildIntegrationsUpdate;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    this.client.emit("guildIntegrationsUpdate", guild);
  }

  GUILD_MEMBER_ADD(data: DiscordGatewayPayload) {
    const payload = data.d as GuildMemberAdd;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    guild.memberCount++;
    const discordenoMember = new Member(this.client, payload, guild.id);
    guild.members.set(discordenoMember.id, discordenoMember);

    this.client.emit("guildMemberAdd", guild, Member);
  }

  GUILD_MEMBER_REMOVE(data: DiscordGatewayPayload) {
    const payload = data.d as GuildMemberRemove;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    // Update the guilds membercount since someone left
    guild.memberCount--;

    // Get the old member if it was cached
    const member = guild.members.get(snowflakeToBigint(payload.user.id));
    // Remove the member from cache since they left
    guild.members.delete(snowflakeToBigint(payload.user.id));

    this.client.emit("guildMemberRemove", guild, payload.user, member);
  }

  GUILD_MEMBER_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as GuildMemberUpdate;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const member = guild.members.get(snowflakeToBigint(payload.user.id));

    const newMemberData = {
      ...payload,
      premiumSince: payload.premiumSince || undefined,
      joinedAt: new Date(member?.joinedAt || Date.now()).toISOString(),
      deaf: member?.deaf || false,
      mute: member?.mute || false,
      roles: payload.roles,
    };
    const discordenoMember = new Member(this.client, newMemberData, guild.id);
    guild.members.set(discordenoMember.id, discordenoMember);

    if (member) {
      if (member.nick !== payload.nick) {
        this.client.emit("nicknameUpdate", guild, discordenoMember, payload.nick!, member.nick ?? undefined);
      }

      if (payload.pending === false && member.pending === true) {
        this.client.emit("membershipScreeningPassed", guild, discordenoMember);
      }

      const roleIds = member.roleIds || [];

      roleIds.forEach((id) => {
        this.client.emit("DEBUG", "loop", `1. Running forEach loop in GUILD_MEMBER_UPDATE file.`);
        if (!payload.roles.includes(bigintToSnowflake(id))) {
          this.client.emit("roleLost", guild, discordenoMember, id);
        }
      });

      payload.roles.forEach((id) => {
        this.client.emit("DEBUG", "loop", `2. Running forEach loop in GUILD_MEMBER_UPDATE file.`);
        if (!roleIds.includes(snowflakeToBigint(id))) {
          this.client.emit("roleGained", guild, discordenoMember, snowflakeToBigint(id));
        }
      });
    }

    this.client.emit("guildMemberUpdate", guild, discordenoMember, member);
  }

  GUILD_MEMBERS_CHUNK(data: DiscordGatewayPayload) {
    const payload = data.d as GuildMembersChunk;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    payload.members.forEach((member) => {
      guild.members.set(snowflakeToBigint(member.user.id), new Member(this.client, member, guild.id));
    });

    // Check if its necessary to resolve the fetchmembers promise for this chunk or if more chunks will be coming
    if (payload.nonce) {
      const resolve = this.client.fetchAllMembersProcessingRequests.get(payload.nonce);
      if (!resolve) return;

      if (payload.chunkIndex + 1 === payload.chunkCount) {
        this.client.fetchAllMembersProcessingRequests.delete(payload.nonce);
        return resolve(guild.members);
      }
    }
  }

  GUILD_ROLE_CREATE(data: DiscordGatewayPayload) {
    const payload = data.d as GuildRoleCreate;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const role = new Role(this.client, payload.role, guild);
    guild.roles.set(snowflakeToBigint(payload.role.id), role);

    this.client.emit("roleCreate", guild, role);
  }

  GUILD_ROLE_DELETE(data: DiscordGatewayPayload) {
    const payload = data.d as GuildRoleDelete;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const roleId = snowflakeToBigint(payload.roleId);

    const cachedRole = guild.roles.get(roleId)!;
    guild.roles.delete(roleId);

    if (cachedRole) this.client.emit("roleDelete", guild, cachedRole);

    // For bots without GUILD_MEMBERS member.roles is never updated breaking permissions checking.
    guild.members.forEach((member) => {
      this.client.emit("DEBUG", "loop", `1. Running forEach members loop in GUILD_ROLE_DELETE file.`);

      if (!member.roleIds.includes(roleId)) return;

      member.roleIds = member.roleIds.filter((id) => roleId !== id);
    });
  }

  GUILD_ROLE_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as GuildRoleUpdate;
    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const cachedRole = guild.roles.get(snowflakeToBigint(payload.role.id));
    if (!cachedRole) return;

    const role = new Role(this.client, payload.role, guild);
    guild.roles.set(snowflakeToBigint(payload.role.id), role);

    this.client.emit("roleUpdate", guild, role, cachedRole);
  }

  GUILD_UPDATE(data: DiscordGatewayPayload, shardId: number) {
    const payload = data.d as GuildPayload;
    const oldGuild = this.client.guilds.get(snowflakeToBigint(payload.id));
    if (!oldGuild) return;

    const keysToSkip = ["id", "roles", "guildHashes", "guildId", "maxMembers", "emojis"];

    const newGuild = new Guild(this.client, payload, shardId);

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

    this.client.guilds.set(newGuild.id, newGuild);

    this.client.emit("guildUpdate", newGuild, changes);
  }

  INTERACTION_CREATE(data: DiscordGatewayPayload) {
    let payload;
    const d = data.d as Interaction;

    switch (d.type) {
      case DiscordInteractionTypes.ApplicationCommand: {
        payload = new ApplicationCommand(this.client, d);
        break;
      }
      case DiscordInteractionTypes.MessageComponent: {
        switch (d.data?.componentType) {
          case MessageComponentTypes.Button: {
            payload = new Button(this.client, d);
            break;
          }
          case MessageComponentTypes.SelectMenu: {
            payload = new Dropdown(this.client, d);
            break;
          }
        }
        break;
      }
    }

    if (!payload) return;

    const member = d.guildId
      ? // @ts-ignore TODO: fix this type
        new Member(this.client, payload.member, snowflakeToBigint(d.guildId))
      : undefined;

    if (!member) {
      this.client.emit("interactionDMCreate", payload);
    } else {
      this.client.emit("interactionGuildCreate", payload, member);
    }

    this.client.emit("interactionCreate", payload, member);
  }

  INVITE_CREATE(data: DiscordGatewayPayload) {
    this.client.emit("inviteCreate", data.d as InviteCreate);
  }

  INVITE_DELETE(data: DiscordGatewayPayload) {
    this.client.emit("inviteDelete", data.d as InviteDelete);
  }

  MESSAGE_CREATE(data: DiscordGatewayPayload) {
    const payload = data.d as MessagePayload;

    const guild = payload.guildId ? this.client.guilds.get(snowflakeToBigint(payload.guildId)) : undefined;

    const channelId = snowflakeToBigint(payload.channelId);
    const channel = guild?.channels.get(channelId) || this.client.dmChannels.get(channelId);
    if (channel) channel.lastMessageId = snowflakeToBigint(payload.id);

    if (payload.member && guild) {
      // If in a guild cache the author as a member
      const discordenoMember = new Member(
        this.client,
        { ...payload.member, user: payload.author } as GuildMemberWithUser,
        guild.id
      );
      guild.members.set(discordenoMember.id, discordenoMember);
    }

    if (payload.mentions && guild) {
      payload.mentions.map((mention) => {
        // Cache the member if its a valid member
        if (mention.member) {
          const discordenoMember = new Member(
            this.client,
            { ...mention.member, user: mention } as GuildMemberWithUser,
            guild.id
          );

          guild.members.set(discordenoMember.id, discordenoMember);
        }
      });
    }

    const message = new Message(this.client, payload);
    // Cache the message
    channel?.messages.set(message.id, message);

    this.client.emit("messageCreate", message);
  }

  MESSAGE_DELETE_BULK(data: DiscordGatewayPayload) {
    const payload = data.d as MessageDeleteBulk;
    const channel = payload.guildId
      ? this.client.guilds.get(snowflakeToBigint(payload.guildId))?.channels.get(snowflakeToBigint(payload.channelId))
      : this.client.dmChannels.get(snowflakeToBigint(payload.channelId));
    if (!channel) return;

    payload.ids.forEach((id) => {
      const message = channel.messages.get(snowflakeToBigint(id));

      this.client.emit("messageDelete", { id, channel }, message);
      if (message) channel.messages.delete(message.id);
    });
  }

  MESSAGE_DELETE(data: DiscordGatewayPayload) {
    const payload = data.d as MessageDelete;
    const channel = payload.guildId
      ? this.client.guilds.get(snowflakeToBigint(payload.guildId))?.channels.get(snowflakeToBigint(payload.channelId))
      : this.client.dmChannels.get(snowflakeToBigint(payload.channelId));
    if (!channel) return;

    this.client.emit("messageDelete", { id: payload.id, channel }, channel.messages.get(snowflakeToBigint(payload.id)));

    channel.messages.delete(snowflakeToBigint(payload.id));
  }

  MESSAGE_REACTION_ADD(data: DiscordGatewayPayload) {
    const payload = data.d as MessageReactionAdd;
    const channel = payload.guildId
      ? this.client.guilds.get(snowflakeToBigint(payload.guildId))?.channels.get(snowflakeToBigint(payload.channelId))
      : this.client.dmChannels.get(snowflakeToBigint(payload.channelId));

    const message = channel?.messages.get(snowflakeToBigint(payload.messageId));

    if (message) {
      const reactionExisted = message.reactions?.find(
        (reaction) => reaction.emoji.id === payload.emoji.id && reaction.emoji.name === payload.emoji.name
      );

      if (reactionExisted) reactionExisted.count++;
      else {
        const newReaction = {
          count: 1,
          me: snowflakeToBigint(payload.userId) === this.client.id,
          emoji: {
            ...payload.emoji,
            id: payload.emoji.id ? snowflakeToBigint(payload.emoji.id) : undefined,
            name: payload.emoji.name || "",
          },
        };
        message.reactions = message.reactions ? [...message.reactions, newReaction] : [newReaction];
      }
    }

    if (payload.member && payload.guildId) {
      this.client.guilds
        .get(snowflakeToBigint(payload.guildId))
        ?.members.set(
          snowflakeToBigint(payload.userId),
          new Member(this.client, payload.member, snowflakeToBigint(payload.guildId))
        );
    }

    this.client.emit("reactionAdd", payload, message);
  }

  MESSAGE_REACTION_REMOVE_ALL(data: DiscordGatewayPayload) {
    const payload = data.d as MessageReactionRemoveAll;
    const channel = payload.guildId
      ? this.client.guilds.get(snowflakeToBigint(payload.guildId))?.channels.get(snowflakeToBigint(payload.channelId))
      : this.client.dmChannels.get(snowflakeToBigint(payload.channelId));

    const message = channel?.messages.get(snowflakeToBigint(payload.messageId));

    if (message?.reactions) {
      message.reactions = [];
    }

    this.client.emit("reactionRemoveAll", payload, message);
  }

  MESSAGE_REACTION_REMOVE_EMOJI(data: DiscordGatewayPayload) {
    const payload = data.d as MessageReactionRemoveEmoji;
    const channel = payload.guildId
      ? this.client.guilds.get(snowflakeToBigint(payload.guildId))?.channels.get(snowflakeToBigint(payload.channelId))
      : this.client.dmChannels.get(snowflakeToBigint(payload.channelId));

    const message = channel?.messages.get(snowflakeToBigint(payload.messageId));

    if (message?.reactions) {
      message.reactions = message.reactions.filter(
        (reaction) =>
          !(
            // MUST USE == because discord sends null and we use undefined
            (reaction.emoji.id == payload.emoji.id && reaction.emoji.name === payload.emoji.name)
          )
      );

      if (!message.reactions.length) message.reactions = [];
    }

    this.client.emit(
      "reactionRemoveEmoji",
      payload.emoji,
      snowflakeToBigint(payload.messageId),
      snowflakeToBigint(payload.channelId),
      payload.guildId ? snowflakeToBigint(payload.guildId) : undefined
    );
  }

  MESSAGE_REACTION_REMOVE(data: DiscordGatewayPayload) {
    const payload = data.d as MessageReactionRemove;
    const channel = payload.guildId
      ? this.client.guilds.get(snowflakeToBigint(payload.guildId))?.channels.get(snowflakeToBigint(payload.channelId))
      : this.client.dmChannels.get(snowflakeToBigint(payload.channelId));

    const message = channel?.messages.get(snowflakeToBigint(payload.messageId));

    if (message) {
      const reaction = message.reactions?.find(
        (reaction) =>
          // MUST USE == because discord sends null and we use undefined
          reaction.emoji.id == payload.emoji.id && reaction.emoji.name === payload.emoji.name
      );

      if (reaction) {
        reaction.count--;
        if (reaction.count === 0) {
          message.reactions = message.reactions?.filter((r) => r.count !== 0);
        }
        if (!message.reactions?.length) message.reactions = [];
      }
    }

    this.client.emit("reactionRemove", payload, message);
  }

  MESSAGE_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as MessagePayload;
    const channel = payload.guildId
      ? this.client.guilds.get(snowflakeToBigint(payload.guildId))?.channels.get(snowflakeToBigint(payload.channelId))
      : this.client.dmChannels.get(snowflakeToBigint(payload.channelId));
    if (!channel) return;

    const oldMessage = channel.messages.get(snowflakeToBigint(payload.id));
    if (!oldMessage) return;

    // Messages with embeds can trigger update but they wont have edited_timestamp
    if (!payload.editedTimestamp || oldMessage.content === payload.content) {
      return;
    }

    const message = new Message(this.client, payload);
    channel.messages.set(message.id, message);

    this.client.emit("messageUpdate", message, oldMessage);
  }

  PRESENCE_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as PresenceUpdate;

    const userId = snowflakeToBigint(payload.user.id);
    const oldPresence = this.client.presences.get(userId);
    this.client.presences.set(userId, payload);

    this.client.emit("presenceUpdate", payload, oldPresence);
  }

  TYPING_START(data: DiscordGatewayPayload) {
    this.client.emit("typingStart", data.d as TypingStart);
  }

  USER_UPDATE(data: DiscordGatewayPayload) {
    const userData = data.d as User;

    const userId = snowflakeToBigint(userData.id);

    this.client.guilds.forEach((guild) => {
      const member = guild.members.get(userId);
      if (!member) return;

      // Update username
      member.user.username = userData.username;
      // Update discriminator
      member.user.discrim = Number(userData.discriminator);

      // Check if a avatar is available
      const hash = userData.avatar ? iconHashToBigInt(userData.avatar) : undefined;
      // Update the avatar
      member.user.avatar = hash?.bigint || 0n;
      // Update the animated status if its animated
      member.user.bitfield.animated = !!hash?.animated;

      member.user.flags = userData.flags;
      member.user.premiumType = userData.premiumType;
      member.user.publicFlags = userData.publicFlags;
    });

    this.client.emit("botUpdate", userData);
  }

  VOICE_SERVER_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as VoiceServerUpdate;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    this.client.emit("voiceServerUpdate", payload, guild);
  }

  VOICE_STATE_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as VoiceStatePayload;
    if (!payload.guildId) return;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const member = payload.member
      ? new Member(this.client, payload.member, guild.id)
      : guild.members.get(snowflakeToBigint(payload.userId));
    if (!member) return;

    // No cached state before so lets make one for em
    const cachedState = guild.voiceStates.get(snowflakeToBigint(payload.userId));

    guild.voiceStates.set(snowflakeToBigint(payload.userId), new VoiceState(this.client, payload));

    if (cachedState?.channelId !== (payload.channelId ? snowflakeToBigint(payload.channelId) : null)) {
      // Either joined or moved channels
      if (payload.channelId) {
        if (cachedState?.channelId) {
          // Was in a channel before
          this.client.emit("voiceChannelSwitch", member, snowflakeToBigint(payload.channelId), cachedState.channelId);
        } else {
          // Was not in a channel before so user just joined
          this.client.emit("voiceChannelJoin", member, snowflakeToBigint(payload.channelId));
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
    this.client.emit("webhooksUpdate", snowflakeToBigint(options.channelId), snowflakeToBigint(options.guildId));
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

  THREAD_CREATE(data: DiscordGatewayPayload) {
    const payload = data.d as ChannelPayload;

    const channel = new Channel(this.client, payload);
    this.client.guilds.get(snowflakeToBigint(payload.guildId!))?.channels.set(channel.id, channel);
    this.client.emit("threadCreate", channel);
  }

  THREAD_DELETE(data: DiscordGatewayPayload) {
    const payload = data.d as ChannelPayload;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId!));
    if (!guild) return;

    const channelId = snowflakeToBigint(payload.id);
    const channel = guild.channels.get(channelId);
    if (!channel) return;

    guild.channels.delete(channelId);

    this.client.emit("threadDelete", channel);
  }

  THREAD_LIST_SYNC(data: DiscordGatewayPayload) {
    const payload = data.d as ThreadListSync;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const discordenoChannels = payload.threads.map((thread) => {
      const channel = new Channel(this.client, thread);
      guild.channels.set(channel.id, channel);

      return channel;
    });

    const threads = new Collection<bigint, Channel>(discordenoChannels.map((t) => [t.id, t]));

    this.client.emit("threadListSync", threads, payload.members, snowflakeToBigint(payload.guildId));
  }

  THREAD_MEMBERS_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as ThreadMembersUpdate;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId));
    if (!guild) return;

    const thread = guild.channels.get(snowflakeToBigint(payload.id));
    if (!thread) return;

    thread.memberCount = payload.memberCount;

    this.client.emit("threadMembersUpdate", payload);
  }

  THREAD_MEMBER_UPDATE(data: DiscordGatewayPayload) {
    this.client.emit("threadMemberUpdate", data.d as ThreadMember);
  }

  THREAD_UPDATE(data: DiscordGatewayPayload) {
    const payload = data.d as ChannelPayload;

    const guild = this.client.guilds.get(snowflakeToBigint(payload.guildId!));
    if (!guild) return;

    const thread = guild.channels.get(snowflakeToBigint(payload.id));
    if (!thread) return;

    const channel = new Channel(this.client, payload);
    guild.channels.set(channel.id, channel);

    this.client.emit("threadUpdate", channel, thread);
  }
}

export default GatewayEvents;
