import Base from "./Base.ts";
import Client from "./Client.ts";

import { bigintToSnowflake, snowflakeToBigint } from "../../../util/bigint.ts";
import { Guild as GuildPayload } from "../../../types/guilds/guild.ts";
import { Collection } from "../../../util/collection.ts";
import Channel from "./Channel.ts";
import Member from "./Member.ts";
import VoiceState from "./VoiceState.ts";
import { Emoji } from "../../../types/emojis/emoji.ts";
import Role from "./Role.ts";
import { CreateGuildChannel, DiscordCreateGuildChannel } from "../../../types/guilds/create_guild_channel.ts";
import { endpoints } from "../../../util/constants.ts";
import { DiscordChannelTypes } from "../../../types/channels/channel_types.ts";
import { calculateBits } from "../../../util/permissions.ts";
import { formatImageURL, hasOwnProperty, snakelize, urlToBase64 } from "../../../util/utils.ts";
import { UpdateSelfVoiceState } from "../../../types/guilds/update_self_voice_state.ts";
import { UpdateOthersVoiceState } from "../../../types/guilds/update_others_voice_state.ts";
import { ModifyGuildChannelPositions } from "../../../types/guilds/modify_guild_channel_position.ts";
import { Channel as ChannelPayload } from "../../../types/channels/channel.ts";
import { ModifyGuildDiscoveryMetadata } from "../../../types/discovery/modify_guild_discovery_metadata.ts";
import { CreateGuildEmoji } from "../../../types/emojis/create_guild_emoji.ts";
import { ModifyGuildEmoji } from "../../../types/emojis/modify_guild_emoji.ts";
import { ModifyGuild } from "../../../types/guilds/modify_guild.ts";
import { ModifyGuildWelcomeScreen } from "../../../types/guilds/modify_guild_welcome_screen.ts";
import { WelcomeScreen } from "../../../types/guilds/welcome_screen.ts";
import { GuildWidget } from "../../../types/guilds/guild_widget.ts";
import { GetGuildAuditLog } from "../../../types/audit_log/get_guild_audit_log.ts";
import { AuditLog } from "../../../types/audit_log/audit_log.ts";
import { VoiceRegion } from "../../../types/voice/voice_region.ts";
import { Ban } from "../../../types/guilds/ban.ts";
import { GuildPreview } from "../../../types/guilds/guild_preview.ts";
import { GetGuildPruneCountQuery } from "../../../types/guilds/get_guild_prune_count.ts";
import { InviteMetadata } from "../../../types/invites/invite_metadata.ts";
import { GuildWidgetDetails } from "../../../types/guilds/guild_widget_details.ts";
import { GetGuildWidgetImageQuery } from "../../../types/guilds/get_guild_widget_image.ts";
import { iconBigintToHash } from "../../../util/hash.ts";
import { DiscordImageSize } from "../../../types/misc/image_size.ts";
import { DiscordImageFormat } from "../../../types/misc/image_format.ts";
import { Integration } from "../../../types/integrations/integration.ts";
import { ApplicationCommandPermissions } from "../../../types/interactions/commands/application_command_permissions.ts";
import { CreateGlobalApplicationCommand } from "../../../types/interactions/commands/create_global_application_command.ts";
import { ApplicationCommand } from "../../../types/interactions/commands/application_command.ts";
import { GuildApplicationCommandPermissions } from "../../../types/interactions/commands/guild_application_command_permissions.ts";
import { EditGlobalApplicationCommand } from "../../../types/interactions/commands/edit_global_application_command.ts";
import { CreateGuildBan } from "../../../types/guilds/create_guild_ban.ts";
import { RequestGuildMembers } from "../../../types/members/request_guild_members.ts";
import { DiscordGatewayOpcodes } from "../../../types/codes/gateway_opcodes.ts";
import { GuildMemberWithUser } from "../../../types/members/guild_member.ts";
import { ListGuildMembers } from "../../../types/members/list_guild_members.ts";
import { SearchGuildMembers } from "../../../types/members/search_guild_members.ts";
import { BeginGuildPrune } from "../../../types/guilds/begin_guild_prune.ts";
import { CreateGuildRole } from "../../../types/guilds/create_guild_role.ts";
import { Role as RolePayload } from "../../../types/permissions/role.ts";
import { Template } from "../../../types/templates/template.ts";
import { ModifyGuildTemplate } from "../../../types/templates/modify_guild_template.ts";
import { Webhook } from "../../../types/webhooks/webhook.ts";

