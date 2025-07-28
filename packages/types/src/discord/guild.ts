/** Types for: https://discord.com/developers/docs/resources/guild */

import type { ChannelTypes, DiscordChannel, DiscordOverwrite, DiscordThreadMember, SortOrderTypes } from './channel.js'
import type { DiscordEmoji } from './emoji.js'
import type { DiscordGuildCreateExtra } from './gateway.js'
import type { OAuth2Scope } from './oauth2.js'
import type { DiscordRole } from './permissions.js'
import type { DiscordSticker } from './sticker.js'
import type { DiscordAvatarDecorationData, DiscordUser } from './user.js'

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-structure */
export interface DiscordGuild extends Partial<DiscordGuildCreateExtra> {
  /** Guild name (2-100 characters, excluding trailing and leading whitespace) */
  name: string
  /** True if the user is the owner of the guild */
  owner?: boolean
  /** Afk timeout in seconds */
  afk_timeout: number
  /** True if the server widget is enabled */
  widget_enabled?: boolean
  /** Verification level required for the guild */
  verification_level: VerificationLevels
  /** Default message notifications level */
  default_message_notifications: DefaultMessageNotificationLevels
  /** Explicit content filter level */
  explicit_content_filter: ExplicitContentFilterLevels
  /** Enabled guild features */
  features: GuildFeatures[]
  /** Required MFA level for the guild */
  mfa_level: MfaLevels
  /** System channel flags */
  system_channel_flags: SystemChannelFlags
  /** The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  max_presences?: number | null
  /** The maximum number of members for the guild */
  max_members?: number
  /** The vanity url code for the guild */
  vanity_url_code: string | null
  /** The description of a guild */
  description: string | null
  /** Premium tier (Server Boost level) */
  premium_tier: PremiumTiers
  /** The number of boosts this guild currently has */
  premium_subscription_count?: number
  /** The maximum amount of users in a video channel */
  max_video_channel_users?: number
  /** Maximum amount of users in a stage video channel */
  max_stage_video_channel_users?: number
  /** Approximate number of members in this guild, returned from the GET /guilds/id endpoint when with_counts is true */
  approximate_member_count?: number
  /** Approximate number of non-offline members in this guild, returned from the GET /guilds/id endpoint when with_counts is true */
  approximate_presence_count?: number
  /** Guild NSFW level */
  nsfw_level: GuildNsfwLevel
  /** Whether the guild has the boost progress bar enabled */
  premium_progress_bar_enabled: boolean
  /** Guild id */
  id: string
  /** Icon hash */
  icon: string | null
  /** Icon hash, returned when in the template object */
  icon_hash?: string | null
  /** Splash hash */
  splash: string | null
  /** Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discovery_splash: string | null
  /** Id of the owner */
  owner_id: string
  /** Total permissions for the user in the guild (excludes overwrites and implicit permissions) */
  permissions?: string
  /** Id of afk channel */
  afk_channel_id: string | null
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widget_channel_id?: string | null
  /** Roles in the guild */
  roles: DiscordRole[]
  /** Custom guild emojis */
  emojis: DiscordEmoji[]
  /** Application id of the guild creator if it is bot-created */
  application_id: string | null
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  system_channel_id: string | null
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rules_channel_id: string | null
  /** Banner hash */
  banner: string | null
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferred_locale: string
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  public_updates_channel_id: string | null
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcome_screen?: DiscordWelcomeScreen
  /** Custom guild stickers */
  stickers?: DiscordSticker[]
  /** The id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
  safety_alerts_channel_id: string | null
  /** The incidents data for this guild */
  incidents_data: DiscordIncidentsData
}

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

