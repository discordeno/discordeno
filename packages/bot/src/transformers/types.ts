import type {
  ActivityTypes,
  ApplicationCommandOptionTypes,
  ApplicationCommandPermissionTypes,
  ApplicationCommandTypes,
  ApplicationFlags,
  AttachmentFlags,
  AuditLogEvents,
  AutoModerationActionType,
  AutoModerationEventTypes,
  AutoModerationTriggerTypes,
  BigString,
  ButtonStyles,
  ChannelTypes,
  DefaultMessageNotificationLevels,
  DiscordApplicationIntegrationType,
  DiscordAutoModerationRuleTriggerMetadataPresets,
  DiscordEntitlementType,
  DiscordGuildOnboardingMode,
  DiscordGuildOnboardingPromptType,
  DiscordInteractionContextType,
  DiscordInviteType,
  DiscordPollLayoutType,
  DiscordScheduledEventEntityMetadata,
  DiscordSkuFlag,
  DiscordSkuType,
  DiscordTeamMemberRole,
  DiscordTemplate,
  DiscordThreadMember,
  EmbedTypes,
  ExplicitContentFilterLevels,
  GuildFeatures,
  GuildNsfwLevel,
  IntegrationExpireBehaviors,
  InteractionCallbackData,
  InteractionTypes,
  Locales,
  Localization,
  MessageActivityTypes,
  MessageComponentTypes,
  MessageTypes,
  MfaLevels,
  OAuth2Scope,
  OverwriteReadable,
  OverwriteTypes,
  PremiumTiers,
  PremiumTypes,
  PresenceStatus,
  RoleFlags,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
  SelectOption,
  StickerFormatTypes,
  StickerTypes,
  SystemChannelFlags,
  TeamMembershipStates,
  TextStyles,
  VerificationLevels,
  VideoQualityModes,
  WebhookTypes,
} from '@discordeno/types'
import type { Collection } from '@discordeno/utils'
import type { Bot, Permissions } from '../index.js'
import type { ToggleBitfield } from './toggles/ToggleBitfield.js'
import type { ChannelToggles } from './toggles/channel.js'
import type { EmojiToggles } from './toggles/emoji.js'
import type { GuildToggles } from './toggles/guild.js'
import type { MemberToggles } from './toggles/member.js'
import type { RoleToggles } from './toggles/role.js'
import type { UserToggles } from './toggles/user.js'
import type { VoiceStateToggles } from './toggles/voice.js'

export interface Activity {
  join?: string
  flags?: number
  applicationId?: bigint
  spectate?: string
  url?: string
  startedAt?: number
  endedAt?: number
  details?: string
  state?: string
  emoji?: {
    id?: bigint
    animated?: boolean
    name: string
  }
  partyId?: string
  partyCurrentSize?: number
  partyMaxSize?: number
  largeImage?: string
  largeText?: string
  smallImage?: string
  smallText?: string
  match?: string
  instance?: boolean
  buttons?: Array<{
    url: string
    label: string
  }>
  name: string
  type: ActivityTypes
  createdAt: number
}

export interface Application {
  flags?: ApplicationFlags
  icon?: bigint
  rpcOrigins?: string[]
  termsOfServiceUrl?: string
  privacyPolicyUrl?: string
  primarySkuId?: string
  slug?: string
  coverImage?: bigint
  owner?: User
  team?: Team
  guildId?: bigint
  guild?: Guild
  id: bigint
  name: string
  description: string
  botPublic: boolean
  botRequireCodeGrant: boolean
  verifyKey: string
  approximateGuildCount?: number
  bot?: User
  redirectUris?: string[]
  interactionsEndpointUrl?: string
  integrationTypesConfig?: Partial<Record<DiscordApplicationIntegrationType, ApplicationIntegrationTypeConfiguration>>
}

export interface ApplicationIntegrationTypeConfiguration {
  /** Install params for each installation context's default in-app authorization link */
  oauth2InstallParams?: {
    /** Scopes to add the application to the server with */
    scopes: OAuth2Scope[]
    /** Permissions to request for the bot role */
    permissions: bigint
  }
}

export interface ApplicationCommand {
  options?: ApplicationCommandOption[]
  description?: string
  guildId?: bigint
  nameLocalizations?: Record<Locales, string>
  descriptionLocalizations?: Record<Locales, string>
  defaultMemberPermissions?: bigint
  type?: ApplicationCommandTypes
  version?: string
  id: bigint
  name: string
  applicationId: bigint
  dmPermission: boolean
}
export interface ApplicationCommandOption {
  /** Value of Application Command Option Type */
  type: ApplicationCommandOptionTypes
  /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localization
  /** 1-100 character description */
  description: string
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localization
  /** If the parameter is required or optional--default `false` */
  required?: boolean
  /** Choices for `string` and `int` types for the user to pick from */
  choices?: ApplicationCommandOptionChoice[]
  /** If the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandOption[]
  /** If the option is a channel type, the channels shown will be restricted to these types */
  channelTypes?: ChannelTypes[]
  /** Minimum number desired. */
  minValue?: number
  /** Maximum number desired. */
  maxValue?: number
  /** Minimum length desired. */
  minLength?: number
  /** Maximum length desired. */
  maxLength?: number
  /** if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option */
  autocomplete?: boolean
}

export interface ApplicationCommandOptionChoice {
  nameLocalizations?: Record<Locales, string>
  name: string
  value: string | number
}

export interface ApplicationCommandPermission {
  id: bigint
  guildId: bigint
  applicationId: bigint
  permissions: Array<{
    id: bigint
    type: ApplicationCommandPermissionTypes
    permission: boolean
  }>
}

