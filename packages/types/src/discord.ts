import type { DiscordApplication, DiscordApplicationIntegrationType } from './discord/applications.js'
import type { ChannelTypes, DiscordChannel, DiscordOverwrite, DiscordThreadMember, SortOrderTypes } from './discord/channels.js'
import type { DiscordEmoji } from './discord/emojis.js'
import type { DiscordPresenceUpdate } from './discord/gateway.js'
import type { DiscordMessageComponents, DiscordMessageInteraction, InteractionTypes } from './discord/interactions.js'
import type {
  AllowedMentionsTypes,
  AttachmentFlags,
  DefaultMessageNotificationLevels,
  EmbedTypes,
  ExplicitContentFilterLevels,
  GuildFeatures,
  GuildNsfwLevel,
  IntegrationExpireBehaviors,
  MessageActivityTypes,
  MessageFlags,
  MessageTypes,
  MfaLevels,
  PickPartial,
  PremiumTiers,
  PremiumTypes,
  RoleFlags,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
  SkuFlags,
  StickerFormatTypes,
  StickerTypes,
  SystemChannelFlags,
  TargetTypes,
  TeamMembershipStates,
  VerificationLevels,
  WebhookTypes,
} from './shared.js'

/** https://discord.com/developers/docs/resources/user#user-object */
export interface DiscordUser {
  /** The user's username, not unique across the platform */
  username: string
  /** The user's display name, if it is set. For bots, this is the application name */
  global_name: string | null
  /** The user's chosen language option */
  locale?: string
  /** The flags on a user's account */
  flags?: number
  /** The type of Nitro subscription on a user's account */
  premium_type?: PremiumTypes
  /** The public flags on a user's account */
  public_flags?: number
  /** the user's banner color encoded as an integer representation of hexadecimal color code */
  accent_color?: number
  /** The user's id */
  id: string
  /** The user's discord-tag */
  discriminator: string
  /** The user's avatar hash */
  avatar: string | null
  /** Whether the user belongs to an OAuth2 application */
  bot?: boolean
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean
  /** Whether the user has two factor enabled on their account */
  mfa_enabled?: boolean
  /** Whether the email on this account has been verified */
  verified?: boolean
  /** The user's email */
  email?: string | null
  /** the user's banner, or null if unset */
  banner?: string
  /** data for the user's avatar decoration */
  avatar_decoration_data?: DiscordAvatarDecorationData
}