export class Guild extends Base {
  /** The channels available in this guild. */
  channels: Collection<bigint, Channel>;
  /** All of the member objects that have been cached since the bot acquired `READY` state, mapped by their Ids */
  members: Collection<bigint, Member>;
  /** All of the voice connections that are in this guild at the moment. Mapped by the user id. */
  voiceStates: Collection<bigint, VoiceState>;

  /** The shard in which this guild is connected. */
  shardId: number;

  /** The amount of members in this guild. If it is 0 which is impossible, it means discord did not tell us the amount of members. */
  memberCount: number;

  /** The cached emojis that are in this guild. */
  emojis: Collection<bigint, Emoji>;

  /** The roles that are cached in this guild. */
  roles: Collection<bigint, Role>;

  constructor(client: Client, payload: GuildPayload, shardId: number) {
    super(client, snowflakeToBigint(payload.id));

    this.shardId = shardId;
    this.memberCount = payload.memberCount || 0;

    this.emojis = new Collection(payload.emojis.map((emoji) => [snowflakeToBigint(emoji.id!), emoji]));

    this.channels = new Collection<bigint, Channel>([], {
      sweeper: { filter: client.channelSweeper, interval: 3660000 },
    });

    this.members = new Collection<bigint, Member>([], { sweeper: { filter: client.memberSweeper, interval: 300000 } });

    this.voiceStates = new Collection(
      payload.voiceStates?.map((vs) => [snowflakeToBigint(vs.userId), new VoiceState(client, vs)]) || []
    );

    this.roles = new Collection(payload.roles?.map((r) => [snowflakeToBigint(r.id), new Role(client, r, this)]) || []);
  }

  /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  async createChannel(options?: CreateGuildChannel, reason?: string) {
    // BITRATES ARE IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
    if (options?.bitrate && options.bitrate < 1000) options.bitrate *= 1000;

    const result = await this.client.rest.post(
      endpoints.GUILD_CHANNELS(this.id),
      snakelize<DiscordCreateGuildChannel>({
        ...options,
        permissionOverwrites: options?.permissionOverwrites?.map((perm) => ({
          ...perm,
          allow: calculateBits(perm.allow),
          deny: calculateBits(perm.deny),
        })),
        type: options?.type || DiscordChannelTypes.GuildText,
        reason,
      })
    );

    const discordenoChannel = new Channel(this.client, result);
    this.channels.set(discordenoChannel.id, discordenoChannel);

    return discordenoChannel;
  }

  /**
   * Updates the a user's voice state, defaults to the current user
   * Caveats:
   *  - `channel_id` must currently point to a stage channel.
   *  - User must already have joined `channel_id`.
   *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
   *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
   *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
   *  - You are able to set `request_to_speak_timestamp` to any present or future time.
   *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
   */
  async updateVoiceState(options: UpdateSelfVoiceState | ({ userId: bigint } & UpdateOthersVoiceState)) {
    return await this.client.rest.patch(
      endpoints.UPDATE_VOICE_STATE(this.id, hasOwnProperty(options, "userId") ? options.userId : undefined),
      snakelize(options)
    );
  }

  /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
  async swapChannels(channelPositions: ModifyGuildChannelPositions[]) {
    return await this.client.rest.patch(endpoints.GUILD_CHANNELS(this.id), snakelize(channelPositions));
  }

  /** Returns a list of guild channel objects.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
   */
  async fetchChannels() {
    const result = (await this.client.rest.get(endpoints.GUILD_CHANNELS(this.id))) as ChannelPayload[];

    for (const res of result) {
      const channel = new Channel(this.client, res);
      this.channels.set(channel.id, channel);
    }

    return this.channels;
  }