export interface Attachment {
  /** Name of file attached */
  filename: string
  /** The title of the file */
  title?: string
  /** The attachment's [media type](https://en.wikipedia.org/wiki/Media_type) */
  contentType?: string
  /** Size of file in bytes */
  size: number
  /** Source url of file */
  url: string
  /** A proxied url of file */
  proxyUrl: string
  /** Attachment id */
  id: bigint
  /** description for the file (max 1024 characters) */
  description?: string
  /** Height of file (if image) */
  height?: number
  /** Width of file (if image) */
  width?: number
  /**
   * whether this attachment is ephemeral.
   * Ephemeral attachments will automatically be removed after a set period of time.
   * Ephemeral attachments on messages are guaranteed to be available as long as the message itself exists.
   */
  ephemeral?: boolean
  /** The duration of the audio file for a voice message */
  duration_secs?: number
  /** A base64 encoded bytearray representing a sampled waveform for a voice message */
  waveform?: string
  /** Attachment flags combined as a bitfield */
  flags?: AttachmentFlags
}

export interface AuditLogEntry {
  id: bigint
  userId?: bigint
  reason?: string
  changes?: Array<{
    new?:
      | string
      | number
      | bigint
      | boolean
      | Array<{
          allow?: string
          deny?: string
          id: string
          type: OverwriteTypes
        }>
      | Array<{
          id?: bigint
          name?: string
        }>
    old?:
      | string
      | number
      | bigint
      | boolean
      | Array<{
          allow?: string
          deny?: string
          id: string
          type: OverwriteTypes
        }>
      | Array<{
          id?: bigint
          name?: string
        }>
    key:
      | 'id'
      | 'name'
      | 'description'
      | 'type'
      | 'permissions'
      | 'locked'
      | 'invitable'
      | 'nsfw'
      | 'archived'
      | 'position'
      | 'topic'
      | 'bitrate'
      | 'default_auto_archive_duration'
      | 'auto_archive_duration'
      | 'allow'
      | 'deny'
      | 'channel_id'
      | 'deaf'
      | 'mute'
      | 'status'
      | 'nick'
      | 'communication_disabled_until'
      | 'color'
      | 'permission_overwrites'
      | 'user_limit'
      | 'rate_limit_per_user'
      | 'owner_id'
      | 'application_id'
      | 'hoist'
      | 'mentionable'
      | 'location'
      | 'verification_level'
      | 'default_message_notifications'
      | 'explicit_content_filter'
      | 'preferred_locale'
      | 'afk_timeout'
      | 'afk_channel_id'
      | 'system_channel_id'
      | 'widget_enabled'
      | 'mfa_level'
      | 'vanity_url_code'
      | 'icon_hash'
      | 'widget_channel_id'
      | 'rules_channel_id'
      | 'public_updates_channel_id'
      | 'code'
      | 'region'
      | 'privacy_level'
      | 'entity_type'
      | 'enable_emoticons'
      | 'expire_behavior'
      | 'expire_grace_period'
      | 'uses'
      | 'max_uses'
      | 'max_age'
      | 'temporary'
      | 'discovery_splash_hash'
      | 'banner_hash'
      | 'image_hash'
      | 'splash_hash'
      | 'inviter_id'
      | 'avatar_hash'
      | 'command_id'
      | 'prune_delete_days'
      | '$add'
      | '$remove'
  }>
  targetId?: bigint
  actionType: AuditLogEvents
  options?: {
    id?: bigint
    channelId?: bigint
    messageId?: bigint
    type: number
    count: number
    deleteMemberDays: number
    membersRemoved: number
    roleName: string
    autoModerationRuleName: string
    autoModerationRuleTriggerType: string
    integrationType: string
  }
}

export interface AutoModerationActionExecution {
  channelId?: bigint
  messageId?: bigint
  alertSystemMessageId?: bigint
  guildId: bigint
  userId: bigint
  content: string
  action: {
    type: AutoModerationActionType
    metadata: {
      customMessage?: string
      durationSeconds?: number
      channelId?: bigint
    }
  }
  ruleTriggerType: AutoModerationTriggerTypes
  ruleId: bigint
  matchedKeyword: string
  matchedContent: string
}

export interface AutoModerationRule {
  triggerMetadata?: {
    keywordFilter?: string[]
    presets?: DiscordAutoModerationRuleTriggerMetadataPresets[]
    allowList?: string[]
    mentionTotalLimit?: number
    regexPatterns: string[]
  }

  id: bigint
  name: string
  guildId: bigint
  eventType: AutoModerationEventTypes
  triggerType: AutoModerationTriggerTypes
  enabled: boolean
  creatorId: bigint
  exemptRoles: bigint[]
  exemptChannels: bigint[]
  actions: Array<{
    type: AutoModerationActionType
    metadata?: {
      channelId?: bigint
      customMessage?: string
      durationSeconds?: number
    }
  }>
}

export interface AvatarDecorationData {
  /** the avatar decoration hash */
  asset: bigint
  /** id of the avatar decoration's SKU */
  skuId: bigint
}

export interface BaseChannel {
  /** Whether the channel is nsfw */
  nsfw: boolean
  /** Thread-specific fields not needed by other channels */
  threadMetadata?: {
    /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
    archiveTimestamp?: number
    /** Timestamp when the thread was created; only populated for threads created after 2022-01-09 */
    createTimestamp?: number
    /** Duration in minutes to automatically archive the thread after recent activity */
    autoArchiveDuration?: 60 | 1440 | 4320 | 10080
    /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
    locked: boolean
    /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
    invitable: boolean
    /** Whether the thread is archived */
    archived: boolean
  }
  /** When a thread is created this will be true on that channel payload for the thread. */
  newlyCreated: boolean
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked: boolean
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable: boolean
  /** Whether the thread is archived */
  archived: boolean
  /** Explicit permission overwrites for members and roles. */
  permissionOverwrites: OverwriteReadable[]
}