/** https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes */
export enum OAuth2Scope {
  /**
   * Allows your app to fetch data from a user's "Now Playing/Recently Played" list
   *
   * @remarks
   * This scope is not currently available for apps
   */
  ActivitiesRead = 'activities.read',
  /**
   * Allows your app to update a user's activity
   *
   * @remarks
   * This scope not currently available for apps.
   */
  ActivitiesWrite = 'activities.write',
  /** Allows your app to read build data for a user's applications */
  ApplicationsBuildsRead = 'applications.builds.read',
  /**
   * Allows your app to upload/update builds for a user's applications
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  ApplicationsBuildsUpload = 'applications.builds.upload',
  /** Allows your app to add commands to a guild - included by default with the `bot` scope */
  ApplicationsCommands = 'applications.commands',
  /**
   * Allows your app to update its Application Commands via this bearer token
   *
   * @remarks
   * This scope can only be used when using a [Client Credential Grant](https://discord.com/developers/docs/topics/oauth2#client-credentials-grant)
   */
  ApplicationsCommandsUpdate = 'applications.commands.update',
  /** Allows your app to update permissions for its commands in a guild a user has permissions to */
  ApplicationCommandsPermissionsUpdate = 'applications.commands.permissions.update',
  /** Allows your app to read entitlements for a user's applications */
  ApplicationsEntitlements = 'applications.entitlements',
  /** Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
  ApplicationsStoreUpdate = 'applications.store.update',
  /** For oauth2 bots, this puts the bot in the user's selected guild by default */
  Bot = 'bot',
  /** Allows requests to [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections) */
  Connections = 'connections',
  /**
   * Allows your app to see information about the user's DMs and group DMs
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  DMChannelsRead = 'dm_channels.read',
  /** Adds the `email` filed to [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) */
  Email = 'email',
  /** Allows your app to join users to a group dm */
  GroupDMJoins = 'gdm.join',
  /** Allows requests to [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds) */
  Guilds = 'guilds',
  /** Allows requests to [/guilds/{guild.id}/members/{user.id}](https://discord.com/developers/docs/resources/guild#add-guild-member) */
  GuildsJoin = 'guilds.join',
  /** Allows requests to [/users/@me/guilds/{guild.id}/member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member) */
  GuildsMembersRead = 'guilds.members.read',
  /**
   * Allows requests to [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user)
   *
   * @remarks
   * The return object from [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user)
   * does NOT contain the `email` field unless the scope `email` is also used
   */
  Identify = 'identify',
  /**
   * For local rpc server api access, this allows you to read messages from all client channels
   * (otherwise restricted to channels/guilds your app creates)
   */
  MessagesRead = 'messages.read',
  /**
   * Allows your app to know a user's friends and implicit relationships
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RelationshipsRead = 'relationships.read',
  /** Allows your app to update a user's connection and metadata for the app */
  RoleConnectionsWrite = 'role_connections.write',
  /**
   * For local rpc server access, this allows you to control a user's local Discord client
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPC = 'rpc',
  /**
   * For local rpc server access, this allows you to update a user's activity
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPCActivitiesWrite = 'rpc.activities.write',
  /**
   * For local rpc server api access, this allows you to receive notifications pushed out to the user
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPCNotificationsRead = 'rpc.notifications.read',
  /**
   * For local rpc server access, this allows you to read a user's voice settings and listen for voice events
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPCVoiceRead = 'rpc.voice.read',
  /**
   * For local rpc server access, this allows you to update a user's voice settings
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPCVoiceWrite = 'rpc.voice.write',
  /**
   * Allows your app to connect to voice on user's behalf and see all the voice members
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  Voice = 'voice',
  /** Generate a webhook that is returned in the oauth token response for authorization code grants */
  WebhookIncoming = 'webhook.incoming',
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

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
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
  /** When the user joined the guild */
  joined_at: string
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

/** https://discord.com/developers/docs/resources/user#avatar-decoration-data-object */
export interface DiscordAvatarDecorationData {
  /** the avatar decoration hash */
  asset: string
  /** id of the avatar decoration's SKU */
  sku_id: string
}

export type DiscordTokenExchange = DiscordTokenExchangeAuthorizationCode | DiscordTokenExchangeRefreshToken | DiscordTokenExchangeClientCredentials

export interface DiscordTokenExchangeAuthorizationCode {
  grant_type: 'authorization_code'
  /** The code for the token exchange */
  code: string
  /** The redirect_uri associated with this authorization */
  redirect_uri: string
}

/** https://discord.com/developers/docs/topics/oauth2#client-credentials-grant */
export interface DiscordTokenExchangeRefreshToken {
  grant_type: 'refresh_token'
  /** the user's refresh token */
  refresh_token: string
}

/** https://discord.com/developers/docs/topics/oauth2#client-credentials-grant */
export interface DiscordTokenExchangeClientCredentials {
  grant_type: 'client_credentials'
  /** The scope(s) for the access token */
  scope: OAuth2Scope[]
}

export interface DiscordAccessTokenResponse {
  /** The access token of the user */
  access_token: string
  /** The type of token */
  token_type: string
  /** The number of seconds after that the access token is expired */
  expires_in: number
  /**
   * The refresh token to refresh the access token
   *
   * @remarks
   * When the token exchange is a client credentials type grant this value is not defined.
   */
  refresh_token: string
  /** The scopes for the access token */
  scope: string
  /** The webhook the user created for the application. Requires the `webhook.incoming` scope */
  webhook?: DiscordIncomingWebhook
  /** The guild the bot has been added. Requires the `bot` scope */
  guild?: DiscordGuild
}

export interface DiscordTokenRevocation {
  /** The access token to revoke */
  token: string
  /** Optional, the type of token you are using for the revocation */
  token_type_hint?: 'access_token' | 'refresh_token'
}

/** https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information-response-structure */
export interface DiscordCurrentAuthorization {
  application: DiscordApplication
  /** the scopes the user has authorized the application for */
  scopes: OAuth2Scope[]
  /** when the access token expires */
  expires: string
  /** the user who has authorized, if the user has authorized with the `identify` scope */
  user?: DiscordUser
}

/** https://discord.com/developers/docs/resources/user#connection-object-connection-structure */
export interface DiscordConnection {
  /** id of the connection account */
  id: string
  /** the username of the connection account */
  name: string
  /** the service of this connection */
  type: DiscordConnectionServiceType
  /** whether the connection is revoked */
  revoked?: boolean
  /** an array of partial server integrations */
  integrations?: Partial<DiscordIntegration>[]
  /** whether the connection is verified */
  verified: boolean
  /** whether friend sync is enabled for this connection */
  friend_sync: boolean
  /** whether activities related to this connection will be shown in presence updates */
  show_activity: boolean
  /** whether this connection has a corresponding third party OAuth2 token */
  two_way_link: boolean
  /** visibility of this connection */
  visibility: DiscordConnectionVisibility
}

/** https://discord.com/developers/docs/resources/user#connection-object-services */
export enum DiscordConnectionServiceType {
  AmazonMusic = 'amazon-music',
  BattleNet = 'battlenet',
  Bungie = 'Bungie.net',
  Bluesky = 'bluesky',
  Crunchyroll = 'crunchyroll',
  Domain = 'domain',
  eBay = 'ebay',
  EpicGames = 'epicgames',
  Facebook = 'facebook',
  GitHub = 'github',
  Instagram = 'instagram',
  LeagueOfLegends = 'leagueoflegends',
  Mastodon = 'mastodon',
  PayPal = 'paypal',
  PlayStationNetwork = 'playstation',
  Reddit = 'reddit',
  RiotGames = 'riotgames',
  Roblox = 'roblox',
  Spotify = 'spotify',
  Skype = 'skype',
  Steam = 'steam',
  TikTok = 'tiktok',
  Twitch = 'twitch',
  Twitter = 'twitter',
  Xbox = 'xbox',
  YouTube = 'youtube',
}

/** https://discord.com/developers/docs/resources/user#connection-object-visibility-types */
export enum DiscordConnectionVisibility {
  /** invisible to everyone except the user themselves */
  None = 0,
  /** visible to everyone */
  Everyone = 1,
}

/** https://discord.com/developers/docs/resources/user#application-role-connection-object-application-role-connection-structure */
export interface DiscordApplicationRoleConnection {
  /** the vanity name of the platform a bot has connected (max 50 characters) */
  platform_name: string | null
  /** the username on the platform a bot has connected (max 100 characters) */
  platform_username: string | null
  /** object mapping application role connection metadata keys to their stringified value (max 100 characters) for the user on the platform a bot has connected */
  metadata: Record<string, string>
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface DiscordTeam {
  /** Hash of the image of the team's icon */
  icon: string | null
  /** Unique ID of the team */
  id: string
  /** Members of the team */
  members: DiscordTeamMember[]
  /** User ID of the current team owner */
  owner_user_id: string
  /** Name of the team */
  name: string
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface DiscordTeamMember {
  /** The user's membership state on the team */
  membership_state: TeamMembershipStates
  /** The id of the parent team of which they are a member */
  team_id: string
  /** The avatar, discriminator, id, username, and global_name of the user */
  user: Partial<DiscordUser> & Pick<DiscordUser, 'avatar' | 'discriminator' | 'id' | 'username' | 'global_name'>
  /** Role of the team member */
  role: DiscordTeamMemberRole
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface DiscordAllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[]
  /** For replies, whether to mention the author of the message being replied to (default false) */
  replied_user?: boolean
  /** Array of role_ids to mention (Max size of 100) */
  roles?: string[]
  /** Array of user_ids to mention (Max size of 100) */
  users?: string[]
}

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface DiscordEmbed {
  /** Title of embed */
  title?: string
  /** Type of embed (always "rich" for webhook embeds) */
  type?: EmbedTypes
  /** Description of embed */
  description?: string
  /** Url of embed */
  url?: string
  /** Color code of the embed */
  color?: number
  /** Timestamp of embed content */
  timestamp?: string
  /** Footer information */
  footer?: DiscordEmbedFooter
  /** Image information */
  image?: DiscordEmbedImage
  /** Thumbnail information */
  thumbnail?: DiscordEmbedThumbnail
  /** Video information */
  video?: DiscordEmbedVideo
  /** Provider information */
  provider?: DiscordEmbedProvider
  /** Author information */
  author?: DiscordEmbedAuthor
  /** Fields information */
  fields?: DiscordEmbedField[]
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface DiscordEmbedAuthor {
  /** Name of author */
  name: string
  /** Url of author */
  url?: string
  /** Url of author icon (only supports http(s) and attachments) */
  icon_url?: string
  /** A proxied url of author icon */
  proxy_icon_url?: string
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface DiscordEmbedField {
  /** Name of the field */
  name: string
  /** Value of the field */
  value: string
  /** Whether or not this field should display inline */
  inline?: boolean
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface DiscordEmbedFooter {
  /** Footer text */
  text: string
  /** Url of footer icon (only supports http(s) and attachments) */
  icon_url?: string
  /** A proxied url of footer icon */
  proxy_icon_url?: string
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface DiscordEmbedImage {
  /** Source url of image (only supports http(s) and attachments) */
  url: string
  /** A proxied url of the image */
  proxy_url?: string
  /** Height of image */
  height?: number
  /** Width of image */
  width?: number
}

export interface DiscordEmbedProvider {
  /** Name of provider */
  name?: string
  /** Url of provider */
  url?: string
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface DiscordEmbedThumbnail {
  /** Source url of thumbnail (only supports http(s) and attachments) */
  url: string
  /** A proxied url of the thumbnail */
  proxy_url?: string
  /** Height of thumbnail */
  height?: number
  /** Width of thumbnail */
  width?: number
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface DiscordEmbedVideo {
  /** Source url of video */
  url?: string
  /** A proxied url of the video */
  proxy_url?: string
  /** Height of video */
  height?: number
  /** Width of video */
  width?: number
}

/** https://discord.com/developers/docs/resources/channel#attachment-object */
export interface DiscordAttachment {
  /** Name of file attached */
  filename: string
  /** The title of the file */
  title?: string
  /** The attachment's [media type](https://en.wikipedia.org/wiki/Media_type) */
  content_type?: string
  /** Size of file in bytes */
  size: number
  /** Source url of file */
  url: string
  /** A proxied url of file */
  proxy_url: string
  /** Attachment id */
  id: string
  /** description for the file (max 1024 characters) */
  description?: string
  /** Height of file (if image) */
  height?: number | null
  /** Width of file (if image) */
  width?: number | null
  /** whether this attachment is ephemeral. Ephemeral attachments will automatically be removed after a set period of time. Ephemeral attachments on messages are guaranteed to be available as long as the message itself exists. */
  ephemeral?: boolean
  /** The duration of the audio file for a voice message */
  duration_secs?: number
  /** A base64 encoded bytearray representing a sampled waveform for a voice message */
  waveform?: string
  /** Attachment flags combined as a bitfield */
  flags?: AttachmentFlags
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export type DiscordWebhook = DiscordIncomingWebhook | DiscordApplicationWebhook

export interface DiscordIncomingWebhook {
  /** The type of the webhook */
  type: WebhookTypes
  /** The secure token of the webhook (returned for Incoming Webhooks) */
  token?: string
  /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string

  /** The id of the webhook */
  id: string
  /** The guild id this webhook is for */
  guild_id?: string
  /** The channel id this webhook is for */
  channel_id: string
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: DiscordUser
  /** The default name of the webhook */
  name: string | null
  /** The default user avatar hash of the webhook */
  avatar: string | null
  /** The bot/OAuth2 application that created this webhook */
  application_id: string | null
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_guild?: Partial<DiscordGuild>
  /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_channel?: Partial<DiscordChannel>
}

export interface DiscordApplicationWebhook {
  /** The type of the webhook */
  type: WebhookTypes.Application
  /** The secure token of the webhook (returned for Incoming Webhooks) */
  token?: string
  /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string

  /** The id of the webhook */
  id: string
  /** The guild id this webhook is for */
  guild_id?: string | null
  /** The channel id this webhook is for */
  channel_id?: string | null
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: DiscordUser
  /** The default name of the webhook */
  name: string | null
  /** The default user avatar hash of the webhook */
  avatar: string | null
  /** The bot/OAuth2 application that created this webhook */
  application_id: string | null
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides */
  source_guild?: Partial<DiscordGuild>
  /** The channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides */
  source_channel?: Partial<DiscordChannel>
}

/** https://discord.com/developers/docs/resources/guild#guild-object */
export interface DiscordGuild {
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
  /** True if this is considered a large guild */
  large?: boolean
  /** True if this guild is unavailable due to an outage */
  unavailable?: boolean
  /** Total number of members in this guild */
  member_count?: number
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
  /** When this guild was joined at */
  joined_at?: string
  /** States of members currently in voice channels; lacks the guild_id key */
  voice_states?: Omit<DiscordVoiceState, 'guildId'>[]
  /** Users in the guild */
  members?: DiscordMember[]
  /** Channels in the guild */
  channels?: DiscordChannel[]
  /** All active threads in the guild that the current user has permission to view */
  threads?: DiscordChannel[]
  /** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: Partial<DiscordPresenceUpdate>[]
  /** Banner hash */
  banner: string | null
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferred_locale: string
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  public_updates_channel_id: string | null
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcome_screen?: DiscordWelcomeScreen
  /** Stage instances in the guild */
  stage_instances?: DiscordStageInstance[]
  /** Custom guild stickers */
  stickers?: DiscordSticker[]
  /** The id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
  safety_alerts_channel_id: string | null
  /**
   * Soundboard sounds in the guild
   *
   * @remarks
   * Only sent by the gateway
   */
  soundboard_sounds?: DiscordSoundboardSound[]
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface DiscordRole {
  /** Role id */
  id: string
  /** If this role is showed separately in the user listing */
  hoist: boolean
  /** Permission bit set */
  permissions: string
  /** Whether this role is managed by an integration */
  managed: boolean
  /** Whether this role is mentionable */
  mentionable: boolean
  /** The tags this role has */
  tags?: DiscordRoleTags
  /** the role emoji hash */
  icon?: string
  /** Role name */
  name: string
  /** Integer representation of hexadecimal color code */
  color: number
  /** Position of this role (roles with the same position are sorted by id) */
  position: number
  /** role unicode emoji */
  unicode_emoji?: string
  /** Role flags combined as a bitfield */
  flags: RoleFlags
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface DiscordRoleTags {
  /** The id of the bot this role belongs to */
  bot_id?: string
  /** The id of the integration this role belongs to */
  integration_id?: string
  /** Whether this is the guild's premium subscriber role */
  premium_subscriber?: null
  /** Id of this role's subscription sku and listing. */
  subscription_listing_id?: string
  /** Whether this role is available for purchase. */
  available_for_purchase?: null
  /** Whether this is a guild's linked role */
  guild_connections?: null
}

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface DiscordVoiceState {
  /** The session id for this voice state */
  session_id: string
  /** The guild id this voice state is for */
  guild_id?: string
  /** The channel id this user is connected to */
  channel_id: string | null
  /** The user id this voice state is for */
  user_id: string
  /** The guild member this voice state is for */
  member?: DiscordMemberWithUser
  /** Whether this user is deafened by the server */
  deaf: boolean
  /** Whether this user is muted by the server */
  mute: boolean
  /** Whether this user is locally deafened */
  self_deaf: boolean
  /** Whether this user is locally muted */
  self_mute: boolean
  /** Whether this user is streaming using "Go Live" */
  self_stream?: boolean
  /** Whether this user's camera is enabled */
  self_video: boolean
  /** Whether this user is muted by the current user */
  suppress: boolean
  /** The time at which the user requested to speak */
  request_to_speak_timestamp: string | null
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

/** https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure */
export interface DiscordStageInstance {
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
  /** The id of this Stage instance */
  id: string
  /** The guild id of the associated Stage channel */
  guild_id: string
  /** The id of the associated Stage channel */
  channel_id: string
  /** The id of the scheduled event for this Stage instance */
  guild_scheduled_event_id?: string
}

export interface DiscordMemberWithUser extends DiscordMember {
  /** The user object for this member */
  user: DiscordUser
}

/** https://discord.com/developers/docs/resources/channel#message-object */
export interface DiscordMessage {
  /** id of the message */
  id: string
  /** id of the channel the message was sent in */
  channel_id: string
  /**
   * id of the guild the message was sent in
   * Note: For MESSAGE_CREATE and MESSAGE_UPDATE events, the message object may not contain a guild_id or member field since the events are sent directly to the receiving user and the bot who sent the message, rather than being sent through the guild like non-ephemeral messages.
   */
  guild_id?: string
  /**
   * The author of this message (not guaranteed to be a valid user)
   * Note: The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the webhook_id on the message object.
   */
  author: DiscordUser
  /**
   * Member properties for this message's author
   * Note: The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels. This allows bots to obtain real-time member data without requiring bots to store member state in memory.
   */
  member?: DiscordMember
  /** Contents of the message */
  content?: string
  /** When this message was sent */
  timestamp: string
  /** When this message was edited (or null if never) */
  edited_timestamp: string | null
  /** Whether this was a TTS message */
  tts: boolean
  /** Whether this message mentions everyone */
  mention_everyone: boolean
  /**
   * Users specifically mentioned in the message
   * Note: The user objects in the mentions array will only have the partial member field present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels.
   */
  mentions: Array<DiscordUser & { member?: Partial<DiscordMember> }>
  /** Roles specifically mentioned in this message */
  mention_roles?: string[]
  /**
   * Channels specifically mentioned in this message
   * Note: Not all channel mentions in a message will appear in `mention_channels`. Only textual channels that are visible to everyone in a discoverable guild will ever be included. Only crossposted messages (via Channel Following) currently include `mention_channels` at all. If no mentions in the message meet these requirements, this field will not be sent.
   */
  mention_channels?: DiscordChannelMention[]
  /** Any attached files */
  attachments: DiscordAttachment[]
  /** Any embedded content */
  embeds: DiscordEmbed[]
  /** Reactions to the message */
  reactions?: DiscordReaction[]
  /** Used for validating a message was sent */
  nonce?: number | string
  /** Whether this message is pinned */
  pinned: boolean
  /** If the message is generated by a webhook, this is the webhook's id */
  webhook_id?: string
  /** Type of message */
  type: MessageTypes
  /** Sent with Rich Presence-related chat embeds */
  activity?: DiscordMessageActivity
  /** Sent with Rich Presence-related chat embeds */
  application?: Partial<DiscordApplication>
  /** if the message is an Interaction or application-owned webhook, this is the id of the application */
  application_id?: string
  /** Data showing the source of a crosspost, channel follow add, pin, or reply message */
  message_reference?: Omit<DiscordMessageReference, 'failIfNotExists'>
  /** Message flags combined as a bitfield */
  flags?: MessageFlags
  /**
   * The stickers sent with the message (bots currently can only receive messages with stickers, not send)
   * @deprecated
   */
  stickers?: DiscordSticker[]
  /**
   * The message associated with the 'message_reference'
   * Note: This field is only returned for messages with a 'type' of '19', '21', or '23'. If the message is one of these but the 'referenced_message' field is not present, the backend did not attempt to fetch the message that was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.
   */
  referenced_message?: DiscordMessage
  /** The message associated with the `message_reference`. This is a minimal subset of fields in a message (e.g. `author` is excluded.)  */
  message_snapshots?: DiscordMessageSnapshot[]
  /** sent if the message is sent as a result of an interaction */
  interaction_metadata?: DiscordMessageInteractionMetadata
  /**
   * Sent if the message is a response to an Interaction
   *
   * @deprecated Deprecated in favor of {@link interaction_metadata}
   */
  interaction?: DiscordMessageInteraction
  /** The thread that was started from this message, includes thread member object */
  thread?: Omit<DiscordChannel, 'member'> & { member: DiscordThreadMember }
  /** The components related to this message */
  components?: DiscordMessageComponents
  /** Sent if the message contains stickers */
  sticker_items?: DiscordStickerItem[]
  /** A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread, it can be used to estimate the relative position of the message in a thread in company with `total_message_sent` on parent thread */
  position?: number
  /** The poll object */
  poll?: DiscordPoll
  /** The call associated with the message */
  call?: DiscordMessageCall
}

/** https://discord.com/developers/docs/resources/channel#message-call-object */
export interface DiscordMessageCall {
  /** Array of user object ids that participated in the call */
  participants: string[]
  /** Time when call ended */
  ended_timestamp: string
}

/** https://discord.com/developers/docs/resources/channel#channel-mention-object */
export interface DiscordChannelMention {
  /** id of the channel */
  id: string
  /** id of the guild containing the channel */
  guild_id: string
  /** The type of channel */
  type: number
  /** The name of the channel */
  name: string
}

/** https://discord.com/developers/docs/resources/channel#reaction-object */
export interface DiscordReaction {
  /** Total number of times this emoji has been used to react (including super reacts) */
  count: number
  /**	Reaction count details object */
  count_details: DiscordReactionCountDetails
  /** Whether the current user reacted using this emoji */
  me: boolean
  /**	Whether the current user super-reacted using this emoji */
  me_burst: boolean
  /** Emoji information */
  emoji: Partial<DiscordEmoji>
  /** HEX colors used for super reaction */
  burst_colors: string[]
}

/** https://discord.com/developers/docs/resources/channel#get-reactions-reaction-types */
export enum DiscordReactionType {
  Normal,
  Burst,
}

/** https://discord.com/developers/docs/resources/channel#reaction-count-details-object */
export interface DiscordReactionCountDetails {
  /** Count of super reactions */
  burst: number
  /**	Count of normal reactions */
  normal: number
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface DiscordMessageActivity {
  /** Type of message activity */
  type: MessageActivityTypes
  /** `party_id` from a Rich Presence event */
  party_id?: string
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure */
export interface DiscordMessageReference {
  /** Type of reference */
  type?: DiscordMessageReferenceType
  /** id of the originating message */
  message_id?: string
  /**
   * id of the originating message's channel
   * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
   */
  channel_id?: string
  /** id of the originating message's guild */
  guild_id?: string
  /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  fail_if_not_exists: boolean
}

/** https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-types */
export enum DiscordMessageReferenceType {
  /**
   * A standard reference used by replies.
   *
   * @remarks
   * When the type is set to this value, the field referenced_message on the message will be present
   */
  Default,
  /**
   * Reference used to point to a message at a point in time.
   *
   * @remarks
   * When the type is set to this value, the field message_snapshot on the message will be present
   *
   * This value can only be used for basic messages;
   * i.e. messages which do not have strong bindings to a non global entity.
   * Thus we support only messages with `DEFAULT` or `REPLY` types, but disallowed if there are any polls, calls, or components.
   */
  Forward,
}

/** https://discord.com/developers/docs/resources/channel#message-snapshot-object-message-snapshot-structure */
export interface DiscordMessageSnapshot {
  /** Minimal subset of fields in the forwarded message */
  message: Pick<
    DiscordMessage,
    | 'type'
    | 'content'
    | 'embeds'
    | 'attachments'
    | 'timestamp'
    | 'edited_timestamp'
    | 'flags'
    | 'mentions'
    | 'mention_roles'
    | 'stickers'
    | 'sticker_items'
    | 'components'
  >
}

/** https://discord.com/developers/docs/resources/poll#poll-object */
export interface DiscordPoll {
  /** The question of the poll. Only `text` is supported. */
  question: DiscordPollMedia
  /** Each of the answers available in the poll. There is a maximum of 10 answers per poll. */
  answers: DiscordPollAnswer[]
  /**
   * The time when the poll ends.
   *
   * @remarks
   * `expiry` is marked as nullable to support non-expiring polls in the future, but all polls have an expiry currently.
   */
  expiry: string | null
  /** Whether a user can select multiple answers */
  allow_multiselect: boolean
  /** The layout type of the poll */
  layout_type: DiscordPollLayoutType
  /**
   * The results of the poll
   *
   * @remarks
   * This value will not be sent by discord under specific conditions where they don't fetch them on their backend. When this value is missing it should be interpreted as "Unknown results" and not as "No results"
   * The results may not be totally accurate while the poll has not ended. When it ends discord will re-calculate all the results and set {@link DiscordPollResult.is_finalized} to true
   */
  results?: DiscordPollResult
}

/** https://discord.com/developers/docs/resources/poll#layout-type */
export enum DiscordPollLayoutType {
  /** The default layout */
  Default = 1,
}

/** https://discord.com/developers/docs/resources/poll#poll-media-object */
export interface DiscordPollMedia {
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
  emoji?: Partial<DiscordEmoji>
}

/** https://discord.com/developers/docs/resources/poll#poll-answer-object */
export interface DiscordPollAnswer {
  /**
   * The id of the answer
   *
   * @remarks
   * This id labels each answer. It starts at 1 and goes up sequentially. Discord recommend against depending on this value as is a implementation detail.
   */
  answer_id: number
  /** The data of the answer */
  poll_media: DiscordPollMedia
}

export interface DiscordPollAnswerCount {
  /** The {@link DiscordPollAnswer.answer_id | answer_id} */
  id: number
  /** The number of votes for this answer */
  count: number
  /** Whether the current user voted for this answer */
  me_voted: boolean
}

/** https://discord.com/developers/docs/resources/poll#poll-results-object */
export interface DiscordPollResult {
  /** Whether the votes have been precisely counted */
  is_finalized: boolean
  /** The counts for each answer */
  answer_counts: DiscordPollAnswerCount[]
}

/** https://discord.com/developers/docs/resources/poll#get-answer-voters-response-body */
export interface DiscordGetAnswerVotesResponse {
  /** Users who voted for this answer */
  users: DiscordUser[]
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface DiscordSticker {
  /** [Id of the sticker](https://discord.com/developers/docs/reference#image-formatting) */
  id: string
  /** Id of the pack the sticker is from */
  pack_id?: string
  /** Name of the sticker */
  name: string
  /** Description of the sticker */
  description: string
  /** a unicode emoji representing the sticker's expression */
  tags: string
  /** [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types) */
  type: StickerTypes
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  format_type: StickerFormatTypes
  /**  Whether or not the sticker is available */
  available?: boolean
  /** Id of the guild that owns this sticker */
  guild_id?: string
  /** The user that uploaded the sticker */
  user?: DiscordUser
  /** A sticker's sort order within a pack */
  sort_value?: number
}

/** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object */
export type DiscordMessageInteractionMetadata =
  | DiscordApplicationCommandInteractionMetadata
  | DiscordMessageComponentInteractionMetadata
  | DiscordModalSubmitInteractionMetadata

/** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object-application-command-interaction-metadata-structure */
export interface DiscordApplicationCommandInteractionMetadata {
  /** Id of the interaction */
  id: string
  /** The type of interaction */
  type: InteractionTypes
  /** User who triggered the interaction */
  user: DiscordUser
  /** IDs for installation context(s) related to an interaction */
  authorizing_integration_owners: Partial<Record<`${DiscordApplicationIntegrationType}`, string>>
  /** ID of the original response message, present only on follow-up messages */
  original_response_message_id?: string
  /** The user the command was run on, present only on user command interactions */
  target_user?: DiscordUser
  /** The ID of the message the command was run on, present only on message command interactions. The original response message will also have message_reference and referenced_message pointing to this message. */
  target_message_id?: string
}

/** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object-message-component-interaction-metadata-structure */
export interface DiscordMessageComponentInteractionMetadata {
  id: string
  /** The type of interaction */
  type: InteractionTypes
  /** User who triggered the interaction */
  user: DiscordUser
  /** IDs for installation context(s) related to an interaction */
  authorizing_integration_owners: Partial<Record<`${DiscordApplicationIntegrationType}`, string>>
  /** ID of the original response message, present only on follow-up messages */
  original_response_message_id?: string
  /** ID of the message that contained interactive component, present only on messages created from component interactions */
  interacted_message_id?: string
}

/** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object-modal-submit-interaction-metadata-structure */
export interface DiscordModalSubmitInteractionMetadata {
  id: string
  /** The type of interaction */
  type: InteractionTypes
  /** User who triggered the interaction */
  user: DiscordUser
  /** IDs for installation context(s) related to an interaction */
  authorizing_integration_owners: Partial<Record<`${DiscordApplicationIntegrationType}`, string>>
  /** ID of the original response message, present only on follow-up messages */
  original_response_message_id?: string
  /** Metadata for the interaction that was used to open the modal, present only on modal submit interactions */
  triggering_interaction_metadata?: DiscordMessageInteractionMetadata
}

/** https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure */
export interface DiscordStickerItem {
  /** Id of the sticker */
  id: string
  /** Name of the sticker */
  name: string
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  format_type: StickerFormatTypes
}

/** https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure */
export interface DiscordStickerPack {
  /** id of the sticker pack */
  id: string
  /** the stickers in the pack */
  stickers: DiscordSticker[]
  /** name of the sticker pack */
  name: string
  /** id of the pack's SKU */
  sku_id: string
  /** id of a sticker in the pack which is shown as the pack's icon */
  cover_sticker_id?: string
  /** description of the sticker pack */
  description: string
  /** id of the sticker pack's [banner image](https://discord.com/developers/docs/reference#image-formatting) */
  banner_asset_id?: string
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface DiscordInteractionMember extends DiscordMemberWithUser {
  /** Total permissions of the member in the channel, including overwrites, returned when in the interaction object */
  permissions: string
}

export interface DiscordScheduledEvent {
  /** the id of the scheduled event */
  id: string
  /** the guild id which the scheduled event belongs to */
  guild_id: string
  /** the channel id in which the scheduled event will be hosted if specified */
  channel_id: string | null
  /** the id of the user that created the scheduled event */
  creator_id?: string | null
  /** the name of the scheduled event */
  name: string
  /** the description of the scheduled event */
  description?: string
  /** the time the scheduled event will start */
  scheduled_start_time: string
  /** the time the scheduled event will end if it does end. */
  scheduled_end_time: string | null
  /** the privacy level of the scheduled event */
  privacy_level: ScheduledEventPrivacyLevel
  /** the status of the scheduled event */
  status: ScheduledEventStatus
  /** the type of hosting entity associated with a scheduled event */
  entity_type: ScheduledEventEntityType
  /** any additional id of the hosting entity associated with event */
  entity_id: string | null
  /** the entity metadata for the scheduled event */
  entity_metadata: DiscordScheduledEventEntityMetadata | null
  /** the user that created the scheduled event */
  creator?: DiscordUser
  /** the number of users subscribed to the scheduled event */
  user_count?: number
  /** the cover image hash of the scheduled event */
  image?: string | null
  /** the definition for how often this event should recur */
  recurrence_rule: DiscordScheduledEventRecurrenceRule | null
}

export interface DiscordScheduledEventEntityMetadata {
  /** location of the event */
  location?: string
}

export interface DiscordScheduledEventRecurrenceRule {
  /** Starting time of the recurrence interval */
  start: string
  /** Ending time of the recurrence interval */
  end: string | null
  /** How often the event occurs */
  frequency: DiscordScheduledEventRecurrenceRuleFrequency
  /** The spacing between the events, defined by `frequency`. For example, `frequency` of `Weekly` and an `interval` of `2` would be "every-other week" */
  interval: number
  /** Set of specific days within a week for the event to recur on */
  by_weekday: DiscordScheduledEventRecurrenceRuleWeekday[] | null
  /** List of specific days within a specific week (1-5) to recur on */
  by_n_weekday: DiscordScheduledEventRecurrenceRuleNWeekday[] | null
  /** Set of specific months to recur on */
  by_month: DiscordScheduledEventRecurrenceRuleMonth[] | null
  /** Set of specific dates within a month to recur on */
  by_month_day: number[] | null
  /** Set of days within a year to recur on (1-364) */
  by_year_day: number[] | null
  /** The total amount of times that the event is allowed to recur before stopping */
  count: number | null
}

export enum DiscordScheduledEventRecurrenceRuleFrequency {
  Yearly,
  Monthly,
  Weekly,
  Daily,
}

export enum DiscordScheduledEventRecurrenceRuleWeekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export interface DiscordScheduledEventRecurrenceRuleNWeekday {
  /** The week to reoccur on. 1 - 5 */
  n: number
  /** The day within the week to reoccur on */
  day: DiscordScheduledEventRecurrenceRuleWeekday
}

export enum DiscordScheduledEventRecurrenceRuleMonth {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

/** https://discord.com/developers/docs/resources/invite#invite-metadata-object */
export interface DiscordInviteMetadata extends DiscordInvite {
  /** Number of times this invite has been used */
  uses: number
  /** Max number of times this invite can be used */
  max_uses: number
  /** Duration (in seconds) after which the invite expires */
  max_age: number
  /** Whether this invite only grants temporary membership */
  temporary: boolean
  /** When this invite was created */
  created_at: string
}

/** https://discord.com/developers/docs/resources/invite#invite-object */
export interface DiscordInvite {
  /** The type of invite */
  type: DiscordInviteType
  /** The invite code (unique Id) */
  code: string
  /** The guild this invite is for */
  guild?: Partial<DiscordGuild>
  /** The channel this invite is for */
  channel: Partial<DiscordChannel> | null
  /** The user who created the invite */
  inviter?: DiscordUser
  /** The type of target for this voice channel invite */
  target_type?: TargetTypes
  /** The target user for this invite */
  target_user?: DiscordUser
  /** The embedded application to open for this voice channel embedded application invite */
  target_application?: Partial<DiscordApplication>
  /** Approximate count of online members (only present when target_user is set) */
  approximate_presence_count?: number
  /** Approximate count of total members */
  approximate_member_count?: number
  /** The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true` */
  expires_at?: string | null
  /** Stage instance data if there is a public Stage instance in the Stage channel this invite is for */
  stage_instance?: DiscordInviteStageInstance
  /** guild scheduled event data */
  guild_scheduled_event?: DiscordScheduledEvent
}

export enum DiscordInviteType {
  Guild,
  GroupDm,
  Friend,
}

export interface DiscordInviteStageInstance {
  /** The members speaking in the Stage */
  members: Partial<DiscordMember>[]
  /** The number of users in the Stage */
  participant_count: number
  /** The number of users speaking in the Stage */
  speaker_count: number
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget */
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

/** https://discord.com/developers/docs/resources/guild#guild-preview-object */
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

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export interface DiscordUnavailableGuild extends Pick<DiscordGuild, 'id' | 'unavailable'> {}

/** https://discord.com/developers/docs/resources/template#template-object-template-structure */
export interface DiscordTemplate {
  /** The template code (unique Id) */
  code: string
  /** Template name */
  name: string
  /** The description for the template */
  description: string | null
  /** Number of times this template has been used */
  usage_count: number
  /** The Id of the user who created the template */
  creator_id: string
  /** The user who created the template */
  creator: DiscordUser
  /** When this template was created */
  created_at: string
  /** When this template was last synced to the source guild */
  updated_at: string
  /** The Id of the guild this template is based on */
  source_guild_id: string
  /** The guild snapshot this template contains */
  serialized_source_guild: DiscordTemplateSerializedSourceGuild
  is_dirty: boolean | null
}

export type DiscordTemplateSerializedSourceGuild = Omit<
  PickPartial<
    DiscordGuild,
    | 'name'
    | 'description'
    | 'verification_level'
    | 'default_message_notifications'
    | 'explicit_content_filter'
    | 'preferred_locale'
    | 'afk_timeout'
    | 'system_channel_flags'
  >,
  'roles' | 'channels' | 'afk_channel_id' | 'system_channel_id'
> & {
  afk_channel_id: number | null
  system_channel_id: number | null
  roles: Array<
    Omit<PickPartial<DiscordRole, 'name' | 'color' | 'hoist' | 'mentionable' | 'permissions' | 'icon' | 'unicode_emoji'>, 'id'> & {
      id: number
    }
  >
  channels: Array<
    Omit<
      PickPartial<
        DiscordChannel,
        | 'name'
        | 'type'
        | 'position'
        | 'topic'
        | 'bitrate'
        | 'user_limit'
        | 'nsfw'
        | 'rate_limit_per_user'
        | 'default_auto_archive_duration'
        | 'available_tags'
        | 'default_reaction_emoji'
        | 'default_thread_rate_limit_per_user'
        | 'default_sort_order'
        | 'default_forum_layout'
      >,
      'id' | 'permission_overwrites' | 'parent_id'
    > & {
      id: number
      permission_overwrites: DiscordOverwrite & { id: number }
      parent_id: number | null
    }
  >
}

/** https://discord.com/developers/docs/events/gateway#guild-member-add */
export interface DiscordGuildMemberAdd extends DiscordMemberWithUser {
  /** id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway#thread-member-update */
export interface DiscordThreadMemberUpdate {
  /** The id of the thread */
  id: string
  /** The id of the guild */
  guild_id: string
  /** The timestamp when the bot joined this thread. */
  joined_at: string
  /** The flags this user has for this thread. Not useful for bots. */
  flags: number
}

/** https://discord.com/developers/docs/resources/guild#ban-object */
export interface DiscordBan {
  /** The reason for the ban */
  reason: string | null
  /** The banned user */
  user: DiscordUser
}

/** https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure */
export interface DiscordVoiceRegion {
  /** Unique Id for the region */
  id: string
  /** Name of the region */
  name: string
  /** true for a single server that is closest to the current user's client */
  optimal: boolean
  /** Whether this is a deprecated voice region (avoid switching to these) */
  deprecated: boolean
  /** Whether this is a custom voice region (used for events/etc) */
  custom: boolean
}

export interface DiscordGuildWidgetSettings {
  /** whether the widget is enabled */
  enabled: boolean
  /** the widget channel id */
  channel_id: string | null
}

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

export interface DiscordCreateMessage {
  /** The message contents (up to 2000 characters) */
  content?: string
  /** Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
  nonce?: string | number
  /** true if this is a TTS message */
  tts?: boolean
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: DiscordEmbed[]
  /** Allowed mentions for the message */
  allowed_mentions?: DiscordAllowedMentions
  /** Include to make your message a reply */
  message_reference?: {
    /** id of the originating message */
    message_id?: string
    /**
     * id of the originating message's channel
     * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
     */
    channel_id?: string
    /** id of the originating message's guild */
    guild_id?: string
    /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
    fail_if_not_exists: boolean
  }
  /** The components you would like to have sent in this message */
  components?: DiscordMessageComponents
  /** IDs of up to 3 stickers in the server to send in the message */
  stickerIds?: [string] | [string, string] | [string, string, string]
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

export interface DiscordCreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string
  /** Image url for the default webhook avatar */
  avatar?: string | null
}

export type DiscordArchivedThreads = DiscordActiveThreads & {
  hasMore: boolean
}

export interface DiscordActiveThreads {
  threads: DiscordChannel[]
  members: DiscordThreadMember[]
}

export interface DiscordVanityUrl {
  code: string | null
  uses: number
}

export interface DiscordPrunedCount {
  pruned: number
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

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types */
export enum DiscordGuildOnboardingPromptType {
  MultipleChoice,
  DropDown,
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode */
export enum DiscordGuildOnboardingMode {
  /** Counts only Default Channels towards constraints */
  OnboardingDefault,
  /** Counts Default Channels and Questions towards constraints */
  OnboardingAdvanced,
}

/** https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types */
export enum DiscordTeamMemberRole {
  /** Owners are the most permissiable role, and can take destructive, irreversible actions like deleting the team itself. Teams are limited to 1 owner. */
  Owner = 'owner',
  /** Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps. */
  Admin = 'admin',
  /**
   * Developers can access information about team-owned apps, like the client secret or public key.
   * They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token.
   * Members with the Developer role *cannot* manage the team or its members, or take destructive actions on team-owned apps.
   */
  Developer = 'developer',
  /** Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. */
  ReadOnly = 'read_only',
}

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-structure */
export interface DiscordSku {
  /** ID of SKU */
  id: string
  /** Type of SKU */
  type: DiscordSkuType
  /** ID of the parent application */
  application_id: string
  /** Customer-facing name of your premium offering */
  name: string
  /** System-generated URL slug based on the SKU's name */
  slug: string
  /** SKU flags combined as a bitfield */
  flags: SkuFlags
}

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-types */
export enum DiscordSkuType {
  /** Durable one-time purchase */
  Durable = 2,
  /** Consumable one-time purchase */
  Consumable = 3,
  /** Represents a recurring subscription */
  Subscription = 5,
  /** System-generated group for each SUBSCRIPTION SKU created */
  SubscriptionGroup = 6,
}

/** https://discord.com/developers/docs/resources/subscription#subscription-object */
export interface DiscordSubscription {
  /** ID of the subscription */
  id: string
  /** ID of the user who is subscribed */
  user_id: string
  /** List of SKUs subscribed to */
  sku_ids: string[]
  /** List of entitlements granted for this subscription */
  entitlement_ids: string[]
  /** List of SKUs that this user will be subscribed to at renewal */
  renewal_sku_ids: string[] | null
  /** Start of the current subscription period */
  current_period_start: string
  /** End of the current subscription period */
  current_period_end: string
  /** Current status of the subscription */
  status: DiscordSubscriptionStatus
  /** When the subscription was canceled */
  canceled_at: string | null
  /** ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription. Missing unless queried with a private OAuth scope. */
  country?: string
}

/** https://discord.com/developers/docs/resources/subscription#subscription-statuses */
export enum DiscordSubscriptionStatus {
  /** Subscription is active and scheduled to renew. */
  Active,
  /** Subscription is active but will not renew. */
  Ending,
  /** Subscription is inactive and not being charged. */
  Inactive,
}

/** https://discord.com/developers/docs/resources/guild#bulk-guild-ban */
export interface DiscordBulkBan {
  /** list of user ids, that were successfully banned */
  banned_users: string[]
  /** list of user ids, that were not banned */
  failed_users: string[]
}

/** https://discord.com/developers/docs/resources/soundboard#soundboard-sound-object-soundboard-sound-structure */
export interface DiscordSoundboardSound {
  /** The name of this sound */
  name: string
  /** The id of this sound */
  sound_id: string
  /** The volume of this sound, from 0 to 1 */
  volume: number
  /** The id of this sound's custom emoji */
  emoji_id: string | null
  /** The unicode character of this sound's standard emoji */
  emoji_name: string | null
  /** The id of the guild this sound is in */
  guild_id?: string
  /** Whether this sound can be used, may be false due to loss of Server Boosts */
  available: boolean
  /** The user who created this sound */
  user?: DiscordUser
}

export interface DiscordThreadMemberGuildCreate {
  /** Any user-thread settings, currently only used for notifications */
  flags: number
  /** The time the current user last joined the thread */
  join_timestamp: string
}