  /** Fetches a single channel object from the api.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
   */
  async fetchChannel(channelId: bigint) {
    const result = await this.client.rest.get(endpoints.CHANNEL_BASE(channelId));

    const channel = new Channel(this.client, result);
    this.channels.set(channel.id, channel);

    return channel;
  }

  /** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
  async addDiscoverySubcategory(categoryId: number) {
    return await this.client.rest.post(endpoints.DISCOVERY_SUBCATEGORY(this.id, categoryId));
  }

  /** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
  async editDiscovery(data: ModifyGuildDiscoveryMetadata) {
    return await this.client.rest.patch(endpoints.DISCOVERY_METADATA(this.id), snakelize(data));
  }

  /** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
  async getDiscovery() {
    return await this.client.rest.get(endpoints.DISCOVERY_METADATA(this.id));
  }

  /** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
  async removeDiscoverySubcategory(categoryId: number) {
    return await this.client.rest.delete(endpoints.DISCOVERY_SUBCATEGORY(this.id, categoryId));
  }

  /** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  async createEmoji(name: string, image: string, options: CreateGuildEmoji) {
    if (image && !image.startsWith("data:image/")) {
      image = await urlToBase64(image);
    }

    const emoji = (await this.client.rest.post(endpoints.GUILD_EMOJIS(this.id), {
      ...options,
      name,
      image,
    })) as Emoji;

    return {
      ...emoji,
      id: snowflakeToBigint(emoji.id!),
    };
  }

  /** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
  async deleteEmoji(id: bigint, reason?: string) {
    return await this.client.rest.delete(endpoints.GUILD_EMOJI(this.id, id), {
      reason,
    });
  }

  /** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
  async editEmoji(id: bigint, options: ModifyGuildEmoji) {
    return (await this.client.rest.patch(endpoints.GUILD_EMOJI(this.id, id), options)) as Emoji;
  }

  /** Creates a url to the emoji from the Discord CDN. */
  emojiURL(id: bigint, animated = false) {
    return `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}`;
  }

  /** Returns an emoji for the given guild and emoji Id. */
  async fetchEmoji(emojiId: bigint) {
    const result = (await this.client.rest.get(endpoints.GUILD_EMOJI(this.id, emojiId))) as Emoji;

    this.emojis.set(emojiId, result);
    return result;
  }

  /** Returns a list of emojis for the given guild. */
  async fetchEmojis(guildId: bigint) {
    const result = (await this.client.rest.get(endpoints.GUILD_EMOJIS(guildId))) as Emoji[];

    result.forEach((emoji) => {
      this.client.emit("DEBUG", "loop", `Running forEach loop in get_emojis file.`);
      this.emojis.set(snowflakeToBigint(emoji.id!), emoji);
    });

    return this.emojis;
  }

