import { OAuth2Scopes } from "./discordeno.ts";

/** https://discord.com/developers/docs/resources/user#create-dm */
export interface CreateDM {
  /** The recipient to open a DM channel with */
  recipientId: string;
}

/** https://discord.com/developers/docs/resources/user#create-group-dm */
export interface CreateGroupDM {
  /** Access tokens of users that have granted your app the `gdm.join` scope */
  accessTokens: string[];
  /** A dictionary of user ids to their respective nicknames */
  nicks: Record<string, string>;
}

/** https://discord.com/developers/docs/resources/user#modify-current-user */
export interface ModifyCurrentUser {
  /** User's username, if changed may cause the user's discriminator to be randomized. */
  username?: string;
  /** If passed, modifies the user's avatar */
  avatar?: string;
}

/** https://discord.com/developers/docs/topics/oauth2#bot-authorization-flow-bot-auth-parameters */
export interface BotAuthenticationFlowQuery {
  /** App's client id */
  clientId: string;
  /** Needs to include bot for the bot flow */
  scope: OAuth2Scopes[];
  /** The permissions you're requesting */
  permissions: string;
  /** Pre-fills the dropdown picker with a guild for the user */
  guildId: string;
  /** True or false—disallows the user from changing the guild dropdown */
  disableGuildSelect: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#channel-pins-update */
export interface ChannelPinsUpdate {
  /** The id of the guild */
  guildId?: string;
  /** The id of the channel */
  channelId: string;
  /** The time at which the most recent pinned message was pinned */
  lastPinTimestamp?: string | null;
}

export interface ModifyChannel {
  /** 1-100 character channel name */
  name?: string;
  /** The type of channel; only conversion between text and news is supported and only in guilds with the "NEWS" feature */
  type?: ChannelTypes;
  /** The position of the channel in the left-hand listing */
  position?: number | null;
  /** 0-1024 character channel topic */
  topic?: string | null;
  /** Whether the channel is nsfw */
  nsfw?: boolean | null;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number | null;
  /** The bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers) */
  bitrate?: number | null;
  /** The user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit */
  userLimit?: number | null;
  /** Channel or category-specific permissions */
  permissionOverwrites?: OverwriteReadable[] | null;
  /** Id of the new parent category for a channel */
  parentId?: bigint | null;
  /** Voice region id for the voice channel, automatic when set to null */
  rtcRegion?: string | null;
  /** The camera video quality mode of the voice channel */
  videoQualityMode?: VideoQualityModes;
  /** Whether the thread is archived */
  archived?: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
}

// TODO: add docs link
export interface ListPublicArchivedThreads {
  // TODO: convert unix to ISO9601 timestamp
  /** Returns threads before this timestamp. UNIX or ISO8601 timestamp */
  before?: number | string;
  /** Optional maximum number of threads to return */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/channel#modify-channel-json-params-thread */
export interface ModifyThread {
  /** 1-100 character thread name */
  name?: string;
  /** Whether the thread is archived */
  archived?: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `MANAGE_MESSAGES`, `MANAGE_THREAD` or `MANAGE_CHANNEL` are unaffected */
  rateLimitPerUser?: number;
}

export interface ThreadMemberBase {
  /** Any user-thread settings, currently only used for notifications */
  flags: number;
}

export interface ThreadMember extends ThreadMemberBase {
  /** The id of the thread */
  id?: string;
  /** The id of the user */
  userId?: string;
  /** The time the current user last joined the thread */
  joinTimestamp: string;
}

export interface ThreadMemberOnGuildCreate extends ThreadMemberBase {
  /** The time the current user last joined the thread */
  joinTimestamp: string;
}

export interface ThreadMemberModified extends ThreadMemberBase {
  /** The id of the thread */
  id: bigint;
  /** The id of the user */
  userId: bigint;
  /** The time the current user last joined the thread */
  joinTimestamp: number;
}

export interface ThreadMembersUpdateBase {
  /** The approximate number of members in the thread, capped at 50 */
  memberCount: number;
}

// TODO: add docs link
export interface ThreadMembersUpdate extends ThreadMembersUpdateBase {
  /** The id of the thread */
  id: string;
  /** The id of the guild */
  guildId: string;
  /** The users who were added to the thread */
  addedMembers?: ThreadMember[];
  /** The id of the users who were removed from the thread */
  removedMemberIds?: string[];
}

export interface ThreadMembersUpdateModified extends ThreadMembersUpdateBase {
  /** The id of the thread */
  id: bigint;
  /** The id of the guild */
  guildId: bigint;
  /** The users who were added to the thread */
  addedMembers?: ThreadMemberModified[];
  /** The id of the users who were removed from the thread */
  removedMemberIds?: bigint[];
  // TODO: verify this
  // \* In this gateway event, the thread member objects will also include the [guild member](#DOCS_RESOURCES_GUILD/guild-member-object) and [presence](#DOCS_TOPICS_GATEWAY/presence) objects for each added thread member.
}

export interface DiscordenoCreateApplicationCommand extends CreateApplicationCommand {
  /** Id of the guild to create a guild only application command */
  guildId: string;
}

export interface DiscordenoEditWebhookMessage extends EditWebhookMessage {
  /** Id of the message you want to edit if undefined the initial response message will be edited */
  messageId?: bigint;
}

export interface DiscordenoInteractionResponse extends InteractionResponse {
  /** Set to true if the response should be private */
  private?: boolean;
}

export interface FileContent {
  /** The file blob */
  blob: Blob;
  /** The name of the file */
  name: string;
}

export enum Errors {
  // Bot Role errors
  BOTS_HIGHEST_ROLE_TOO_LOW = "BOTS_HIGHEST_ROLE_TOO_LOW",
  // Channel Errors
  CHANNEL_NOT_FOUND = "CHANNEL_NOT_FOUND",
  CHANNEL_NOT_IN_GUILD = "CHANNEL_NOT_IN_GUILD",
  CHANNEL_NOT_TEXT_BASED = "CHANNEL_NOT_TEXT_BASED",
  CHANNEL_NOT_STAGE_VOICE = "CHANNEL_NOT_STAGE_VOICE",
  MESSAGE_MAX_LENGTH = "MESSAGE_MAX_LENGTH",
  RULES_CHANNEL_CANNOT_BE_DELETED = "RULES_CHANNEL_CANNOT_BE_DELETED",
  UPDATES_CHANNEL_CANNOT_BE_DELETED = "UPDATES_CHANNEL_CANNOT_BE_DELETED",
  INVALID_TOPIC_LENGTH = "INVALID_TOPIC_LENGTH",
  // Guild Errors
  GUILD_NOT_DISCOVERABLE = "GUILD_NOT_DISCOVERABLE",
  GUILD_WIDGET_NOT_ENABLED = "GUILD_WIDGET_NOT_ENABLED",
  GUILD_NOT_FOUND = "GUILD_NOT_FOUND",
  MEMBER_NOT_FOUND = "MEMBER_NOT_FOUND",
  MEMBER_NOT_IN_VOICE_CHANNEL = "MEMBER_NOT_IN_VOICE_CHANNEL",
  MEMBER_SEARCH_LIMIT_TOO_HIGH = "MEMBER_SEARCH_LIMIT_TOO_HIGH",
  MEMBER_SEARCH_LIMIT_TOO_LOW = "MEMBER_SEARCH_LIMIT_TOO_LOW",
  PRUNE_MAX_DAYS = "PRUNE_MAX_DAYS",
  ROLE_NOT_FOUND = "ROLE_NOT_FOUND",
  // Thread errors
  INVALID_THREAD_PARENT_CHANNEL_TYPE = "INVALID_THREAD_PARENT_CHANNEL_TYPE",
  GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS = "GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS",
  NOT_A_THREAD_CHANNEL = "NOT_A_THREAD_CHANNEL",
  MISSING_MANAGE_THREADS_AND_NOT_MEMBER = "MISSING_MANAGE_THREADS_AND_NOT_MEMBER",
  CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD = "CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD",
  HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS =
    "HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS",
  // Message Get Errors
  INVALID_GET_MESSAGES_LIMIT = "INVALID_GET_MESSAGES_LIMIT",
  // Message Delete Errors
  DELETE_MESSAGES_MIN = "DELETE_MESSAGES_MIN",
  PRUNE_MIN_DAYS = "PRUNE_MIN_DAYS",
  // Interaction Errors
  INVALID_SLASH_DESCRIPTION = "INVALID_SLASH_DESCRIPTION",
  INVALID_SLASH_NAME = "INVALID_SLASH_NAME",
  INVALID_SLASH_OPTIONS = "INVALID_SLASH_OPTIONS",
  INVALID_SLASH_OPTIONS_CHOICES = "INVALID_SLASH_OPTIONS_CHOICES",
  TOO_MANY_SLASH_OPTIONS = "TOO_MANY_SLASH_OPTIONS",
  INVALID_SLASH_OPTION_CHOICE_NAME = "INVALID_SLASH_OPTION_CHOICE_NAME",
  INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE = "INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE",
  TOO_MANY_SLASH_OPTION_CHOICES = "TOO_MANY_SLASH_OPTION_CHOICES",
  ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES = "ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES",
  INVALID_SLASH_OPTION_NAME = "INVALID_SLASH_OPTION_NAME",
  INVALID_SLASH_OPTION_DESCRIPTION = "INVALID_SLASH_OPTION_DESCRIPTION",
  INVALID_CONTEXT_MENU_COMMAND_NAME = "INVALID_CONTEXT_MENU_COMMAND_NAME",
  INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION = "INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION",
  // Webhook Errors
  INVALID_WEBHOOK_NAME = "INVALID_WEBHOOK_NAME",
  INVALID_WEBHOOK_OPTIONS = "INVALID_WEBHOOK_OPTIONS",
  // Permission Errors
  MISSING_ADD_REACTIONS = "MISSING_ADD_REACTIONS",
  MISSING_ADMINISTRATOR = "MISSING_ADMINISTRATOR",
  MISSING_ATTACH_FILES = "MISSING_ATTACH_FILES",
  MISSING_BAN_MEMBERS = "MISSING_BAN_MEMBERS",
  MISSING_CHANGE_NICKNAME = "MISSING_CHANGE_NICKNAME",
  MISSING_CONNECT = "MISSING_CONNECT",
  MISSING_CREATE_INSTANT_INVITE = "MISSING_CREATE_INSTANT_INVITE",
  MISSING_DEAFEN_MEMBERS = "MISSING_DEAFEN_MEMBERS",
  MISSING_EMBED_LINKS = "MISSING_EMBED_LINKS",
  MISSING_INTENT_GUILD_MEMBERS = "MISSING_INTENT_GUILD_MEMBERS",
  MISSING_KICK_MEMBERS = "MISSING_KICK_MEMBERS",
  MISSING_MANAGE_CHANNELS = "MISSING_MANAGE_CHANNELS",
  MISSING_MANAGE_EMOJIS = "MISSING_MANAGE_EMOJIS",
  MISSING_MANAGE_GUILD = "MISSING_MANAGE_GUILD",
  MISSING_MANAGE_MESSAGES = "MISSING_MANAGE_MESSAGES",
  MISSING_MANAGE_NICKNAMES = "MISSING_MANAGE_NICKNAMES",
  MISSING_MANAGE_ROLES = "MISSING_MANAGE_ROLES",
  MISSING_MANAGE_WEBHOOKS = "MISSING_MANAGE_WEBHOOKS",
  MISSING_MENTION_EVERYONE = "MISSING_MENTION_EVERYONE",
  MISSING_MOVE_MEMBERS = "MISSING_MOVE_MEMBERS",
  MISSING_MUTE_MEMBERS = "MISSING_MUTE_MEMBERS",
  MISSING_PRIORITY_SPEAKER = "MISSING_PRIORITY_SPEAKER",
  MISSING_READ_MESSAGE_HISTORY = "MISSING_READ_MESSAGE_HISTORY",
  MISSING_SEND_MESSAGES = "MISSING_SEND_MESSAGES",
  MISSING_SEND_TTS_MESSAGES = "MISSING_SEND_TTS_MESSAGES",
  MISSING_SPEAK = "MISSING_SPEAK",
  MISSING_STREAM = "MISSING_STREAM",
  MISSING_USE_VAD = "MISSING_USE_VAD",
  MISSING_USE_EXTERNAL_EMOJIS = "MISSING_USE_EXTERNAL_EMOJIS",
  MISSING_VIEW_AUDIT_LOG = "MISSING_VIEW_AUDIT_LOG",
  MISSING_VIEW_CHANNEL = "MISSING_VIEW_CHANNEL",
  MISSING_VIEW_GUILD_INSIGHTS = "MISSING_VIEW_GUILD_INSIGHTS",
  // User Errors
  NICKNAMES_MAX_LENGTH = "NICKNAMES_MAX_LENGTH",
  USERNAME_INVALID_CHARACTER = "USERNAME_INVALID_CHARACTER",
  USERNAME_INVALID_USERNAME = "USERNAME_INVALID_USERNAME",
  USERNAME_MAX_LENGTH = "USERNAME_MAX_LENGTH",
  USERNAME_MIN_LENGTH = "USERNAME_MIN_LENGTH",
  NONCE_TOO_LONG = "NONCE_TOO_LONG",
  INVITE_MAX_AGE_INVALID = "INVITE_MAX_AGE_INVALID",
  INVITE_MAX_USES_INVALID = "INVITE_MAX_USES_INVALID",
  // API Errors
  RATE_LIMIT_RETRY_MAXED = "RATE_LIMIT_RETRY_MAXED",
  REQUEST_CLIENT_ERROR = "REQUEST_CLIENT_ERROR",
  REQUEST_SERVER_ERROR = "REQUEST_SERVER_ERROR",
  REQUEST_UNKNOWN_ERROR = "REQUEST_UNKNOWN_ERROR",
  // Component Errors
  TOO_MANY_COMPONENTS = "TOO_MANY_COMPONENTS",
  TOO_MANY_ACTION_ROWS = "TOO_MANY_ACTION_ROWS",
  LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID = "LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID",
  COMPONENT_LABEL_TOO_BIG = "COMPONENT_LABEL_TOO_BIG",
  COMPONENT_CUSTOM_ID_TOO_BIG = "COMPONENT_CUSTOM_ID_TOO_BIG",
  BUTTON_REQUIRES_CUSTOM_ID = "BUTTON_REQUIRES_CUSTOM_ID",
  COMPONENT_SELECT_MUST_BE_ALONE = "COMPONENT_SELECT_MUST_BE_ALONE",
  COMPONENT_PLACEHOLDER_TOO_BIG = "COMPONENT_PLACEHOLDER_TOO_BIG",
  COMPONENT_SELECT_MINVALUE_TOO_LOW = "COMPONENT_SELECT_MINVALUE_TOO_LOW",
  COMPONENT_SELECT_MINVALUE_TOO_MANY = "COMPONENT_SELECT_MINVALUE_TOO_MANY",
  COMPONENT_SELECT_MAXVALUE_TOO_LOW = "COMPONENT_SELECT_MAXVALUE_TOO_LOW",
  COMPONENT_SELECT_MAXVALUE_TOO_MANY = "COMPONENT_SELECT_MAXVALUE_TOO_MANY",
  COMPONENT_SELECT_OPTIONS_TOO_LOW = "COMPONENT_SELECT_OPTIONS_TOO_LOW",
  COMPONENT_SELECT_OPTIONS_TOO_MANY = "COMPONENT_SELECT_OPTIONS_TOO_MANY",
  SELECT_OPTION_LABEL_TOO_BIG = "SELECT_OPTION_LABEL_TOO_BIG",
  SELECT_OPTION_VALUE_TOO_BIG = "SELECT_OPTION_VALUE_TOO_BIG",
  SELECT_OPTION_TOO_MANY_DEFAULTS = "SELECT_OPTION_TOO_MANY_DEFAULTS",
  COMPONENT_SELECT_MIN_HIGHER_THAN_MAX = "COMPONENT_SELECT_MIN_HIGHER_THAN_MAX",
  CANNOT_ADD_USER_TO_ARCHIVED_THREADS = "CANNOT_ADD_USER_TO_ARCHIVED_THREADS",
  CANNOT_LEAVE_ARCHIVED_THREAD = "CANNOT_LEAVE_ARCHIVED_THREAD",
  CANNOT_REMOVE_FROM_ARCHIVED_THREAD = "CANNOT_REMOVE_FROM_ARCHIVED_THREAD",
  YOU_CAN_NOT_DM_THE_BOT_ITSELF = "YOU_CAN_NOT_DM_THE_BOT_ITSELF",
}

export interface AddGuildDiscoverySubcategory {
  /** The guild Id of the subcategory was added to */
  guildId: string;
  /** The Id of the subcategory added */
  categoryId: number;
}

//TODO: add docs link
export interface DiscoveryCategory {
  /** Numeric id of the category */
  id: number;
  /** The name of this category, in mutliple languages */
  name: DiscoveryName;
  /** Whether this category can be set as a guild's primary category */
  isPrimary: boolean;
}

// TODO: add docs link
export interface ValidateDiscoverySearchTermParams {
  /** The search term to check */
  term: string;
}

// TODO: add docs link
export interface ValidateDiscoverySearchTerm {
  /** Whether the provided term is valid */
  valid: boolean;
}

// TODO: add docs link
export interface ModifyGuildDiscoveryMetadata {
  /** The id of the primary discovery category. Default: 0 */
  primaryCategoryId?: number | null;
  /** Up to 10 discovery search kekywords. Default: null */
  keywords?: string[] | null;
  /** Whether guild info is shown when custom emojis are clicked. Default: true */
  emojiDiscoverabilityEnabled?: boolean | null;
}

//TODO: add docs link
export interface DiscoveryName {
  /** The name in English */
  default: string;
  /** The name in other languages */
  localizations?: Record<string, string>;
}

// TODO: add docs link
export interface DiscoveryMetadata {
  /** The guild Id */
  guildId: string;
  /** The id of the primary discovery category set for this guild */
  primaryCategoryId: number;
  /** Up to 10 discovery search keywords set for this guild */
  keywords: string[] | null;
  /** Whether guild info is shown when custom emojis from this guild are clicked */
  emojiDiscoverabilityEnabled: boolean;
  /** When the server's partner applicationo was accepted or denied, for applications via Server Settings */
  partnerActionedTimestamp: string | null;
  /** When the server applied for partnership, if it has a pending application */
  partnerApplicationTimestamp: string | null;
  /** Ids of up to 5 discovery subcategories set for this guild */
  categoryIds: number[];
}

/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface UpdateVoiceState {
  /** id of the guild */
  guildId: string;
  /** id of the voice channel client wants to join (null if disconnecting) */
  channelId: string | null;
  /** Is the client muted */
  selfMute: boolean;
  /** Is the client deafened */
  selfDeaf: boolean;
}

/** https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure */
export interface VoiceRegion {
  /** Unique Id for the region */
  id: string;
  /** Name of the region */
  name: string;
  /** true for a single server that is closest to the current user's client */
  optimal: boolean;
  /** Whether this is a deprecated voice region (avoid swithing to these) */
  deprecated: boolean;
  /** Whether this is a custom voice region (used for events/etc) */
  custom: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#voice-server-update */
export interface VoiceServerUpdate {
  /** Voice connection token */
  token: string;
  /** The guild this voice server update is for */
  guildId: string;
  /** The voice server host */
  endpoint: string | null;
}

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface VoiceState {
  /** The guild id this voice state is for */
  guildId?: string;
  /** The channel id this user is connected to */
  channelId: string | null;
  /** The user id this voice state is for */
  userId: string;
  /** The guild member this voice state is for */
  member?: GuildMemberWithUser;
  /** The session id for this voice state */
  sessionId: string;
  /** Whether this user is deafened by the server */
  deaf: boolean;
  /** Whether this user is muted by the server */
  mute: boolean;
  /** Whether this user is locally deafened */
  selfDeaf: boolean;
  /** Whether this user is locally muted */
  selfMute: boolean;
  /** Whether this user is streaming using "Go Live" */
  selfStream?: boolean;
  /** Whether this user's camera is enabled */
  selfVideo: boolean;
  /** Whether this user is muted by the current user */
  suppress: boolean;
  /** The time at which the user requested to speak */
  requestToSpeakTimestamp: string | null;
}

/** https://discord.com/developers/docs/resources/template#template-object-template-structure */
export interface Template {
  /** The template code (unique Id) */
  code: string;
  /** Template name */
  name: string;
  /** The description for the template */
  description: string | null;
  /** Number of times this template has been used */
  usageCount: number;
  /** The Id of the user who created the template */
  creatorId: string;
  /** The user who created the template */
  creator: DiscordUser;
  /** When this template was created */
  createdAt: string;
  /** When this template was last synced to the source guild */
  updatedAt: string;
  /** The Id of the guild this template is based on */
  sourceGuildId: string;
  /** The guild snapshot this template contains */
  serializedSourceGuild: Partial<DiscordGuild>;
  /** Whether the template has unsynced changes */
  isDirty: boolean | null;
}

/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export interface ModifyGuildTemplate {
  /** Name of the template (1-100 characters) */
  name?: string;
  /** Description of the template (0-120 characters) */
  description?: string | null;
}

/** https://discord.com/developers/docs/resources/template#create-guild-from-template-json-params */
export interface CreateGuildFromTemplate {
  /** Name of the guild (2-100 characters) */
  name: string;
  /** base64 128x128 image for the guild icon */
  icon?: string;
}


/** https://discord.com/developers/docs/resources/channel#message-object-message-types */
export enum MessageTypes {
  Default,
  RecipientAdd,
  RecipientRemove,
  Call,
  ChannelNameChange,
  ChannelIconChange,
  ChannelPinnedMessage,
  GuildMemberJoin,
  UserPremiumGuildSubscription,
  UserPremiumGuildSubscriptionTier1,
  UserPremiumGuildSubscriptionTier2,
  UserPremiumGuildSubscriptionTier3,
  ChannelFollowAdd,
  GuildDiscoveryDisqualified = 14,
  GuildDiscoveryRequalified,
  GuildDiscoveryGracePeriodInitialWarning,
  GuildDiscoveryGracePeriodFinalWarning,
  ThreadCreated,
  Reply,
  ChatInputCommand,
  ThreadStarterMessage,
  GuildInviteReminder,
  ContextMenuCommand,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure */
export interface MessageReference {
  /** id of the originating message */
  messageId?: string;
  /**
   * id of the originating message's channel
   * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
   */
  channelId?: string;
  /** id of the originating message's guild */
  guildId?: string;
  /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  failIfNotExists: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji */
export type MessageReactionRemoveEmoji = Pick<MessageReactionAdd, "channelId" | "guildId" | "messageId" | "emoji">;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all */
export type MessageReactionRemoveAll = Pick<MessageReactionAdd, "channelId" | "messageId" | "guildId">;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove */
export type MessageReactionRemove = Omit<MessageReactionAdd, "member">;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add */
export interface MessageReactionAdd {
  /** The id of the user */
  userId: string;
  /** The id of the channel */
  channelId: string;
  /** The id of the message */
  messageId: string;
  /** The id of the guild */
  guildId?: string;
  /** The member who reacted if this happened in a guild */
  member?: GuildMemberWithUser;
  /** The emoji used to react */
  emoji: Partial<DiscordEmoji>;
}

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface GetReactions {
  /** Get users after this user Id */
  after?: string;
  /** Max number of users to return (1-100) */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
export enum MessageFlags {
  /** This message has been published to subscribed channels (via Channel Following) */
  Crossposted = 1 << 0,
  /** This message originated from a message in another channel (via Channel Following) */
  IsCrosspost = 1 << 1,
  /** Do not include any embeds when serializing this message */
  SuppressEmbeds = 1 << 2,
  /** The source message for this crosspost has been deleted (via Channel Following) */
  SourceMessageDeleted = 1 << 3,
  /** This message came from the urgent message system */
  Urgent = 1 << 4,
  /** This message has an associated thread, with the same id as the message */
  HasThread = 1 << 5,
  /** This message is only visible to the user who invoked the Interaction */
  Empheral = 1 << 6,
  /** This message is an Interaction Response and the bot is "thinking" */
  Loading = 1 << 7,
  /** This message failed to mention some roles and add their members to the thread */
  FailedToMentionSomeRolesInThread = 1 << 8,
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk */
export interface MessageDeleteBulk {
  /** The ids of the messages */
  ids: string[];
  /** The id of the channel */
  channelId: string;
  /** The id of the guild */
  guildId?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete */
export interface MessageDelete {
  /** The id of the message */
  id: string;
  /** The id of the channel */
  channelId: string;
  /** The id of the guild */
  guildId?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum MessageActivityTypes {
  Join = 1,
  Spectate,
  Listen,
  JoinRequest,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface MessageActivity {
  /** Type of message activity */
  type: MessageActivityTypes;
  /** `party_id` from a Rich Presence event */
  partyId?: string;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export type GetMessages = GetMessagesLimit & GetMessagesAfter & GetMessagesBefore & GetMessagesAround;

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[] | null;
  /** Edit the flags of the message (only `SUPRESS_EMBEDS` can currently be set/unset) */
  flags?: 4 | null;
  /** The contents of the file being sent/edited */
  file?: FileContent | FileContent[] | null;
  /** Allowed mentions for the message */
  allowedMentions?:
    | (Omit<AllowedMentions, "users" | "roles"> & {
      /** Array of role_ids to mention (Max size of 100) */
      roles?: bigint[];
      /** Array of user_ids to mention (Max size of 100) */
      users?: bigint[];
    })
    | null;
  /** When specified (adding new attachments), attachments which are not provided in this list will be removed. */
  attachments?: Attachment[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}

/** https://discord.com/developers/docs/resources/channel#create-message */
export type DiscordCreateMessage = SnakeCasedPropertiesDeep<Omit<CreateMessage, "file">>;

/** https://discord.com/developers/docs/resources/channel#attachment-object */
export interface Attachment {
  /** Attachment id */
  id: string;
  /** Name of file attached */
  filename: string;
  /** The attachment's [media type](https://en.wikipedia.org/wiki/Media_type) */
  contentType?: string;
  /** Size of file in bytes */
  size: number;
  /** Source url of file */
  url: string;
  /** A proxied url of file */
  proxyUrl: string;
  /** Height of file (if image) */
  height?: number | null;
  /** Width of file (if image) */
  width?: number | null;
  /** Whether this attachment is ephemeral */
  ephemeral?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionsTypes {
  /** Controls role mentions */
  RoleMentions = "roles",
  /** Controls user mentions */
  UserMentions = "users",
  /** Controls @everyone and @here mentions */
  EveryoneMentions = "everyone",
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[];
  /** Array of role_ids to mention (Max size of 100) */
  roles?: string[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: string[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean;
}

export enum TextStyles {
  /** Intended for short single-line text */
  Short = 1,
  /** Intended for much longer inputs */
  Paragraph = 2,
}

// TODO: add dock link
export interface SelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string;
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string;
  /** An additional description of the option. Maximum 50 characters. */
  description?: string;
  /** The id, name, and animated properties of an emoji. */
  emoji?: {
    /** Emoji id */
    id?: string;
    /** Emoji name */
    name?: string;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** Will render this option as already-selected by default. */
  default?: boolean;
}

// TODO: add dock link
export interface SelectMenuComponent {
  type: MessageComponentTypes.SelectMenu;
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string;
  /** A custom placeholder text if nothing is selected. Maximum 100 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number;
  /** The choices! Maximum of 25 items. */
  options: SelectOption[];
}

// TODO: add dock link
export interface SelectMenuData {
  /** The type of component */
  componentType: MessageComponentTypes.SelectMenu;
  /** The custom id provided for this component. */
  customId: string;
  /** The values chosen by the user. */
  values: string[];
}

/** https://discord.com/developers/docs/interactions/message-components#component-types */
export enum MessageComponentTypes {
  /** A container for other components */
  ActionRow = 1,
  /** A button object */
  Button = 2,
  /** A select menu for picking from choices */
  SelectMenu = 3,
  /** A text input object */
  InputText = 4,
}

export type ActionRowComponents = ButtonComponent | SelectMenuComponent;

export type MessageComponents = ActionRow[];

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface InputTextComponent {
  /** InputText Component is of type 3 */
  type: MessageComponentTypes.InputText;
  /** The style of the InputText */
  style: TextStyles;
  /** The customId of the InputText */
  customId: string;
  /** The label of the InputText */
  label: string;
  /** The placeholder of the InputText */
  placeholder?: string;
  /** The minimum length of the text the user has to provide */
  minLength?: number;
  /** The maximum length of the text the user has to provide */
  maxLength?: number;
  /** Whether or not this input is required. */
  required?: boolean;
  /** Pre-filled value for input text. */
  value?: string;
}

/** https://discord.com/developers/docs/interactions/message-components#buttons-button-styles */
export enum ButtonStyles {
  /** A blurple button */
  Primary = 1,
  /** A grey button */
  Secondary,
  /** A green button */
  Success,
  /** A red button */
  Danger,
  /** A button that navigates to a URL */
  Link,
}

export interface ButtonData {
  /** with the value you defined for this component */
  customId: string;
  /** The type of this component */
  componentType: MessageComponentTypes.Button;
}

/** https://discord.com/developers/docs/interactions/message-components#buttons-button-object */
export interface ButtonComponent {
  /** All button components have type 2 */
  type: MessageComponentTypes.Button;
  /** for what the button says (max 80 characters) */
  label: string;
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  customId?: string;
  /** For different styles/colors of the buttons */
  style: ButtonStyles;
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: string;
    /** Emoji name */
    name?: string;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string;
  /** Whether or not this button is disabled */
  disabled?: boolean;
}

/** https://discord.com/developers/docs/interactions/message-components#actionrow */
export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: 1;
  /** The components in this row */
  components:
    | [SelectMenuComponent | ButtonComponent | InputTextComponent]
    | [ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent];
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export type GuildMemberWithUser = Omit<DiscordMember, "user"> & { user: DiscordUser };

/** https://discord.com/developers/docs/topics/gateway#guild-member-add */
export interface GuildMemberAdd extends GuildMemberWithUser {
  /** id of the guild */
  guildId: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove */
export interface GuildMemberRemove {
  /** The id of the guild */
  guildId: string;
  /** The user who was removed */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-update */
export interface GuildMemberUpdate {
  /** The id of the guild */
  guildId: string;
  /** User role ids */
  roles: string[];
  /** The user */
  user: DiscordUser;
  /** Nickname of the user in the guild */
  nick?: string | null;
  /** the member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting) */
  avatar: string;
  /** When the user joined the guild */
  joinedAt: string;
  /** When the user starting boosting the guild */
  premiumSince?: string | null;
  /** whether the user is deafened in voice channels */
  deaf?: boolean;
  /** whether the user is muted in voice channels */
  mute?: boolean;
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
  /** when the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out */
  communicationDisabledUntil?: string;
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembers {
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number;
  /** The highest user id in the previous page. Default: 0 */
  after?: string;
}

/** https://discord.com/developers/docs/resources/guild#modify-current-user-nick */
export interface ModifyCurrentUserNick {
  /** Value to set users nickname to. Requires the CHANGENICKNAME permission */
  nick?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
export interface SearchGuildMembers {
  /** Query string to match username(s) and nickname(s) against */
  query: string;
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number;
}

/** https://discord.com/developers/docs/topics/gateway#invite-create */
export interface InviteCreate {
  /** The channel the invite is for */
  channelId: string;
  /** The unique invite code */
  code: string;
  /** The time at which the invite was created */
  createdAt: string;
  /** The guild of the invite */
  guildId?: string;
  /** The user that created the invite */
  inviter?: DiscordUser;
  /** How long the invite is valid for (in seconds) */
  maxAge: number;
  /** The maximum number of times the invite can be used */
  maxUses: number;
  /** The type of target for this voice channel invite */
  targetType: TargetTypes;
  /** The target user for this invite */
  targetUser?: DiscordUser;
  /** The embedded application to open for this voice channel embedded application invite */
  targetApplication?: Partial<DiscordApplication>;
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean;
  /** How many times the invite has been used (always will be 0) */
  uses: number;
}


/** https://discord.com/developers/docs/topics/gateway#invite-delete */
export interface InviteDelete {
  /** The channel of the invite */
  channelId: string;
  /** The guild of the invite */
  guildId?: string;
  /** The unique invite code */
  code: string;
}

export interface InviteStageInstance {
  /** The members speaking in the Stage */
  members: Partial<DiscordMember>[];
  /** The number of users in the Stage */
  participantCount: number;
  /** The number of users speaking in the Stage */
  speakerCount: number;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
}

/** https://discord.com/developers/docs/resources/invite#invite-object-target-user-types */
export enum TargetTypes {
  Stream = 1,
  EmbeddedApplication,
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string;
  /** The 128x128 emoji image */
  image: string;
  /** Roles allowed to use this emoji */
  roles?: bigint[];
  /** The reason you are creating this emoji */
  reason?: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update */
export interface GuildEmojisUpdate {
  /** id of the guild */
  guildId: string;
  /** Array of emojis */
  emojis: DiscordEmoji[];
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji {
  /** Name of the emoji */
  name?: string;
  /** Roles allowed to use this emoji */
  roles?: bigint[] | null;
}



export type Intents = GatewayIntents;

/** https://discord.com/developers/docs/topics/gateway#connecting-gateway-url-params */
export interface GatewayURLParams {
  /** Gateway version to use */
  v: string;
  /** The encoding of received gateway packets */
  encoding: string;
  /** The (optional) compression of gateway packets */
  compress?: string;
}

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
export interface GetGatewayBot {
  /** The WSS URL that can be used for connecting to the gateway */
  url: string;
  /** The recommended number of shards to use when connecting */
  shards: number;
  /** Information on the current session start limit */
  sessionStartLimit: SessionStartLimit;
}

export interface Hello {
  /** The interval (in milliseconds) the client should heartbeat with */
  heartbeatInterval: number;
}

/** https://discord.com/developers/docs/topics/gateway#hello */
export type DiscordHello = SnakeCasedPropertiesDeep<Hello>;

/** https://discord.com/developers/docs/topics/gateway#identify */
export interface Identify {
  /** Authentication token */
  token: string;
  /** Connection properties */
  properties: IdentifyConnectionProperties;
  /** Whether this connection supports compression of packets */
  compress?: boolean;
  /** Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list */
  largeThreshold?: number;
  /** Used for Guild Sharding */
  shard?: [shardId: number, numberOfShards: number];
  /** Presence structure for initial presence information */
  presence?: StatusUpdate;
  /** The Gateway Intents you wish to receive */
  intents: number;
}

/** https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties */
export interface IdentifyConnectionProperties {
  /** Operating system */
  $os: string;
  /** Library name */
  $browser: string;
  /** Library name */
  $device: string;
}

/** https://discord.com/developers/docs/topics/gateway#ready */
export interface Ready {
  /** Gateway version */
  v: number;
  /** Information about the user including email */
  user: DiscordUser;
  /** The guilds the user is in */
  guilds: UnavailableGuild[];
  /** Used for resuming connections */
  sessionId: string;
  /** The shard information associated with this session, if sent when identifying */
  shard?: [number, number];
  /** Contains id and flags */
  application: Partial<DiscordApplication> & Pick<DiscordApplication, "id" | "flags">;
}

export type DiscordReady = SnakeCasedPropertiesDeep<Ready>;

/** https://discord.com/developers/docs/topics/gateway#resume */
export interface Resume {
  /** Session token */
  token: string;
  /** Session id */
  sessionId: string;
  /** Last sequence number received */
  seq: number;
}

/** https://discord.com/developers/docs/topics/gateway#session-start-limit-object */
export interface SessionStartLimit {
  /** The total number of session starts the current user is allowed */
  total: number;
  /** The remaining number of session starts the current user is allowed */
  remaining: number;
  /** The number of milliseconds after which the limit resets */
  resetAfter: number;
  /** The number of identify requests allowed per 5 seconds */
  maxConcurrency: number;
}

/** https://discord.com/developers/docs/topics/gateway#update-status */
export interface StatusUpdate {
  /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null;
  /** The user's activities */
  activities: Activity[];
  /** The user's new status */
  status: DiscordStatusTypes;
  /** Whether or not the client is afk */
  afk: boolean;
}

/** https://discord.com/developers/docs/resources/guild#ban-object */
export interface Ban {
  /** The reason for the ban */
  reason: string | null;
  /** The banned user */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuild {
  /** Name of the guild (1-100 characters) */
  name: string;
  /** Base64 128x128 image for the guild icon */
  icon?: string;
  /** Verification level */
  verificationLevel?: VerificationLevels;
  /** Default message notification level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels;
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels;
  /** New guild roles (first role is the everyone role) */
  roles?: DiscordRole[];
  /** New guild's channels */
  channels?: Partial<DiscordChannel>[];
  /** Id for afk channel */
  afkChannelId?: string;
  /** Afk timeout in seconds */
  afkTimeout?: number;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: string;
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export interface CreateGuildBan {
  /** Number of days to delete messages for (0-7) */
  deleteMessageDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Reason for the ban */
  reason?: string;
}

export interface CreateGuildChannel {
  /** Channel name (1-100 characters) */
  name: string;
  /** The type of channel */
  type?: ChannelTypes;
  /** Channel topic (0-1024 characters) */
  topic?: string;
  /** The bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number;
  /** The user limit of the voice channel (voice only) */
  userLimit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number;
  /** Sorting position of the channel */
  position?: number;
  /** The channel's permission overwrites */
  permissionOverwrites?: OverwriteReadable[];
  /** Id of the parent category for a channel */
  parentId?: bigint;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
}

export interface CreateGuildRole {
  /** Name of the role, default: "new role" */
  name?: string;
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: PermissionStrings[];
  /** RGB color value, default: 0 */
  color?: number;
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean;
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean;
  /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
  unicodeEmoji?: string;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-role */
export interface DiscordCreateGuildRole extends Omit<CreateGuildRole, "permissions"> {
  permissions?: string;
}

/** https://discord.com/developers/docs/resources/guild#get-guild */
export interface GetGuildQuery {
  /** When true, will return approximate member and presence counts for the guild */
  withCounts?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface GetGuildPruneCountQuery {
  /** Number of days to count prune for (1 or more), default: 7 */
  days?: number;
  /** Role(s) to include, default: none */
  includeRoles: string | string[];
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add */
export interface GuildBanAddRemove {
  /** id of the guild */
  guildId: string;
  /** The banned user */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-remove */
export interface GuildBanRemove {
  /** id of the guild */
  guildId: string;
  /** The unbanned user */
  user: User;
}

/** https://discord.com/developers/docs/resources/guild#guild-preview-object */
export interface GuildPreview {
  /** Guild id */
  id: string;
  /** Guild name (2-100 characters) */
  name: string;
  /** Icon hash */
  icon: string | null;
  /** Splash hash */
  splash: string | null;
  /** Discovery splash hash */
  discoverySplash: string | null;
  /** Custom guild emojis */
  emojis: DiscordEmoji[];
  /** Enabled guild features */
  features: GuildFeatures[];
  /** Approximate number of members in this guild */
  approximateMemberCount: number;
  /** Approximate number of online members in this guild */
  approximatePresenceCount: number;
  /** The description for the guild, if the guild is discoverable */
  description: string | null;
  /** Custom guild stickers */
  stickers: Sticker[];
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-create */
export interface GuildRoleCreate {
  /** The id of the guild */
  guildId: string;
  /** The role created */
  role: DiscordRole;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-delete */
export interface GuildRoleDelete {
  /** id of the guild */
  guildId: string;
  /** id of the role */
  roleId: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-update */
export interface GuildRoleUpdate {
  /** The id of the guild */
  guildId: string;
  /** The role updated */
  role: DiscordRole;
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure */
export interface GuildWidget {
  /** Whether the widget is enabled */
  enabled: boolean;
  /** The widget channel id */
  channelId: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild */
export interface ModifyGuild {
  /** Guild name */
  name?: string;
  /** Verification level */
  verificationLevel?: VerificationLevels | null;
  /** Default message notification filter level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels | null;
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels | null;
  /** Id for afk channel */
  afkChannelId?: bigint | null;
  /** Afk timeout in seconds */
  afkTimeout?: number;
  /** Base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the `ANIMATED_ICON` feature) */
  icon?: string | null;
  /** User id to transfer guild ownership to (must be owner) */
  ownerId?: bigint;
  /** Base64 16:9 png/jpeg image for the guild splash (when the server has `INVITE_SPLASH` feature) */
  splash?: string | null;
  /** Base64 16:9 png/jpeg image for the guild discovery spash (when the server has the `DISCOVERABLE` feature) */
  discoverySplash?: string | null;
  /** Base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature) */
  banner?: string | null;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: bigint | null;
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags;
  /** The id of the channel where Community guilds display rules and/or guidelines */
  rulesChannelId?: bigint | null;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: bigint | null;
  /** The preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale?: string | null;
  /** Enabled guild features */
  features?: GuildFeatures[];
  /** Whether the guild's boost progress bar should be enabled */
  premiumProgressBarEnabled?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export interface ModifyGuildChannelPositions {
  /** Channel id */
  id: string;
  /** Sorting position of the channel */
  position: number | null;
  /** Syncs the permission overwrites with the new parent, if moving to a new category */
  lockPositions?: boolean | null;
  /** The new parent ID for the channel that is moved */
  parentId?: string | null;
}

export interface ModifyGuildRole {
  /** Name of the role */
  name?: string | null;
  /** Bitwise value of the enabled/disabled permissions */
  permissions?: PermissionStrings[] | null;
  /** RGB color value */
  color?: number | null;
  /** Whether the role should be displayed seperately in the sidebar */
  hoist?: boolean | null;
  /** Whether the role should be mentionable */
  mentionable?: boolean | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role */
export interface DiscordModifyGuildRole extends Omit<ModifyGuildRole, "permissions"> {
  permissions?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
export interface ModifyGuildRolePositions {
  /** Role id */
  id: string;
  /** Sorting position of the role */
  position?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
export interface ModifyGuildWelcomeScreen {
  /** Whether the welcome screen is enabled */
  enabled?: boolean | null;
  /** Channels linked in the welcome screen and their display options */
  welcomeScreen?: WelcomeScreenChannel[] | null;
  /** The server description to show in the welcome screen */
  description?: string | null;
}

export interface ScheduledEvent {
  /** the id of the scheduled event */
  id: string;
  /** the guild id which the scheduled event belongs to */
  guildId: string;
  /** the channel id in which the scheduled event will be hosted if specified */
  channelId: string | null;
  /** the id of the user that created the scheduled event */
  creatorId?: string | null;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: string;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime: string | null;
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel;
  /** the status of the scheduled event */
  status: ScheduledEventStatus;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  /** any additional id of the hosting entity associated with event */
  entityId: string | null;
  /** the entity metadata for the scheduled event */
  entityMetadata: ScheduledEventEntityMetadata | null;
  /** the user that created the scheduled event */
  creator?: DiscordUser;
  /** the number of users subscribed to the scheduled event */
  userCount?: number;
  /** the cover image hash of the scheduled event */
  image: string | null;
}

export enum ScheduledEventPrivacyLevel {
  /** the scheduled event is public and available in discovery. DISCORD DEVS DISABLED THIS! WILL ERROR IF USED! */
  // Public = 1,
  /** the scheduled event is only accessible to guild members */
  GuildOnly = 2,
}

export enum ScheduledEventEntityType {
  StageInstance = 1,
  Voice,
  External,
}

export enum ScheduledEventStatus {
  Scheduled = 1,
  Active,
  Completed,
  Canceled,
}

export interface ScheduledEventEntityMetadata {
  /** location of the event */
  location?: string;
}

export interface ScheduledEventUserRemove {
  /** id of the guild scheduled event  */
  guildScheduledEventId: string;
  /** id of the user                   */
  userId: string;
  /** id of the guild */
  guildId: string;
}

export interface ScheduledEventUserAdd {
  /** id of the guild scheduled event  */
  guildScheduledEventId: string;
  /** id of the user                   */
  userId: string;
  /** id of the guild */
  guildId: string;
}

export interface CreateScheduledEvent {
  /** the channel id of the scheduled event. */
  channelId?: bigint;
  /** location of the event */
  location?: string;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: number;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: number;
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  reason?: string;
}

export interface EditScheduledEvent {
  /** the channel id of the scheduled event. null if switching to external event. */
  channelId: bigint | null;
  /** location of the event */
  location: string;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: number;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: number;
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  /** the status of the scheduled event */
  status: ScheduledEventStatus;
  reason?: string;
}

export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean;
}

export interface GetScheduledEventUsers {
  /** number of users to return (up to maximum 100), defaults to 100 */
  limit?: number;
  /** whether to also have member objects provided, defaults to false */
  withMember?: boolean;
  /** consider only users before given user id */
  before?: bigint;
  /** consider only users after given user id */
  after?: bigint;
}

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export type UnavailableGuild = Pick<DiscordGuild, "id" | "unavailable">;

/** https://discord.com/developers/docs/resources/guild#update-user-voice-state */
export interface UpdateOthersVoiceState {
  /** The id of the channel the user is currently in */
  channelId: bigint;
  /** Toggles the user's suppress state */
  suppress?: boolean;
  /** The user id to target */
  userId: bigint;
}

/** https://discord.com/developers/docs/resources/guild#update-current-user-voice-state */
export interface UpdateSelfVoiceState {
  /** The id of the channel the user is currently in */
  channelId: bigint;
  /** Toggles the user's suppress state */
  suppress?: boolean;
  /** Sets the user's request to speak */
  requestToSpeakTimestamp?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-object-verification-level */
export enum VerificationLevels {
  /** Unrestricted */
  None,
  /** Must have verified email on account */
  Low,
  /** Must be registered on Discord for longer than 5 minutes */
  Medium,
  /** Must be a member of the server for longer than 10 minutes */
  High,
  /** Must have a verified phone number */
  VeryHigh,
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export interface ApplicationCommand {
  /** Unique id of the command */
  id: string;
  /** Unique id of the parent application */
  applicationId: string;
  /** Guild id of the command, if not global */
  guildId?: string;
  /** 1-32 character name matching */
  name: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: ApplicationCommandOption[];
  /** Whether the command is enbaled by default when the app is added to a guild */
  defaultPermission?: boolean;
  /** The type of command. By default this is a application command(ChatInput). */
  type?: ApplicationCommandTypes;
  /** Autoincrementing version identifier updated during substantial record changes */
  version: string;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionApplicationCommandCallbackData {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: Omit<AllowedMentions, "users" | "roles"> & {
    /** Array of role_ids to mention (Max size of 100) */
    roles?: bigint[];
    /** Array of user_ids to mention (Max size of 100) */
    users?: bigint[];
  };
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The customId you want to use for this modal response. */
  customId?: string;
  /** The title you want to use for this modal response. */
  title?: string;
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
  /** message flags combined as a bitfield (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
  flags?: number;
  /** autocomplete choices (max of 25 choices) */
  choices?: ApplicationCommandOptionChoice[];
}

/** https://discord.com/developers/docs/topics/gateway#application-command-delete-application-command-extra-fields */
export interface ApplicationCommandCreateUpdateDelete extends ApplicationCommand {
  /** Id of the guild the command is in */
  guildId?: string;
}

export interface InteractionData {
  /** The type of component */
  componentType?: MessageComponentTypes;
  /** The custom id provided for this component. */
  customId?: string;
  /** The components if its a Modal Submit interaction. */
  components?: MessageComponents;
  /** The values chosen by the user. */
  values?: string[];
  /** The Id of the invoked command */
  id: string;
  /** The name of the invoked command */
  name: string;
  /** Converted users + roles + channels + attachments */
  resolved?: {
    /** The Ids and Message objects */
    messages?: Record<string, DiscordMessage>;
    /** The Ids and User objects */
    users?: Record<string, DiscordUser>;
    /** The Ids and partial Member objects */
    members?: Record<string, Omit<InteractionGuildMember, "user" | "deaf" | "mute">>;
    /** The Ids and Role objects */
    roles?: Record<string, DiscordRole>;
    /** The Ids and partial Channel objects */
    channels?: Record<string, Pick<Channel, "id" | "name" | "type" | "permissions">>;
    /** The ids and attachment objects */
    attachments: Record<string, Attachment>;
  };
  /** The params + values from the user */
  options?: InteractionDataOption[];
  /** The target id if this is a context menu command. */
  targetId?: string;
}

export interface InteractionDataOption {
  /** the name of the parameter */
  name: string;
  /** value of application command option type */
  type: ApplicationCommandOptionTypes;
  /** the value of the pair */
  value?: string | boolean | number | DiscordMember | Channel | DiscordRole;
  /** present if this option is a group or subcommand */
  options?: InteractionDataOption[];
  /** true if this option is the currently focused option for autocomplete */
  focused?: boolean;
};

export interface InteractionDataResolved {
  /** The Ids and Message objects */
  messages?: Record<string, Message>;
  /** The Ids and User objects */
  users?: Record<string, DiscordUser>;
  /** The Ids and partial Member objects */
  members?: Record<string, Omit<InteractionGuildMember, "user" | "deaf" | "mute">>;
  /** The Ids and Role objects */
  roles?: Record<string, DiscordRole>;
  /** The Ids and partial Channel objects */
  channels?: Record<string, Pick<Channel, "id" | "name" | "type" | "permissions">>;
  /** The Ids and attachments objects */
  attachments?: Record<string, Attachment>;
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions */
export interface ApplicationCommandPermissions {
  /** The id of the role or user */
  id: string;
  /** Role or User */
  type: ApplicationCommandPermissionTypes;
  /** `true` to allow, `false`, to disallow */
  permission: boolean;
}

export enum ApplicationCommandPermissionTypes {
  Role = 1,
  User,
}

export enum ApplicationCommandTypes {
  /** A text-based command that shows up when a user types `/` */
  ChatInput = 1,
  /** A UI-based command that shows up when you right click or tap on a user */
  User,
  /** A UI-based command that shows up when you right click or tap on a message */
  Message,
}

export interface CreateGlobalContextMenuCommand {
  /** 1-31 character name matching `^[\w-]{1,32}$` */
  name: string;
  /** The type of the command */
  type: ApplicationCommandTypes;
}

/** https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command-json-params */
export interface CreateGuildApplicationCommand {
  /** 1-31 character name matching lowercase `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: ApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command-json-params */
export interface EditGlobalApplicationCommand {
  /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
  name?: string;
  /** 1-100 character description */
  description?: string;
  /** The type of the command */
  type?: ApplicationCommandTypes;
  /** The parameters for the command */
  options?: ApplicationCommandOption[] | null;
  /** Whether the command is enabled by default when the app is added to a guild. Default: true */
  defaultPermission?: boolean;
}

/** https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command-json-params */
export interface EditGuildApplicationCommand {
  /** 1-31 character name matching lowercase `^[\w-]{1,32}$` */
  name?: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: ApplicationCommandOption[] | null;
}

/** https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions */
export interface GuildApplicationCommandPermissions {
  /** The id of the command */
  id: string;
  /** The id of the application to command belongs to */
  applicationId: string;
  /** The id of the guild */
  guildId: string;
  /** The permissions for the command in the guild */
  permissions: ApplicationCommandPermissions[];
}

export interface Interaction {
  /** Id of the interaction */
  id: string;
  /** Id of the application this interaction is for */
  applicationId: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The guild it was sent from */
  guildId?: string;
  /** The channel it was sent from */
  channelId?: string;
  /** Guild member data for the invoking user, including permissions */
  member?: InteractionGuildMember;
  /** User object for the invoking user, if invoked in a DM */
  user?: DiscordUser;
  /** A continuation token for responding to the interaction */
  token: string;
  /** Read-only property, always `1` */
  version: 1;
  /** For the message the button was attached to */
  message?: DiscordMessage;

  data?: InteractionData;

  /** The selected language of the invoking user */
  locale?: string;
  /** The guild's preferred locale, if invoked in a guild */
  guildLocale?: string;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface InteractionGuildMember extends GuildMemberWithUser {
  /** Total permissions of the member in the channel, including overwrites, returned when in the interaction object */
  permissions: string;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes;
  /** An optional response message */
  data?: InteractionApplicationCommandCallbackData;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype */
export enum InteractionResponseTypes {
  /** ACK a `Ping` */
  Pong = 1,
  /** Respond to an interaction with a message */
  ChannelMessageWithSource = 4,
  /** ACK an interaction and edit a response later, the user sees a loading state */
  DeferredChannelMessageWithSource = 5,
  /** For components, ACK an interaction and edit the original message later; the user does not see a loading state */
  DeferredUpdateMessage = 6,
  /** For components, edit the message the component was attached to */
  UpdateMessage = 7,
  /** For Application Command Options, send an autocomplete result */
  ApplicationCommandAutocompleteResult = 8,
  /** For Command or Component interactions, send a Modal response */
  Modal = 9,
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype */
export enum InteractionTypes {
  Ping = 1,
  ApplicationCommand = 2,
  MessageComponent = 3,
  ApplicationCommandAutocomplete = 4,
  ModalSubmit = 5,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface MessageInteraction {
  /** Id of the interaction */
  id: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The name of the ApplicationCommand */
  name: string;
  /** The user who invoked the interaction */
  user: DiscordUser;
  /** The member who invoked the interaction in the guild */
  member?: Partial<DiscordMember>;
}
