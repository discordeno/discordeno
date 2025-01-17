import type { Locales } from './discord/reference.js'

export type BigString = bigint | string

/** https://discord.com/developers/docs/resources/user#user-object-premium-types */
export enum PremiumTypes {
  None,
  NitroClassic,
  Nitro,
  NitroBasic,
}

/** https://discord.com/developers/docs/resources/user#user-object-user-flags */
export enum UserFlags {
  DiscordEmployee = 1 << 0,
  PartneredServerOwner = 1 << 1,
  HypeSquadEventsMember = 1 << 2,
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
  ActiveDeveloper = 1 << 22,
}

export enum MemberFlags {
  /**
   * Member has left and rejoined the guild
   *
   * @remarks
   * This value is not editable
   */
  DidRejoin = 1 << 0,
  /**
   * Member has completed onboarding
   *
   * @remarks
   * This value is not editable
   */
  CompletedOnboarding = 1 << 1,
  /** Member is exempt from guild verification requirements */
  BypassesVerification = 1 << 2,
  /**
   * Member has started onboarding
   *
   * @remarks
   * This value is not editable
   */
  StartedOnboarding = 1 << 3,
  /**
   * Member is a guest and can only access the voice channel they were invited to
   *
   * @remarks
   * This value is not editable
   */
  IsGuest = 1 << 4,
  /**
   * Member has started Server Guide new member actions
   *
   * @remarks
   * This value is not editable
   */
  StartedHomeActions = 1 << 5,
  /**
   * Member has completed Server Guide new member actions
   *
   * @remarks
   * This value is not editable
   */
  CompletedHomeActions = 1 << 6,
  /**
   * Member's username, display name, or nickname is blocked by AutoMod
   *
   * @remarks
   * This value is not editable
   */
  AutomodQuarantinedUsername = 1 << 7,
  /**
   * Member has dismissed the DM settings upsell
   *
   * @remarks
   * This value is not editable
   */
  DmSettingsUpsellAcknowledged = 1 << 9,
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-flags */
export enum RoleFlags {
  None,
  /** Role can be selected by members in an onboarding prompt */
  InPrompt = 1 << 0,
}

export enum AttachmentFlags {
  None,
  /** This attachment has been edited using the remix feature on mobile */
  IsRemix = 1 << 2,
}

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags */
export enum SkuFlags {
  /** SKU is available for purchase */
  Available = 1 << 2,
  /** Recurring SKU that can be purchased by a user and applied to a single server. Grants access to every user in that server. */
  GuildSubscription = 1 << 7,
  /** Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server. */
  UserSubscription = 1 << 8,
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
  Ephemeral = 1 << 6,
  /** This message is an Interaction Response and the bot is "thinking" */
  Loading = 1 << 7,
  /** This message failed to mention some roles and add their members to the thread */
  FailedToMentionSomeRolesInThread = 1 << 8,
  /** This message will not trigger push and desktop notifications */
  SuppressNotifications = 1 << 12,
  /** This message is a voice message */
  IsVoiceMessage = 1 << 13,
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors */
export enum IntegrationExpireBehaviors {
  RemoveRole,
  Kick,
}

/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum TeamMembershipStates {
  Invited = 1,
  Accepted,
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionsTypes {
  /** Controls role mentions */
  RoleMentions = 'roles',
  /** Controls user mentions */
  UserMentions = 'users',
  /** Controls \@everyone and \@here mentions */
  EveryoneMentions = 'everyone',
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
export type EmbedTypes = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link' | 'poll_result'

/** https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level */
export enum DefaultMessageNotificationLevels {
  /** Members will receive notifications for all messages by default */
  AllMessages,
  /** Members will receive notifications only for messages that \@mention them by default */
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

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-features */
export enum GuildFeatures {
  /** Guild has access to set an invite splash background */
  InviteSplash = 'INVITE_SPLASH',
  /** Guild has access to set 384 kbps bitrate in voice (previously VIP voice servers) */
  VipRegions = 'VIP_REGIONS',
  /** Guild has access to set a vanity URL */
  VanityUrl = 'VANITY_URL',
  /** Guild is verified */
  Verified = 'VERIFIED',
  /** Guild is partnered */
  Partnered = 'PARTNERED',
  /** Guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates */
  Community = 'COMMUNITY',
  /** Guild has enabled monetization. */
  CreatorMonetizableProvisional = 'CREATOR_MONETIZABLE_PROVISIONAL',
  /** Guild has enabled the role subscription promo page. */
  CreatorStorePage = 'CREATOR_STORE_PAGE',
  /** Guild has been set as a support server on the App Directory */
  DeveloperSupportServer = 'DEVELOPER_SUPPORT_SERVER',
  /** Guild has access to create news channels */
  News = 'NEWS',
  /** Guild is able to be discovered in the directory */
  Discoverable = 'DISCOVERABLE',
  /** Guild is able to be featured in the directory */
  Featurable = 'FEATURABLE',
  /** Guild has access to set an animated guild icon */
  AnimatedIcon = 'ANIMATED_ICON',
  /** Guild has access to set a guild banner image */
  Banner = 'BANNER',
  /** Guild has enabled the welcome screen */
  WelcomeScreenEnabled = 'WELCOME_SCREEN_ENABLED',
  /** Guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  MemberVerificationGateEnabled = 'MEMBER_VERIFICATION_GATE_ENABLED',
  /** Guild has increased custom soundboard sound slots. */
  MoreSoundboard = 'MORE_SOUNDBOARD',
  /** Guild can be previewed before joining via Membership Screening or the directory */
  PreviewEnabled = 'PREVIEW_ENABLED',
  /** Guild has enabled ticketed events */
  TicketedEventsEnabled = 'TICKETED_EVENTS_ENABLED',
  /** Guild has increased custom sticker slots */
  MoreStickers = 'MORE_STICKERS',
  /** Guild is able to set role icons */
  RoleIcons = 'ROLE_ICONS',
  /** Guild has role subscriptions that can be purchased. */
  RoleSubscriptionsAvailableForPurchase = 'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE',
  /** Guild has enabled role subscriptions. */
  RoleSubscriptionsEnabled = 'ROLE_SUBSCRIPTIONS_ENABLED',
  /** Guild has created soundboard sounds. */
  Soundboard = 'SOUNDBOARD',
  /** Guild has set up auto moderation rules */
  AutoModeration = 'AUTO_MODERATION',
  /** Guild has paused invites, preventing new users from joining */
  InvitesDisabled = 'INVITES_DISABLED',
  /** Guild has access to set an animated guild banner image */
  AnimatedBanner = 'ANIMATED_BANNER',
  /** Guild has disabled alerts for join raids in the configured safety alerts channel */
  RaidAlertsDisabled = 'RAID_ALERTS_DISABLED',
  /** Guild is using the old permissions configuration behavior */
  ApplicationCommandPermissionsV2 = 'APPLICATION_COMMAND_PERMISSIONS_V2',
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

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level */
export enum GuildNsfwLevel {
  Default,
  Explicit,
  Safe,
  AgeRestricted,
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
  UserJoin,
  GuildBoost,
  GuildBoostTier1,
  GuildBoostTier2,
  GuildBoostTier3,
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
  AutoModerationAction,
  RoleSubscriptionPurchase,
  InteractionPremiumUpsell,
  StageStart,
  StageEnd,
  StageSpeaker,
  StageTopic = 31,
  GuildApplicationPremiumSubscription,
  GuildIncidentAlertModeEnabled = 36,
  GuildIncidentAlertModeDisabled,
  GuildIncidentReportRaid,
  GuildIncidentReportFalseAlarm,
  PurchaseNotification = 44,
  PollResult = 46,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum MessageActivityTypes {
  Join = 1,
  Spectate = 2,
  Listen = 3,
  JoinRequest = 5,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types */
export enum StickerTypes {
  /** an official sticker in a pack */
  Standard = 1,
  /** a sticker uploaded to a guild for the guild's members */
  Guild,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types */
export enum StickerFormatTypes {
  Png = 1,
  APng,
  Lottie,
  Gif,
}

export enum ScheduledEventPrivacyLevel {
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

/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export const BitwisePermissionFlags = {
  /** Allows creation of instant invites */
  CREATE_INSTANT_INVITE: 1n << 0n,
  /** Allows kicking members */
  KICK_MEMBERS: 1n << 1n,
  /** Allows banning members */
  BAN_MEMBERS: 1n << 2n,
  /** Allows all permissions and bypasses channel permission overwrites */
  ADMINISTRATOR: 1n << 3n,
  /** Allows management and editing of channels */
  MANAGE_CHANNELS: 1n << 4n,
  /** Allows management and editing of the guild */
  MANAGE_GUILD: 1n << 5n,
  /** Allows for the addition of reactions to messages */
  ADD_REACTIONS: 1n << 6n,
  /** Allows for viewing of audit logs */
  VIEW_AUDIT_LOG: 1n << 7n,
  /** Allows for using priority speaker in a voice channel */
  PRIORITY_SPEAKER: 1n << 8n,
  /** Allows the user to go live */
  STREAM: 1n << 9n,
  /** Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels */
  VIEW_CHANNEL: 1n << 10n,
  /** Allows for sending messages in a channel. (does not allow sending messages in threads) */
  SEND_MESSAGES: 1n << 11n,
  /** Allows for sending of /tts messages */
  SEND_TTS_MESSAGES: 1n << 12n,
  /** Allows for deletion of other users messages */
  MANAGE_MESSAGES: 1n << 13n,
  /** Links sent by users with this permission will be auto-embedded */
  EMBED_LINKS: 1n << 14n,
  /** Allows for uploading images and files */
  ATTACH_FILES: 1n << 15n,
  /** Allows for reading of message history */
  READ_MESSAGE_HISTORY: 1n << 16n,
  /** Allows for using the \@everyone tag to notify all users in a channel, and the \@here tag to notify all online users in a channel */
  MENTION_EVERYONE: 1n << 17n,
  /** Allows the usage of custom emojis from other servers */
  USE_EXTERNAL_EMOJIS: 1n << 18n,
  /** Allows for viewing guild insights */
  VIEW_GUILD_INSIGHTS: 1n << 19n,
  /** Allows for joining of a voice channel */
  CONNECT: 1n << 20n,
  /** Allows for speaking in a voice channel */
  SPEAK: 1n << 21n,
  /** Allows for muting members in a voice channel */
  MUTE_MEMBERS: 1n << 22n,
  /** Allows for deafening of members in a voice channel */
  DEAFEN_MEMBERS: 1n << 23n,
  /** Allows for moving of members between voice channels */
  MOVE_MEMBERS: 1n << 24n,
  /** Allows for using voice-activity-detection in a voice channel */
  USE_VAD: 1n << 25n,
  /** Allows for modification of own nickname */
  CHANGE_NICKNAME: 1n << 26n,
  /** Allows for modification of other users nicknames */
  MANAGE_NICKNAMES: 1n << 27n,
  /** Allows management and editing of roles */
  MANAGE_ROLES: 1n << 28n,
  /** Allows management and editing of webhooks */
  MANAGE_WEBHOOKS: 1n << 29n,
  /** Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users */
  MANAGE_GUILD_EXPRESSIONS: 1n << 30n,
  /** Allows members to use application commands in text channels */
  USE_SLASH_COMMANDS: 1n << 31n,
  /** Allows for requesting to speak in stage channels. */
  REQUEST_TO_SPEAK: 1n << 32n,
  /** Allows for editing and deleting scheduled events created by all users */
  MANAGE_EVENTS: 1n << 33n,
  /** Allows for deleting and archiving threads, and viewing all private threads */
  MANAGE_THREADS: 1n << 34n,
  /** Allows for creating public and announcement threads */
  CREATE_PUBLIC_THREADS: 1n << 35n,
  /** Allows for creating private threads */
  CREATE_PRIVATE_THREADS: 1n << 36n,
  /** Allows the usage of custom stickers from other servers */
  USE_EXTERNAL_STICKERS: 1n << 37n,
  /** Allows for sending messages in threads */
  SEND_MESSAGES_IN_THREADS: 1n << 38n,
  /** Allows for launching activities (applications with the `EMBEDDED` flag) in a voice channel. */
  USE_EMBEDDED_ACTIVITIES: 1n << 39n,
  /** Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels */
  MODERATE_MEMBERS: 1n << 40n,
  /** Allows for viewing role subscription insights. */
  VIEW_CREATOR_MONETIZATION_ANALYTICS: 1n << 41n,
  /** Allows for using soundboard in a voice channel. */
  USE_SOUNDBOARD: 1n << 42n,
  /** Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user */
  CREATE_GUILD_EXPRESSIONS: 1n << 43n,
  /** Allows for creating scheduled events, and editing and deleting those created by the current user */
  CREATE_EVENTS: 1n << 44n,
  /** Allows the usage of custom soundboards sounds from other servers */
  USE_EXTERNAL_SOUNDS: 1n << 45n,
  /** Allows sending voice messages */
  SEND_VOICE_MESSAGES: 1n << 46n,
  /** Allows sending polls */
  SEND_POLLS: 1n << 49n,
  /** Allows user-installed apps to send public responses. When disabled, users will still be allowed to use their apps but the responses will be ephemeral. This only applies to apps not also installed to the server. */
  USE_EXTERNAL_APPS: 1n << 50n,
} as const

export type PermissionStrings = keyof typeof BitwisePermissionFlags

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#opcodes-and-status-codes */
export enum GatewayCloseEventCodes {
  /** A normal closure of the gateway. You may attempt to reconnect. */
  NormalClosure = 1000,
  /** We're not sure what went wrong. Try reconnecting? */
  UnknownError = 4000,
  /** You sent an invalid [Gateway opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes) or an invalid payload for an opcode. Don't do that! */
  UnknownOpcode,
  /** You sent an invalid [payload](https://discord.com/developers/docs/topics/gateway#sending-payloads) to us. Don't do that! */
  DecodeError,
  /** You sent us a payload prior to [identifying](https://discord.com/developers/docs/topics/gateway-events#identify), or this session has been invalidated. */
  NotAuthenticated,
  /** The account token sent with your [identify payload](https://discord.com/developers/docs/topics/gateway-events#identify) is incorrect. */
  AuthenticationFailed,
  /** You sent more than one identify payload. Don't do that! */
  AlreadyAuthenticated,
  /** The sequence sent when [resuming](https://discord.com/developers/docs/topics/gateway-events#resume) the session was invalid. Reconnect and start a new session. */
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
  /** Used to request soundboard sounds for a list of guilds. */
  RequestSoundboardSounds = 31,
}

export type GatewayDispatchEventNames =
  | 'READY'
  | 'APPLICATION_COMMAND_PERMISSIONS_UPDATE'
  | 'AUTO_MODERATION_RULE_CREATE'
  | 'AUTO_MODERATION_RULE_UPDATE'
  | 'AUTO_MODERATION_RULE_DELETE'
  | 'AUTO_MODERATION_ACTION_EXECUTION'
  | 'CHANNEL_CREATE'
  | 'CHANNEL_UPDATE'
  | 'CHANNEL_DELETE'
  | 'CHANNEL_PINS_UPDATE'
  | 'THREAD_CREATE'
  | 'THREAD_UPDATE'
  | 'THREAD_DELETE'
  | 'THREAD_LIST_SYNC'
  | 'THREAD_MEMBER_UPDATE'
  | 'THREAD_MEMBERS_UPDATE'
  | 'GUILD_AUDIT_LOG_ENTRY_CREATE'
  | 'GUILD_CREATE'
  | 'GUILD_UPDATE'
  | 'GUILD_DELETE'
  | 'GUILD_BAN_ADD'
  | 'GUILD_BAN_REMOVE'
  | 'GUILD_EMOJIS_UPDATE'
  | 'GUILD_STICKERS_UPDATE'
  | 'GUILD_INTEGRATIONS_UPDATE'
  | 'GUILD_MEMBER_ADD'
  | 'GUILD_MEMBER_REMOVE'
  | 'GUILD_MEMBER_UPDATE'
  | 'GUILD_MEMBERS_CHUNK'
  | 'GUILD_ROLE_CREATE'
  | 'GUILD_ROLE_UPDATE'
  | 'GUILD_ROLE_DELETE'
  | 'GUILD_SCHEDULED_EVENT_CREATE'
  | 'GUILD_SCHEDULED_EVENT_UPDATE'
  | 'GUILD_SCHEDULED_EVENT_DELETE'
  | 'GUILD_SCHEDULED_EVENT_USER_ADD'
  | 'GUILD_SCHEDULED_EVENT_USER_REMOVE'
  | 'GUILD_SOUNDBOARD_SOUND_CREATE'
  | 'GUILD_SOUNDBOARD_SOUND_UPDATE'
  | 'GUILD_SOUNDBOARD_SOUND_DELETE'
  | 'GUILD_SOUNDBOARD_SOUNDS_UPDATE'
  | 'SOUNDBOARD_SOUNDS'
  | 'INTEGRATION_CREATE'
  | 'INTEGRATION_UPDATE'
  | 'INTEGRATION_DELETE'
  | 'INTERACTION_CREATE'
  | 'INVITE_CREATE'
  | 'INVITE_DELETE'
  | 'MESSAGE_CREATE'
  | 'MESSAGE_UPDATE'
  | 'MESSAGE_DELETE'
  | 'MESSAGE_DELETE_BULK'
  | 'MESSAGE_REACTION_ADD'
  | 'MESSAGE_REACTION_REMOVE'
  | 'MESSAGE_REACTION_REMOVE_ALL'
  | 'MESSAGE_REACTION_REMOVE_EMOJI'
  | 'PRESENCE_UPDATE'
  | 'STAGE_INSTANCE_CREATE'
  | 'STAGE_INSTANCE_UPDATE'
  | 'STAGE_INSTANCE_DELETE'
  | 'TYPING_START'
  | 'USER_UPDATE'
  | 'VOICE_CHANNEL_EFFECT_SEND'
  | 'VOICE_STATE_UPDATE'
  | 'VOICE_SERVER_UPDATE'
  | 'WEBHOOKS_UPDATE'
  | 'ENTITLEMENT_CREATE'
  | 'ENTITLEMENT_UPDATE'
  | 'ENTITLEMENT_DELETE'
  | 'SUBSCRIPTION_CREATE'
  | 'SUBSCRIPTION_UPDATE'
  | 'SUBSCRIPTION_DELETE'
  | 'MESSAGE_POLL_VOTE_ADD'
  | 'MESSAGE_POLL_VOTE_REMOVE'

export type GatewayEventNames = GatewayDispatchEventNames | 'RESUMED'

export type Localization = Partial<Record<Locales, string>>

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
export type CamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<CamelCase<U>>}` : S
export type SnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Lowercase<T> ? '' : '_'}${Lowercase<T>}${SnakeCase<U>}` : S

export type Camelize<T> = T extends any[]
  ? T extends Record<any, any>[]
    ? Camelize<T[number]>[]
    : T
  : T extends Record<any, any>
    ? { [K in keyof T as CamelCase<K & string>]: Camelize<T[K]> }
    : T

export type Snakelize<T> = T extends any[]
  ? T extends Record<any, any>[]
    ? Snakelize<T[number]>[]
    : T
  : T extends Record<any, any>
    ? { [K in keyof T as SnakeCase<K & string>]: Snakelize<T[K]> }
    : T

export type PickPartial<T, K extends keyof T> = { [P in keyof T]?: T[P] | undefined } & { [P in K]: T[P] }

// Functions are objects for TS, so we need to check for them explicitly
export type RecursivePartial<T> = T extends object ? (T extends (...args: never[]) => unknown ? T : { [K in keyof T]?: RecursivePartial<T[K]> }) : T