  /** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
  async deleteGuild(guildId: bigint) {
    return await this.client.rest.delete(endpoints.GUILDS_BASE(guildId));
  }

  /** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
  async edit(options: ModifyGuild) {
    if (options.icon && !options.icon.startsWith("data:image/")) {
      options.icon = await urlToBase64(options.icon);
    }

    if (options.banner && !options.banner.startsWith("data:image/")) {
      options.banner = await urlToBase64(options.banner);
    }

    if (options.splash && !options.splash.startsWith("data:image/")) {
      options.splash = await urlToBase64(options.splash);
    }

    const result = (await this.client.rest.patch(endpoints.GUILDS_BASE(this.id), snakelize(options))) as GuildPayload;

    const guild = new Guild(this.client, result, this.shardId);
    this.client.guilds.set(this.id, guild);
    return guild;
  }

  async editWelcomeScreen(options: ModifyGuildWelcomeScreen) {
    return (await this.client.rest.patch(endpoints.GUILD_WELCOME_SCREEN(this.id), snakelize(options))) as WelcomeScreen;
  }

  /** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
  async editWidget(enabled: boolean, channelId?: string | null) {
    return (await this.client.rest.patch(endpoints.GUILD_WIDGET(this.id), {
      enabled,
      channel_id: channelId,
    })) as GuildWidget;
  }

  /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
  async getAuditLogs(options?: GetGuildAuditLog) {
    return (await this.client.rest.get(
      endpoints.GUILD_AUDIT_LOGS(this.id),
      snakelize({
        ...options,
        limit: options?.limit && options.limit >= 1 && options.limit <= 100 ? options.limit : 50,
      })
    )) as AuditLog;
  }

  /** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
  async fetchBan(memberId: bigint) {
    return (await this.client.rest.get(endpoints.GUILD_BAN(this.id, memberId))) as Ban;
  }

  /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
  async fetchBans() {
    const results = (await this.client.rest.get(endpoints.GUILD_BANS(this.id))) as Ban[];

    return new Collection<bigint, Ban>(results.map((res) => [snowflakeToBigint(res.user.id), res]));
  }

  /** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
  async fetchGuildPreview() {
    return (await this.client.rest.get(endpoints.GUILD_PREVIEW(this.id))) as GuildPreview;
  }

  /** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
  async fetchPruneCount(options?: GetGuildPruneCountQuery) {
    const result = await this.client.rest.get(endpoints.GUILD_PRUNE(this.id), snakelize(options ?? {}));

    return result.pruned as number;
  }

  /** Returns the code and uses of the vanity url for this server if it is enabled else `code` will be null. Requires the `MANAGE_GUILD` permission. */
  async fetchVanityURL() {
    return (await this.client.rest.get(endpoints.GUILD_VANITY_URL(this.id))) as
      | (Partial<InviteMetadata> & Pick<InviteMetadata, "uses" | "code">)
      | {
          code: null;
        };
  }

  /** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
  async fetchVoiceRegions() {
    const result = (await this.client.rest.get(endpoints.GUILD_REGIONS(this.id))) as VoiceRegion[];

    return new Collection<string, VoiceRegion>(result.map((region) => [region.id, region]));
  }

  async fetchWelcomeScreen() {
    return (await this.client.rest.get(endpoints.GUILD_WELCOME_SCREEN(this.id))) as WelcomeScreen;
  }

  /** Returns the widget for the guild. */
  async fetchWidget() {
    return (await this.client.rest.get(`${endpoints.GUILD_WIDGET(this.id)}.json`)) as GuildWidgetDetails;
  }

  /** Returns the widget image URL for the guild. */
  widgetImageURL(options?: GetGuildWidgetImageQuery) {
    return `${endpoints.GUILD_WIDGET(this.id)}.png?style=${options?.style ?? "shield"}`;
  }

  /** Returns the guild widget object. Requires the MANAGE_GUILD permission. */
  async fetchWidgetSettings() {
    return (await this.client.rest.get(endpoints.GUILD_WIDGET(this.id))) as GuildWidget;
  }

  /** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
  bannerURL(options: {
    banner?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return options.banner
      ? formatImageURL(
          endpoints.GUILD_BANNER(
            this.id,
            typeof options.banner === "string"
              ? options.banner
              : iconBigintToHash(options.banner, options.animated ?? true)
          ),
          options.size || 128,
          options.format
        )
      : undefined;
  }

  /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
  iconURL(options: {
    icon?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return options.icon
      ? formatImageURL(
          endpoints.GUILD_ICON(
            this.id,
            typeof options.icon === "string" ? options.icon : iconBigintToHash(options.icon, options.animated ?? true)
          ),
          options.size || 128,
          options.format
        )
      : undefined;
  }

  /** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
  splashURL(options: {
    splash?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return options.splash
      ? formatImageURL(
          endpoints.GUILD_SPLASH(
            this.id,
            typeof options.splash === "string"
              ? options.splash
              : iconBigintToHash(options.splash, options.animated ?? true)
          ),
          options.size || 128,
          options.format
        )
      : undefined;
  }

  /** Leave a guild */
  async leave() {
    return await this.client.rest.delete(endpoints.GUILD_LEAVE(this.id));
  }