export interface Channel extends BaseChannel {
  /** The id of the channel */
  id: bigint
  /** The compressed form of all the boolean values on this channel. */
  toggles: ChannelToggles
  /** The type of channel */
  type: ChannelTypes
  /** The id of the guild */
  guildId?: bigint
  /** Sorting position of the channel */
  position?: number
  /** The name of the channel (1-100 characters) */
  name?: string
  /** The channel topic (0-4096 characters for GUILD_FORUM channels, 0-1024 characters for all others) */
  topic?: string
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  lastMessageId?: bigint
  /** The bitrate (in bits) of the voice or stage channel */
  bitrate?: number
  /** The user limit of the voice or stage channel */
  userLimit?: number
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number
  /** Id of the creator of the thread */
  ownerId?: bigint
  /** For guild channels: Id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created */
  parentId?: bigint
  /** When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  lastPinTimestamp?: number
  /** Voice region id for the voice or stage channel, automatic when set to null */
  rtcRegion?: string
  /** The camera video quality mode of the voice channel, 1 when not present */
  videoQualityMode?: VideoQualityModes
  /** An approximate count of messages in a thread, stops counting at 50 */
  messageCount?: number
  /** An approximate count of users in a thread, stops counting at 50 */
  memberCount?: number
  /**
   * Thread-specific fields not needed by other channels.
   * @deprecated Use channel.threadMetadata
   * @private This field is an internal field, subject to breaking changes.
   */
  internalThreadMetadata?: {
    /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
    archiveTimestamp: number
    /** Timestamp when the thread was created; only populated for threads created after 2022-01-09 */
    createTimestamp?: number
    /** Duration in minutes to automatically archive the thread after recent activity */
    autoArchiveDuration: 60 | 1440 | 4320 | 10080
  }
  /** Thread member object for the current user, if they have joined the thread, only included on certain API endpoints */
  member?: DiscordThreadMember
  /** Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  autoArchiveDuration?: number
  /** computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction. This does not include implicit permissions, which may need to be checked separately. */
  permissions?: Permissions
  /** The flags of the channel */
  flags?: number
  /**
   * Explicit permission overwrites for members and roles
   * @deprecated Use channel.permissionOverwrites
   * @private This is for internal use only, and prone to breaking changes.
   */
  internalOverwrites?: bigint[]
}

export interface Component {
  /** component type */
  type: MessageComponentTypes
  /** a developer-defined identifier for the component, max 100 characters */
  customId?: string
  /** whether this component is required to be filled, default true */
  required?: boolean
  /** whether the component is disabled, default false */
  disabled?: boolean
  /** For different styles/colors of the buttons */
  style?: ButtonStyles | TextStyles
  /** text that appears on the button (max 80 characters) */
  label?: string
  /** the dev-define value of the option, max 100 characters for select or 4000 for input. */
  value?: string
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: bigint
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string
  /** List of channel types to include in a channel select menu options list */
  channelTypes?: ChannelTypes[]
  /** The choices! Maximum of 25 items. */
  options?: SelectOption[]
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** The minimum input length for a text input. Between 0-4000. */
  minLength?: number
  /** The maximum input length for a text input. Between 1-4000. */
  maxLength?: number
  /** a list of child components */
  components?: Component[]
}

export interface Embed {
  description?: string
  type?: EmbedTypes
  url?: string
  image?: {
    proxyUrl?: string
    height?: number
    width?: number
    url: string
  }
  video?: {
    url?: string
    proxyUrl?: string
    height?: number
    width?: number
  }
  title?: string
  timestamp?: number
  color?: number
  footer?: {
    iconUrl?: string
    proxyIconUrl?: string
    text: string
  }
  thumbnail?: {
    proxyUrl?: string
    height?: number
    width?: number
    url: string
  }
  provider?: {
    name?: string
    url?: string
  }
  author?: {
    url?: string
    iconUrl?: string
    proxyIconUrl?: string
    name: string
  }
  fields?: Array<{
    inline?: boolean
    name: string
    value: string
  }>
}

export interface Emoji {
  /** Emoji name (can only be null in reaction emoji objects) */
  name?: string
  /** Emoji id */
  id?: bigint
  /** Roles allowed to use this emoji */
  roles?: bigint[]
  /** User that created this emoji */
  user?: User
  /** Whether this emoji must be wrapped in colons */
  requireColons?: boolean
  /** Whether this emoji is managed */
  managed?: boolean
  /** Whether this emoji is animated */
  animated?: boolean
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean
  toggles: EmojiToggles
}

export interface Entitlement {
  /** ID of the entitlement */
  id: bigint
  /** ID of the SKU */
  skuId: bigint
  /** ID of the user that is granted access to the entitlement's sku */
  userId?: bigint
  /** ID of the guild that is granted access to the entitlement's sku */
  guildId?: bigint
  /** ID of the parent application */
  applicationId: bigint
  /** Type of entitlement */
  type: DiscordEntitlementType
  /** Entitlement was deleted */
  deleted: boolean
  /** Start date at which the entitlement is valid. Not present when using test entitlements */
  startsAt?: number
  /** Date at which the entitlement is no longer valid. Not present when using test entitlements */
  endsAt?: number
  /** For consumable items, whether or not the entitlement has been consumed */
  consumed?: boolean
}

export interface GetGatewayBot {
  url: string
  shards: number
  sessionStartLimit: {
    total: number
    remaining: number
    resetAfter: number
    maxConcurrency: number
  }
}

