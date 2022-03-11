/** https://discord.com/developers/docs/resources/user#user-object */
export interface BaseUser {
  /** The user's username, not unique across the platform */
  username: string;
  /** The user's chosen language option */
  locale?: string;
  /** The flags on a user's account */
  flags?: UserFlags;
  /** The type of Nitro subscription on a user's account */
  premiumType?: PremiumTypes;
  /** The public flags on a user's account */
  publicFlags?: UserFlags;
  /** the user's banner color encoded as an integer representation of hexadecimal color code */
  accentColor?: number;
}

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

/** https://discord.com/developers/docs/resources/user#connection-object */
export interface BaseConnection {
  /** id of the connection account */
  id: string;
  /** The username of the connection account */
  name: string;
  /** The service of the connection (twitch, youtube) */
  type: string;
  /** Whether the connection is revoked */
  revoked?: boolean;
  /** Whether the connection is verified */
  verified: boolean;
  /** Whether friend sync is enabled for this connection */
  friendSync: boolean;
  /** Whether activities related to this connection will be shown in presence updates */
  showActivity: boolean;
  /** Visibility of this connection */
  visibility: VisibilityTypes;
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface BaseIntegration {
  /** Integration Id */
  id: string;
  /** Integration name */
  name: string;
  /** Integration type (twitch, youtube or discord) */
  type: "twitch" | "youtube" | "discord";
  /** Is this integration enabled */
  enabled: boolean;
  /** Is this integration syncing */
  syncing?: boolean;
  /** Role Id that this integration uses for "subscribers" */
  roleId?: string;
  /** Whether emoticons should be synced for this integration (twitch only currently) */
  enableEmoticons?: boolean;
  /** The behavior of expiring subscribers */
  expireBehavior?: IntegrationExpireBehaviors;
  /** The grace period (in days) before expiring subscribers */
  expireGracePeriod?: number;
  /** When this integration was last synced */
  syncedAt?: string;
  /** How many subscribers this integration has */
  subscriberCount?: number;
  /** Has this integration been revoked */
  revoked?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure */
export interface BaseIntegrationAccount {
  /** Id of the account */
  id: string;
  /** Name of the account */
  name: string;
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
export interface BaseIntegrationApplication {
  /** The id of the app */
  id: string;
  /** The name of the app */
  name: string;
  /** the icon hash of the app */
  icon: string | null;
  /** The description of the app */
  description: string;
  /** The summary of the app */
  summary: string;
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

/** https://discord.com/developers/docs/topics/gateway#typing-start */
export interface BaseTypingStart {
  /** Unix time (in seconds) of when the user started typing */
  timestamp: number;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface BaseMember {
  /** Whether the user is deafened in voice channels */
  deaf?: boolean;
  /** Whether the user is muted in voice channels */
  mute?: boolean;
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
}

/** https://discord.com/developers/docs/topics/oauth2#application-object */
export interface BaseApplication {
  /** The name of the app */
  name: string;
  /** The description of the app */
  description: string;
  /** An array of rpc origin urls, if rpc is enabled */
  rpcOrigins?: string[];
  /** When false only app owner can join the app's bot to guilds */
  botPublic: boolean;
  /** When true the app's bot will only join upon completion of the full oauth2 code grant flow */
  botRequireCodeGrant: boolean;
  /** The url of the app's terms of service */
  termsOfServiceUrl?: string;
  /** The url of the app's privacy policy */
  privacyPolicyUrl?: string;
  /** The hex encoded key for verification in interactions and the GameSDK's GetTicket */
  verifyKey: string;
  /** If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  primarySkuId?: string;
  /** If this application is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string;
  /** The application's public flags */
  flags?: ApplicationFlags;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface BaseTeam {
  /** The name of the team */
  name: string;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface BaseTeamMember {
  /** The user's membership state on the team */
  membershipState: TeamMembershipStates;
  /** Will always be `["*"]` */
  permissions: "*"[];
}

/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum TeamMembershipStates {
  Invited = 1,
  Accepted,
}

/** https://discord.com/developers/docs/topics/oauth2#application-application-flags */
export enum ApplicationFlags {
  GatewayPresence = 1 << 12,
  GatewayPresenceLimited = 1 << 13,
  GatewayGuildMembers = 1 << 14,
  GatewayGuildMembersLimited = 1 << 15,
  VerificationPendingGuildLimit = 1 << 16,
  Embedded = 1 << 17,
  GatewayMessageCount = 1 << 18,
  GatewayMessageContentLimited = 1 << 19,
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface BaseAllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean;
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

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface BaseEmbed {
  /** Title of embed */
  title?: string;
  /** Type of embed (always "rich" for webhook embeds) */
  type?: EmbedTypes;
  /** Description of embed */
  description?: string;
  /** Url of embed */
  url?: string;
  /** Color code of the embed */
  color?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface BaseEmbedAuthor {
  /** Name of author */
  name: string;
  /** Url of author */
  url?: string;
  /** Url of author icon (only supports http(s) and attachments) */
  iconUrl?: string;
  /** A proxied url of author icon */
  proxyIconUrl?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface BaseEmbedField {
  /** Name of the field */
  name: string;
  /** Value of the field */
  value: string;
  /** Whether or not this field should display inline */
  inline?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface BaseEmbedFooter {
  /** Footer text */
  text: string;
  /** Url of footer icon (only supports http(s) and attachments) */
  iconUrl?: string;
  /** A proxied url of footer icon */
  proxyIconUrl?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface BaseEmbedImage {
  /** Source url of image (only supports http(s) and attachments) */
  url: string;
  /** A proxied url of the image */
  proxyUrl?: string;
  /** Height of image */
  height?: number;
  /** Width of image */
  width?: number;
}

export interface BaseEmbedProvider {
  /** Name of provider */
  name?: string;
  /** Url of provider */
  url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface BaseEmbedThumbnail {
  /** Source url of thumbnail (only supports http(s) and attachments) */
  url: string;
  /** A proxied url of the thumbnail */
  proxyUrl?: string;
  /** Height of thumbnail */
  height?: number;
  /** Width of thumbnail */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-types */
export type EmbedTypes = "rich" | "image" | "video" | "gifv" | "article" | "link";

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface BaseEmbedVideo {
  /** Source url of video */
  url?: string;
  /** A proxied url of the video */
  proxyUrl?: string;
  /** Height of video */
  height?: number;
  /** Width of video */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#attachment-object */
export interface BaseAttachment {
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
  /** Whether this attachment is ephemeral */
  ephemeral?: boolean;
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export type BaseWebhook = BaseIncomingWebhook | BaseApplicationWebhook;

export interface BaseIncomingWebhook {
  /** The type of the webhook */
  type: WebhookTypes;
  /** The secure token of the webhook (returned for Incomming Webhooks) */
  token?: string;
  /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string;
}

export interface BaseApplicationWebhook extends BaseIncomingWebhook {
  type: WebhookTypes.Application;
}

/** https://discord.com/developers/docs/resources/guild#guild-object */
export interface BaseGuild {
  /** Guild name (2-100 characaters, excluding trailing and leading whitespace) */
  name: string;
  /** True if the user is the owner of the guild */
  owner?: boolean;
  /** Afk timeout in seconds */
  afkTimeout: number;
  /** True if the server widget is enabled */
  widgetEnabled?: boolean;
  /** Verification level required for the guild */
  verificationLevel: VerificationLevels;
  /** Default message notifications level */
  defaultMessageNotifications: DefaultMessageNotificationLevels;
  /** Explicit content filter level */
  explicitContentFilter: ExplicitContentFilterLevels;
  /** Enabled guild features */
  features: GuildFeatures[];
  /** Required MFA level for the guild */
  mfaLevel: MfaLevels;
  /** System channel flags */
  systemChannelFlags: SystemChannelFlags;
  /** True if this is considered a large guild */
  large?: boolean;
  /** True if this guild is unavailable due to an outage */
  unavailable?: boolean;
  /** Total number of members in this guild */
  memberCount?: number;
  /** The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  maxPresences?: number | null;
  /** The maximum number of members for the guild */
  maxMembers?: number;
  /** The vaniy url code for the guild */
  vanityUrlCode: string | null;
  /** The description of a Community guild */
  description: string | null;
  /** Premium tier (Server Boost level) */
  premiumTier: PremiumTiers;
  /** The number of boosts this guild currently has */
  premiumSubscriptionCount?: number;
  // TODO: Can be optimized to a number but is it worth it?
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale: string;
  /** The maximum amount of users in a video channel */
  maxVideoChannelUsers?: number;
  /** Approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true */
  approximateMemberCount?: number;
  /**	Approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true */
  approximatePresenceCount?: number;
  /** Guild NSFW level */
  nsfwLevel: GuildNsfwLevel;
  /** Whether the guild has the boost progress bar enabled */
  premiumProgressBarEnabled: boolean;
}

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

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface BaseEmoji {
  /** Emoji name (can only be null in reaction emoji objects) */
  name?: string;
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

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface BaseVoiceState {
  /** The session id for this voice state */
  sessionId: string;
}

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface BaseChannel {
  /** The type of channel */
  type: ChannelTypes;
  /** Sorting position of the channel */
  position?: number;
  /** The name of the channel (1-100 characters) */
  name?: string;
  /** The channel topic (0-1024 characters) */
  topic?: string | null;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** The bitrate (in bits) of the voice channel */
  bitrate?: number;
  /** The user limit of the voice channel */
  userLimit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number;
  /** Voice region id for the voice channel, automatic when set to null */
  rtcRegion?: string | null;
  /** The camera video quality mode of the voice channel, 1 when not present */
  videoQualityMode?: VideoQualityModes;
  /** An approximate count of messages in a thread, stops counting at 50 */
  messageCount?: number;
  /** An approximate count of users in a thread, stops counting at 50 */
  memberCount?: number;
  /** Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  defaultAutoArchiveDuration?: number;
}

/** https://discord.com/developers/docs/topics/gateway#presence-update */
export interface BasePresenceUpdate {
  
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure */
export interface BaseWelcomeScreen {
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface BaseWelcomeScreenChannel {
  /** The description shown for the channel */
  description: string;
}

/** https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure */
export interface BaseStageInstance {
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
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

export interface BaseOverwrite {
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes;
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

export interface BaseThreadMetadata {
  /** Whether the thread is archived */
  archived: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
}

export interface BaseThreadMemberBase {
  /** Any user-thread settings, currently only used for notifications */
  flags: number;
}

export interface BaseThreadMember extends BaseThreadMemberBase {
}

/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface BaseActivity {
  /** The activity's name */
  name: string;
  /** Activity type */
  type: ActivityTypes;
  /** Stream url, is validated when type is 1 */
  url?: string | null;
  /** Unix timestamp of when the activity was added to the user's session */
  createdAt: number;
  /** What the player is currently doing */
  details?: string | null;
  /** The user's current party status */
  state?: string | null;
  /** Whether or not the activity is an instanced game session */
  instance?: boolean;
  /** Activity flags `OR`d together, describes what the payload includes */
  flags?: number;
}

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export interface BaseClientStatus {
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string;
  /** The user's status set for an active mobile (iOS, Android) application session */
  mobile?: string;
  /** The user's status set for an active web (browser, bot account) application session */
  web?: string;
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

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export interface BaseActivityTimestamps {
  /** Unix time (in milliseconds) of when the activity started */
  start?: number;
  /** Unix time (in milliseconds) of when the activity ends */
  end?: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface BaseActivityEmoji {
  /** The name of the emoji */
  name: string;
  /** Whether this emoji is animated */
  animated?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface BaseActivityParty {
  /** Used to show the party's current and maximum size */
  size?: [currentSize: number, maxSize: number];
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface BaseActivityAssets {
  /** Text displayed when hovering over the large image of the activity */
  largeText?: string;
  /** Text displayed when hovering over the small image of the activity */
  smallText?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets */
export interface BaseActivitySecrets {
  /** The secret for joining a party */
  join?: string;
  /** The secret for spectating a game */
  spectate?: string;
  /** The secret for a specific instanced match */
  match?: string;
}

// https://github.com/discord/discord-api-docs/pull/2219
// TODO: add documentation link
export interface BaseActivityButton {
  /** The text shown on the button (1-32 characters) */
  label: string;
  /** The url opened when clicking the button (1-512 characters) */
  url: string;
}

export interface BaseMemberWithUser extends BaseMember {

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
  /** Allows guild members to view a channel, which includes reading messages in text channels */
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
  START_EMBEDDED_ACTIVITIES = 0x0000008000000000,
  /** Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels */
  MODERATE_MEMBERS = 0x0000010000000000,
}

export type PermissionStrings = keyof typeof BitwisePermissionFlags;

// UTILS

// deno-lint-ignore-file ban-types no-explicit-any

export type UpperCaseCharacters =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type WordSeparators = "-" | "_" | " ";

export type StringDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type Split<S extends string, D extends string> = string extends S ? string[]
  : S extends "" ? []
  : S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>]
  : [S];

export type SplitIncludingDelimiters<Source extends string, Delimiter extends string> = Source extends "" ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
    ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
      ? UsedDelimiter extends Delimiter ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}` ? [
        ...SplitIncludingDelimiters<FirstPart, Delimiter>,
        UsedDelimiter,
        ...SplitIncludingDelimiters<SecondPart, Delimiter>,
      ]
      : never
      : never
    : never
  : [Source];

type InnerCamelCaseStringArray<Parts extends any[], PreviousPart> = Parts extends [
  `${infer FirstPart}`,
  ...infer RemainingParts,
] ? FirstPart extends undefined ? ""
: FirstPart extends "" ? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
: `${PreviousPart extends "" ? FirstPart : Capitalize<FirstPart>}${InnerCamelCaseStringArray<
  RemainingParts,
  FirstPart
>}`
  : "";

type CamelCaseStringArray<Parts extends string[]> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? Uncapitalize<`${FirstPart}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`>
  : never;

type StringPartToDelimiterCase<
  StringPart extends string,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = StringPart extends UsedWordSeparators ? Delimiter
  : StringPart extends UsedUpperCaseCharacters ? `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;

type StringArrayToDelimiterCase<
  Parts extends any[],
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts] ? `${StringPartToDelimiterCase<
  FirstPart,
  UsedWordSeparators,
  UsedUpperCaseCharacters,
  Delimiter
>}${StringArrayToDelimiterCase<RemainingParts, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter>}`
  : "";

export type DelimiterCase<Value, Delimiter extends string> = Value extends string ? StringArrayToDelimiterCase<
  SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
  WordSeparators,
  UpperCaseCharacters,
  Delimiter
>
  : Value;

export type DelimiterCasedProperties<Value, Delimiter extends string> = Value extends Function ? Value
  : Value extends Array<infer U> ? Value
  : { [K in keyof Value as DelimiterCase<K, Delimiter>]: Value[K] };

export type DelimiterCasedPropertiesDeep<Value, Delimiter extends string> = Value extends Function ? Value
  : Value extends Array<infer U> ? Array<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : Value extends Set<infer U> ? Set<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : {
    [K in keyof Value as DelimiterCase<K, Delimiter>]: DelimiterCasedPropertiesDeep<Value[K], Delimiter>;
  };

export type SnakeCase<Value> = DelimiterCase<Value, "_">;

export type CamelCase<K> = K extends string ? CamelCaseStringArray<Split<K, WordSeparators>> : K;

export type SnakeCasedProperties<Value> = DelimiterCasedProperties<Value, "_">;

export type CamelCasedProperties<Value> = Value extends Function ? Value
  : Value extends Array<infer U> ? Value
  : {
    [K in keyof Value as CamelCase<K>]: Value[K];
  };

export type SnakeCasedPropertiesDeep<Value> = DelimiterCasedPropertiesDeep<Value, "_">;

export type CamelCasedPropertiesDeep<Value> = Value extends Function ? Value
  : Value extends Array<infer U> ? Array<CamelCasedPropertiesDeep<U>>
  : Value extends Set<infer U> ? Set<CamelCasedPropertiesDeep<U>>
  : {
    [K in keyof Value as CamelCase<K>]: CamelCasedPropertiesDeep<Value[K]>;
  };

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type MakeRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

