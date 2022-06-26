import {
  AllowedMentionsTypes,
  ChannelTypes,
  delay,
  DiscordAllowedMentions,
  DiscordAuditLogEntry,
  DiscordChannel,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordIntegration,
  DiscordInvite,
  DiscordMember,
  DiscordMessage,
  DiscordRole,
  DiscordTemplate,
  DiscordThreadMember,
  DiscordUser,
  EventEmitter,
  getBotIdFromToken,
  OverwriteTypes,
  RequestMethod,
} from "../deps.ts";
import { Base } from "./Base.ts";
import { Collection } from "./Collection.ts";
import {
  CHANNEL,
  CHANNEL_BULK_DELETE,
  CHANNEL_CROSSPOST,
  CHANNEL_FOLLOW,
  CHANNEL_INVITES,
  CHANNEL_MESSAGE,
  CHANNEL_MESSAGE_REACTION,
  CHANNEL_MESSAGE_REACTION_USER,
  CHANNEL_MESSAGE_REACTIONS,
  CHANNEL_MESSAGES,
  CHANNEL_PERMISSION,
  CHANNEL_PIN,
  CHANNEL_PINS,
  CHANNEL_TYPING,
  CHANNEL_WEBHOOKS,
  COMMAND,
  COMMAND_PERMISSIONS,
  COMMANDS,
  CUSTOM_EMOJI_GUILD,
  DISCOVERY_CATEGORIES,
  DISCOVERY_VALIDATION,
  GATEWAY,
  GATEWAY_BOT,
  GUILD,
  GUILD_AUDIT_LOGS,
  GUILD_BAN,
  GUILD_BANS,
  GUILD_CHANNELS,
  GUILD_COMMAND,
  GUILD_COMMAND_PERMISSIONS,
  GUILD_COMMANDS,
  GUILD_DISCOVERY,
  GUILD_DISCOVERY_CATEGORY,
  GUILD_EMOJI,
  GUILD_EMOJIS,
  GUILD_INTEGRATION,
  GUILD_INTEGRATION_SYNC,
  GUILD_INTEGRATIONS,
  GUILD_INVITES,
  GUILD_MEMBER,
  GUILD_MEMBER_ROLE,
  GUILD_MEMBERS,
  GUILD_MEMBERS_SEARCH,
  GUILD_PREVIEW,
  GUILD_PRUNE,
  GUILD_ROLE,
  GUILD_ROLES,
  GUILD_STICKER,
  GUILD_STICKERS,
  GUILD_TEMPLATE,
  GUILD_TEMPLATE_GUILD,
  GUILD_TEMPLATES,
  GUILD_VANITY_URL,
  GUILD_VOICE_REGIONS,
  GUILD_VOICE_STATE,
  GUILD_WEBHOOKS,
  GUILD_WELCOME_SCREEN,
  GUILD_WIDGET,
  GUILD_WIDGET_SETTINGS,
  GUILDS,
  INTERACTION_RESPOND,
  INVITE,
  OAUTH2_APPLICATION,
  STAGE_INSTANCE,
  STAGE_INSTANCES,
  STICKER,
  STICKER_PACKS,
  THREAD_MEMBER,
  THREAD_MEMBERS,
  THREAD_WITH_MESSAGE,
  THREAD_WITHOUT_MESSAGE,
  THREADS_ARCHIVED,
  THREADS_ARCHIVED_JOINED,
  THREADS_GUILD_ACTIVE,
  USER,
  USER_CHANNELS,
  USER_GUILD,
  USER_GUILDS,
  VOICE_REGIONS,
  WEBHOOK,
  WEBHOOK_MESSAGE,
  WEBHOOK_TOKEN,
  WEBHOOK_TOKEN_SLACK,
} from "./Endpoints.ts";
import CategoryChannel from "./Structures/CategoryChannel.ts";
import Channel from "./Structures/Channel.ts";
import ExtendedUser from "./Structures/ExtendedUser.ts";
import { Guild } from "./Structures/Guild.ts";
import GuildAuditLogEntry from "./Structures/GuildAuditLogEntry.ts";
import GuildIntegration from "./Structures/GuildIntegration.ts";
import GuildPreview from "./Structures/GuildPreview.ts";
import GuildTemplate from "./Structures/GuildTemplate.ts";
import Invite from "./Structures/Invite.ts";
import Member from "./Structures/Member.ts";
import Message from "./Structures/Message.ts";
import NewsChannel from "./Structures/NewsChannel.ts";
import NewsThreadChannel from "./Structures/NewsThreadChannel.ts";
import Permission from "./Structures/Permission.ts";
import PrivateChannel from "./Structures/PrivateChannel.ts";
import PrivateThreadChannel from "./Structures/PrivateThreadChannel.ts";
import PublicThreadChannel from "./Structures/PublicThreadChannel.ts";
import Role from "./Structures/Role.ts";
import StageChannel from "./Structures/StageChannel.ts";
import StageInstance from "./Structures/StageInstance.ts";
import TextChannel from "./Structures/TextChannel.ts";
import TextVoiceChannel from "./Structures/TextVoiceChannel.ts";
import ThreadMember from "./Structures/ThreadMember.ts";
import User from "./Structures/User.ts";
import {
  AnyChannel,
  AnyGuildChannel,
  ApplicationCommand,
  ApplicationCommandPermissions,
  ApplicationCommandStructure,
  ChannelFollow,
  ChannelPosition,
  CreateChannelInviteOptions,
  CreateChannelOptions,
  CreateGuildOptions,
  CreateStickerOptions,
  CreateThreadOptions,
  CreateThreadWithoutMessageOptions,
  DiscoveryCategory,
  DiscoveryMetadata,
  DiscoveryOptions,
  DiscoverySubcategoryResponse,
  EditChannelOptions,
  EditChannelPositionOptions,
  EditStickerOptions,
  Emoji,
  EmojiOptions,
  FileContent,
  GetArchivedThreadsOptions,
  GetGuildAuditLogOptions,
  GetGuildBansOptions,
  GetMessageReactionOptions,
  GetMessagesOptions,
  GetPruneOptions,
  GetRESTGuildMembersOptions,
  GetRESTGuildsOptions,
  GuildApplicationCommandPermissions,
  GuildAuditLog,
  GuildBan,
  GuildOptions,
  GuildTemplateOptions,
  GuildVanity,
  IntegrationOptions,
  InteractionOptions,
  ListedChannelThreads,
  ListedGuildThreads,
  MemberOptions,
  MessageContent,
  MessageContentEdit,
  MessageWebhookContent,
  OAuthApplicationInfo,
  PruneMemberOptions,
  PurgeChannelOptions,
  RoleOptions,
  StageInstanceOptions,
  Sticker,
  StickerPack,
  VoiceRegion,
  VoiceStateOptions,
  Webhook,
  WebhookOptions,
  WebhookPayload,
  WelcomeScreen,
  WelcomeScreenOptions,
  Widget,
  WidgetData,
} from "./typings.ts";

export type BigString = string | bigint;

export class Client extends EventEmitter {
  /** The timestamp in milliseconds when this client was created. */
  startTime = Date.now();
  /** The cleaned up version of the provided configurations for the client. */
  options: ParsedClientOptions;
  /** The token used for this client. */
  token: string;

  CDN_URL = "https://cdn.discordapp.com";
  CLIENT_URL = "https://discord.com";

  guilds = new Collection<BigString, Guild>();
  users = new Collection<BigString, User>();
  _channelGuildMap = new Collection<BigString, BigString>();
  _threadGuildMap = new Collection<BigString, BigString>();
  _privateChannelMap = new Collection<BigString, BigString>();
  privateChannels = new Collection<BigString, PrivateChannel>();

  constructor(token: string, options: ClientOptions) {
    super();

    this.options = {
      apiVersion: options.apiVersion ?? 10,
      allowedMentions: this._formatAllowedMentions(options.allowedMentions),
      defaultImageFormat: options.defaultImageFormat ?? "png",
      defaultImageSize: options.defaultImageSize ?? 128,
      proxyURL: options.proxyURL,
      proxyRestAuthorization: options.proxyRestAuthorization,
      applicationId: options.applicationId,
    };
    this.token = token;
  }

  get id(): BigString {
    return getBotIdFromToken(this.token);
  }

  get channelGuildMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (const [channelId, guildId] of this._channelGuildMap.entries()) {
      map[channelId.toString()] = guildId.toString();
    }