export interface Guild {
  /** Guild name (2-100 characters, excluding trailing and leading whitespace) */
  name: string
  /** True if the user is the owner of the guild */
  owner: boolean | undefined
  /** Afk timeout in seconds */
  afkTimeout: number
  /** True if the server widget is enabled */
  widgetEnabled?: boolean
  /** Verification level required for the guild */
  verificationLevel: VerificationLevels
  /** Default message notifications level */
  defaultMessageNotifications: DefaultMessageNotificationLevels
  /** Explicit content filter level */
  explicitContentFilter: ExplicitContentFilterLevels
  /** Enabled guild features */
  features: GuildFeatures[]
  /** Required MFA level for the guild */
  mfaLevel: MfaLevels
  /** System channel flags */
  systemChannelFlags: SystemChannelFlags
  /** True if this is considered a large guild */
  large?: boolean
  /** True if this guild is unavailable due to an outage */
  unavailable?: boolean
  /** Total number of members in this guild */
  memberCount: number
  /** The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  maxPresences?: number
  /** The maximum number of members for the guild */
  maxMembers?: number
  /** The vanity url code for the guild */
  vanityUrlCode?: string
  /** The description of a guild */
  description?: string
  toggles: GuildToggles
  shardId: number
  /** Premium tier (Server Boost level) */
  premiumTier: PremiumTiers
  /** The number of boosts this guild currently has */
  premiumSubscriptionCount?: number
  /** The maximum amount of users in a video channel */
  maxVideoChannelUsers?: number
  /** Maximum amount of users in a stage video channel */
  maxStageVideoChannelUsers?: number
  /** Approximate number of members in this guild, returned from the GET /guilds/id endpoint when with_counts is true */
  approximateMemberCount?: number
  /** Approximate number of non-offline members in this guild, returned from the GET /guilds/id endpoint when with_counts is true */
  approximatePresenceCount?: number
  /** Guild NSFW level */
  nsfwLevel: GuildNsfwLevel
  /** Whether the guild has the boost progress bar enabled */
  premiumProgressBarEnabled: boolean
  /** Guild id */
  id: bigint
  /** Icon hash */
  icon?: bigint
  /** Icon hash, returned when in the template object */
  iconHash?: bigint
  /** Splash hash */
  splash?: bigint
  /** Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discoverySplash?: bigint
  /** Id of the owner */
  ownerId: bigint
  /** Total permissions for the user in the guild (excludes overwrites and implicit permissions) */
  permissions: bigint
  /** Id of afk channel */
  afkChannelId?: bigint
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widgetChannelId?: bigint
  /** Roles in the guild */
  roles: Collection<bigint, Role>
  /** Custom guild emojis */
  emojis: Collection<bigint, Emoji>
  /** Application id of the guild creator if it is bot-created */
  applicationId?: bigint
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: bigint
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rulesChannelId?: bigint
  /** When this guild was joined at */
  joinedAt?: number
  /** States of members currently in voice channels; lacks the guild_id key */
  voiceStates: Collection<bigint, VoiceState>
  /** Users in the guild */
  members: Collection<bigint, Member>
  /** Channels in the guild */
  channels: Collection<bigint, Channel>
  /** All active threads in the guild that the current user has permission to view */
  threads: Collection<bigint, Channel>
  /** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: PresenceUpdate[]
  /** Banner hash */
  banner?: bigint
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale: string
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: bigint
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcomeScreen?: WelcomeScreen
  /** Stage instances in the guild */
  stageInstances?: StageInstance[]
  /** Custom guild stickers */
  stickers?: Collection<bigint, Sticker>
  /** The id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
  safetyAlertsChannelId?: bigint
}

export interface Integration {
  user?: User
  enabled?: boolean
  syncing?: boolean
  roleId?: bigint
  enableEmoticons?: boolean
  expireBehavior?: IntegrationExpireBehaviors
  expireGracePeriod?: number
  syncedAt?: number
  subscriberCount?: number
  revoked?: boolean
  application?: {
    bot?: User
    icon?: bigint
    id: bigint
    name: string
    description: string
  }
  id: bigint
  name: string
  guildId: bigint
  type: 'twitch' | 'youtube' | 'discord'
  account: {
    id: bigint
    name: string
  }
  scopes: OAuth2Scope[]
}

export interface Interaction extends BaseInteraction {
  /** The bot object */
  bot: Bot
  /** Whether or not this interaction has been responded to. */
  acknowledged: boolean
  /** Id of the interaction */
  id: bigint
  /** Id of the application this interaction is for */
  applicationId: bigint
  /** The type of interaction */
  type: InteractionTypes
  /** The guild it was sent from */
  guildId?: bigint
  /** The channel it was sent from */
  channel: Partial<Channel>
  /**
   * The ID of channel it was sent from
   *
   * @remarks
   * It is recommended that you begin using this channel field to identify the source channel of the interaction as they may deprecate the existing channel_id field in the future.
   */
  channelId?: bigint
  /** Guild member data for the invoking user, including permissions */
  member?: Member
  /** User object for the invoking user, if invoked in a DM */
  user: User
  /** A continuation token for responding to the interaction */
  token: string
  /** Read-only property, always `1` */
  version: 1
  /** For the message the button was attached to */
  message?: Message
  /** the command data payload */
  data?: {
    type?: ApplicationCommandTypes
    componentType?: MessageComponentTypes
    customId?: string
    components?: Component[]
    values?: string[]
    name: string
    resolved?: InteractionDataResolved
    options?: InteractionDataOption[]
    id?: bigint
    targetId?: bigint
    // guildId?: bigint
  }
  /** The selected language of the invoking user */
  locale?: string
  /** The guild's preferred locale, if invoked in a guild */
  guildLocale?: string
  /** The computed permissions for a bot or app in the context of a specific interaction (including channel overwrites) */
  appPermissions: bigint
  /** Mapping of installation contexts that the interaction was authorized for to related user or guild IDs. */
  authorizingIntegrationOwners: Partial<Record<DiscordApplicationIntegrationType, bigint>>
  /** Context where the interaction was triggered from */
  context?: DiscordInteractionContextType
}