/** https://discord.com/developers/docs/resources/guild#guild-object-mfa-level */
export enum MfaLevels {
  /** Guild has no MFA/2FA requirement for moderation actions */
  None,
  /** Guild has a 2FA requirement for moderation actions */
  Elevated,
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

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level */
export enum GuildNsfwLevel {
  Default,
  Explicit,
  Safe,
  AgeRestricted,
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

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-features */
export enum GuildFeatures {
  /** Guild has access to set an animated guild banner image */
  AnimatedBanner = 'ANIMATED_BANNER',
  /** Guild has access to set an animated guild icon */
  AnimatedIcon = 'ANIMATED_ICON',
  /** Guild is using the old permissions configuration behavior */
  ApplicationCommandPermissionsV2 = 'APPLICATION_COMMAND_PERMISSIONS_V2',
  /** Guild has set up auto moderation rules */
  AutoModeration = 'AUTO_MODERATION',
  /** Guild has access to set a guild banner image */
  Banner = 'BANNER',
  /** Guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates */
  Community = 'COMMUNITY',
  /** Guild has enabled monetization. */
  CreatorMonetizableProvisional = 'CREATOR_MONETIZABLE_PROVISIONAL',
  /** Guild has enabled the role subscription promo page. */
  CreatorStorePage = 'CREATOR_STORE_PAGE',
  /** Guild has been set as a support server on the App Directory */
  DeveloperSupportServer = 'DEVELOPER_SUPPORT_SERVER',
  /** Guild is able to be discovered in the directory */
  Discoverable = 'DISCOVERABLE',
  /** Guild is able to be featured in the directory */
  Featurable = 'FEATURABLE',
  /** Guild has paused invites, preventing new users from joining */
  InvitesDisabled = 'INVITES_DISABLED',
  /** Guild has access to set an invite splash background */
  InviteSplash = 'INVITE_SPLASH',
  /** Guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  MemberVerificationGateEnabled = 'MEMBER_VERIFICATION_GATE_ENABLED',
  /** Guild has increased custom soundboard sound slots. */
  MoreSoundboard = 'MORE_SOUNDBOARD',
  /** Guild has increased custom sticker slots */
  MoreStickers = 'MORE_STICKERS',
  /** Guild has access to create news channels */
  News = 'NEWS',
  /** Guild is partnered */
  Partnered = 'PARTNERED',
  /** Guild can be previewed before joining via Membership Screening or the directory */
  PreviewEnabled = 'PREVIEW_ENABLED',
  /** Guild has disabled alerts for join raids in the configured safety alerts channel */
  RaidAlertsDisabled = 'RAID_ALERTS_DISABLED',
  /** Guild is able to set role icons */
  RoleIcons = 'ROLE_ICONS',
  /** Guild has role subscriptions that can be purchased. */
  RoleSubscriptionsAvailableForPurchase = 'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE',
  /** Guild has enabled role subscriptions. */
  RoleSubscriptionsEnabled = 'ROLE_SUBSCRIPTIONS_ENABLED',
  /** Guild has created soundboard sounds. */
  Soundboard = 'SOUNDBOARD',
  /** Guild has enabled ticketed events */
  TicketedEventsEnabled = 'TICKETED_EVENTS_ENABLED',
  /** Guild has access to set a vanity URL */
  VanityUrl = 'VANITY_URL',
  /** Guild is verified */
  Verified = 'VERIFIED',
  /** Guild has access to set 384 kbps bitrate in voice (previously VIP voice servers) */
  VipRegions = 'VIP_REGIONS',
  /** Guild has enabled the welcome screen */
  WelcomeScreenEnabled = 'WELCOME_SCREEN_ENABLED',
  /** Guild has access to guest invites */
  GuestsEnabled = 'GUESTS_ENABLED',
  /** Guild is able to set gradient colors to roles */
  EnhancedRoleColors = 'ENHANCED_ROLE_COLORS',
}

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export interface DiscordUnavailableGuild extends Pick<DiscordGuild, 'id' | 'unavailable'> {}

/** https://discord.com/developers/docs/resources/guild#guild-preview-object-guild-preview-structure */
export interface DiscordGuildPreview {
  /** Guild id */
  id: string
  /** Guild name (2-100 characters) */
  name: string
  /** Icon hash */
  icon: string | null
  /** Splash hash */
  splash: string | null
  /** Discovery splash hash */
  discovery_splash: string | null
  /** Custom guild emojis */
  emojis: DiscordEmoji[]
  /** Enabled guild features */
  features: GuildFeatures[]
  /** Approximate number of members in this guild */
  approximate_member_count: number
  /** Approximate number of online members in this guild */
  approximate_presence_count: number
  /** The description for the guild, if the guild is discoverable */
  description: string | null
  /** Custom guild stickers */
  stickers: DiscordSticker[]
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-settings-object-guild-widget-settings-structure */
export interface DiscordGuildWidgetSettings {
  /** whether the widget is enabled */
  enabled: boolean
  /** the widget channel id */
  channel_id: string | null
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure */
export interface DiscordGuildWidget {
  id: string
  name: string
  instant_invite: string
  channels: Array<{
    id: string
    name: string
    position: number
  }>
  members: Array<{
    id: string
    username: string
    discriminator: string
    avatar?: string | null
    status: string
    avatar_url: string
  }>
  presence_count: number
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface DiscordMember {
  /** Whether the user is deafened in voice channels */
  deaf?: boolean
  /** Whether the user is muted in voice channels */
  mute?: boolean
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean
  /** The user this guild member represents */
  user?: DiscordUser
  /** This user's guild nickname */
  nick?: string | null
  /** The member's custom avatar for this server. */
  avatar?: string
  /** The member's guild banner */
  banner?: string
  /** Array of role object ids */
  roles: string[]
  /**
   * When the user joined the guild
   * @remarks Member objects retrieved from `VOICE_STATE_UPDATE` events will have `joined_at` set as `null` if the member was invited as a guest.
   */
  joined_at: string | null
  /** When the user started boosting the guild */
  premium_since?: string | null
  /** The permissions this member has in the guild. Only present on interaction events and OAuth2 current member fetch. */
  permissions?: string
  /** when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out */
  communication_disabled_until?: string | null
  /** Guild member flags */
  flags: number
  /** data for the member's guild avatar decoration */
  avatar_decoration_data?: DiscordAvatarDecorationData | null
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface DiscordMemberWithUser extends DiscordMember {
  /** The user object for this member */
  user: DiscordUser
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags */
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
  /**
   * Member's guild tag is blocked by AutoMod
   *
   * @remarks
   * This value is not editable
   */
  AutomodQuarantinedGuildTag = 1 << 10,
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface DiscordIntegration {
  /** Integration Id */
  id: string
  /** Integration name */
  name: string
  /** Integration type (twitch, youtube, discord, or guild_subscription). */
  type: 'twitch' | 'youtube' | 'discord'
  /** Is this integration enabled */
  enabled?: boolean
  /** Is this integration syncing */
  syncing?: boolean
  /** Role Id that this integration uses for "subscribers" */
  role_id?: string
  /** Whether emoticons should be synced for this integration (twitch only currently) */
  enable_emoticons?: boolean
  /** The behavior of expiring subscribers */
  expire_behavior?: IntegrationExpireBehaviors
  /** The grace period (in days) before expiring subscribers */
  expire_grace_period?: number
  /** When this integration was last synced */
  synced_at?: string
  /** How many subscribers this integration has */
  subscriber_count?: number
  /** Has this integration been revoked */
  revoked?: boolean
  /** User for this integration */
  user?: DiscordUser
  /** Integration account information */
  account: DiscordIntegrationAccount
  /** The bot/OAuth2 application for discord integrations */
  application?: DiscordIntegrationApplication
  /** the scopes the application has been authorized for */
  scopes: OAuth2Scope[]
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors */
export enum IntegrationExpireBehaviors {
  RemoveRole,
  Kick,
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure */
export interface DiscordIntegrationAccount {
  /** Id of the account */
  id: string
  /** Name of the account */
  name: string
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
export interface DiscordIntegrationApplication {
  /** The id of the app */
  id: string
  /** The name of the app */
  name: string
  /** the icon hash of the app */
  icon: string | null
  /** The description of the app */
  description: string
  /** The bot associated with this application */
  bot?: DiscordUser
}

/** https://discord.com/developers/docs/resources/guild#ban-object-ban-structure */
export interface DiscordBan {
  /** The reason for the ban */
  reason: string | null
  /** The banned user */
  user: DiscordUser
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure */
export interface DiscordWelcomeScreen {
  /** The server description shown in the welcome screen */
  description: string | null
  /** The channels shown in the welcome screen, up to 5 */
  welcome_channels: DiscordWelcomeScreenChannel[]
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface DiscordWelcomeScreenChannel {
  /** The description shown for the channel */
  description: string
  /** The channel's id */
  channel_id: string
  /** The emoji id, if the emoji is custom */
  emoji_id: string | null
  /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
  emoji_name: string | null
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-guild-onboarding-structure */
export interface DiscordGuildOnboarding {
  /** ID of the guild this onboarding is part of */
  guild_id: string
  /** Prompts shown during onboarding and in customize community */
  prompts: DiscordGuildOnboardingPrompt[]
  /** Channel IDs that members get opted into automatically */
  default_channel_ids: string[]
  /** Whether onboarding is enabled in the guild */
  enabled: boolean
  /** Current mode of onboarding */
  mode: DiscordGuildOnboardingMode
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-prompt-structure */
export interface DiscordGuildOnboardingPrompt {
  /** ID of the prompt */
  id: string
  /** Type of prompt */
  type: DiscordGuildOnboardingPromptType
  /** Options available within the prompt */
  options: DiscordGuildOnboardingPromptOption[]
  /** Title of the prompt */
  title: string
  /** Indicates whether users are limited to selecting one option for the prompt */
  single_select: boolean
  /** Indicates whether the prompt is required before a user completes the onboarding flow */
  required: boolean
  /** Indicates whether the prompt is present in the onboarding flow. If `false`, the prompt will only appear in the Channels & Roles tab */
  in_onboarding: boolean
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-option-structure */
export interface DiscordGuildOnboardingPromptOption {
  /** ID of the prompt option */
  id: string
  /** IDs for channels a member is added to when the option is selected */
  channel_ids: string[]
  /** IDs for roles assigned to a member when the option is selected */
  role_ids: string[]
  /**
   * Emoji of the option
   *
   * @remarks
   * When creating or updating a prompt option, the `emoji_id`, `emoji_name`, and `emoji_animated` fields must be used instead of the emoji object.
   */
  emoji?: DiscordEmoji
  /**
   * Emoji ID of the option
   *
   * @remarks
   * When creating or updating a prompt option, the `emoji_id`, `emoji_name`, and `emoji_animated` fields must be used instead of the emoji object.
   */
  emoji_id?: string
  /**
   * Emoji name of the option
   *
   * @remarks
   * When creating or updating a prompt option, the `emoji_id`, `emoji_name`, and `emoji_animated` fields must be used instead of the emoji object.
   */
  emoji_name?: string
  /**
   * Whether the emoji is animated
   *
   * @remarks
   * When creating or updating a prompt option, the `emoji_id`, `emoji_name`, and `emoji_animated` fields must be used instead of the emoji object.
   */
  emoji_animated?: boolean
  /** Title of the option */
  title: string
  /** Description of the option */
  description: string | null
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode */
export enum DiscordGuildOnboardingMode {
  /** Counts only Default Channels towards constraints */
  OnboardingDefault,
  /** Counts Default Channels and Questions towards constraints */
  OnboardingAdvanced,
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types */
export enum DiscordGuildOnboardingPromptType {
  MultipleChoice,
  DropDown,
}

/** https://discord.com/developers/docs/resources/guild#incidents-data-object-incidents-data-structure */
export interface DiscordIncidentsData {
  /** When invites get enabled again */
  invites_disabled_until: string | null
  /** When direct messages get enabled again */
  dms_disabled_until: string | null
  /** When the dm spam was detected */
  dm_spam_detected_at?: string | null
  /** When the raid was detected */
  raid_detected_at?: string | null
}

/** https://discord.com/developers/docs/resources/guild#create-guild-channel-json-params */
export interface DiscordCreateGuildChannel {
  /** Channel name (1-100 characters) */
  name: string
  /** The type of channel */
  type?: ChannelTypes
  /** Channel topic (0-1024 characters) */
  topic?: string
  /** The bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number
  /** The user limit of the voice channel (voice only) */
  user_limit?: number
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rate_limit_per_user?: number
  /** Sorting position of the channel */
  position?: number
  /** The channel's permission overwrites */
  permission_overwrites?: DiscordOverwrite[]
  /** Id of the parent category for a channel */
  parent_id?: string
  /** Whether the channel is nsfw */
  nsfw?: boolean
  /** Default duration (in minutes) that clients (not the API) use for newly created threads in this channel, to determine when to automatically archive the thread after the last activity */
  default_auto_archive_duration?: number
  /** Emoji to show in the add reaction button on a thread in a forum channel */
  default_reaction_emoji?: {
    /** The id of a guild's custom emoji. Exactly one of `emojiId` and `emojiName` must be set. */
    emoji_id?: string | null
    /** The unicode character of the emoji. Exactly one of `emojiId` and `emojiName` must be set. */
    emoji_name?: string | null
  }
  /** Set of tags that can be used in a forum channel */
  available_tags?: Array<{
    /** The id of the tag */
    id: string
    /** The name of the tag (0-20 characters) */
    name: string
    /** whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission */
    moderated: boolean
    /** The id of a guild's custom emoji */
    emoji_id: string
    /** The unicode character of the emoji */
    emoji_name?: string
  }>
  /** the default sort order type used to order posts in forum channels */
  default_sort_order?: SortOrderTypes | null
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export interface DiscordModifyGuildChannelPositions {
  /** Channel id */
  id: string
  /** Sorting position of the channel */
  position?: number | null
  /** Syncs the permission overwrites with the new parent, if moving to a new category */
  lock_positions?: boolean | null
  /** The new parent ID for the channel that is moved */
  parent_id?: string | null
}

/** https://discord.com/developers/docs/resources/guild#list-active-guild-threads-response-body */
export interface DiscordListActiveThreads {
  /** The active threads */
  threads: DiscordChannel[]
  /** A thread member object for each returned thread the current user has joined */
  members: DiscordThreadMember[]
}

/** https://discord.com/developers/docs/resources/guild#bulk-guild-ban-bulk-ban-response */
export interface DiscordBulkBan {
  /** list of user ids, that were successfully banned */
  banned_users: string[]
  /** list of user ids, that were not banned */
  failed_users: string[]
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface DiscordPrunedCount {
  pruned: number
}

/** https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
// TODO: This should provably have another name for clarity to what it really rappresent
export interface DiscordVanityUrl {
  code: string | null
  uses: number
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
export interface DiscordModifyGuildWelcomeScreen {
  /** Whether the welcome screen is enabled */
  enabled?: boolean | null
  /** Channels linked in the welcome screen and their display options */
  welcome_screen?: DiscordWelcomeScreenChannel[] | null
  /** The server description to show in the welcome screen */
  description?: string | null
}