    return map;
  }

  get threadGuildMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (const [threadId, guildId] of this._threadGuildMap.entries()) {
      map[threadId.toString()] = guildId.toString();
    }

    return map;
  }

  get privateChannelMap() {
    const map: Record<string, string> = {};
    for (const [userId, channelId] of this._privateChannelMap.entries()) {
      map[userId.toString()] = channelId.toString();
    }

    return map;
  }

  /** THe amount of time in milliseconds that this client has been online for. */
  get uptime() {
    return Date.now() - this.startTime;
  }

  get apiVersion() {
    return this.options.apiVersion;
  }

  get BASE_URL() {
    return `/api/v${this.apiVersion}`;
  }

  /** The url to the REST proxy to send requests to. */
  get proxyURL(): string {
    return this.options.proxyURL;
  }

  /** The password/authorization to confirm that these request made to your rest proxy are indeed from you and not a hacker. */
  get proxyRestAuthorization(): string {
    return this.options.proxyRestAuthorization;
  }

  /** The application id(NOT the bot id). The bot id and application id are the same for newer bots but older bots have different ids. */
  get applicationId(): BigString {
    return this.options.applicationId;
  }

  async makeRequest(
    data: RequestData,
  ) {
    return await fetch(`${this.proxyURL}/${this.BASE_URL}/${data.url}`, {
      method: data.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.proxyRestAuthorization,
        "X-Audit-Log-Reason": data.reason ?? "",
        ...(data.headers ?? {}),
      },
      body: data.body ? JSON.stringify(data.body) : undefined,
    }).then((res) => res.json()).catch((error) => {
      console.log(error);
      return null;
    });
  }

  async get(url: string) {
    return await this.makeRequest({
      method: "GET",
      url,
    });
  }

  async post(
    url: string,
    payload?: { body?: Record<string, unknown>; reason?: string; file?: FileContent | FileContent[] },
  ) {
    return await this.makeRequest({
      method: "POST",
      url,
      body: payload?.body,
      reason: payload?.reason,
      file: payload?.file,
    });
  }

  async patch(
    url: string,
    payload?: {
      body?: Record<string, unknown> | null | string | any[];
      reason?: string;
      file?: FileContent | FileContent[];
    },
  ) {
    return await this.makeRequest({
      method: "PATCH",
      url,
      body: payload?.body,
      reason: payload?.reason,
      file: payload?.file,
    });
  }

  async put(url: string, payload?: { body?: Record<string, string | number> | any[]; reason?: string }) {
    return await this.makeRequest({
      method: "PUT",
      url,
      body: payload?.body,
      reason: payload?.reason,
    });
  }

  async delete(url: string, payload?: { reason?: string }) {
    return await this.makeRequest({
      method: "DELETE",
      url,
      reason: payload?.reason,
    });
  }

  /** Add a guild discovery subcategory */
  async addGuildDiscoverySubcategory(
    guildID: BigString,
    categoryID: BigString,
    reason?: string,
  ): Promise<DiscoverySubcategoryResponse> {
    return await this.post(GUILD_DISCOVERY_CATEGORY(guildID, categoryID), { reason });
  }

  /** Add a role to a guild member */
  async addGuildMemberRole(guildID: BigString, memberID: BigString, roleID: BigString, reason?: string): Promise<void> {
    return await this.put(GUILD_MEMBER_ROLE(guildID, memberID, roleID), { reason });
  }

  /** Add a reaction to a message */
  async addMessageReaction(channelID: BigString, messageID: BigString, reaction: string): Promise<void> {
    if (reaction === decodeURI(reaction)) {
      reaction = encodeURIComponent(reaction);
    }

    return await this.put(CHANNEL_MESSAGE_REACTION_USER(channelID, messageID, reaction, "@me"));
  }

  /** Ban a user from a guild */
  async banGuildMember(guildID: BigString, userID: BigString, deleteMessageDays = 0, reason?: string): Promise<void> {
    if ((deleteMessageDays < 0 || deleteMessageDays > 7)) {
      return Promise.reject(
        new Error(`Invalid deleteMessageDays value (${deleteMessageDays}), should be a number between 0-7 inclusive`),
      );
    }

    return await this.put(GUILD_BAN(guildID, userID), { reason, body: { delete_message_days: deleteMessageDays } });
  }

  /** Bulk create/edit global application commands */
  async bulkEditCommands(commands: ApplicationCommandStructure[]): Promise<ApplicationCommand[]> {
    for (const command of commands) {
      if (command.name !== undefined) {
        if (command.type === 1 || command.type === undefined) {
          command.name = command.name.toLowerCase();
          if (!command.name.match(/^[\w-]{1,32}$/)) {
            throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"');
          }
        }
      }
    }

    return await this.put(COMMANDS(this.applicationId), { body: commands });
  }

  /** Bulk create/edit guild application commands */
  async bulkEditGuildCommands(guildID: BigString, commands: ApplicationCommand[]): Promise<ApplicationCommand[]> {
    for (const command of commands) {
      if (command.name !== undefined) {
        if (command.type === 1 || command.type === undefined) {
          command.name = command.name.toLowerCase();
          if (!command.name.match(/^[\w-]{1,32}$/)) {
            throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"');
          }
        }
      }
    }

    return await this.put(GUILD_COMMANDS(this.applicationId, guildID), { body: commands });
  }

  /** Create a channel in a guild */
  async createChannel(guildID: BigString, name: string): Promise<TextChannel>;
  async createChannel(
    guildID: BigString,
    name: string,
    type: ChannelTypes.GuildText,
    options?: CreateChannelOptions,
  ): Promise<TextChannel>;
  async createChannel(
    guildID: BigString,
    name: string,
    type: ChannelTypes.GuildVoice,
    options?: CreateChannelOptions,
  ): Promise<TextVoiceChannel>;
  async createChannel(
    guildID: BigString,
    name: string,
    type: ChannelTypes.GuildCategory,
    options?: CreateChannelOptions,
  ): Promise<CategoryChannel>;
  async createChannel(
    guildID: BigString,
    name: string,
    type: ChannelTypes.GuildNews,
    options?: CreateChannelOptions,
  ): Promise<NewsChannel>;
  async createChannel(
    guildID: BigString,
    name: string,
    type: ChannelTypes.GuildStageVoice,
    options?: CreateChannelOptions,
  ): Promise<StageChannel>;
  async createChannel(
    guildID: BigString,
    name: string,
    type?: number,
    options?: CreateChannelOptions,
  ): Promise<unknown> {
    return await this.post(GUILD_CHANNELS(guildID), {
      reason: options?.reason,
      body: {
        name: name,
        type: type ?? ChannelTypes.GuildText,
        bitrate: options?.bitrate,
        nsfw: options?.nsfw,
        parent_id: options?.parentID,
        permission_overwrites: options?.permissionOverwrites,
        position: options?.position,
        rate_limit_per_user: options?.rateLimitPerUser,
        topic: options?.topic,
        user_limit: options?.userLimit,
      },
    }).then((channel) => Channel.from(channel, this));
  }

  /** Create an invite for a channel */
  async createChannelInvite(
    channelID: BigString,
    options: CreateChannelInviteOptions = {},
    reason?: string,
  ): Promise<Invite> {
    return await this.post(CHANNEL_INVITES(channelID), {
      body: {
        max_age: options.maxAge,
        max_uses: options.maxUses,
        target_application_id: options.targetApplicationID,
        target_type: options.targetType,
        target_user_id: options.targetUserID,
        temporary: options.temporary,
        unique: options.unique,
      },
      reason,
    }).then((invite) => new Invite(invite, this));
  }

  /** Create a channel webhook */
  async createChannelWebhook(
    channelID: BigString,
    options: { name: string; avatar?: string | null },
    reason?: string,
  ): Promise<Webhook> {
    return await this.post(CHANNEL_WEBHOOKS(channelID), { reason, body: options });
  }

  /** Create a global application command */
  async createCommand(command: ApplicationCommandStructure): Promise<ApplicationCommand> {
    if (command.name !== undefined) {
      if (command.type === 1 || command.type === undefined) {
        command.name = command.name.toLowerCase();
        if (!command.name.match(/^[\w-]{1,32}$/)) {
          throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"');
        }
      }
    }

    // @ts-ignore some eris magic at play here
    command.default_permission = command.defaultPermission;
    return await this.post(COMMANDS(this.applicationId), { body: command });
  }

  /** Create a guild */
  async createGuild(name: string, options?: CreateGuildOptions): Promise<Guild> {
    if (this.guilds.size > 9) {
      throw new Error("This method can't be used when in 10 or more guilds.");
    }

    return await this.post(GUILDS, {
      body: {
        name: name,
        icon: options?.icon,
        verification_level: options?.verificationLevel,
        default_message_notifications: options?.defaultNotifications,
        explicit_content_filter: options?.explicitContentFilter,
        system_channel_id: options?.systemChannelID,
        afk_channel_id: options?.afkChannelID,
        afk_timeout: options?.afkTimeout,
        roles: options?.roles,
        channels: options?.channels,
      },
    }).then((guild) => new Guild(guild, this));
  }

  /** Create a guild application command */
  async createGuildCommand(guildID: BigString, command: ApplicationCommandStructure): Promise<ApplicationCommand> {
    if (command.name !== undefined) {
      if (command.type === 1 || command.type === undefined) {
        command.name = command.name.toLowerCase();
        if (!command.name.match(/^[\w-]{1,32}$/)) {
          throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"');
        }
      }
    }
    // @ts-ignore some eris magic at play here
    command.default_permission = command.defaultPermission;

    return await this.post(GUILD_COMMANDS(this.applicationId, guildID), { body: command });
  }

  /** Create a guild emoji object */
  async createGuildEmoji(guildID: BigString, options: EmojiOptions, reason?: string): Promise<Emoji> {
    return await this.post(GUILD_EMOJIS(guildID), {
      body: {
        name: options.name,
        roles: options.roles,
        image: options.image,
      },
      reason,
    });
  }

  /** Create a guild based on a template. This can only be used with bots in less than 10 guilds */
  async createGuildFromTemplate(code: string, name: string, icon?: string): Promise<Guild> {
    return await this.post(GUILD_TEMPLATE(code), { body: { name, icon } }).then((guild) => new Guild(guild, this));
  }

  /** Create a guild sticker */
  async createGuildSticker(guildID: BigString, options: CreateStickerOptions, reason?: string): Promise<Sticker> {
    return await this.post(GUILD_STICKERS(guildID), {
      body: {
        // @ts-ignore some eris magic at play here
        description: options.description ?? "",
        name: options.name,
        tags: options.tags,
      },
      reason,
      file: options.file,
    });
  }

  /** Create a template for a guild */
  async createGuildTemplate(guildID: BigString, name: string, description?: string): Promise<GuildTemplate> {
    return await this.post(GUILD_TEMPLATES(guildID), {
      body: {
        name,
        description,
      },
    }).then((template) => new GuildTemplate(template, this));
  }

  /** Respond to the interaction with a message
   * Note: Use webhooks if you have already responded with an interaction response. */
  async createInteractionResponse(
    interactionID: BigString,
    interactionToken: string,
    options: InteractionOptions,
    file?: FileContent | FileContent[],
  ): Promise<void> {
    return await this.post(INTERACTION_RESPOND(interactionID, interactionToken), {
      body: {
        ...options,
      },
      file,
    });
  }

  /**
   * Create a message in a channel
   * Note: If you want to DM someone, the user ID is **not** the DM channel ID. use Client.getDMChannel() to get the DM channel for a user
   */
  async createMessage(channelID: BigString, content: MessageContent, file?: FileContent | FileContent[]) {
    if (content !== undefined) {
      if (typeof content !== "object" || content === null) {
        content = {
          content: "" + content,
        };
      } else if (content.content !== undefined && typeof content.content !== "string") {
        content.content = "" + content.content;
      } else if (content.embed) {
        if (!content.embeds) {
          content.embeds = [];
        }
        content.embeds.push(content.embed);
      }
    }

    return await this.post(CHANNEL_MESSAGES(channelID), {
      body: {
        ...content,
        allowed_mentions: this._formatAllowedMentions(content.allowedMentions),
        sticker_ids: content.stickerIDs,
        ...(content.messageReference?.messageID
          ? {
            message_reference: {
              message_id: content.messageReference.messageID.toString(),
              channel_id: content.messageReference.channelID?.toString(),
              guild_id: content.messageReference.guildID?.toString(),
              fail_if_not_exists: content.messageReference.failIfNotExists === true,
            },
          }
          : {}),
      },
      file,
    }).then((message) => new Message(message, this));
  }

  /** Create a guild role */
  async createRole(guildID: BigString, options: Role | RoleOptions, reason?: string) {
    if (options.permissions !== undefined) {
      options.permissions = options.permissions instanceof Permission
        ? String(options.permissions.allow)
        : String(options.permissions);
    }

    return await this.post(GUILD_ROLES(guildID), {
      body: {
        name: options.name,
        permissions: options.permissions,
        color: options.color,
        hoist: options.hoist,
        icon: options.icon,
        mentionable: options.mentionable,
        unicode_emoji: options.unicodeEmoji,
      },
      reason,
    }).then((r) => {
      const guild = this.guilds.get(guildID);
      // @ts-ignore some eris magic at play here
      const role = new Role(r, guild);

      guild?.roles.set(role.id, role);

      return role;
    });
  }

  /** Create a stage instance */
  async createStageInstance(channelID: BigString, options: StageInstanceOptions): Promise<StageInstance> {
    return await this.post(STAGE_INSTANCES, {
      body: {
        channel_id: channelID,
        privacy_level: options.privacyLevel,
        topic: options.topic,
      },
    })
      .then((instance) => new StageInstance(instance, this));
  }

  /** Create a thread with an existing message */
  async createThreadWithMessage(
    channelID: BigString,
    messageID: BigString,
    options: CreateThreadOptions,
  ): Promise<NewsThreadChannel | PublicThreadChannel> {
    return await this.post(THREAD_WITH_MESSAGE(channelID, messageID), {
      body: {
        name: options.name,
        auto_archive_duration: options.autoArchiveDuration,
      },
    }).then((channel) => Channel.from(channel, this));
  }

  /** Create a thread without an existing message */
  async createThreadWithoutMessage(
    channelID: BigString,
    options: CreateThreadWithoutMessageOptions,
  ): Promise<PrivateThreadChannel> {
    return await this.post(THREAD_WITHOUT_MESSAGE(channelID), {
      body: {
        auto_archive_duration: options.autoArchiveDuration,
        invitable: options.invitable,
        name: options.name,
        type: options.type,
      },
    }).then((channel) => Channel.from(channel, this));
  }

  /** Crosspost (publish) a message to subscribed channels */
  async crosspostMessage(channelID: BigString, messageID: BigString): Promise<Message> {
    return await this.post(CHANNEL_CROSSPOST(channelID, messageID)).then((message) => new Message(message, this));
  }

  /** Delete a guild channel, or leave a private or group channel */
  async deleteChannel(channelID: BigString, reason?: string): Promise<void> {
    return await this.delete(CHANNEL(channelID), {
      reason,
    });
  }

  /** Delete a channel permission overwrite */
  async deleteChannelPermission(channelID: BigString, overwriteID: BigString, reason?: string) {
    return await this.delete(CHANNEL_PERMISSION(channelID, overwriteID), {
      reason,
    });
  }

  /** Delete a global application command */
  async deleteCommand(commandID: BigString): Promise<void> {
    return await this.delete(COMMAND(this.applicationId, commandID));
  }

  /** Delete a guild (bot user must be owner) */
  async deleteGuild(guildID: BigString): Promise<void> {
    return await this.delete(GUILD(guildID));
  }

  /** Delete a guild application command */
  async deleteGuildCommand(guildID: BigString, commandID: BigString): Promise<void> {
    return await this.delete(GUILD_COMMAND(this.applicationId, guildID, commandID));
  }

  /** Delete a guild discovery subcategory */
  async deleteGuildDiscoverySubcategory(guildID: BigString, categoryID: BigString, reason?: string) {
    return await this.delete(GUILD_DISCOVERY_CATEGORY(guildID, categoryID), { reason });
  }

  /** Delete a guild emoji object */
  async deleteGuildEmoji(guildID: BigString, emojiID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_EMOJI(guildID, emojiID), {
      reason,
    });
  }

  /** Delete a guild integration */
  async deleteGuildIntegration(guildID: BigString, integrationID: BigString): Promise<void> {
    return await this.delete(GUILD_INTEGRATION(guildID, integrationID));
  }

  /** Delete a guild sticker */
  async deleteGuildSticker(guildID: BigString, stickerID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_STICKER(guildID, stickerID), {
      reason,
    });
  }

  /** Delete a guild template */
  async deleteGuildTemplate(guildID: BigString, code: string): Promise<void> {
    return await this.delete(GUILD_TEMPLATE_GUILD(guildID, code));
  }

  /** Delete an invite */
  async deleteInvite(inviteID: string, reason?: string): Promise<void> {
    return await this.delete(INVITE(inviteID), {
      reason,
    });
  }

  /** Delete a message */
  async deleteMessage(channelID: BigString, messageID: BigString, reason?: string): Promise<void> {
    return await this.delete(CHANNEL_MESSAGE(channelID, messageID), {
      reason,
    });
  }

  /** Bulk delete messages (bot accounts only) */
  async deleteMessages(channelID: BigString, messageIDs: BigString[], reason?: string): Promise<void> {
    if (messageIDs.length === 0) {
      return Promise.resolve();
    }
    if (messageIDs.length === 1) {
      return this.deleteMessage(channelID, messageIDs[0], reason);
    }

    const oldestAllowedSnowflake = (Date.now() - 1421280000000) * 4194304;
    const invalidMessage = messageIDs.find((messageID) =>
      this.snowflakeToTimestamp(messageID) < oldestAllowedSnowflake
    );
    if (invalidMessage) {
      return Promise.reject(new Error(`Message ${invalidMessage} is more than 2 weeks old.`));
    }

    const chunks = this.chunkArray(messageIDs, 100);
    for (const chunk of chunks) {
      await this.post(CHANNEL_BULK_DELETE(channelID), {
        body: { messages: chunk },
        reason: reason,
      });
    }
  }

  /** Delete a guild role */
  async deleteRole(guildID: BigString, roleID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_ROLE(guildID, roleID), {
      reason,
    });
  }

  /** Delete a stage instance */
  async deleteStageInstance(channelID: BigString): Promise<void> {
    return await this.delete(STAGE_INSTANCE(channelID));
  }

  /** Delete a webhook */
  async deleteWebhook(webhookID: BigString, token?: string, reason?: string): Promise<void> {
    return await this.delete(token ? WEBHOOK_TOKEN(webhookID, token) : WEBHOOK(webhookID), {
      reason,
    });
  }

  /** Delete a webhook message */
  async deleteWebhookMessage(webhookID: BigString, token: string, messageID: BigString): Promise<void> {
    return await this.delete(WEBHOOK_MESSAGE(webhookID, token, messageID));
  }

  /** Edit a channel's properties */
  async editChannel(channelID: BigString, options: EditChannelOptions, reason?: string) {
    return await this.patch(CHANNEL(channelID), {
      reason,
      body: {
        archived: options.archived,
        auto_archive_duration: options.autoArchiveDuration,
        bitrate: options.bitrate,
        default_auto_archive_duration: options.defaultAutoArchiveDuration,
        icon: options.icon,
        invitable: options.invitable,
        locked: options.locked,
        name: options.name,
        nsfw: options.nsfw,
        owner_id: options.ownerID,
        parent_id: options.parentID,
        position: options.position,
        rate_limit_per_user: options.rateLimitPerUser,
        rtc_region: options.rtcRegion,
        topic: options.topic,
        user_limit: options.userLimit,
        video_quality_mode: options.videoQualityMode,
        permission_overwrites: options.permissionOverwrites,
      },
    }).then((channel) => Channel.from(channel, this));
  }

  /** Create a channel permission overwrite */
  async editChannelPermission(
    channelID: BigString,
    overwriteID: BigString,
    allow: bigint | number,
    deny: bigint | number,
    type: OverwriteTypes,
    reason?: string,
  ): Promise<void> {
    return await this.put(CHANNEL_PERMISSION(channelID, overwriteID), {
      body: {
        allow: allow.toString(),
        deny: deny.toString(),
        type,
      },
      reason,
    });
  }

  /**
   * Edit a guild channel's position. Note that channel position numbers are grouped by type (category, text, voice), then sorted in ascending order (lowest number is on top).
   */
  async editChannelPosition(
    channelID: BigString,
    position: number,
    options: EditChannelPositionOptions = {},
  ): Promise<void> {
    const guild = this.guilds.find((g) => g.channels.has(channelID));
    const channels = guild?.channels;
    if (!channels) {
      return Promise.reject(new Error(`Channel ${channelID} not found`));
    }

    const channel = channels.get(channelID);
    if (!channel) {
      return Promise.reject(new Error(`Channel ${channelID} not found`));
    }
    if (channel.position === position) {
      return Promise.resolve();
    }
    const min = Math.min(position, channel.position);
    const max = Math.max(position, channel.position);

    const positions = channels.filter((chan) => {
      return chan.type === channel.type &&
        min <= chan.position &&
        chan.position <= max &&
        chan.id !== channelID;
    }).sort((a, b) => a.position - b.position);

    if (position > channel.position) {
      positions.push(channel);
    } else {
      positions.unshift(channel);
    }

    return this.patch(
      GUILD_CHANNELS(guild.id),
      {
        body: channels.array().map((channel, index) => ({
          id: channel.id,
          position: index + min,
          lock_permissions: options.lockPermissions,
          parent_id: options.parentID,
        })),
      },
    );
  }

  /**
   * Edit multiple guild channels' positions. Note that channel position numbers are grouped by type (category, text, voice), then sorted in ascending order (lowest number is on top).
   */
  async editChannelPositions(guildID: BigString, channelPositions: ChannelPosition[]): Promise<void> {
    return this.patch(
      GUILD_CHANNELS(guildID),
      {
        body: channelPositions.map((channelPosition) => {
          return {
            id: channelPosition.id,
            position: channelPosition.position,
            lock_permissions: channelPosition.lockPermissions,
            parent_id: channelPosition.parentID,
          };
        }),
      },
    );
  }

  /** Edit a global application command */
  async editCommand(commandID: BigString, command: ApplicationCommandStructure) {
    if (command.name !== undefined) {
      if (command.type === 1 || command.type === undefined) {
        command.name = command.name.toLowerCase();
        if (!command.name.match(/^[\w-]{1,32}$/)) {
          throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"');
        }
      }
    }
    // @ts-ignore some eris magic at play here
    command.default_permission = command.defaultPermission;
    return await this.patch(COMMAND(this.applicationId, commandID), { body: command });
  }

  /** Edits command permissions for a specific command in a guild. */
  async editCommandPermissions(
    guildID: BigString,
    commandID: BigString,
    permissions: ApplicationCommandPermissions[],
  ): Promise<GuildApplicationCommandPermissions> {
    return this.put(COMMAND_PERMISSIONS(this.applicationId, guildID, commandID), {
      body: permissions,
    });
  }

  /** Edit a guild */
  async editGuild(guildID: BigString, options: GuildOptions, reason?: string): Promise<Guild> {
    return await this.patch(GUILD(guildID), {
      body: {
        name: options.name,
        icon: options.icon,
        verification_level: options.verificationLevel,
        default_message_notifications: options.defaultNotifications,
        explicit_content_filter: options.explicitContentFilter,
        system_channel_id: options.systemChannelID,
        system_channel_flags: options.systemChannelFlags,
        rules_channel_id: options.rulesChannelID,
        public_updates_channel_id: options.publicUpdatesChannelID,
        preferred_locale: options.preferredLocale,
        afk_channel_id: options.afkChannelID,
        afk_timeout: options.afkTimeout,
        owner_id: options.ownerID,
        splash: options.splash,
        banner: options.banner,
        description: options.description,
        discovery_splash: options.discoverySplash,
        features: options.features,
      },
      reason,
    }).then((guild) => new Guild(guild, this));
  }

  /** Edit a guild application command */
  async editGuildCommand(
    guildID: BigString,
    commandID: BigString,
    command: ApplicationCommandStructure,
  ): Promise<ApplicationCommand> {
    if (command.name !== undefined) {
      if (command.type === 1 || command.type === undefined) {
        command.name = command.name.toLowerCase();
        if (!command.name.match(/^[\w-]{1,32}$/)) {
          throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"');
        }
      }
    }
    // @ts-ignore some eris magic at play here
    command.default_permission = command.defaultPermission;

    return await this.patch(GUILD_COMMAND(this.applicationId, guildID, commandID), {
      body: command,
    });
  }

  /** Edit a guild's discovery data */
  async editGuildDiscovery(guildID: BigString, options: DiscoveryOptions = {}): Promise<DiscoveryMetadata> {
    return await this.patch(GUILD_DISCOVERY(guildID), {
      body: {
        primary_category_id: options.primaryCategoryID,
        keywords: options.keywords,
        emoji_discoverability_enabled: options.emojiDiscoverabilityEnabled,
      },
      reason: options.reason,
    });
  }

  /** Edit a guild emoji object */
  async editGuildEmoji(
    guildID: BigString,
    emojiID: BigString,
    options: { name?: string; roles?: string[] },
    reason?: string,
  ): Promise<Emoji> {
    return await this.patch(GUILD_EMOJI(guildID, emojiID), {
      body: options,
      reason,
    });
  }

  /** Edit a guild integration */
  async editGuildIntegration(guildID: BigString, integrationID: BigString, options: IntegrationOptions): Promise<void> {
    return await this.patch(GUILD_INTEGRATION(guildID, integrationID), {
      body: {
        expire_behavior: options.expireBehavior,
        expire_grace_period: options.expireGracePeriod,
        enable_emoticons: options.enableEmoticons,
      },
    });
  }

  /** Edit a guild member */
  async editGuildMember(
    guildID: BigString,
    memberID: BigString,
    options: MemberOptions,
    reason?: string,
  ): Promise<Member> {
    return await this.patch(GUILD_MEMBER(guildID, memberID), {
      body: {
        roles: options.roles?.filter((roleID, index) => options.roles!.indexOf(roleID) === index),
        nick: options.nick,
        mute: options.mute,
        deaf: options.deaf,
        channel_id: options.channelID,
        communication_disabled_until: options.communicationDisabledUntil,
      },
      reason,
    })
      // @ts-ignore some eris magic at play here
      .then((member) => new Member(member, this.guilds.get(guildID), this));
  }

  /** Edit a guild sticker */
  async editGuildSticker(
    guildID: BigString,
    stickerID: BigString,
    options?: EditStickerOptions,
    reason?: string,
  ): Promise<Sticker> {
    return await this.patch(GUILD_STICKER(guildID, stickerID), {
      body: { ...options },
      reason,
    });
  }

  /** Edit a guild template */
  async editGuildTemplate(guildID: BigString, code: string, options: GuildTemplateOptions): Promise<GuildTemplate> {
    return await this.patch(GUILD_TEMPLATE_GUILD(guildID, code), { body: { ...options } }).then((template) =>
      new GuildTemplate(template, this)
    );
  }

  /** Modify a guild's vanity code */
  async editGuildVanity(guildID: BigString, code: string | null) {
    return await this.patch(GUILD_VANITY_URL(guildID), {
      body: code,
    });
  }

  /** Update a user's voice state - See [caveats](https://discord.com/developers/docs/resources/guild#modify-user-voice-state-caveats) */
  async editGuildVoiceState(guildID: BigString, options: VoiceStateOptions, userID: BigString = "@me"): Promise<void> {
    return await this.patch(GUILD_VOICE_STATE(guildID, userID), {
      body: {
        channel_id: options.channelID,
        request_to_speak_timestamp: options.requestToSpeakTimestamp,
        suppress: options.suppress,
      },
    });
  }

  /** Edit a guild welcome screen */
  async editGuildWelcomeScreen(guildID: BigString, options: WelcomeScreenOptions): Promise<WelcomeScreen> {
    return await this.patch(GUILD_WELCOME_SCREEN(guildID), {
      body: {
        description: options.description,
        enabled: options.enabled,
        welcome_channels: options.welcomeChannels.map((c) => {
          return {
            channel_id: c.channelID,
            description: c.description,
            emoji_id: c.emojiID,
            emoji_name: c.emojiName,
          };
        }),
      },
    });
  }

  /** Modify a guild's widget */
  async editGuildWidget(guildID: BigString, options: Widget): Promise<Widget> {
    return await this.patch(GUILD_WIDGET(guildID), { body: { ...options } });
  }

  /** Edit a message */
  async editMessage(channelID: BigString, messageID: BigString, content: MessageContentEdit): Promise<Message> {
    if (content !== undefined) {
      if (typeof content !== "object" || content === null) {
        content = {
          content: "" + content,
        };
      } else if (content.content !== undefined && typeof content.content !== "string") {
        content.content = "" + content.content;
      } else if (content.embed) {
        if (!content.embeds) {
          content.embeds = [];
        }
        content.embeds.push(content.embed);
      }
    }

    return await this.patch(CHANNEL_MESSAGE(channelID, messageID), {
      body: {
        ...content,
        allowed_mentions: this._formatAllowedMentions(content.allowedMentions),
      },
      file: content.file,
    })
      .then((message) => new Message(message, this));
  }

  /** Edit a guild role */
  async editRole(guildID: BigString, roleID: BigString, options: RoleOptions, reason?: string): Promise<Role> {
    // @ts-ignore some eris magic at play here
    options.unicode_emoji = options.unicodeEmoji;

    if (options.permissions !== undefined) {
      options.permissions = options.permissions instanceof Permission
        ? String(options.permissions.allow)
        : String(options.permissions);
    }
    return await this.patch(GUILD_ROLE(guildID, roleID), {
      body: { ...options },
      reason,
    })
      // @ts-ignore some eris magic at play here
      .then((role) => new Role(role, this.guilds.get(guildID)));
  }

  /** Edit a guild role's position. Note that role position numbers are highest on top and lowest at the bottom. */
  async editRolePosition(guildID: BigString, roleID: BigString, position: number): Promise<void> {
    if (guildID === roleID) {
      return Promise.reject(new Error("Cannot move default role"));
    }
    // @ts-ignore some eris magic at play here
    let roles = this.guilds.get(guildID).roles;
    const role = roles.get(roleID);
    if (!role) {
      return Promise.reject(new Error(`Role ${roleID} not found`));
    }
    if (role.position === position) {
      return Promise.resolve();
    }
    const min = Math.min(position, role.position);
    const max = Math.max(position, role.position);
    const positions = roles.array().filter((role) => min <= role.position && role.position <= max && role.id !== roleID)
      .sort((a, b) => a.position - b.position);
    if (position > role.position) {
      positions.push(role);
    } else {
      positions.unshift(role);
    }
    return await this.patch(
      GUILD_ROLES(guildID),
      {
        body: positions.map((role, index) => ({
          id: role.id,
          position: index + min,
        })),
      },
    );
  }

  /** Edit properties of the bot user */
  async editSelf(options: { avatar?: string; username?: string }): Promise<ExtendedUser> {
    return await this.patch(USER("@me"), { body: { ...options } }).then((data) => new ExtendedUser(data, this));
  }

  /** Update a stage instance */
  async editStageInstance(channelID: BigString, options: StageInstanceOptions): Promise<StageInstance> {
    return await this.patch(STAGE_INSTANCE(channelID), { body: { ...options } }).then((instance) =>
      new StageInstance(instance, this)
    );
  }

  /** Edit a webhook */
  async editWebhook(webhookID: BigString, options: WebhookOptions, token: string, reason?: string) {
    return await this.patch(token ? WEBHOOK_TOKEN(webhookID, token) : WEBHOOK(webhookID), {
      body: {
        name: options.name,
        avatar: options.avatar,
        channel_id: options.channelID,
      },
      reason,
    });
  }

  /** Edit a webhook message */
  async editWebhookMessage(
    webhookID: BigString,
    token: string,
    messageID: BigString,
    options: MessageWebhookContent,
  ): Promise<Message> {
    const { file, allowedMentions, ...body } = options;

    return await this.patch(
      WEBHOOK_MESSAGE(webhookID, token, messageID),
      {
        body: { ...body, allowed_mentions: this._formatAllowedMentions(allowedMentions) },
        file,
      },
    ).then((response) => new Message(response, this));
  }

  /** Execute a slack-style webhook */
  async executeSlackWebhook(
    webhookID: string,
    token: string,
    options: Record<string, unknown> & { auth?: boolean; threadID?: string },
  ): Promise<void>;
  async executeSlackWebhook(
    webhookID: BigString,
    token: string,
    options: Record<string, unknown> & { auth?: boolean; threadID?: string; wait: true },
  ): Promise<Message>;
  async executeSlackWebhook(
    webhookID: BigString,
    token: string,
    options: Record<string, unknown> & { auth?: boolean; threadID?: string; wait?: true },
  ): Promise<unknown> {
    let { wait, threadID, ...rest } = options;
    let qs = "";
    if (wait) {
      qs += "&wait=true";
    }
    if (threadID) {
      qs += "&thread_id=" + threadID;
    }
    return await this.post(
      WEBHOOK_TOKEN_SLACK(webhookID, token) + (qs ? "?" + qs : ""),
      { body: { ...rest } },
    );
  }

  /** Execute a webhook */
  async executeWebhook(
    webhookID: string,
    token: string,
    options: WebhookPayload & { wait: true },
  ): Promise<Message>;
  async executeWebhook(webhookID: string, token: string, options: WebhookPayload): Promise<void>;
  async executeWebhook(
    webhookID: BigString,
    token: string,
    options: WebhookPayload & { wait?: true },
  ): Promise<unknown> {
    let qs = "";
    if (options.wait) {
      qs += "&wait=true";
    }
    if (options.threadID) {
      qs += "&thread_id=" + options.threadID;
    }
    if (options.embed) {
      if (!options.embeds) {
        options.embeds = [];
      }
      options.embeds.push(options.embed);
    }

    return await this.post(WEBHOOK_TOKEN(webhookID, token) + (qs ? "?" + qs : ""), {
      body: {
        content: options.content,
        embeds: options.embeds,
        username: options.username,
        avatar_url: options.avatarURL,
        tts: options.tts,
        flags: options.flags,
        allowed_mentions: this._formatAllowedMentions(options.allowedMentions),
        components: options.components,
      },
      file: options.file,
    }).then((response) => options.wait ? new Message(response, this) : undefined);
  }

  /** Follow a NewsChannel in another channel. This creates a webhook in the target channel */
  async followChannel(channelID: BigString, webhookChannelID: BigString): Promise<ChannelFollow> {
    return await this.post(CHANNEL_FOLLOW(channelID), {
      body: { webhook_channel_id: webhookChannelID },
    });
  }

  /** Get all active threads in a guild */
  async getActiveGuildThreads(guildID: BigString): Promise<ListedGuildThreads> {
    return await this.get(THREADS_GUILD_ACTIVE(guildID)).then((response) => {
      return {
        members: response.members.map((member: DiscordThreadMember) => new ThreadMember(member, this)),
        threads: response.threads.map((thread: DiscordChannel) => Channel.from(thread, this)),
      };
    });
  }

  /** Get all archived threads in a channel */
  async getArchivedThreads(
    channelID: string,
    type: "private",
    options?: GetArchivedThreadsOptions,
  ): Promise<ListedChannelThreads<PrivateThreadChannel>>;
  async getArchivedThreads(
    channelID: string,
    type: "public",
    options?: GetArchivedThreadsOptions,
  ): Promise<ListedChannelThreads<PublicThreadChannel>>;
  async getArchivedThreads(
    channelID: BigString,
    type: "private" | "public",
    options: GetArchivedThreadsOptions = {},
  ): Promise<unknown> {
    let qs = "";
    if (options.limit) {
      qs += `&limit=${options.limit}`;
    }
    if (options.before) {
      qs += `&before=${options.before.toISOString()}`;
    }

    return await this.get(THREADS_ARCHIVED(channelID, type) + (qs ? "?" + qs : "")).then((response) => {
      return {
        hasMore: response.has_more,
        members: response.members.map((member: DiscordThreadMember) => new ThreadMember(member, this)),
        threads: response.threads.map((thread: DiscordChannel) => Channel.from(thread, this)),
      };
    });
  }

  /** Get general and bot-specific info on connecting to the Discord gateway (e.g. connection ratelimit) */
  async getBotGateway(): Promise<DiscordGetGatewayBot> {
    return await this.get(GATEWAY_BOT);
  }

  /** Get a Channel object from a channel ID */
  getChannel(channelID: BigString): AnyChannel {
    const id = channelID.toString();

    const guildID = this._channelGuildMap.get(channelID) ?? this._threadGuildMap.get(channelID);

    if (guildID) {
      const guild = this.guilds.get(guildID);
      if (guild) return guild.channels.get(channelID)!;
    }

    return this.privateChannels.get(id)!;
  }

  /** Get all invites in a channel */
  async getChannelInvites(channelID: BigString): Promise<Invite[]> {
    return await this.get(CHANNEL_INVITES(channelID)).then((invites) =>
      invites.map((invite: DiscordInvite) => new Invite(invite, this))
    );
  }

  /** Get all the webhooks in a channel */
  async getChannelWebhooks(channelID: BigString): Promise<Webhook[]> {
    return await this.get(CHANNEL_WEBHOOKS(channelID));
  }

  /** Get a global application command */
  async getCommand(commandID: BigString): Promise<ApplicationCommand> {
    return await this.get(COMMAND(this.applicationId, commandID));
  }

  /** Get the a guild's application command permissions */
  async getCommandPermissions(guildID: BigString, commandID: BigString): Promise<GuildApplicationCommandPermissions> {
    return await this.get(COMMAND_PERMISSIONS(this.applicationId, guildID, commandID));
  }

  /** Get the global application commands */
  async getCommands(): Promise<ApplicationCommand[]> {
    return await this.get(COMMANDS(this.applicationId));
  }

  /** Get a list of discovery categories */
  async getDiscoveryCategories(): Promise<DiscoveryCategory[]> {
    return await this.get(DISCOVERY_CATEGORIES);
  }

  /** Get a DM channel with a user, or create one if it does not exist */
  async getDMChannel(userID: BigString): Promise<PrivateChannel> {
    if (this._privateChannelMap.has(userID)) {
      return Promise.resolve(this.privateChannels.get(this._privateChannelMap.get(userID)!)!);
    }
    return await this.post(USER_CHANNELS("@me"), {
      body: {
        recipients: [userID],
        type: 1,
      },
    }).then((privateChannel) => new PrivateChannel(privateChannel, this));
  }

  /** Get a guild from the guild's emoji ID */
  async getEmojiGuild(emojiID: BigString): Promise<Guild> {
    return await this.get(CUSTOM_EMOJI_GUILD(emojiID)).then((result) => new Guild(result, this));
  }

  /** Get info on connecting to the Discord gateway */
  async getGateway(): Promise<{ url: string }> {
    return await this.get(GATEWAY);
  }

  /** Get the audit log for a guild */
  async getGuildAuditLog(guildID: BigString, options: GetGuildAuditLogOptions = {}): Promise<GuildAuditLog> {
    let qs = "";
    if (options.actionType) {
      qs += `&action_type=${options.actionType}`;
    }
    if (options.userID) {
      qs += `&user_id=${options.userID}`;
    }
    if (options.before) {
      qs += `&before=${options.before}`;
    }
    if (options.limit) {
      qs += `&limit=${options.limit}`;
    }

    return await this.get(GUILD_AUDIT_LOGS(guildID) + (qs ? "?" + qs : "")).then((data) => {
      const guild = this.guilds.get(guildID);
      const users = data.users.map((u) => {
        const user = new User(u, this);
        this.users.set(user.id, user);
        return user;
      });

      const threads = data.threads.map((thread: DiscordChannel) => {
        const channel = Channel.from(thread, this);
        guild?.threads.set(channel.id, channel);
        return channel;
      });

      return {
        entries: data.audit_log_entries.map((entry: DiscordAuditLogEntry) => new GuildAuditLogEntry(entry, guild)),
        integrations: data.integrations.map((integration: DiscordIntegration) =>
          new GuildIntegration(integration, guild)
        ),
        threads: threads,
        users: users,
        webhooks: data.webhooks,
      };
    });
  }

  /** Get a ban from the ban list of guild */
  async getGuildBan(guildID: BigString, userID: BigString): Promise<GuildBan> {
    return await this.get(GUILD_BAN(guildID, userID)).then((ban) => {
      ban.user = new User(ban.user, this);
      return ban;
    });
  }

  /** Get the ban list of a guild */
  async getGuildBans(guildID: BigString, options: GetGuildBansOptions = {}): Promise<GuildBan[]> {
    let qs = "";
    if (options.after) {
      qs += `&after=${options.after}`;
    }
    if (options.before) {
      qs += `&before=${options.before}`;
    }
    if (options.limit) {
      qs += `&limit=${options.limit && Math.min(options.limit, 1000)}`;
    }

    const bans = await this.get(GUILD_BANS(guildID) + (qs ? "?" + qs : ""));

    for (const ban of bans) {
      const user = new User(ban.user, this);
      this.users.set(user.id, user);
      ban.user = user;
    }

    if (options.limit && options.limit > 1000 && bans.length >= 1000) {
      const page = await this.getGuildBans(guildID, {
        after: options.before ? undefined : bans[bans.length - 1].user.id,
        before: options.before ? bans[0].user.id : undefined,
        limit: options.limit - bans.length,
      });

      if (options.before) {
        bans.unshift(...page);
      } else {
        bans.push(...page);
      }
    }

    return bans;
  }

  /** Get a guild application command */
  async getGuildCommand(guildID: BigString, commandID: BigString): Promise<ApplicationCommand> {
    return await this.get(GUILD_COMMAND(this.applicationId, guildID, commandID));
  }

  /** Get the all of a guild's application command permissions */
  async getGuildCommandPermissions(guildID: BigString): Promise<GuildApplicationCommandPermissions[]> {
    return await this.get(GUILD_COMMAND_PERMISSIONS(this.applicationId, guildID));
  }

  /** Get a guild's application commands */
  async getGuildCommands(guildID: BigString): Promise<ApplicationCommand> {
    return await this.get(GUILD_COMMANDS(this.applicationId, guildID));
  }

  /** Get a guild's discovery object */
  async getGuildDiscovery(guildID: BigString): Promise<DiscoveryMetadata> {
    return await this.get(GUILD_DISCOVERY(guildID));
  }

  /** Get a list of integrations for a guild */
  async getGuildIntegrations(guildID: BigString): Promise<GuildIntegration[]> {
    const guild = this.guilds.get(guildID);
    return await this.get(GUILD_INTEGRATIONS(guildID)).then((integrations) =>
      integrations.map((integration: DiscordIntegration) => new GuildIntegration(integration, guild))
    );
  }

  /** Get all invites in a guild */
  async getGuildInvites(guildID: BigString): Promise<Invite[]> {
    return await this.get(GUILD_INVITES(guildID)).then((invites) =>
      invites.map((invite: DiscordInvite) => new Invite(invite, this))
    );
  }

  /** Get a guild preview for a guild. Only available for community guilds. */
  async getGuildPreview(guildID: BigString): Promise<GuildPreview> {
    return await this.get(GUILD_PREVIEW(guildID)).then((data) => new GuildPreview(data, this));
  }

  /** Get a guild template */
  async getGuildTemplate(code: string): Promise<GuildTemplate> {
    return await this.get(GUILD_TEMPLATE(code)).then((template) => new GuildTemplate(template, this));
  }

  /** Get a guild's templates */
  async getGuildTemplates(guildID: BigString): Promise<GuildTemplate[]> {
    return await this.get(GUILD_TEMPLATES(guildID)).then((templates) =>
      templates.map((t: DiscordTemplate) => new GuildTemplate(t, this))
    );
  }

  /** Returns the vanity url of the guild */
  async getGuildVanity(guildID: BigString): Promise<GuildVanity> {
    return await this.get(GUILD_VANITY_URL(guildID));
  }

  /** Get all the webhooks in a guild */
  async getGuildWebhooks(guildID: BigString): Promise<Webhook> {
    return await this.get(GUILD_WEBHOOKS(guildID));
  }

  /** Get the welcome screen of a Community guild, shown to new members */
  async getGuildWelcomeScreen(guildID: BigString): Promise<WelcomeScreen> {
    return await this.get(GUILD_WELCOME_SCREEN(guildID));
  }

  /** Get a guild's widget object */
  async getGuildWidget(guildID: BigString): Promise<WidgetData> {
    return await this.get(GUILD_WIDGET(guildID));
  }

  /** Get a guild's widget settings object. Requires MANAGE_GUILD permission */
  async getGuildWidgetSettings(guildID: BigString): Promise<Widget> {
    return await this.get(GUILD_WIDGET_SETTINGS(guildID));
  }

  /** Get info on an invite */
  async getInvite(inviteID: string, withCounts?: boolean): Promise<Invite> {
    let qs = "";
    if (withCounts) {
      qs += "&with_counts=true";
    }

    return await this.get(INVITE(inviteID) + (qs ? "?" + qs : "")).then((invite) => new Invite(invite, this));
  }

  /** Get joined private archived threads in a channel */
  async getJoinedPrivateArchivedThreads(
    channelID: BigString,
    options: GetArchivedThreadsOptions = {},
  ): Promise<ListedChannelThreads<PrivateThreadChannel>> {
    let qs = "";
    if (options.before) {
      qs += `&before=${options.before.toISOString()}`;
    }

    if (options.limit) {
      qs += `&limit=${options.limit}`;
    }

    return await this.get(THREADS_ARCHIVED_JOINED(channelID) + (qs ? "?" + qs : "")).then((response) => {
      return {
        hasMore: response.has_more,
        members: response.members.map((member: DiscordThreadMember) => new ThreadMember(member, this)),
        threads: response.threads.map((thread: DiscordChannel) => Channel.from(thread, this)),
      };
    });
  }

  /** Get a previous message in a channel */
  async getMessage(channelID: BigString, messageID: BigString): Promise<Message> {
    return await this.get(CHANNEL_MESSAGE(channelID, messageID)).then((message) => new Message(message, this));
  }

  /** Get a list of users who reacted with a specific reaction */
  async getMessageReaction(
    channelID: BigString,
    messageID: BigString,
    reaction: string,
    options: GetMessageReactionOptions = {},
  ): Promise<User[]> {
    if (reaction === decodeURI(reaction)) {
      reaction = encodeURIComponent(reaction);
    }
    if (!options || typeof options !== "object") {
      options = {
        limit: options,
      };
    }

    let qs = "";
    if (options.limit) {
      qs += `&limit=${options.limit}`;
    }
    if (options.after) {
      qs += `&after=${options.after}`;
    }

    return await this.get(CHANNEL_MESSAGE_REACTION(channelID, messageID, reaction) + (qs ? "?" + qs : ""))
      .then((users) => users.map((user: DiscordUser) => new User(user, this)));
  }

  /** Get previous messages in a channel */
  async getMessages(channelID: BigString, options: GetMessagesOptions = {}): Promise<Message[]> {
    if (!options || typeof options !== "object") {
      options = {
        limit: options,
      };
    }
    if (options.limit === undefined) { // Legacy behavior
      options.limit = 50;
    }

    let limit = options.limit;
    if (limit && limit > 100) {
      let logs: Message[] = [];
      const get: (_before?: BigString, _after?: BigString) => Promise<Message[]> = async (_before?: BigString, _after?: BigString) => {
        let qs = "";
        qs += `&limit=${100}`;
        if (_before) qs += `&before=${_before}`;
        if (_after) qs += `&after=${_after}`;

        const messages = await this.get(CHANNEL_MESSAGES(channelID) + (qs ? "?" + qs : ""));
        if (limit <= messages.length) {
          return (_after
            ? messages.slice(messages.length - limit, messages.length).map((message: DiscordMessage) =>
              new Message(message, this)
            )
              .concat(logs)
            : logs.concat(messages.slice(0, limit).map((message: DiscordMessage) => new Message(message, this))));
        }

        limit -= messages.length;
        logs = _after
          ? messages.map((message: DiscordMessage) => new Message(message, this)).concat(logs)
          : logs.concat(messages.map((message: DiscordMessage) => new Message(message, this)));
        if (messages.length < 100) {
          return logs;
        }

        this.emit(
          "debug",
          `Getting ${limit} more messages during getMessages for ${channelID}: ${_before} ${_after}`,
          -1,
        );

        return get((_before || !_after) && messages[messages.length - 1].id, _after && messages[0].id);
      };
      return get(options.before, options.after);
    }

    const messages = await this.get(CHANNEL_MESSAGES(channelID));
    return messages.map((message: DiscordMessage) => {
      try {
        return new Message(message, this);
      } catch (err) {
        this.emit("error", `Error creating message from channel messages\n${err.stack}\n${JSON.stringify(messages)}`);
        return null;
      }
    });
  }

  /** Get the list of sticker packs available to Nitro subscribers */
  async getNitroStickerPacks(): Promise<{ sticker_packs: StickerPack[] }> {
    return await this.get(STICKER_PACKS);
  }

  /** Get data on an OAuth2 application */
  async getOAuthApplication(appID: BigString): Promise<OAuthApplicationInfo> {
    return await this.get(OAUTH2_APPLICATION(appID || "@me"));
  }

  /** Get all the pins in a channel */
  async getPins(channelID: BigString): Promise<Message[]> {
    return await this.get(CHANNEL_PINS(channelID)).then((messages) =>
      messages.map((message: DiscordMessage) => new Message(message, this))
    );
  }

  /** Get the prune count for a guild */
  async getPruneCount(guildID: BigString, options: GetPruneOptions = {}): Promise<number> {
    let qs = "";
    if (options.days) {
      qs += `&days=${options.days}`;
    }
    // TODO: how to put array in query string
    if (options.includeRoles) {
      qs += `&include_roles=${options.includeRoles}`;
    }

    return await this.get(GUILD_PRUNE(guildID) + (qs ? "?" + qs : "")).then((data) => data.pruned);
  }

  /** Get a channel's data via the REST API. */
  async getRESTChannel(channelID: BigString): Promise<AnyChannel> {
    return await this.get(CHANNEL(channelID))
      .then((channel: DiscordChannel) => Channel.from(channel, this));
  }

  /** Get a guild's data via the REST API. */
  async getRESTGuild(guildID: BigString, withCounts = false): Promise<Guild> {
    let qs = "";
    if (withCounts) {
      qs += `&with_conts=${withCounts}`;
    }

    return await this.get(GUILD(guildID) + (qs ? "?" + qs : "")).then((guild) => new Guild(guild, this));
  }

  /** Get a guild's channels via the REST API. */
  async getRESTGuildChannels(guildID: BigString): Promise<AnyGuildChannel[]> {
    return await this.get(GUILD_CHANNELS(guildID))
      .then((channels) => channels.map((channel: DiscordChannel) => Channel.from(channel, this)));
  }

  /** Get a guild emoji via the REST API. */
  async getRESTGuildEmoji(guildID: BigString, emojiID: BigString): Promise<Emoji> {
    return await this.get(GUILD_EMOJI(guildID, emojiID));
  }

  /** Get a guild's emojis via the REST API. */
  async getRESTGuildEmojis(guildID: BigString): Promise<Emoji[]> {
    return await this.get(GUILD_EMOJIS(guildID));
  }

  /** Get a guild's members via the REST API. */
  async getRESTGuildMember(guildID: BigString, memberID: BigString): Promise<Member> {
    return await this.get(GUILD_MEMBER(guildID, memberID)).then((member: DiscordMember) =>
      new Member(member, this.guilds.get(guildID), this)
    );
  }

  /** Get a guild's members via the REST API. */
  async getRESTGuildMembers(guildID: BigString, options: GetRESTGuildMembersOptions = {}): Promise<Member[]> {
    if (!options || typeof options !== "object") {
      options = {
        limit: options,
      };
    }
    let qs = "";

    if (options.limit) {
      qs += `&limit=${options.limit}`;
    }
    if (options.after) {
      qs += `&after=${options.after}`;
    }

    return await this.get(GUILD_MEMBERS(guildID) + (qs ? "?" + qs : "")).then((members) =>
      members.map((member: DiscordMember) => new Member(member, this.guilds.get(guildID), this))
    );
  }

  /** Get a guild's roles via the REST API. */
  async getRESTGuildRoles(guildID: BigString): Promise<Role[]> {
    return await this.get(GUILD_ROLES(guildID)).then((roles) => roles.map((role: DiscordRole) => new Role(role)));
  }

  /** Get a list of the user's guilds via the REST API. */
  async getRESTGuilds(options: GetRESTGuildsOptions = {}) {
    if (!options || typeof options !== "object") {
      options = {
        limit: options,
      };
    }
    let qs = "";
    if (options.after) {
      qs += `&after=${options.after}`;
    }
    if (options.before) {
      qs += `&before=${options.before}`;
    }
    if (options.limit) {
      qs += `&limit=${options.limit}`;
    }

    return await this.get(USER_GUILDS("@me") + (qs ? "?" + qs : "")).then((guilds) =>
      guilds.map((guild: DiscordGuild) => new Guild(guild, this))
    );
  }

  /** Get a guild sticker via the REST API. */
  async getRESTGuildSticker(guildID: BigString, stickerID: BigString): Promise<Sticker> {
    return await this.get(GUILD_STICKER(guildID, stickerID));
  }

  /** Get a guild's stickers via the REST API. */
  async getRESTGuildStickers(guildID: BigString): Promise<Sticker[]> {
    return await this.get(GUILD_STICKERS(guildID));
  }

  /** Get a sticker via the REST API. */
  async getRESTSticker(stickerID: BigString): Promise<Sticker> {
    return await this.get(STICKER(stickerID));
  }

  /** Get a user's data via the REST API. */
  async getRESTUser(userID: BigString): Promise<User> {
    return await this.get(USER(userID)).then((user) => new User(user, this));
  }

  /** Get properties of the bot user */
  async getSelf(): Promise<ExtendedUser> {
    return await this.get(USER("@me")).then((data) => new ExtendedUser(data, this));
  }

  /** Get the stage instance associated with a stage channel */
  async getStageInstance(channelID: BigString): Promise<StageInstance> {
    return await this.get(STAGE_INSTANCE(channelID)).then((instance) => new StageInstance(instance, this));
  }

  /** Get a list of members that are part of a thread channel */
  async getThreadMembers(channelID: BigString): Promise<ThreadMember[]> {
    return await this.get(THREAD_MEMBERS(channelID)).then((members) =>
      members.map((member: DiscordThreadMember) => new ThreadMember(member, this))
    );
  }

  /** Get a list of general/guild-specific voice regions */
  async getVoiceRegions(guildID: BigString): Promise<VoiceRegion[]> {
    return guildID ? await this.get(GUILD_VOICE_REGIONS(guildID)) : await this.get(VOICE_REGIONS);
  }

  /** Get a webhook */
  async getWebhook(webhookID: BigString, token: string): Promise<Webhook> {
    return await this.get(token ? WEBHOOK_TOKEN(webhookID, token) : WEBHOOK(webhookID));
  }

  /** Get a webhook message */
  async getWebhookMessage(webhookID: BigString, token: string, messageID: BigString): Promise<Message> {
    return await this.get(WEBHOOK_MESSAGE(webhookID, token, messageID)).then((message) => new Message(message, this));
  }

  /** Join a thread */
  async joinThread(channelID: BigString, userID: BigString = "@me"): Promise<void> {
    return this.put(THREAD_MEMBER(channelID, userID));
  }

  /** Kick a user from a guild */
  async kickGuildMember(guildID: BigString, userID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_MEMBER(guildID, userID), {
      reason,
    });
  }

  /** Leave a guild */
  async leaveGuild(guildID: BigString): Promise<void> {
    return await this.delete(USER_GUILD("@me", guildID));
  }

  /** Leave a thread */
  async leaveThread(channelID: BigString, userID: BigString = "@me"): Promise<void> {
    return await this.delete(THREAD_MEMBER(channelID, userID));
  }

  /** Pin a message */
  async pinMessage(channelID: BigString, messageID: BigString): Promise<void> {
    return await this.put(CHANNEL_PIN(channelID, messageID));
  }

  /** Begin pruning a guild */
  async pruneMembers(guildID: BigString, options: PruneMemberOptions = {}): Promise<number> {
    return await this.post(GUILD_PRUNE(guildID), {
      body: {
        days: options.days,
        compute_prune_count: options.computePruneCount,
        include_roles: options.includeRoles,
      },
      reason: options.reason,
    }).then((data) => data.pruned);
  }

  /** Purge previous messages in a channel with an optional filter (bot accounts only) */
  async purgeChannel(channelID: BigString, options: PurgeChannelOptions): Promise<number> {
    let limit = options.limit;
    if (limit !== -1 && limit <= 0) {
      return 0;
    }
    const toDelete: BigString[] = [];
    let deleted = 0;
    let done = false;
    const checkToDelete: () => Promise<number> = async () => {
      const messageIDs = (done && toDelete) || (toDelete.length >= 100 && toDelete.splice(0, 100));
      if (messageIDs) {
        deleted += messageIDs.length;
        await this.deleteMessages(channelID, messageIDs, options.reason);
        if (done) {
          return deleted;
        }
        await delay(1000);
        return checkToDelete();
      } else if (done) {
        return deleted;
      } else {
        await delay(250);
        return checkToDelete();
      }
    };
    const del = async (_before?: BigString, _after?: BigString) => {
      const messages = await this.getMessages(channelID, {
        limit: 100,
        before: _before?.toString(),
        after: _after?.toString(),
      });
      if (limit !== -1 && limit <= 0) {
        done = true;
        return;
      }
      for (const message of messages) {
        if (limit !== -1 && limit <= 0) {
          break;
        }
        if (message.timestamp < Date.now() - 1209600000) { // 14d * 24h * 60m * 60s * 1000ms
          done = true;
          return;
        }
        if (!options.filter || options.filter(message)) {
          toDelete.push(message.id);
        }
        if (limit !== -1) {
          limit--;
        }
      }
      if ((limit !== -1 && limit <= 0) || messages.length < 100) {
        done = true;
        return;
      }
      await del(
        (_before || !_after) ? messages[messages.length - 1].id : undefined,
        _after ? messages[0].id : undefined,
      );
    };
    await del(options.before, options.after);
    return checkToDelete();
  }

  /** Remove a role from a guild member */
  async getMessagesremoveGuildMemberRole(
    guildID: BigString,
    memberID: BigString,
    roleID: BigString,
    reason?: string,
  ): Promise<void> {
    return await this.delete(GUILD_MEMBER_ROLE(guildID, memberID, roleID), {
      reason,
    });
  }

  /** Remove a reaction from a message */
  async removeMessageReaction(
    channelID: BigString,
    messageID: BigString,
    reaction: string,
    userID?: BigString,
  ): Promise<void> {
    if (reaction === decodeURI(reaction)) {
      reaction = encodeURIComponent(reaction);
    }
    return this.delete(
      CHANNEL_MESSAGE_REACTION_USER(channelID, messageID, reaction, userID || "@me"),
    );
  }

  /** Remove all reactions from a message for a single emoji. */
  async removeMessageReactionEmoji(channelID: BigString, messageID: BigString, reaction: string): Promise<void> {
    if (reaction === decodeURI(reaction)) {
      reaction = encodeURIComponent(reaction);
    }
    return await this.delete(CHANNEL_MESSAGE_REACTION(channelID, messageID, reaction));
  }

  /** Remove all reactions from a message */
  async removeMessageReactions(channelID: BigString, messageID: BigString): Promise<void> {
    return await this.delete(CHANNEL_MESSAGE_REACTIONS(channelID, messageID));
  }

  /** Search for guild members by partial nickname/username */
  async searchGuildMembers(guildID: BigString, query: string, limit?: number): Promise<Member[]> {
    let qs = `?query=${query}`;
    if (limit) {
      qs += `?limit=${limit}`;
    }

    return await this.get(GUILD_MEMBERS_SEARCH(guildID) + qs).then((members) => {
      const guild = this.guilds.get(guildID);
      return members.map((member: DiscordMember) => new Member(member, guild, this));
    });
  }

  /** Send typing status in a channel */
  async sendChannelTyping(channelID: BigString): Promise<void> {
    return await this.post(CHANNEL_TYPING(channelID));
  }

  /** Force a guild integration to sync */
  async syncGuildIntegration(guildID: BigString, integrationID: BigString): Promise<void> {
    return await this.post(GUILD_INTEGRATION_SYNC(guildID, integrationID));
  }

  /** Force a guild template to sync */
  async syncGuildTemplate(guildID: BigString, code: string): Promise<GuildTemplate> {
    return await this.put(GUILD_TEMPLATE_GUILD(guildID, code)).then((template) => new GuildTemplate(template, this));
  }

  /** Unban a user from a guild */
  async unbanGuildMember(guildID: BigString, userID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_BAN(guildID, userID), {
      reason,
    });
  }

  /** Unpin a message */
  async unpinMessage(channelID: BigString, messageID: BigString): Promise<void> {
    return await this.delete(CHANNEL_PIN(channelID, messageID));
  }

  /** Validate discovery search term */
  async validateDiscoverySearchTerm(term: string): Promise<{ valid: boolean }> {
    return await this.get(DISCOVERY_VALIDATION + `?term=${encodeURI(term)}`);
  }

  _formatAllowedMentions(allowed?: AllowedMentions): DiscordAllowedMentions {
    if (!allowed) {
      return this.options.allowedMentions;
    }
    const result: DiscordAllowedMentions = {};
    result.parse = [];

    if (allowed.everyone) {
      result.parse.push(AllowedMentionsTypes.EveryoneMentions);
    }
    if (allowed.roles === true) {
      result.parse.push(AllowedMentionsTypes.RoleMentions);
    } else if (Array.isArray(allowed.roles)) {
      if (allowed.roles.length > 100) {
        throw new Error("Allowed role mentions cannot exceed 100.");
      }
      result.roles = allowed.roles;
    }
    if (allowed.users === true) {
      result.parse.push(AllowedMentionsTypes.UserMentions);
    } else if (Array.isArray(allowed.users)) {
      if (allowed.users.length > 100) {
        throw new Error("Allowed user mentions cannot exceed 100.");
      }
      result.users = allowed.users;
    }
    if (allowed.repliedUser !== undefined) {
      result.replied_user = allowed.repliedUser;
    }
    return result;
  }

  _formatImage(url: string, format?: ImageFormat, size?: ImageSize): string {
    if (!format) {
      format = url.includes("/a_") ? "gif" : this.options.defaultImageFormat;
    }

    if (!size) {
      size = this.options.defaultImageSize;
    }
    return `${this.CDN_URL}${url}.${format}?size=${size}`;
  }

  /** Converts a snowflake(discord id) into a timestamp. */
  snowflakeToTimestamp(snowflake: BigString): number {
    return Number(BigInt(snowflake) / 4194304n + 1420070400000n);
  }

  iconHashToBigInt(hash: string): bigint {
    // The icon is animated so it needs special handling
    if (hash.startsWith("a_")) {
      // Change the `a_` to just be `a`
      hash = `a${hash.substring(2)}`;
    } else {
      // The icon is not animated but it could be that it starts with a 0 so we just put a `b` in front so nothing breaks
      hash = `b${hash}`;
    }

    return BigInt(`0x${hash}`);
  }

  iconBigintToHash(icon: bigint): string {
    // Convert the bigint back to a hash
    const hash = icon.toString(16);
    // Hashes starting with a are animated and with b are not so need to handle that
    return hash.startsWith("a") ? `a_${hash.substring(1)}` : hash.substring(1);
  }

  /** Splits a large array into chunks of smaller arrays */
  chunkArray<T>(array: T[], size = 100): T[][] {
    const box: T[][] = [];
    while (array.length > box.length) {
      box.push(array.splice(0, 100));
    }

    return box;
  }

  toString() {
    return `[Client ${this.id}]`;
  }

  toJSON(props: string[] = []) {
    return Base.prototype.toJSON.call(this, [
      "application",
      "bot",
      "channelGuildMap",
      "gatewayURL",
      "groupChannels",
      "guilds",
      "guildShardMap",
      "lastConnect",
      "lastReconnectDelay",
      "notes",
      "options",
      "presence",
      "privateChannelMap",
      "privateChannels",
      "ready",
      "reconnectAttempts",
      "relationships",
      "requestHandler",
      "shards",
      "startTime",
      "unavailableGuilds",
      "userGuildSettings",
      "users",
      "userSettings",
      "voiceConnections",
      ...props,
    ]);
  }
}