export interface BaseInteraction {
  /**
   * Sends a response to an interaction.
   *
   * @remarks
   * This will send a {@link InteractionResponseTypes.ChannelMessageWithSource}, {@link InteractionResponseTypes.ApplicationCommandAutocompleteResult} or {@link InteractionResponseTypes.Modal} response based on the type of the interaction you are responding to.
   *
   * If the interaction has been already acknowledged, indicated by {@link Interaction.acknowledged}, it will send a followup message instead.
   *
   * Uses `interaction.type`, `interaction.token` and `interaction.id`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  respond: (response: string | InteractionCallbackData, options?: { isPrivate?: boolean }) => Promise<Message | void>
  /**
   * Edit the original response of an interaction or a followup if the message id is provided.
   *
   * @remarks
   * This will edit the original interaction response or, if the interaction has not yet been acknowledged and the type of the interaction is {@link InteractionTypes.MessageComponent} it will instead send a {@link InteractionResponseTypes.UpdateMessage} response instead.
   *
   * Uses `interaction.type`, `interaction.token` and `interaction.id`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  edit: (response: string | InteractionCallbackData, messageId?: BigString) => Promise<Message | void>
  /**
   * Defer the interaction for updating the referenced message at a later time with {@link edit}.
   *
   * @remarks
   * This will send a {@link InteractionResponseTypes.DeferredUpdateMessage} response.
   *
   * Uses `interaction.type`, `interaction.token` and `interaction.id`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  deferEdit: () => Promise<void>
  /**
   * Defer the interaction for updating the response at a later time with {@link edit}.
   *
   * @remarks
   * This will send a {@link InteractionResponseTypes.DeferredChannelMessageWithSource} response.
   *
   * Uses `interaction.type`, `interaction.token` and `interaction.id`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  defer: (isPrivate?: boolean) => Promise<void>
  /**
   * Delete the original interaction response or a followup if the message id is provided.
   *
   * @remarks
   * Uses `interaction.type` and `interaction.token`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  delete: (messageId?: BigString) => Promise<void>
}

export interface InteractionDataResolved {
  messages?: Collection<bigint, Message>
  users?: Collection<bigint, User>
  members?: Collection<bigint, Member>
  roles?: Collection<bigint, Role>
  channels?: Collection<bigint, { id: bigint; name: string; type: ChannelTypes; permissions: bigint }>
  attachments?: Collection<bigint, Attachment>
}

export interface InteractionDataOption {
  name: string
  type: ApplicationCommandOptionTypes
  value?: string | number | boolean
  options?: InteractionDataOption[]
  focused?: boolean
}

export interface Invite {
  /** The type of invite */
  type: DiscordInviteType
  /** The channel the invite is for */
  channelId: bigint
  /** The unique invite code */
  code: string
  /** The time at which the invite was created */
  createdAt: number
  /** The guild of the invite */
  guildId?: bigint
  /** The user that created the invite */
  inviter?: User
  /** How long the invite is valid for (in seconds) */
  maxAge: number
  /** The maximum number of times the invite can be used */
  maxUses: number
  /** The type of target for this voice channel invite */
  targetType: number
  /** The target user for this invite */
  targetUser: User
  /** The embedded application to open for this voice channel embedded application invite */
  targetApplication?: Application
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean
  /** How many times the invite has been used (always will be 0) */
  uses: number
  /** Approximate count of online members (only present when target_user is set) */
  approximateMemberCount: number
  /** Stage instance data if there is a public Stage instance in the Stage channel this invite is for */
  stageInstance?: InviteStageInstance
  /** The expiration date of this invite, returned from the GET /invites/code endpoint when with_expiration is true */
  expiresAt?: number
  /** guild scheduled event data */
  guildScheduledEvent?: ScheduledEvent
  /** Approximate count of online members (only present when target_user is set) */
  approximatePresenceCount?: number
}

export interface BaseMember {
  /** Whether the user is deafened in voice channels */
  deaf?: boolean
  /** Whether the user is muted in voice channels */
  mute?: boolean
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean
}

export interface Member extends BaseMember {
  /** The user id of the member. */
  id: bigint
  /** The compressed form of all the boolean values on this user. */
  toggles?: MemberToggles
  /** The guild id where this member is. */
  guildId: bigint
  /** The user this guild member represents */
  user?: User
  /** This users guild nickname */
  nick?: string
  /** The members custom avatar for this server. */
  avatar?: bigint
  /** Array of role object ids */
  roles: bigint[]
  /** When the user joined the guild */
  joinedAt: number
  /** When the user started boosting the guild */
  premiumSince?: number
  /** The permissions this member has in the guild. Only present on interaction events. */
  permissions?: Permissions
  /** when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out */
  communicationDisabledUntil?: number
  /** data for the member's guild avatar decoration */
  avatarDecorationData: AvatarDecorationData
}

export interface MessageBase {
  /** Holds all the boolean values on this message. */
  bitfield?: ToggleBitfield
  /** Whether this message has been published to subscribed channels (via Channel Following) */
  crossposted: boolean
  /** Whether this message is only visible to the user who invoked the Interaction */
  ephemeral: boolean
  /** Whether this message failed to mention some roles and add their members to the thread */
  failedToMentionSomeRolesInThread: boolean
  /** Message flags combined as a bitfield */
  flags?: ToggleBitfield
  /** Whether this message has an associated thread, with the same id as the message */
  hasThread: boolean
  /** Whether this message originated from a message in another channel (via Channel Following) */
  isCrosspost: boolean
  /** Whether this message is an Interaction Response and the bot is "thinking" */
  loading: boolean
  /** The ids of the users who were mentioned in this message. */
  mentionedUserIds: bigint[]
  /** Whether this message mentions everyone */
  mentionEveryone: boolean
  /** Whether this message is pinned */
  pinned: boolean
  /** Whether the source message for this crosspost has been deleted (via Channel Following) */
  sourceMessageDeleted: boolean
  /** Whether do not include any embeds when serializing this message */
  suppressEmbeds: boolean
  /** Whether this message will not trigger push and desktop notifications */
  suppressNotifications: boolean
  /** The timestamp in milliseconds when this message was created */
  timestamp: number
  /** Whether this was a TTS message. */
  tts: boolean
  /** Whether this message came from the urgent message system */
  urgent: boolean
}