  /** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
  async deleteIntegration(id: bigint) {
    return await this.client.rest.delete(endpoints.GUILD_INTEGRATION(this.id, id));
  }

  /** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
  async getIntegrations() {
    return (await this.client.rest.get(endpoints.GUILD_INTEGRATIONS(this.id))) as Integration;
  }

  /** Batch edits permissions for all commands in a guild. Takes an array of partial GuildApplicationCommandPermissions objects including `id` and `permissions`. */
  async batchEditSlashCommandPermissions(options: { id: string; permissions: ApplicationCommandPermissions[] }[]) {
    return await this.client.rest.put(
      endpoints.COMMANDS_PERMISSIONS(this.client.applicationId, this.id),
      snakelize(options)
    );
  }

  /** Create a guild slash command */
  async createSlashCommand(options: CreateGlobalApplicationCommand) {
    return (await this.client.rest.post(
      endpoints.COMMANDS_GUILD(this.client.applicationId, this.id),
      snakelize(options)
    )) as ApplicationCommand;
  }

  /** Deletes a slash command. */
  async deleteSlashCommand(id: bigint) {
    return await this.client.rest.delete(endpoints.COMMANDS_GUILD_ID(this.client.applicationId, this.id, id));
  }

  /** Edits command permissions for a specific command for your application in a guild. */
  async editSlashCommandPermissions(commandId: bigint, options: ApplicationCommandPermissions[]) {
    return await this.client.rest.put(endpoints.COMMANDS_PERMISSION(this.client.applicationId, this.id, commandId), {
      permissions: snakelize(options),
    });
  }

  /** Fetchs the guild command. */
  async getSlashCommand(commandId: bigint) {
    const result = (await this.client.rest.get(
      endpoints.COMMANDS_GUILD_ID(this.client.applicationId, this.id, commandId)
    )) as ApplicationCommand;

    return {
      ...result,
      id: snowflakeToBigint(result.id),
      applicationId: snowflakeToBigint(result.applicationId),
    };
  }

  /** Fetches command permissions for a specific command for your application in a guild. Returns a GuildApplicationCommandPermissions object. */
  async getSlashCommandPermission(commandId: bigint) {
    return (await this.client.rest.get(
      endpoints.COMMANDS_PERMISSION(this.client.applicationId, this.id, commandId)
    )) as GuildApplicationCommandPermissions;
  }

  /** Fetches command permissions for all commands for your application in a guild. Returns an array of GuildApplicationCommandPermissions objects. */
  async getSlashCommandPermissions() {
    return (await this.client.rest.get(
      endpoints.COMMANDS_PERMISSIONS(this.client.applicationId, this.id)
    )) as GuildApplicationCommandPermissions[];
  }

  /** Fetch all of the guild commands for your application. */
  async getSlashCommands() {
    const result = (await this.client.rest.get(
      endpoints.COMMANDS_GUILD(this.client.applicationId, this.id)
    )) as ApplicationCommand[];

    return new Collection(
      result.map((command) => [
        command.name,
        {
          ...command,
          id: snowflakeToBigint(command.id),
          applicationId: snowflakeToBigint(command.applicationId),
        },
      ])
    );
  }

  /**
   * Edit an existing slash command. If this command did not exist, it will create it.
   */
  async upsertSlashCommand(commandId: bigint, options: EditGlobalApplicationCommand) {
    return (await this.client.rest.patch(
      endpoints.COMMANDS_GUILD_ID(this.client.applicationId, this.id, commandId),
      options
    )) as ApplicationCommand;
  }

  /**
   * Bulk edit existing slash commands. If a command does not exist, it will create it.
   *
   * **NOTE:** Any slash commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
   */
  async upsertSlashCommands(options: EditGlobalApplicationCommand[]) {
    return (await this.client.rest.put(
      endpoints.COMMANDS_GUILD(this.client.applicationId, this.id),
      options
    )) as ApplicationCommand[];
  }