export default Client;

export interface AllowedMentions {
  everyone?: boolean;
  repliedUser?: boolean;
  roles?: boolean | string[];
  users?: boolean | string[];
}

export interface ClientOptions {
  allowedMentions?: AllowedMentions;
  defaultImageFormat?: ImageFormat;
  defaultImageSize?: ImageSize;
  messageLimit?: number;
  apiVersion: ApiVersions;
  /** The url to the REST proxy to send requests to. This url should nly include the initial domain:port portion until api/v.... */
  proxyURL: string;
  /** The password/authorization to confirm that these request made to your rest proxy are indeed from you and not a hacker. */
  proxyRestAuthorization: string;
  /** The application id(NOT the bot id). The bot id and application id are the same for newer bots but older bots have different ids. */
  applicationId: BigString;
}

export interface ParsedClientOptions {
  /** The discord api version to use. */
  apiVersion: ApiVersions;
  /** Allowed mentions */
  allowedMentions: DiscordAllowedMentions;
  /** The image format to use by default. */
  defaultImageFormat: ImageFormat;
  /** The image size to use by default. */
  defaultImageSize: ImageSize;
  /** The url to the REST proxy to send requests to. This url should nly include the initial domain:port portion until api/v.... */
  proxyURL: string;
  /** The password/authorization to confirm that these request made to your rest proxy are indeed from you and not a hacker. */
  proxyRestAuthorization: string;
  /** The application id(NOT the bot id). The bot id and application id are the same for newer bots but older bots have different ids. */
  applicationId: BigString;
}

export type ApiVersions = 10;
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif";

export interface RequestData {
  method: RequestMethod;
  url: string;
  headers?: Record<string, string>;
  reason?: string;
  body?: Record<string, unknown> | string | null | any[];
  file?: FileContent | FileContent[];
}