export interface Message extends MessageBase {
  /** Sent with Rich Presence-related chat embeds */
  activity?: {
    /** Type of message activity */
    type: MessageActivityTypes
    /** party_id from a Rich Presence event */
    partyId?: string
  }
  /** if the message is an Interaction or application-owned webhook, this is the id of the application */
  applicationId?: bigint
  /** Any attached files on this message. */
  attachments?: Attachment[]
  /** The author of this message (not guaranteed to be a valid user) Note: The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the webhook_id on the message object. */
  author: User
  /** id of the channel the message was sent in */
  channelId: bigint
  /** The components related to this message */
  components: Component[]
  /** Contents of the message */
  content: string
  /** The timestamp in milliseconds when this message was edited last. */
  editedTimestamp?: number
  /** Any embedded content */
  embeds?: Embed[]
  /** id of the guild the message was sent in Note: For MESSAGE_CREATE and MESSAGE_UPDATE events, the message object may not contain a guild_id or member field since the events are sent directly to the receiving user and the bot who sent the message, rather than being sent through the guild like non-ephemeral messages. */
  guildId?: bigint
  /** id of the message */
  id: bigint
  /** sent if the message is sent as a result of an interaction */
  interactionMetadata?: MessageInteractionMetadata
  /**
   * Sent if the message is a response to an Interaction
   *
   * @deprecated Deprecated in favor of {@link interactionMetadata}
   */
  interaction?: {
    /** Id of the interaction */
    id: bigint
    /** The member who invoked the interaction in the guild  */
    member?: Member
    /** The name of the ApplicationCommand including the name of the subcommand/subcommand group */
    name: string
    /** The type of interaction */
    type: InteractionTypes
    /** The user who invoked the interaction */
    user: User
  }
  /** Member properties for this message's author Note: The member object exists in MESSAGE_CREATE and MESSAGE_UPDATE events from text-based guild channels. This allows bots to obtain real-time member data without requiring bots to store member state in memory. */
  member?: Member
  /** Users specifically mentioned in the message Note: The user objects in the mentions array will only have the partial member field present in MESSAGE_CREATE and MESSAGE_UPDATE events from text-based guild channels. */
  mentions?: User[]
  /** Channels specifically mentioned in this message Note: Not all channel mentions in a message will appear in mention_channels. Only textual channels that are visible to everyone in a discoverable guild will ever be included. Only crossposted messages (via Channel Following) currently include mention_channels at all. If no mentions in the message meet these requirements, this field will not be sent. */
  mentionedChannelIds?: bigint[]
  /** Roles specifically mentioned in this message */
  mentionedRoleIds?: bigint[]
  /** Data showing the source of a crossposted channel follow add, pin or reply message */
  messageReference?: {
    /** id of the originating message's channel Note: channel_id is optional when creating a reply, but will always be present when receiving an event/response that includes this data model. */
    channelId?: bigint
    /** id of the originating message's guild */
    guildId?: bigint
    /** id of the originating message */
    messageId?: bigint
  }
  /** Used for validating a message was sent */
  nonce?: string | number
  /** Reactions on this message. */
  reactions?: Array<{
    /** Whether the current user reacted using this emoji */
    me: boolean
    /**	Whether the current user super-reacted using this emoji */
    meBurst: boolean
    /** Times this emoji has been used to react */
    count: number
    /**	Reaction count details object */
    countDetails: {
      /** Count of super reactions */
      burst: number
      /**	Count of normal reactions */
      normal: number
    }
    /** Emoji information */
    emoji: Emoji
    /** HEX colors used for super reaction */
    burstColors: string[]
  }>
  /** Sent if the message contains stickers */
  stickerItems?: Array<{
    /** The id of this sticker. */
    id: bigint
    /** The name of this sticker. */
    name: string
    /** The type of this stickers format. */
    formatType: StickerFormatTypes
  }>
  /** Type of message */
  type: MessageTypes
  /** The thread that was started from this message, includes thread member object  */
  thread?: Channel
  /** If the message is generated by a webhook, this is the webhook's id */
  webhookId?: bigint
  /** A poll! */
  poll?: Poll
  /** The call associated with the message */
  call?: MessageCall
}

export interface MessageInteractionMetadata {
  /** Id of the interaction */
  id: bigint
  /** The type of interaction */
  type: InteractionTypes
  /** User who triggered the interaction */
  user: User
  /** IDs for installation context(s) related to an interaction */
  authorizingIntegrationOwners: Partial<Record<DiscordApplicationIntegrationType, bigint>>
  /** ID of the original response message, present only on follow-up messages */
  originalResponseMessageId?: bigint
  /** ID of the message that contained interactive component, present only on messages created from component interactions */
  interactedMessageId?: bigint
  /** Metadata for the interaction that was used to open the modal, present only on modal submit interactions */
  triggeringInteractionMetadata?: MessageInteractionMetadata
}

export interface MessageCall {
  /** Array of user object ids that participated in the call */
  participants: bigint[]
  /** Time when call ended */
  endedTimestamp: number
}

export interface GuildOnboarding {
  /** ID of the guild this onboarding is part of */
  guildId: bigint
  /** Prompts shown during onboarding and in customize community */
  prompts: GuildOnboardingPrompt[]
  /** Channel IDs that members get opted into automatically */
  defaultChannelIds: bigint[]
  /** Whether onboarding is enabled in the guild */
  enabled: boolean
  /** Current mode of onboarding */
  mode: DiscordGuildOnboardingMode
}

