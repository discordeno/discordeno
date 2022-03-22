import { Collection } from "../util/collection.ts";

/** https://discord.com/developers/docs/resources/user#user-object-premium-types */
export enum PremiumTypes {
  None,
  NitroClassic,
  Nitro,
}

/** https://discord.com/developers/docs/resources/user#user-object-user-flags */
export enum UserFlags {
  None,
  DiscordEmployee = 1 << 0,
  ParteneredServerOwner = 1 << 1,
  HypeSquadEvents = 1 << 2,
  BugHunterLevel1 = 1 << 3,
  HouseBravery = 1 << 6,
  HouseBrilliance = 1 << 7,
  HouseBalance = 1 << 8,
  EarlySupporter = 1 << 9,
  TeamUser = 1 << 10,
  BugHunterLevel2 = 1 << 14,
  VerifiedBot = 1 << 16,
  EarlyVerifiedBotDeveloper = 1 << 17,
  DiscordCertifiedModerator = 1 << 18,
  BotHttpInteractions = 1 << 19,
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors */
export enum IntegrationExpireBehaviors {
  RemoveRole,
  Kick,
}

/** https://discord.com/developers/docs/resources/user#connection-object-visibility-types */
export enum VisibilityTypes {
  /** Invisible to everyone except the user themselves */
  None,
  /** Visible to everyone */
  Everyone,
}

/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum TeamMembershipStates {
  Invited = 1,
  Accepted,
}

/** https://discord.com/developers/docs/topics/oauth2#application-application-flags */
export enum ApplicationFlags {
  /** Intent required for bots in **100 or more servers** to receive [`presence_update` events](#DOCS_TOPICS_GATEWAY/presence-update) */
  GatewayPresence = 1 << 12,
  /** Intent required for bots in under 100 servers to receive [`presence_update` events](#DOCS_TOPICS_GATEWAY/presence-update), found in Bot Settings */
  GatewayPresenceLimited = 1 << 13,
  /** Intent required for bots in **100 or more servers** to receive member-related events like `guild_member_add`. See list of member-related events [under `GUILD_MEMBERS`](#DOCS_TOPICS_GATEWAY/list-of-intents) */
  GatewayGuildMembers = 1 << 14,
  /** Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings. See list of member-related events [under `GUILD_MEMBERS`](#DOCS_TOPICS_GATEWAY/list-of-intents) */
  GatewayGuildMembersLimited = 1 << 15,
  /** Indicates unusual growth of an app that prevents verification */
  VerificationPendingGuildLimit = 1 << 16,
  /** Indicates if an app is embedded within the Discord client (currently unavailable publicly) */
  Embedded = 1 << 17,
  /** Intent required for bots in **100 or more servers** to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055) */
  GatewayMessageCount = 1 << 18,
  /** Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055), found in Bot Settings */
  GatewayMessageContentLimited = 1 << 19,
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

export enum TextStyles {
  /** Intended for short single-line text */
  Short = 1,
  /** Intended for much longer inputs */
  Paragraph = 2,
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

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionsTypes {
  /** Controls role mentions */
  RoleMentions = "roles",
  /** Controls user mentions */
  UserMentions = "users",
  /** Controls @everyone and @here mentions */
  EveryoneMentions = "everyone",
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types */
export enum WebhookTypes {
  /** Incoming Webhooks can post messages to channels with a generated token */
  Incoming = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  ChannelFollower,
  /** Application webhooks are webhooks used with Interactions */
  Application,
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-types */
export type EmbedTypes = "rich" | "image" | "video" | "gifv" | "article" | "link";

/** https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level */
export enum DefaultMessageNotificationLevels {
  /** Members will receive notifications for all messages by default */
  AllMessages,
  /** Members will receive notifications only for messages that @mention them by default */
  OnlyMentions,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level */
export enum ExplicitContentFilterLevels {
  /** Media content will not be scanned */
  Disabled,
  /** Media content sent by members without roles will be scanned */
  MembersWithoutRoles,
  /** Media content sent by all members will be scanned */
  AllMembers,
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

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface BaseRole {
  /** Role name */
  name: string;
  /** Integer representation of hexadecimal color code */
  color: number;
  /** Position of this role */
  position: number;
  /** role unicode emoji */
  unicodeEmoji?: string;
}

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-features */
export enum GuildFeatures {
  /** Guild has access to set an invite splash background */
  InviteSplash = "INVITE_SPLASH",
  /** Guild has access to set 384kbps bitrate in voice (previously VIP voice servers) */
  VipRegions = "VIP_REGIONS",
  /** Guild has access to set a vanity URL */
  VanityUrl = "VANITY_URL",
  /** Guild is verified */
  Verified = "VERIFIED",
  /** Guild is partnered */
  Partnered = "PARTNERED",
  /** Guild can enable welcome screen, Membership Screening, stage channels and discovery, and recives community updates */
  Community = "COMMUNITY",
  /** Guild has access to use commerce features (i.e. create store channels) */
  Commerce = "COMMERCE",
  /** Guild has access to create news channels */
  News = "NEWS",
  /** Guild is able to be discovered in the directory */
  Discoverable = "DISCOVERABLE",
  /** guild cannot be discoverable */
  DiscoverableDisabled = "DISCOVERABLE_DISABLED",
  /** Guild is able to be featured in the directory */
  Feature = "FEATURABLE",
  /** Guild has access to set an animated guild icon */
  AnimatedIcon = "ANIMATED_ICON",
  /** Guild has access to set a guild banner image */
  Banner = "BANNER",
  /** Guild has enabled the welcome screen */
  WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED",
  /** Guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  MemberVerificationGateEnabled = "MEMBER_VERIFICATION_GATE_ENABLED",
  /** Guild can be previewed before joining via Membership Screening or the directory */
  PreviewEnabled = "PREVIEW_ENABLED",
  /** Guild has enabled ticketed events */
  TicketedEventsEnabled = "TICKETED_EVENTS_ENABLED",
  /** Guild has enabled monetization */
  MonetizationEnabled = "MONETIZATION_ENABLED",
  /** Guild has increased custom sticker slots */
  MoreStickers = "MORE_STICKERS",
  /** Guild has access to the three day archive time for threads */
  ThreeDayThreadArchive = "THREE_DAY_THREAD_ARCHIVE",
  /** Guild has access to the seven day archive time for threads */
  SevenDayThreadArchive = "SEVEN_DAY_THREAD_ARCHIVE",
  /** Guild has access to create private threads */
  PrivateThreads = "PRIVATE_THREADS",
  /** Guild is able to set role icons */
  RoleIcons = "ROLE_ICONS",
}

/** https://discord.com/developers/docs/resources/guild#guild-object-mfa-level */
export enum MfaLevels {
  /** Guild has no MFA/2FA requirement for moderation actions */
  None,
  /** Guild has a 2FA requirement for moderation actions */
  Elevated,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags */
export enum SystemChannelFlags {
  /** Suppress member join notifications */
  SuppressJoinNotifications = 1 << 0,
  /** Suppress server boost notifications */
  SuppressPremiumSubscriptions = 1 << 1,
  /** Suppress server setup tips */
  SuppressGuildReminderNotifications = 1 << 2,
  /** Hide member join sticker reply buttons */
  SuppressJoinNotificationReplies = 1 << 3,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-premium-tier */
export enum PremiumTiers {
  /** Guild has not unlocked any Server Boost perks */
  None,
  /** Guild has unlocked Server Boost level 1 perks */
  Tier1,
  /** Guild has unlocked Server Boost level 2 perks */
  Tier2,
  /** Guild has unlocked Server Boost level 3 perks */
  Tier3,
}

// TODO: add resource link
export enum GuildNsfwLevel {
  Default,
  Explicit,
  Safe,
  AgeRestricted,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export enum ChannelTypes {
  /** A text channel within a server */
  GuildText,
  /** A direct message between users */
  DM,
  /** A voice channel within a server */
  GuildVoice,
  /** A direct message between multiple users */
  GroupDm,
  /** An organizational category that contains up to 50 channels */
  GuildCategory,
  /** A channel that users can follow and crosspost into their own server */
  GuildNews,
  /** A channel in which game developers can sell their game on Discord */
  GuildStore,
  /** A temporary sub-channel within a GUILD_NEWS channel */
  GuildNewsThread = 10,
  /** A temporary sub-channel within a GUILD_TEXT channel */
  GuildPublicThread,
  /** A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission */
  GuildPrivateThread,
  /** A voice channel for hosting events with an audience */
  GuildStageVoice = 13,
}

export enum OverwriteTypes {
  Role,
  Member,
}

export enum VideoQualityModes {
  /** Discord chooses the quality for optimal performance */
  Auto = 1,
  /** 720p */
  Full,
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-types */
export enum ActivityTypes {
  Game,
  Streaming,
  Listening,
  Watching,
  Custom = 4,
  Competing,
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

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum MessageActivityTypes {
  Join = 1,
  Spectate,
  Listen,
  JoinRequest,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types */
export enum StickerTypes {
  /** an official sticker in a pack, part of Nitro or in a removed purchasable pack */
  Standard = 1,
  /** a sticker uploaded to a Boosted guild for the guild's members */
  Guild,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types */
export enum StickerFormatTypes {
  Png = 1,
  Apng,
  Lottie,
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype */
export enum InteractionTypes {
  Ping = 1,
  ApplicationCommand = 2,
  MessageComponent = 3,
  ApplicationCommandAutocomplete = 4,
  ModalSubmit = 5,
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
export enum ApplicationCommandOptionTypes {
  SubCommand = 1,
  SubCommandGroup,
  String,
  Integer,
  Boolean,
  User,
  Channel,
  Role,
  Mentionable,
  Number,
  Attachment,
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
export enum AuditLogEvents {
  GuildUpdate = 1,
  ChannelCreate = 10,
  ChannelUpdate,
  ChannelDelete,
  ChannelOverwriteCreate,
  ChannelOverwriteUpdate,
  ChannelOverwriteDelete,
  MemberKick = 20,
  MemberPrune,
  MemberBanAdd,
  MemberBanRemove,
  MemberUpdate,
  MemberRoleUpdate,
  MemberMove,
  MemberDisconnect,
  BotAdd,
  RoleCreate = 30,
  RoleUpdate,
  RoleDelete,
  InviteCreate = 40,
  InviteUpdate,
  InviteDelete,
  WebhookCreate = 50,
  WebhookUpdate,
  WebhookDelete,
  EmojiCreate = 60,
  EmojiUpdate,
  EmojiDelete,
  MessageDelete = 72,
  MessageBulkDelete,
  MessagePin,
  MessageUnpin,
  IntegrationCreate = 80,
  IntegrationUpdate,
  IntegrationDelete,
  StageInstanceCreate,
  StageInstanceUpdate,
  StageInstanceDelete,
  StickerCreate = 90,
  StickerUpdate,
  StickerDelete,
  GuildScheduledEventCreate = 100,
  GuildScheduledEventUpdate,
  GuildScheduledEventDelete,
  ThreadCreate = 110,
  ThreadUpdate,
  ThreadDelete,
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

/** https://discord.com/developers/docs/resources/invite#invite-object-target-user-types */
export enum TargetTypes {
  Stream = 1,
  EmbeddedApplication,
}

export enum ApplicationCommandTypes {
  /** A text-based command that shows up when a user types `/` */
  ChatInput = 1,
  /** A UI-based command that shows up when you right click or tap on a user */
  User,
  /** A UI-based command that shows up when you right click or tap on a message */
  Message,
}

export enum ApplicationCommandPermissionTypes {
  Role = 1,
  User,
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags */
export enum ActivityFlags {
  Instance = 1 << 0,
  Join = 1 << 1,
  Spectate = 1 << 2,
  JoinRequest = 1 << 3,
  Sync = 1 << 4,
  Play = 1 << 5,
  PartyPrivacyFriends = 1 << 6,
  PartyPrivacyVoiceChannel = 1 << 7,
  Embedded = 1 << 8,
}

/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export enum BitwisePermissionFlags {
  /** Allows creation of instant invites */
  CREATE_INSTANT_INVITE = 0x0000000000000001,
  /** Allows kicking members */
  KICK_MEMBERS = 0x0000000000000002,
  /** Allows banning members */
  BAN_MEMBERS = 0x0000000000000004,
  /** Allows all permissions and bypasses channel permission overwrites */
  ADMINISTRATOR = 0x0000000000000008,
  /** Allows management and editing of channels */
  MANAGE_CHANNELS = 0x0000000000000010,
  /** Allows management and editing of the guild */
  MANAGE_GUILD = 0x0000000000000020,
  /** Allows for the addition of reactions to messages */
  ADD_REACTIONS = 0x0000000000000040,
  /** Allows for viewing of audit logs */
  VIEW_AUDIT_LOG = 0x0000000000000080,
  /** Allows for using priority speaker in a voice channel */
  PRIORITY_SPEAKER = 0x0000000000000100,
  /** Allows the user to go live */
  STREAM = 0x0000000000000200,
  /** Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels */
  VIEW_CHANNEL = 0x0000000000000400,
  /** Allows for sending messages in a channel. (does not allow sending messages in threads) */
  SEND_MESSAGES = 0x0000000000000800,
  /** Allows for sending of /tts messages */
  SEND_TTS_MESSAGES = 0x0000000000001000,
  /** Allows for deletion of other users messages */
  MANAGE_MESSAGES = 0x0000000000002000,
  /** Links sent by users with this permission will be auto-embedded */
  EMBED_LINKS = 0x0000000000004000,
  /** Allows for uploading images and files */
  ATTACH_FILES = 0x0000000000008000,
  /** Allows for reading of message history */
  READ_MESSAGE_HISTORY = 0x0000000000010000,
  /** Allows for using the @everyone tag to notify all users in a channel, and the @here tag to notify all online users in a channel */
  MENTION_EVERYONE = 0x0000000000020000,
  /** Allows the usage of custom emojis from other servers */
  USE_EXTERNAL_EMOJIS = 0x0000000000040000,
  /** Allows for viewing guild insights */
  VIEW_GUILD_INSIGHTS = 0x0000000000080000,
  /** Allows for joining of a voice channel */
  CONNECT = 0x0000000000100000,
  /** Allows for speaking in a voice channel */
  SPEAK = 0x0000000000200000,
  /** Allows for muting members in a voice channel */
  MUTE_MEMBERS = 0x0000000000400000,
  /** Allows for deafening of members in a voice channel */
  DEAFEN_MEMBERS = 0x0000000000800000,
  /** Allows for moving of members between voice channels */
  MOVE_MEMBERS = 0x0000000001000000,
  /** Allows for using voice-activity-detection in a voice channel */
  USE_VAD = 0x0000000002000000,
  /** Allows for modification of own nickname */
  CHANGE_NICKNAME = 0x0000000004000000,
  /** Allows for modification of other users nicknames */
  MANAGE_NICKNAMES = 0x0000000008000000,
  /** Allows management and editing of roles */
  MANAGE_ROLES = 0x0000000010000000,
  /** Allows management and editing of webhooks */
  MANAGE_WEBHOOKS = 0x0000000020000000,
  /** Allows management and editing of emojis */
  MANAGE_EMOJIS = 0x0000000040000000,
  /** Allows members to use application commands in text channels */
  USE_SLASH_COMMANDS = 0x0000000080000000,
  /** Allows for requesting to speak in stage channels. */
  REQUEST_TO_SPEAK = 0x0000000100000000,
  /** Allows for creating, editing, and deleting scheduled events */
  MANAGE_EVENTS = 0x0000000200000000,
  /** Allows for deleting and archiving threads, and viewing all private threads */
  MANAGE_THREADS = 0x0000000400000000,
  /** Allows for creating public and announcement threads */
  CREATE_PUBLIC_THREADS = 0x0000000800000000,
  /** Allows for creating private threads */
  CREATE_PRIVATE_THREADS = 0x0000001000000000,
  /** Allows the usage of custom stickers from other servers */
  USE_EXTERNAL_STICKERS = 0x0000002000000000,
  /** Allows for sending messages in threads */
  SEND_MESSAGES_IN_THREADS = 0x0000004000000000,
  /** Allows for launching activities (applications with the `EMBEDDED` flag) in a voice channel. */
  USE_EMBEDDED_ACTIVITIES = 0x0000008000000000,
  /** Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels */
  MODERATE_MEMBERS = 0x0000010000000000,
}

export type PermissionStrings = keyof typeof BitwisePermissionFlags;

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum VoiceOpcodes {
  /** Begin a voice websocket connection. */
  Identify,
  /** Select the voice protocol. */
  SelectProtocol,
  /** Complete the websocket handshake. */
  Ready,
  /** Keep the websocket connection alive. */
  Heartbeat,
  /** Describe the session. */
  SessionDescription,
  /** Indicate which users are speaking. */
  Speaking,
  /** Sent to acknowledge a received client heartbeat. */
  HeartbeatACK,
  /** Resume a connection. */
  Resume,
  /** Time to wait between sending heartbeats in milliseconds. */
  Hello,
  /** Acknowledge a successful session resume. */
  Resumed,
  /** A client has disconnected from the voice channel */
  ClientDisconnect = 13,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum VoiceCloseEventCodes {
  /** You sent an invalid [opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes). */
  UnknownOpcode = 4001,
  /** You sent a invalid payload in your [identifying](https://discord.com/developers/docs/topics/gateway#identify) to the Gateway. */
  FailedToDecodePayload,
  /** You sent a payload before [identifying](https://discord.com/developers/docs/topics/gateway#identify) with the Gateway. */
  NotAuthenticated,
  /** The token you sent in your [identify](https://discord.com/developers/docs/topics/gateway#identify) payload is incorrect. */
  AuthenticationFailed,
  /** You sent more than one [identify](https://discord.com/developers/docs/topics/gateway#identify) payload. Stahp. */
  AlreadyAuthenticated,
  /** Your session is no longer valid. */
  SessionNoLongerValid,
  /** Your session has timed out. */
  SessionTimedOut = 4009,
  /** We can't find the server you're trying to connect to. */
  ServerNotFound = 4011,
  /** We didn't recognize the [protocol](https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection-example-select-protocol-payload) you sent. */
  UnknownProtocol,
  /** Channel was deleted, you were kicked, voice server changed, or the main gateway session was dropped. Should not reconnect. */
  Disconnect = 4014,
  /** The server crashed. Our bad! Try [resuming](https://discord.com/developers/docs/topics/voice-connections#resuming-voice-connection). */
  VoiceServerCrashed,
  /** We didn't recognize your [encryption](https://discord.com/developers/docs/topics/voice-connections#encrypting-and-sending-voice). */
  UnknownEncryptionMode,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum RpcErrorCodes {
  /** An unknown error occurred. */
  UnknownError = 1000,
  /** You sent an invalid payload. */
  InvalidPayload = 4000,
  /** Invalid command name specified. */
  InvalidCommand = 4002,
  /** Invalid guild ID specified. */
  InvalidGuild,
  /** Invalid event name specified. */
  InvalidEvent,
  /** Invalid channel ID specified. */
  InvalidChannel,
  /** You lack permissions to access the given resource. */
  InvalidPermissions,
  /** An invalid OAuth2 application ID was used to authorize or authenticate with. */
  InvalidClientId,
  /** An invalid OAuth2 application origin was used to authorize or authenticate with. */
  InvalidOrigin,
  /** An invalid OAuth2 token was used to authorize or authenticate with. */
  InvalidToken,
  /** The specified user ID was invalid. */
  InvalidUser,
  /** A standard OAuth2 error occurred; check the data object for the OAuth2 error details. */
  OAuth2Error = 5000,
  /** An asynchronous `SELECT_TEXT_CHANNEL`/`SELECT_VOICE_CHANNEL` command timed out. */
  SelectChannelTimedOut,
  /** An asynchronous `GET_GUILD` command timed out. */
  GetGuildTimedOut,
  /** You tried to join a user to a voice channel but the user was already in one. */
  SelectVoiceForceRequired,
  /** You tried to capture more than one shortcut key at once. */
  CaptureShortcutAlreadyListening,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum RpcCloseEventCodes {
  /** You connected to the RPC server with an invalid client ID. */
  InvalidClientId = 4000,
  /** You connected to the RPC server with an invalid origin. */
  InvalidOrigin,
  /** You are being rate limited. */
  RateLimited,
  /** The OAuth2 token associated with a connection was revoked, get a new one! */
  TokenRevoked,
  /** The RPC Server version specified in the connection string was not valid. */
  InvalidVersion,
  /** The encoding specified in the connection string was not valid. */
  InvalidEncoding,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#json */
export enum JsonErrorCodes {
  /** General error (such as a malformed request body, amongst other things) */
  GeneralError,
  UnknownAccount = 10001,
  UnknownApplication,
  UnknownChannel,
  UnknownGuild,
  UnknownIntegration,
  UnknownInvite,
  UnknownMember,
  UnknownMessage,
  UnknownPermissionOverwrite,
  UnknownProvider,
  UnknownRole,
  UnknownToken,
  UnknownUser,
  UnknownEmoji,
  UnknownWebhook,
  UnknownWebhookService,
  UnknownSession = 10020,
  UnknownBan = 10026,
  UnknownSKU,
  UnknownStoreListing,
  UnknownEntitlement,
  UnknownBuild,
  UnknownLobby,
  UnknownBranch,
  UnknownStoreDirectoryLayout,
  UnknownRedistributable = 10036,
  UnknownGiftCode = 10038,
  UnknownStream = 10049,
  UnknownPremiumServerSubscribeCooldown,
  UnknownGuildTemplate = 10057,
  UnknownDiscoveryCategory = 10059,
  UnknownSticker,
  UnknownInteraction = 10062,
  UnknownApplicationCommand = 10063,
  UnknownVoiceState = 10065,
  UnknownApplicationCommandPermissions,
  UnknownStageInstance,
  UnknownGuildMemberVerificationForm,
  UnknownGuildWelcomeScreen,
  UnknownGuildScheduledEvent,
  UnknownGuildScheduledEventUser,
  BotsCannotUseThisEndpoint = 20001,
  OnlyBotsCanUseThisEndpoint,
  ExplicitContentCannotBeSentToTheDesiredRecipient = 20009,
  YouAreNotAuthorizedToPerformThisActionOnThisApplication = 20012,
  ThisActionCannotBePerformedDueToSlowmodeRateLimit = 20016,
  OnlyTheOwnerOfThisAccountCanPerformThisAction = 20018,
  ThisMessageCannotBeEditedDueToAnnouncementRateLimits = 20022,
  TheChannelYouAreWritingHasHitTheWriteRateLimit = 20028,
  TheWriteActionYouArePerformingOnTheServerHasHitTheWriteRateLimit,
  YourStageTopicOrServerNameOrServerDescriptionOrChannelNamesContainsWordsThatAreNotAllowedForPublicStages = 20031,
  GuildPremiumSubscriptionLevelTooLow = 20035,
  MaximumNumberOfGuildsReached = 30001,
  MaximumNumberOfFriendsReached,
  MaximumNumberOfPinsReachedForTheChannel,
  MaximumNumberOfRecipientsReached,
  MaximumNumberOfGuildRolesReached,
  MaximumNumberOfWebhooksReached = 30007,
  MaximumNumberOfEmojisReached,
  MaximumNumberOfReactionsReached = 30010,
  MaximumNumberOfGuildChannelsReached = 30013,
  MaximumNumberOfAttachmentsInAMessageReached = 30015,
  MaximumNumberOfInvitesReached,
  MaximumNumberOfAnimatedEmojisReached = 30018,
  MaximumNumberOfServerMembersReached,
  MaximumNumberOfServerCategoriesHasBeenReached = 30030,
  GuildAlreadyHasTemplate = 30031,
  MaxNumberOfThreadParticipantsHasBeenReached = 30033,
  MaximumNumberOfBansForNonGuildMembersHaveBeenExceeded = 30035,
  MaximumNumberOfBansFetchesHasBeenReached = 30037,
  MaximumNumberOfUncompletedGuildScheduledEventsReached = 30038,
  MaximumNumberOfStickersReached = 30039,
  MaximumNumberOfPruneRequestsHasBeenReachedTryAgainLater,
  MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReachedTryAgainLater = 30042,
  MaximumNumberOfEditsToMessagesOlderThan1HourReachedTryAgainLater = 30046,
  UnauthorizedProvideAValidTokenAndTryAgain = 40001,
  YouNeedToVerifyYourAccountInOrderToPerformThisAction,
  YouAreOpeningDirectMessagesTooFast,
  SendMessagesHasBeenTemporarilyDisabled,
  RequestEntityTooLargeTrySendingSomethingSmallerInSize,
  ThisFeatureHasBeenTemporarilyDisabledServerSide,
  ThisUserBannedFromThisGuild,
  TargetUserIsNotConnectedToVoice = 40032,
  ThisMessageHasAlreadyBeenCrossposted = 40033,
  AnApplicationCommandWithThatNameAlreadyExists = 40041,
  InteractionHasAlreadyBeenAcknowledged = 40060,
  MissingAccess = 50001,
  InvalidAccountType,
  CannotExecuteActionOnADMChannel,
  GuildWidgetDisabled,
  CannotEditMessageAuthoredByAnotherUser,
  CannotSendAnEmptyMessage,
  CannotSendMessagesToThisUser,
  CannotSendMessagesInANonTextChannel,
  ChannelVerificationLevelIsTooHighForYouToGainAccess,
  OAuth2ApplicationDoesNotHaveABot,
  OAuth2ApplicationLimitReached,
  InvalidOAuth2State,
  YouLackPermissionsToPerformThatAction,
  InvalidAuthenticationTokenProvided,
  NoteWasTooLong,
  ProvidedTooFewOrTooManyMessagesToDeleteMustProvideAtLeast2AndFewerThan100MessagesToDelete,
  AMessageCanOnlyBePinnedInTheChannelItWasSentIn = 50019,
  InviteCodeWasEitherInvalidOrTaken,
  CannotExecuteActionOnASystemMessage,
  CannotExecuteActionOnThisChannelType = 50024,
  InvalidOAuth2AccessTokenProvided,
  MissingRequiredOAuth2Scope,
  InvalidWebhookTokenProvided,
  InvalidRole,
  InvalidRecipients = 50033,
  AMessageProvidedWasTooOldToBulkDelete,
  /** Invalid form body (returned for both `application/json` and `multipart/form-data` bodies), or invalid `Content-Type` provided */
  InvalidFormBodyOrContentTypeProvided,
  AnInviteWasAcceptedToAGuildTheApplicationsBotIsNotIn,
  InvalidApiVersionProvided = 50041,
  FileUploadedExceedsTheMaximumSize = 50045,
  InvalidFileUploaded,
  CannotSelfRedeemThisGift = 50054,
  InvalidGuild,
  InvalidMessageType = 50068,
  PaymentSourceRequiredToRedeemGift = 50070,
  CannotDeleteAChannelRequiredForCommunityGuilds = 50074,
  InvalidStickerSent = 50081,
  TriedToPerformAnOperationOnAnArchivedThreadSuchAsEditingAMessageOrAddingAUserToTheThread = 50083,
  InvalidThreadNotificationSettings,
  BeforeValueIsEarlierThanTheThreadCreationDate,
  CommunityServerChannelsMustBeTextChannels,
  ThisServerIsNotAvailableInYourLocation = 50095,
  ThisServerNeedsMonetizationEnabledInOrderToPerformThisAction = 50097,
  ThisServerNeedsMoreBoostsToPerformThisAction = 50101,
  TheRequestBodyContainsInvalidJSON = 50109,
  TwoFactorIsRequiredForThisOperation = 60003,
  NoUsersWithDiscordTagExist = 80004,
  ReactionWasBlocked = 90001,
  ApiResourceIsCurrentlyOverloadedTryAgainALittleLater = 130000,
  TheStageIsAlreadyOpen = 150006,
  CannotReplyWithoutPermissionToReadMessageHistory = 160002,
  AThreadHasAlreadyBeenCreatedForThisMessage = 160004,
  ThreadIsLocked = 160005,
  MaximumNumberOfActiveThreadsReached = 160006,
  MaximumNumberOfActiveAnnouncementThreadsReached = 160007,
  InvalidJsonForUploadedLottieFile = 170001,
  UploadedLottiesCannotContainRasterizedImagesSuchAsPngOrJpeg,
  StickerMaximumFramerateExceeded,
  StickerFrameCountExceedsMaximumOf1000Frames,
  LottieAnimationMaximumDimensionsExceeded,
  StickerFrameRateIsEitherTooSmallOrTooLarge,
  StickerAnimationDurationExceedsMaximumOf5Seconds,
  CannotUpdateAFinishedEvent = 180000,
  FailedToCreateStageNeededForStageEvent = 180002,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#http */
export enum HTTPResponseCodes {
  /** The request completed successfully. */
  Ok = 200,
  /** The entity was created successfully. */
  Created,
  /** The request completed successfully but returned no content. */
  NoContent = 204,
  /** The entity was not modified (no action was taken). */
  NotModified = 304,
  /** The request was improperly formatted, or the server couldn't understand it. */
  BadRequest = 400,
  /** The `Authorization` header was missing or invalid. */
  Unauthorized,
  /** The `Authorization` token you passed did not have permission to the resource. */
  Forbidden = 403,
  /** The resource at the location specified doesn't exist. */
  NotFound,
  /** The HTTP method used is not valid for the location specified. */
  MethodNotAllowed,
  /** You are being rate limited, see [Rate Limits](https://discord.com/developers/docs/topics/rate-limits). */
  TooManyRequests = 429,
  /** There was not a gateway available to process your request. Wait a bit and retry. */
  GatewayUnavailable = 502,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#opcodes-and-status-codes */
export enum GatewayCloseEventCodes {
  /** We're not sure what went wrong. Try reconnecting? */
  UnknownError = 4000,
  /** You sent an invalid [Gateway opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes) or an invalid payload for an opcode. Don't do that! */
  UnknownOpcode,
  /** You sent an invalid [payload](https://discord.com/developers/docs/topics/gateway#sending-payloads) to us. Don't do that! */
  DecodeError,
  /** You sent us a payload prior to [identifying](https://discord.com/developers/docs/topics/gateway#identify). */
  NotAuthenticated,
  /** The account token sent with your [identify payload](https://discord.com/developers/docs/topics/gateway#identify) is incorrect. */
  AuthenticationFailed,
  /** You sent more than one identify payload. Don't do that! */
  AlreadyAuthenticated,
  /** The sequence sent when [resuming](https://discord.com/developers/docs/topics/gateway#resume) the session was invalid. Reconnect and start a new session. */
  InvalidSeq = 4007,
  /** Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this. */
  RateLimited,
  /** Your session timed out. Reconnect and start a new one. */
  SessionTimedOut,
  /** You sent us an invalid [shard when identifying](https://discord.com/developers/docs/topics/gateway#sharding). */
  InvalidShard,
  /** The session would have handled too many guilds - you are required to [shard](https://discord.com/developers/docs/topics/gateway#sharding) your connection in order to connect. */
  ShardingRequired,
  /** You sent an invalid version for the gateway. */
  InvalidApiVersion,
  /** You sent an invalid intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have incorrectly calculated the bitwise value. */
  InvalidIntents,
  /** You sent a disallowed intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have tried to specify an intent that you [have not enabled or are not approved for](https://discord.com/developers/docs/topics/gateway#privileged-intents). */
  DisallowedIntents,
}

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types */
export enum InviteTargetTypes {
  Stream = 1,
  EmbeddedApplication,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes */
export enum GatewayOpcodes {
  /** An event was dispatched. */
  Dispatch,
  /** Fired periodically by the client to keep the connection alive. */
  Heartbeat,
  /** Starts a new session during the initial handshake. */
  Identify,
  /** Update the client's presence. */
  PresenceUpdate,
  /** Used to join/leave or move between voice channels. */

  VoiceStateUpdate,
  /** Resume a previous session that was disconnected. */
  Resume = 6,
  /** You should attempt to reconnect and resume immediately. */
  Reconnect,
  /** Request information about offline guild members in a large guild. */
  RequestGuildMembers,
  /** The session has been invalidated. You should reconnect and identify/resume accordingly. */
  InvalidSession,
  /** Sent immediately after connecting, contains the `heartbeat_interval` to use. */
  Hello,
  /** Sent in response to receiving a heartbeat to acknowledge that it has been received. */
  HeartbeatACK,
}

export type GatewayDispatchEventNames =
  | "READY"
  | "CHANNEL_CREATE"
  | "CHANNEL_DELETE"
  | "CHANNEL_PINS_UPDATE"
  | "CHANNEL_UPDATE"
  | "GUILD_BAN_ADD"
  | "GUILD_BAN_REMOVE"
  | "GUILD_CREATE"
  | "GUILD_DELETE"
  | "GUILD_EMOJIS_UPDATE"
  | "GUILD_INTEGRATIONS_UPDATE"
  | "GUILD_MEMBER_ADD"
  | "GUILD_MEMBER_REMOVE"
  | "GUILD_MEMBER_UPDATE"
  | "GUILD_MEMBERS_CHUNK"
  | "GUILD_ROLE_CREATE"
  | "GUILD_ROLE_DELETE"
  | "GUILD_ROLE_UPDATE"
  | "GUILD_UPDATE"
  | "GUILD_SCHEDULED_EVENT_CREATE"
  | "GUILD_SCHEDULED_EVENT_DELETE"
  | "GUILD_SCHEDULED_EVENT_UPDATE"
  | "GUILD_SCHEDULED_EVENT_USER_ADD"
  | "GUILD_SCHEDULED_EVENT_USER_REMOVE"
  | "INTERACTION_CREATE"
  | "INVITE_CREATE"
  | "INVITE_DELETE"
  | "MESSAGE_CREATE"
  | "MESSAGE_DELETE_BULK"
  | "MESSAGE_DELETE"
  | "MESSAGE_REACTION_ADD"
  | "MESSAGE_REACTION_REMOVE_ALL"
  | "MESSAGE_REACTION_REMOVE_EMOJI"
  | "MESSAGE_REACTION_REMOVE"
  | "MESSAGE_UPDATE"
  | "PRESENCE_UPDATE"
  | "TYPING_START"
  | "USER_UPDATE"
  | "VOICE_SERVER_UPDATE"
  | "VOICE_STATE_UPDATE"
  | "WEBHOOKS_UPDATE"
  | "INTEGRATION_CREATE"
  | "INTEGRATION_UPDATE"
  | "INTEGRATION_DELETE"
  | "STAGE_INSTANCE_CREATE"
  | "STAGE_INSTANCE_UPDATE"
  | "STAGE_INSTANCE_DELETE"
  | "THREAD_CREATE"
  | "THREAD_UPDATE"
  | "THREAD_DELETE"
  | "THREAD_LIST_SYNC"
  | "THREAD_MEMBERS_UPDATE";

export type GatewayEventNames =
  | GatewayDispatchEventNames
  | "READY"
  | "RESUMED"
  // THIS IS A CUSTOM DD EVENT NOT A DISCORD EVENT
  | "GUILD_LOADED_DD";

/** https://discord.com/developers/docs/topics/gateway#list-of-intents */
export enum GatewayIntents {
  /**
   * - GUILD_CREATE
   * - GUILD_DELETE
   * - GUILD_ROLE_CREATE
   * - GUILD_ROLE_UPDATE
   * - GUILD_ROLE_DELETE
   * - CHANNEL_CREATE
   * - CHANNEL_UPDATE
   * - CHANNEL_DELETE
   * - CHANNEL_PINS_UPDATE
   * - THREAD_CREATE
   * - THREAD_UPDATE
   * - THREAD_DELETE
   * - THREAD_LIST_SYNC
   * - THREAD_MEMBER_UPDATE
   * - THREAD_MEMBERS_UPDATE
   * - STAGE_INSTANCE_CREATE
   * - STAGE_INSTANCE_UPDATE
   * - STAGE_INSTANCE_DELETE
   */
  Guilds = 1 << 0,
  /**
   * - GUILD_MEMBER_ADD
   * - GUILD_MEMBER_UPDATE
   * - GUILD_MEMBER_REMOVE
   */
  GuildMembers = 1 << 1,
  /**
   * - GUILD_BAN_ADD
   * - GUILD_BAN_REMOVE
   */
  GuildBans = 1 << 2,
  /**
   * - GUILD_EMOJIS_UPDATE
   */
  GuildEmojis = 1 << 3,
  /**
   * - GUILD_INTEGRATIONS_UPDATE
   * - INTEGRATION_CREATE
   * - INTEGRATION_UPDATE
   * - INTEGRATION_DELETE
   */
  GuildIntegrations = 1 << 4,
  /** Enables the following events:
   * - WEBHOOKS_UPDATE
   */
  GuildWebhooks = 1 << 5,
  /**
   * - INVITE_CREATE
   * - INVITE_DELETE
   */
  GuildInvites = 1 << 6,
  /**
   * - VOICE_STATE_UPDATE
   */
  GuildVoiceStates = 1 << 7,
  /**
   * - PRESENCE_UPDATE
   */
  GuildPresences = 1 << 8,
  /**
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   */
  GuildMessages = 1 << 9,
  /**
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  GuildMessageReactions = 1 << 10,
  /**
   * - TYPING_START
   */
  GuildMessageTyping = 1 << 11,
  /**
   * - CHANNEL_CREATE
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - CHANNEL_PINS_UPDATE
   */
  DirectMessages = 1 << 12,
  /**
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  DirectMessageReactions = 1 << 13,
  /**
   * - TYPING_START
   */
  DirectMessageTyping = 1 << 14,

  /**
   * This intent will add `content` values to all message objects.
   */
  MessageContent = 1 << 15,
  /**
   * - GUILD_SCHEDULED_EVENT_CREATE
   * - GUILD_SCHEDULED_EVENT_UPDATE
   * - GUILD_SCHEDULED_EVENT_DELETE
   * - GUILD_SCHEDULED_EVENT_USER_ADD this is experimental and unstable.
   * - GUILD_SCHEDULED_EVENT_USER_REMOVE this is experimental and unstable.
   */
  GuildScheduledEvents = (1 << 16),
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

// UTILS

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type MakeRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// THANK YOU YUI FOR SHARING THIS!
export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;
export type Camelize<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Array<infer U> ? U extends {} ? Array<Camelize<U>>
  : T[K]
    : T[K] extends {} ? Camelize<T[K]>
    : never;
};

// export type Optionalize<T> = T extends object ?
//   & {
//     [K in KeysWithUndefined<T>]?: Optionalize<T[K]>;
//   }
//   & {
//     [K in Exclude<keyof T, KeysWithUndefined<T>>]: Optionalize<T[K]>;
//   }
//   : T;

// export type KeysWithUndefined<T> = {
//   [K in keyof T]-?: (undefined | null) extends T[K] ? K : never;
// }[keyof T];

// export type Optionalize<T> = (
//   & {
//     [K in KeysWithUndefined<T>]?: Optionalize<T[K]>;
//   }
//   & {
//     [K in Exclude<keyof T, KeysWithUndefined<T>>]: (
//       // deno-lint-ignore ban-types
//       T[K] extends object ? Object extends Pick<T[K], keyof T[K]> ? T[K] : Optionalize<T[K]> : T[K]
//     );
//   }
// );

// export type KeysWithUndefined<T> = {
//   [K in keyof T]-?: undefined extends T[K] ? K
//     : null extends T[K] ? K
//     : never;
// }[keyof T];

// export type Optionalize<T> = T extends object ? (
//   & {
//     [K in KeysWithUndefined<T>]?: T[K] extends Collection<any, any> ? T[K]
//       : T[K] extends any[] ? T[K]
//       : Optionalize<T[K]>;
//   }
//   & {
//     [K in Exclude<keyof T, KeysWithUndefined<T>>]: T[K] extends object ? Object extends Pick<T[K], keyof T[K]> ? T[K]
//     : T[K] extends Collection<any, any> ? T[K]
//     : T[K] extends any[] ? T[K]
//     : Optionalize<T[K]>
//       : T[K];
//   }
// )
//   : T;

export type Id<T> = T extends infer U ? {
  [K in keyof U]: U[K];
}
  : never;

export type KeysWithUndefined<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K
    : null extends T[K] ? K
    : never;
}[keyof T];

export type Optionalize<T> =
  // Collections don't need optionalizing
  T extends Collection<any, any> ? T
    : // If an array only optionalize objects in arrays
    T extends unknown[] ? T[number] extends Record<any, any> ? Array<Optionalize<T[number]>>
    : T
    : // Specific optionalizing of {} go here
    T extends object ? Id<
      & {
        [K in KeysWithUndefined<T>]?: T[K] extends Collection<any, any> ? T[K] : Optionalize<T[K]>;
      }
      & {
        [K in Exclude<keyof T, KeysWithUndefined<T>>]: T[K] extends object ? {} extends Pick<T[K], keyof T[K]> ? T[K]
        : T[K] extends Collection<any, any> ? T[K]
        : T[K] extends unknown[] ? T[K]
        : Optionalize<T[K]>
          : T[K];
      }
    >
    : T;