  /** Get all the invites for this guild. Requires MANAGE_GUILD permission */
  async fetchInvites() {
    const result = (await this.client.rest.get(endpoints.GUILD_INVITES(this.id))) as InviteMetadata[];

    return new Collection(result.map((invite) => [invite.code, invite]));
  }

  /** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
  async ban(id: bigint, options: CreateGuildBan) {
    return await this.client.rest.put(endpoints.GUILD_BAN(this.id, id), snakelize(options));
  }

  /** Kick a member from the server */
  async kick(memberId: bigint, reason?: string) {
    return await this.client.rest.delete(endpoints.GUILD_MEMBER(this.id, memberId), { reason });
  }

  /** Edit the nickname of the bot in this guild */
  async editBotNickname(nickname: string | null) {
    const response = (await this.client.rest.patch(endpoints.USER_NICK(this.id), {
      nick: nickname,
    })) as { nick: string };

    return response.nick;
  }

  /**
   * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM this.client.members.get()
   *
   * ADVANCED:
   * Highly recommended to use this function to fetch members instead of getMember from REST.
   * REST: 50/s global(across all shards) rate limit with ALL requests this included
   * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
   */
  fetchMembers(options?: Omit<RequestGuildMembers, "guildId">) {
    if (options?.userIds?.length) {
      options.limit = options.userIds.length;
    }

    return new Promise((resolve) => {
      const nonce = `${this.id}-${Date.now()}`;
      this.client.fetchAllMembersProcessingRequests.set(nonce, resolve);

      this.client.gateway.get(this.shardId)?.sendShardMessage({
        op: DiscordGatewayOpcodes.RequestGuildMembers,
        d: {
          guild_id: this.id,
          // If a query is provided use it, OR if a limit is NOT provided use ""
          query: options?.query || (options?.limit ? undefined : ""),
          limit: options?.limit || 0,
          presences: options?.presences || false,
          user_ids: options?.userIds,
          nonce,
        },
      });
    }) as Promise<Collection<bigint, Member>>;
  }

  /** Returns a guild member object for the specified user.
   *
   * ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
   */
  async fetchMember(id: bigint) {
    const data = (await this.client.rest.get(endpoints.GUILD_MEMBER(this.id, id))) as GuildMemberWithUser;

    const member = new Member(this.client, data, this.id);
    this.members.set(member.id, member);

    return member;
  }

  /**
   * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM this.client.members.get()
   *
   * ADVANCED:
   * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
   * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
   * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
   */
  async fetchMembersUsingRest(options?: ListGuildMembers) {
    const members = new Collection<bigint, Member>();

    let membersLeft = options?.limit ?? this.memberCount;
    let loops = 1;
    while ((options?.limit ?? this.memberCount) > members.size && membersLeft > 0) {
      this.client.emit("DEBUG", "loop", "Running while loop in getMembers function.");

      if (options?.limit && options.limit > 1000) {
        console.log(`Paginating get members from REST. #${loops} / ${Math.ceil((options?.limit ?? 1) / 1000)}`);
      }

      const result = (await this.client.rest.get(
        `${endpoints.GUILD_MEMBERS(this.id)}?limit=${membersLeft > 1000 ? 1000 : membersLeft}${
          options?.after ? `&after=${options.after}` : ""
        }`
      )) as GuildMemberWithUser[];

      const discordenoMembers = result.map((member) => {
        const discordenoMember = new Member(this.client, member, this.id);
        this.members.set(discordenoMember.id, discordenoMember);

        return discordenoMember;
      });

      if (!discordenoMembers.length) break;

      discordenoMembers.forEach((member) => {
        this.client.emit("DEBUG", "loop", `Running forEach loop in get_members file.`);
        members.set(member.id, member);
      });

      options = {
        limit: options?.limit,
        after: bigintToSnowflake(discordenoMembers[discordenoMembers.length - 1].id),
      };

      membersLeft -= 1000;

      loops++;
    }

    return members;
  }