export interface GuildOnboardingPrompt {
  /** ID of the prompt */
  id: bigint
  /** Type of prompt */
  type: DiscordGuildOnboardingPromptType
  /** Options available within the prompt */
  options: GuildOnboardingPromptOption[]
  /** Title of the prompt */
  title: string
  /** Indicates whether users are limited to selecting one option for the prompt */
  singleSelect: boolean
  /** Indicates whether the prompt is required before a user completes the onboarding flow */
  required: boolean
  /** Indicates whether the prompt is present in the onboarding flow. If `false`, the prompt will only appear in the Channels & Roles tab */
  inOnboarding: boolean
}

export interface GuildOnboardingPromptOption {
  /** ID of the prompt option */
  id: bigint
  /** IDs for channels a member is added to when the option is selected */
  channelIds: bigint[]
  /** IDs for roles assigned to a member when the option is selected */
  roleIds: bigint[]
  /** Emoji of the option */
  emoji: Emoji
  /** Title of the option */
  title: string
  /** Description of the option */
  description: string | undefined
}

export interface Poll {
  /** The question of the poll. Only `text` is supported. */
  question: PollMedia
  /** Each of the answers available in the poll. There is a maximum of 10 answers per poll. */
  answers: PollAnswer[]
  /**
   * The time when the poll ends.
   *
   * @remarks
   * `expiry` is marked as nullable to support non-expiring polls in the future, but all polls have an expiry currently.
   */
  expiry: number | null
  /** Whether a user can select multiple answers */
  allowMultiselect: boolean
  /** The layout type of the poll */
  layoutType: DiscordPollLayoutType
  /**
   * The results of the poll
   *
   * @remarks
   * This value will not be sent by discord under specific conditions where they don't fetch them on their backend. When this value is missing it should be interpreted as "Unknown results" and not as "No results"
   * The results may not be totally accurate while the poll has not ended. When it ends discord will re-calculate all the results and set {@link DiscordPollResult.is_finalized} to true
   */
  results?: PollResult
}

export interface PollMedia {
  /**
   * The text of the field
   *
   * @remarks
   * `text` should always be non-null for both questions and answers, but this is subject to changes.
   * The maximum length of `text` is 300 for the question, and 55 for any answer.
   */
  text?: string
  /**
   * The emoji of the field
   *
   * @remarks
   * When creating a poll answer with an emoji, one only needs to send either the `id` (custom emoji) or `name` (default emoji) as the only field.
   */
  emoji?: Partial<Emoji>
}

export interface PollAnswer {
  /**
   * The id of the answer
   *
   * @remarks
   * This id labels each answer. It starts at 1 and goes up sequentially. Discord recommend against depending on this sequence as it is an implementation detail.
   */
  answerId: number
  /** The data of the answer */
  pollMedia: PollMedia
}

export interface PollResult {
  /** Whether the votes have been precisely counted */
  isFinalized: boolean
  /** The counts for each answer */
  answerCounts: PollAnswerCount[]
}

export interface PollAnswerCount {
  /** The {@link PollAnswer.answerId | answerId} */
  id: number
  /** The number of votes for this answer */
  count: number
  /** Whether the current user voted for this answer */
  meVoted: boolean
}

export interface PresenceUpdate {
  desktop?: string
  mobile?: string
  web?: string
  user: User
  guildId: bigint
  status: PresenceStatus
  activities: Activity[]
}

export interface BaseRole {
  /** The tags this role has */
  tags?: {
    /** The id of the bot this role belongs to */
    botId?: bigint
    /** The id of the integration this role belongs to */
    integrationId?: bigint
    /** Id of this role's subscription sku and listing. */
    subscriptionListingId?: bigint
    /** Whether this role is available for purchase. */
    availableForPurchase?: boolean
    /** Whether this is a guild's linked role */
    guildConnections?: boolean
    /** Whether this is the guild's premium subscriber role */
    premiumSubscriber?: boolean
  }
  /** If this role is showed separately in the user listing */
  hoist: boolean
  /** Whether this role is managed by an integration */
  managed: boolean
  /** Whether this role is mentionable */
  mentionable: boolean
  /** Whether this is the guilds premium subscriber role */
  premiumSubscriber: boolean
  /** Whether this role is available for purchase. */
  availableForPurchase: boolean
  /** Whether this is a guild's linked role. */
  guildConnections: boolean
}

export interface Role extends BaseRole {
  /** Role id */
  id: bigint
  /** The guild id where this role is located. */
  guildId: bigint
  /** The compressed version of the boolean values on this role. */
  toggles?: RoleToggles
  /** If this role is showed separately in the user listing */
  hoist: boolean
  /** Permission bit set */
  permissions: Permissions
  /** Whether this role is managed by an integration */
  managed: boolean
  /** Whether this role is mentionable */
  mentionable: boolean
  /**
   * Use role.tags
   * @deprecated this is not deprecated, but this is here to prevent users from using this as this is an internal value open to breaking changes.
   */
  internalTags?: {
    /** The id of the bot this role belongs to */
    botId?: bigint
    /** The id of the integration this role belongs to */
    integrationId?: bigint
    /** Id of this role's subscription sku and listing. */
    subscriptionListingId?: bigint
  }
  /** the role emoji hash */
  icon?: bigint
  /** Role name */
  name: string
  /** Integer representation of hexadecimal color code */
  color: number
  /** Position of this role */
  position: number
  /** role unicode emoji */
  unicodeEmoji?: string
  /** Role flags combined as a bitfield */
  flags: RoleFlags
}

export interface ScheduledEvent {
  /** the id of the scheduled event */
  id: bigint
  /** the guild id which the scheduled event belongs to */
  guildId: bigint
  /** the channel id in which the scheduled event will be hosted if specified */
  channelId?: bigint
  /** the id of the user that created the scheduled event */
  creatorId?: bigint
  /** the name of the scheduled event */
  name: string
  /** the description of the scheduled event */
  description?: string
  /** the time the scheduled event will start */
  scheduledStartTime: number
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: number
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel
  /** the status of the scheduled event */
  status: ScheduledEventStatus
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType
  /** any additional id of the hosting entity associated with event */
  entityId?: bigint
  /** the location for the scheduled event */
  location?: DiscordScheduledEventEntityMetadata['location']
  /** the user that created the scheduled event */
  creator?: User
  /** the number of users subscribed to the scheduled event */
  userCount?: number
  /** the cover image hash of the scheduled event */
  image?: bigint
}