  /**
   * Begin a prune operation. Requires the KICK_MEMBERS permission. Returns an object with one 'pruned' key indicating the number of members that were removed in the prune operation. For large guilds it's recommended to set the computePruneCount option to false, forcing 'pruned' to null. Fires multiple Guild Member Remove Gateway events.
   *
   * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the roles (resolved to include_roles internally) parameter. Any inactive user that has a subset of the provided role(s) will be included in the prune and users with additional roles will not.
   */
  async pruneMembers(options: BeginGuildPrune) {
    const result = (await this.client.rest.post(endpoints.GUILD_PRUNE(this.id), snakelize(options))) as {
      pruned: number;
    };

    return result.pruned;
  }

  /**
   * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM this.client.members.filter()
   * @param query Query string to match username(s) and nickname(s) against
   */
  async searchMembers(query: string, options?: Omit<SearchGuildMembers, "query"> & { cache?: boolean }) {
    const result = (await this.client.rest.get(endpoints.GUILD_MEMBERS_SEARCH(this.id), {
      ...options,
      query,
    })) as GuildMemberWithUser[];

    return new Collection<bigint, Member>(
      result.map((member) => {
        const discordenoMember = new Member(this.client, member, this.id);
        this.members.set(discordenoMember.id, discordenoMember);

        return [discordenoMember.id, discordenoMember];
      })
    );
  }

  /** Remove the ban for a user. Requires BAN_MEMBERS permission */
  async unban(id: bigint) {
    return await this.client.rest.delete(endpoints.GUILD_BAN(this.id, id));
  }

  /** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
  async createRole(options: CreateGuildRole, reason?: string) {
    const result = (await this.client.rest.post(endpoints.GUILD_ROLES(this.id), {
      ...options,
      permissions: calculateBits(options?.permissions || []),
      reason,
    })) as RolePayload;

    const role = new Role(this.client, result, this);
    this.roles.set(role.id, role);

    return role;
  }

  /** Returns a list of role objects for the guild.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
   */
  async fetchRoles() {
    const result = (await this.client.rest.get(endpoints.GUILD_ROLES(this.id))) as RolePayload[];

    return new Collection<bigint, Role>(
      result.map((res) => {
        const role = new Role(this.client, res, this);
        this.roles.set(role.id, role);

        return [role.id, role];
      })
    );
  }

  /**
   * Creates a template for the guild.
   * Requires the `MANAGE_GUILD` permission.
   * name of the template (1-100 characters).
   * description for the template (0-120 characters
   */
  async createTemplate(data: Template) {
    return (await this.client.rest.post(endpoints.GUILD_TEMPLATES(this.id), snakelize(data))) as Template;
  }

  /**
   * Deletes a template from a guild.
   * Requires the `MANAGE_GUILD` permission.
   */
  async deleteTemplate(templateCode: string) {
    return await this.client.rest.delete(`${endpoints.GUILD_TEMPLATES(this.id)}/${templateCode}`);
  }

  /**
   * Edit a template's metadata.
   * Requires the `MANAGE_GUILD` permission.
   */
  async editTemplate(templateCode: string, data: ModifyGuildTemplate) {
    return (await this.client.rest.patch(`${endpoints.GUILD_TEMPLATES(this.id)}/${templateCode}`, data)) as Template;
  }

  /**
   * Returns an array of templates.
   * Requires the `MANAGE_GUILD` permission.
   */
  async fetchTemplates() {
    const templates = (await this.client.rest.get(endpoints.GUILD_TEMPLATES(this.id))) as Template[];

    return new Collection(templates.map((template) => [template.code, template]));
  }

  /**
   * Syncs the template to the guild's current state.
   * Requires the `MANAGE_GUILD` permission.
   */
  async syncTemplate(templateCode: string) {
    return (await this.client.rest.put(`${endpoints.GUILD_TEMPLATES(this.id)}/${templateCode}`)) as Template;
  }

  /** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
  async fetchWebhooks() {
    const result = (await this.client.rest.get(
      endpoints.GUILD_WEBHOOKS(this.id)
    )) as Webhook[];

    return new Collection(result.map((webhook) => [webhook.id, webhook]));
  }
}