export interface Sku {
  /** ID of SKU */
  id: bigint
  /** Type of SKU */
  type: DiscordSkuType
  /** ID of the parent application */
  applicationId: bigint
  /** Customer-facing name of your premium offering */
  name: string
  /** System-generated URL slug based on the SKU's name */
  slug: string
  /** SKU flags combined as a bitfield */
  flags: DiscordSkuFlag
}

export interface StageInstance {
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
  /** The id of this Stage instance */
  id: bigint
  /** The guild id of the associated Stage channel */
  guildId: bigint
  /** The id of the associated Stage channel */
  channelId: bigint
  /** The id of the scheduled event for this Stage instance */
  guildScheduledEventId?: bigint
}

export interface InviteStageInstance {
  /** The members speaking in the Stage */
  members: Array<Partial<Member>>
  /** The number of users in the Stage */
  participantCount: number
  /** The number of users speaking in the Stage */
  speakerCount: number
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
}
export interface Sticker {
  /** [Id of the sticker](https://discord.com/developers/docs/reference#image-formatting) */
  id: bigint
  /** Id of the pack the sticker is from */
  packId?: bigint
  /** Name of the sticker */
  name: string
  /** Description of the sticker */
  description: string
  /** a unicode emoji representing the sticker's expression */
  tags: string
  /** [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types) */
  type: StickerTypes
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  formatType: StickerFormatTypes
  /**  Whether or not the sticker is available */
  available?: boolean
  /** Id of the guild that owns this sticker */
  guildId?: bigint
  /** The user that uploaded the sticker */
  user?: User
  /** A sticker's sort order within a pack */
  sortValue?: number
}

export interface StickerPack {
  coverStickerId?: bigint
  bannerAssetId?: bigint
  id: bigint
  name: string
  description: string
  stickers: Sticker[]
  skuId: bigint
}

export interface Team {
  icon?: bigint | undefined
  id: bigint
  name: string
  ownerUserId: bigint
  members: Array<{
    membershipState: TeamMembershipStates
    teamId: bigint
    user: User
    role: DiscordTeamMemberRole
  }>
}

export interface Template {
  description?: string | null
  isDirty?: boolean
  name: string
  creatorId: bigint
  createdAt: number
  code: string
  usageCount: number
  creator: User
  updatedAt: number
  sourceGuildId: bigint
  serializedSourceGuild: NonNullable<DiscordTemplate['serialized_source_guild']>
}

export interface ThreadMember {
  id?: bigint
  userId?: bigint
  flags: number
  joinTimestamp: number
}

export interface ThreadMemberGuildCreate {
  joinTimestamp: number
}

export interface BaseUser {
  /** The user tag in the form of username#discriminator */
  tag: string
  /** Whether the user belongs to an OAuth2 application */
  bot: boolean
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system: boolean
  /** Whether the user has two factor enabled on their account */
  mfaEnabled: boolean
  /** Whether the email on this account has been verified */
  verified: boolean
}

export interface User extends BaseUser {
  /** Compressed version of all the booleans on a user. */
  toggles?: UserToggles
  /** The user's username, not unique across the platform */
  username: string
  /** The user's display name, if it is set. For bots, this is the application name */
  globalName?: string
  /** The user's chosen language option */
  locale?: string
  /** The flags on a user's account */
  flags?: ToggleBitfield
  /** The type of Nitro subscription on a user's account */
  premiumType?: PremiumTypes
  /** The public flags on a user's account */
  publicFlags?: ToggleBitfield
  /** the user's banner color encoded as an integer representation of hexadecimal color code */
  accentColor?: number
  /** The user's id */
  id: bigint
  /** The user's discord-tag */
  discriminator: string
  /** The user's avatar hash */
  avatar?: bigint
  /** The user's email */
  email?: string
  /** the user's banner, or null if unset */
  banner?: bigint
  /** data for the user's avatar decoration */
  avatarDecorationData?: AvatarDecorationData
}

export interface VoiceRegion {
  id: string
  name: string
  custom: boolean
  optimal: boolean
  deprecated: boolean
}

export interface VoiceState {
  requestToSpeakTimestamp?: number
  channelId?: bigint
  guildId: bigint
  toggles: VoiceStateToggles
  sessionId: string
  userId: bigint
}

export interface Webhook {
  /** The type of the webhook */
  type: WebhookTypes
  /** The secure token of the webhook (returned for Incoming Webhooks) */
  token?: string
  /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string

  /** The id of the webhook */
  id: bigint
  /** The guild id this webhook is for */
  guildId?: bigint
  /** The channel id this webhook is for */
  channelId?: bigint
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: User
  /** The default name of the webhook */
  name?: string
  /** The default user avatar hash of the webhook */
  avatar?: bigint
  /** The bot/OAuth2 application that created this webhook */
  applicationId?: bigint
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  sourceGuild?: Partial<Guild>
  /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
  sourceChannel?: Partial<Channel>
}

export interface WelcomeScreen {
  description?: string
  welcomeChannels: Array<{
    channelId: bigint
    description: string
    emojiId?: bigint
    emojiName?: string
  }>
}

export interface GuildWidget {
  id: bigint
  name: string
  members: Array<{
    id: bigint
    username: string
    discriminator: string
    avatar?: bigint
    status: string
    avatarUrl: string
  }>
  channels: Array<{
    id: bigint
    name: string
    position: number
  }>
  instant_invite: string
  presenceCount: number
}

export interface GuildWidgetSettings {
  channelId?: string
  enabled: boolean
}
