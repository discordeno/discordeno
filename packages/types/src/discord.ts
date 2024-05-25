import type {
  ActivityTypes,
  AllowedMentionsTypes,
  ApplicationCommandOptionTypes,
  ApplicationCommandPermissionTypes,
  ApplicationCommandTypes,
  ApplicationFlags,
  AttachmentFlags,
  AuditLogEvents,
  ButtonStyles,
  ChannelFlags,
  ChannelTypes,
  DefaultMessageNotificationLevels,
  EmbedTypes,
  ExplicitContentFilterLevels,
  ForumLayout,
  GatewayEventNames,
  GuildFeatures,
  GuildMemberFlags,
  GuildNsfwLevel,
  IntegrationExpireBehaviors,
  InteractionTypes,
  Localization,
  MessageActivityTypes,
  MessageComponentTypes,
  MessageTypes,
  MfaLevels,
  OverwriteTypes,
  PickPartial,
  PremiumTiers,
  PremiumTypes,
  RoleFlags,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
  SortOrderTypes,
  StickerFormatTypes,
  StickerTypes,
  SystemChannelFlags,
  TargetTypes,
  TeamMembershipStates,
  TextStyles,
  VerificationLevels,
  VideoQualityModes,
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
  /** the user's avatar decoration, or null if unset */
  avatar_decoration?: string
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

/** https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-create-event-additional-fields */
export interface DiscordIntegrationCreateUpdate extends DiscordIntegration {
  /** Id of the guild */
  guild_id: string
}

/** https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-delete-event-fields */
export interface DiscordIntegrationDelete {
  /** Integration id */
  id: string
  /** Id of the guild */
  guild_id: string
  /** Id of the bot/OAuth2 application for this discord integration */
  application_id?: string
}

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update */
export interface DiscordGuildIntegrationsUpdate {
  /** id of the guild whose integrations were updated */
  guild_id: string
}

/** https://discord.com/developers/docs/topics/gateway#typing-start */
export interface DiscordTypingStart {
  /** Unix time (in seconds) of when the user started typing */
  timestamp: number
  /** id of the channel */
  channel_id: string
  /** id of the guild */
  guild_id?: string
  /** id of the user */
  user_id: string
  /** The member who started typing if this happened in a guild */
  member?: DiscordMember
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
  /** This users guild nickname */
  nick?: string | null
  /** The members custom avatar for this server. */
  avatar?: string
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
  flags: GuildMemberFlags
}

/** https://discord.com/developers/docs/resources/application#application-object */
export interface DiscordApplication {
  /** The name of the app */
  name: string
  /** The description of the app */
  description: string
  /** An array of rpc origin urls, if rpc is enabled */
  rpc_origins?: string[]
  /** The url of the app's terms of service */
  terms_of_service_url?: string
  /** The url of the app's privacy policy */
  privacy_policy_url?: string
  /** The hex encoded key for verification in interactions and the GameSDK's GetTicket */
  verify_key: string
  /** If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  primary_sku_id?: string
  /** If this application is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string
  /** The application's public flags */
  flags?: ApplicationFlags
  /** The id of the app */
  id: string
  /** The icon hash of the app */
  icon: string | null
  /** When false only app owner can join the app's bot to guilds */
  bot_public: boolean
  /** When true the app's bot will only join upon completion of the full oauth2 code grant flow */
  bot_require_code_grant: boolean
  /** Partial user object containing info on the owner of the application */
  owner?: Partial<DiscordUser>
  /** If the application belongs to a team, this will be a list of the members of that team */
  team: DiscordTeam | null
  /** Guild associated with the app. For example, a developer support server. */
  guild_id?: string
  /** A partial object of the associated guild */
  guild?: Partial<DiscordGuild>
  /** If this application is a game sold on Discord, this field will be the hash of the image on store embeds */
  cover_image?: string
  /** up to 5 tags describing the content and functionality of the application */
  tags?: string[]
  /** settings for the application's default in-app authorization link, if enabled */
  install_params?: DiscordInstallParams
  /**
   * Default scopes and permissions for each supported installation context.
   *
   * @remarks
   * This is currently in preview.
   */
  integration_types_config?: Partial<Record<`${DiscordApplicationIntegrationType}`, DiscordApplicationIntegrationTypeConfiguration>>
  /** the application's default custom authorization link, if enabled */
  custom_install_url?: string
  /** the application's role connection verification entry point, which when configured will render the app as a verification method in the guild role verification configuration */
  role_connections_verification_url?: string
  /** An approximate count of the app's guild membership. */
  approximate_guild_count?: number
  /** Partial user object for the bot user associated with the app */
  bot?: Partial<DiscordUser>
  /** Array of redirect URIs for the app */
  redirect_uris?: string[]
  /** Interactions endpoint URL for the app */
  interactions_endpoint_url?: string
}

/** https://discord.com/developers/docs/resources/application#application-object-application-integration-type-configuration-object */
export interface DiscordApplicationIntegrationTypeConfiguration {
  /**
   * Install params for each installation context's default in-app authorization link
   *
   * https://discord.com/developers/docs/resources/application#install-params-object-install-params-structure
   */
  oauth2_install_params?: {
    /** Scopes to add the application to the server with */
    scopes: OAuth2Scope[]
    /** Permissions to request for the bot role */
    permissions: string
  }
}

export enum DiscordApplicationIntegrationType {
  /** App is installable to servers */
  GuildInstall = 0,
  /** App is installable to users */
  UserInstall = 1,
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
  integrations?: Array<Partial<DiscordIntegration>>
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
  BattleNet = 'battlenet',
  Bungie = 'Bungie.net',
  eBay = 'ebay',
  EpicGames = 'epicgames',
  Facebook = 'facebook',
  GitHub = 'github',
  Instagram = 'instagram',
  LeagueOfLegends = 'leagueoflegends',
  PayPal = 'paypal',
  PlayStationNetwork = 'playstation',
  Reddit = 'reddit',
  RiotGames = 'riotgames',
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

/** https://discord.com/developers/docs/topics/gateway#webhooks-update-webhook-update-event-fields */
export interface DiscordWebhookUpdate {
  /** id of the guild */
  guild_id: string
  /** id of the channel */
  channel_id: string
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
  voice_states?: Array<Omit<DiscordVoiceState, 'guildId'>>
  /** Users in the guild */
  members?: DiscordMember[]
  /** Channels in the guild */
  channels?: DiscordChannel[]
  /** All active threads in the guild that the current user has permission to view */
  threads?: DiscordChannel[]
  /** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: Array<Partial<DiscordPresenceUpdate>>
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
}

export interface DiscordPartialGuild {
  /** Guild name (2-100 characters, excluding trailing and leading whitespace) */
  name: string
  /** Guild id */
  id: string
  /** Icon hash */
  icon: string | null
  /** true if the user is the owner of the guild */
  owner: boolean
  /** Total permissions for the user in the guild (excludes overwrites and implicit permissions) */
  permissions: string
  /** Enabled guild features */
  features: GuildFeatures[]
  /** Approximate number of members in this guild, returned from the GET /guilds/id endpoint when with_counts is true */
  approximate_member_count?: number
  /** Approximate number of non-offline members in this guild, returned from the GET /guilds/id endpoint when with_counts is true */
  approximate_presence_count?: number
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
  /** Position of this role */
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

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface DiscordEmoji {
  /** Emoji name (can only be null in reaction emoji objects) */
  name?: string
  /** Emoji id */
  id?: string
  /** Roles allowed to use this emoji */
  roles?: string[]
  /** User that created this emoji */
  user?: DiscordUser
  /** Whether this emoji must be wrapped in colons */
  require_colons?: boolean
  /** Whether this emoji is managed */
  managed?: boolean
  /** Whether this emoji is animated */
  animated?: boolean
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean
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

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface DiscordChannel {
  /** The id of the channel */
  id: string
  /** The type of channel */
  type: ChannelTypes
  /** The id of the guild */
  guild_id?: string
  /** Sorting position of the channel */
  position?: number
  /** Explicit permission overwrites for members and roles */
  permission_overwrites?: DiscordOverwrite[]
  /** The name of the channel (1-100 characters) */
  name?: string
  /** The channel topic (0-4096 characters for GUILD_FORUM channels, 0-1024 characters for all others) */
  topic?: string | null
  /** Whether the channel is nsfw */
  nsfw?: boolean
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  last_message_id?: string | null
  /** The bitrate (in bits) of the voice or stage channel */
  bitrate?: number
  /** The user limit of the voice or stage channel */
  user_limit?: number
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rate_limit_per_user?: number
  /** the recipients of the DM */
  recipients?: DiscordUser[]
  /** icon hash of the group DM */
  icon?: string
  /** Id of the creator of the thread */
  owner_id?: string
  /** Application id of the group DM creator if it is bot-created */
  application_id?: string
  /** For group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope. */
  managed?: boolean
  /** For guild channels: Id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created */
  parent_id?: string | null
  /** When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  last_pin_timestamp?: string | null
  /** Voice region id for the voice or stage channel, automatic when set to null */
  rtc_region?: string | null
  /** The camera video quality mode of the voice channel, 1 when not present */
  video_quality_mode?: VideoQualityModes
  /** An approximate count of messages in a thread, stops counting at 50 */
  message_count?: number
  /** An approximate count of users in a thread, stops counting at 50 */
  member_count?: number
  /** Thread-specific fields not needed by other channels */
  thread_metadata?: DiscordThreadMetadata
  /** Thread member object for the current user, if they have joined the thread, only included on certain API endpoints */
  member?: DiscordThreadMember
  /** Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  default_auto_archive_duration?: number
  /** computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction. This does not include implicit permissions, which may need to be checked separately. */
  permissions?: string
  /** The flags of the channel */
  flags?: ChannelFlags
  /** number of messages ever sent in a thread, it's similar to `message_count` on message creation, but will not decrement the number when a message is deleted */
  total_message_sent?: number
  /** The set of tags that can be used in a GUILD_FORUM channel */
  available_tags?: DiscordForumTag[]
  /** The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel */
  applied_tags: string[]
  /** the emoji to show in the add reaction button on a thread in a GUILD_FORUM channel */
  default_reaction_emoji?: DiscordDefaultReactionEmoji | null
  /** the initial rate_limit_per_user to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. */
  default_thread_rate_limit_per_user: number
  /** the default sort order type used to order posts in GUILD_FORUM channels. Defaults to null, which indicates a preferred sort order hasn't been set by a channel admin */
  default_sort_order?: SortOrderTypes | null
  /** the default forum layout view used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin */
  default_forum_layout?: ForumLayout
  /** When a thread is created this will be true on that channel payload for the thread. */
  newly_created?: boolean
}

/** https://discord.com/developers/docs/topics/gateway#presence-update */
export interface DiscordPresenceUpdate {
  /** Either "idle", "dnd", "online", or "offline" */
  status: 'idle' | 'dnd' | 'online' | 'offline'
  /** The user presence is being updated for */
  user: DiscordUser
  /** id of the guild */
  guild_id: string
  /** User's current activities */
  activities: DiscordActivity[]
  /** User's platform-dependent status */
  client_status: DiscordClientStatus
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

export interface DiscordThreadMetadata {
  /** Whether the thread is archived */
  archived: boolean
  /** Duration in minutes to automatically archive the thread after recent activity */
  auto_archive_duration: 60 | 1440 | 4320 | 10080
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked: boolean
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean
  /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
  archive_timestamp: string
  /** Timestamp when the thread was created; only populated for threads created after 2022-01-09 */
  create_timestamp?: string | null
}

export interface DiscordThreadMember {
  /** Any user-thread settings, currently only used for notifications */
  flags: number
  /** The id of the thread */
  id: string
  /** The id of the user */
  user_id: string
  /** The time the current user last joined the thread */
  join_timestamp: string
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object */
export interface DiscordActivity {
  /** The activity's name */
  name: string
  /** Activity type */
  type: ActivityTypes
  /** Stream url, is validated when type is 1 */
  url?: string | null
  /** Unix timestamp of when the activity was added to the user's session */
  created_at: number
  /** What the player is currently doing */
  details?: string | null
  /** The user's current party status */
  state?: string | null
  /** Whether or not the activity is an instanced game session */
  instance?: boolean
  /** Activity flags `OR`d together, describes what the payload includes */
  flags?: number
  /** Unix timestamps for start and/or end of the game */
  timestamps?: DiscordActivityTimestamps
  /** Application id for the game */
  application_id?: string
  /** The emoji used for a custom status */
  emoji?: DiscordActivityEmoji | null
  /** Information for the current party of the player */
  party?: DiscordActivityParty
  /** Images for the presence and their hover texts */
  assets?: DiscordActivityAssets
  /** Secrets for Rich Presence joining and spectating */
  secrets?: DiscordActivitySecrets
  /** The custom buttons shown in the Rich Presence (max 2) */
  buttons?: DiscordActivityButton[]
}

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export interface DiscordClientStatus {
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string
  /** The user's status set for an active mobile (iOS, Android) application session */
  mobile?: string
  /** The user's status set for an active web (browser, bot account) application session */
  web?: string
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export interface DiscordActivityTimestamps {
  /** Unix time (in milliseconds) of when the activity started */
  start?: number
  /** Unix time (in milliseconds) of when the activity ends */
  end?: number
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface DiscordActivityEmoji {
  /** The name of the emoji */
  name: string
  /** Whether this emoji is animated */
  animated?: boolean
  /** The id of the emoji */
  id?: string
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface DiscordActivityParty {
  /** Used to show the party's current and maximum size */
  size?: [currentSize: number, maxSize: number]
  /** The id of the party */
  id?: string
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface DiscordActivityAssets {
  /** Text displayed when hovering over the large image of the activity */
  large_text?: string
  /** Text displayed when hovering over the small image of the activity */
  small_text?: string
  /** The id for a large asset of the activity, usually a snowflake */
  large_image?: string
  /** The id for a small asset of the activity, usually a snowflake */
  small_image?: string
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets */
export interface DiscordActivitySecrets {
  /** The secret for joining a party */
  join?: string
  /** The secret for spectating a game */
  spectate?: string
  /** The secret for a specific instanced match */
  match?: string
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-buttons */
export interface DiscordActivityButton {
  /** The text shown on the button (1-32 characters) */
  label: string
  /** The url opened when clicking the button (1-512 characters) */
  url: string
}

export interface DiscordOverwrite {
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes
  /** Role or user id */
  id: string
  /** Permission bit set */
  allow?: string
  /** Permission bit set */
  deny?: string
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
  /** Data showing the source of a crossposted channel follow add, pin or reply message */
  message_reference?: Omit<DiscordMessageReference, 'failIfNotExists'>
  /** Message flags combined as a bitfield */
  flags?: DiscordMessageFlag
  /**
   * The stickers sent with the message (bots currently can only receive messages with stickers, not send)
   * @deprecated
   */
  stickers?: DiscordSticker[]
  /**
   * The message associated with the `message_reference`
   * Note: This field is only returned for messages with a `type` of `19` (REPLY). If the message is a reply but the `referenced_message` field is not present, the backend did not attempt to fetch the message that was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.
   */
  referenced_message?: DiscordMessage
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

/** https://discord.com/developers/docs/topics/gateway-events#message-poll-vote-add */
export interface DiscordPollVoteAdd {
  /** ID of the user. Usually a snowflake */
  user_id: string
  /** ID of the channel. Usually a snowflake */
  channel_id: string
  /** ID of the message. Usually a snowflake */
  message_id: string
  /** ID of the guild. Usually a snowflake */
  guild_id?: string
  /** ID of the answer. */
  answer_id: number
}

/** https://discord.com/developers/docs/topics/gateway-events#message-poll-vote-remove */
export interface DiscordPollVoteRemove {
  /** ID of the user. Usually a snowflake */
  user_id: string
  /** ID of the channel. Usually a snowflake */
  channel_id: string
  /** ID of the message. Usually a snowflake */
  message_id: string
  /** ID of the guild. Usually a snowflake */
  guild_id?: string
  /** ID of the answer. */
  answer_id: number
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

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface DiscordMessageInteraction {
  /** Id of the interaction */
  id: string
  /** The type of interaction */
  type: InteractionTypes
  /** The name of the ApplicationCommand including the name of the subcommand/subcommand group */
  name: string
  /** The user who invoked the interaction */
  user: DiscordUser
  /** The member who invoked the interaction in the guild */
  member?: Partial<DiscordMember>
}

/** https://discord.com/developers/docs/resources/channel#message-interaction-metadata-object-message-interaction-metadata-structure */
export interface DiscordMessageInteractionMetadata {
  /** Id of the interaction */
  id: string
  /** The type of interaction */
  type: InteractionTypes
  /** ID of the user who triggered the interaction */
  user_id: string
  /** IDs for installation context(s) related to an interaction */
  authorizing_integration_owners: Partial<Record<DiscordApplicationIntegrationType, string>>
  /** ID of the original response message, present only on follow-up messages */
  original_response_message_id?: string
  /** ID of the message that contained interactive component, present only on messages created from component interactions */
  interacted_message_id?: string
  /** Metadata for the interaction that was used to open the modal, present only on modal submit interactions */
  triggering_interaction_metadata?: DiscordMessageInteractionMetadata
}

export type DiscordMessageComponents = DiscordActionRow[]

/** https://discord.com/developers/docs/interactions/message-components#actionrow */
export interface DiscordActionRow {
  /** Action rows are a group of buttons. */
  type: 1
  /** The components in this row */
  components: Array<DiscordSelectMenuComponent | DiscordButtonComponent | DiscordInputTextComponent>
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object */
export interface DiscordSelectMenuComponent {
  type: MessageComponentTypes.SelectMenu
  /** A custom identifier for this component. Maximum 100 characters. */
  custom_id: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  min_values?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  max_values?: number
  /** List of channel types to include in a channel select menu options list */
  channelTypes?: ChannelTypes[]
  /** The choices! Maximum of 25 items. */
  options: DiscordSelectOption[]
}

export interface DiscordSelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string
  /** An additional description of the option. Maximum 50 characters. */
  description?: string
  /** The id, name, and animated properties of an emoji. */
  emoji?: {
    /** Emoji id */
    id?: string
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** Will render this option as already-selected by default. */
  default?: boolean
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-default-value-structure */
export interface DiscordSelectMenuDefaultValue {
  /** ID of a user, role, or channel */
  id: bigint
  /** Type of value that id represents. */
  type: 'user' | 'role' | 'channel'
}

/** https://discord.com/developers/docs/interactions/message-components#buttons-button-object */
export interface DiscordButtonComponent {
  /** All button components have type 2 */
  type: MessageComponentTypes.Button
  /** for what the button says (max 80 characters) */
  label?: string
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  custom_id?: string
  /** For different styles/colors of the buttons */
  style: ButtonStyles
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: string
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string
  /** Whether or not this button is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface DiscordInputTextComponent {
  /** InputText Component is of type 3 */
  type: MessageComponentTypes.InputText
  /** The style of the InputText */
  style: TextStyles
  /** whether this component is required to be filled, default true */
  required?: boolean
  /** The customId of the InputText */
  custom_id: string
  /** The label of the InputText (max 45 characters) */
  label: string
  /** The placeholder of the InputText */
  placeholder?: string
  /** The minimum length of the text the user has to provide */
  min_length?: number
  /** The maximum length of the text the user has to provide */
  max_length?: number
  /** Pre-filled value for input text. */
  value?: string
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

export interface DiscordInteraction {
  /** Id of the interaction */
  id: string
  /** Id of the application this interaction is for */
  application_id: string
  /** The type of interaction */
  type: InteractionTypes
  /** The guild it was sent from */
  guild_id?: string
  /** The channel it was sent from */
  channel: Partial<DiscordChannel>
  /**
   * The ID of channel it was sent from
   *
   * @remarks
   * It is recommended that you begin using this channel field to identify the source channel of the interaction as they may deprecate the existing channel_id field in the future.
   */
  channel_id?: string
  /** Guild member data for the invoking user, including permissions */
  member?: DiscordInteractionMember
  /** User object for the invoking user, if invoked in a DM */
  user?: DiscordUser
  /** A continuation token for responding to the interaction */
  token: string
  /** Read-only property, always `1` */
  version: 1
  /** For the message the button was attached to */
  message?: DiscordMessage
  /** the command data payload */
  data?: DiscordInteractionData
  /** The selected language of the invoking user */
  locale?: string
  /** The guild's preferred locale, if invoked in a guild */
  guild_locale?: string
  /** The computed permissions for a bot or app in the context of a specific interaction (including channel overwrites) */
  app_permissions: string
  /** For monetized apps, any entitlements for the invoking user, representing access to premium SKUs */
  entitlements: DiscordEntitlement[]
  /** Mapping of installation contexts that the interaction was authorized for to related user or guild IDs. */
  authorizing_integration_owners: Partial<Record<DiscordApplicationIntegrationType, string>>
  /** Context where the interaction was triggered from */
  context?: DiscordInteractionContextType
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface DiscordInteractionMember extends DiscordMemberWithUser {
  /** Total permissions of the member in the channel, including overwrites, returned when in the interaction object */
  permissions: string
}

export interface DiscordInteractionData {
  /** The type of component */
  component_type?: MessageComponentTypes
  /** The custom id provided for this component. */
  custom_id?: string
  /** The components if its a Modal Submit interaction. */
  components?: DiscordMessageComponents
  /** The values chosen by the user. */
  values?: string[]
  /** The Id of the invoked command */
  id: string
  /** The name of the invoked command */
  name: string
  /** the type of the invoked command */
  type: ApplicationCommandTypes
  /** Converted users + roles + channels + attachments */
  resolved?: {
    /** The Ids and Message objects */
    messages?: Record<string, DiscordMessage>
    /** The Ids and User objects */
    users?: Record<string, DiscordUser>
    /** The Ids and partial Member objects */
    members?: Record<string, Omit<DiscordInteractionMember, 'user' | 'deaf' | 'mute'>>
    /** The Ids and Role objects */
    roles?: Record<string, DiscordRole>
    /** The Ids and partial Channel objects */
    channels?: Record<string, Pick<DiscordChannel, 'id' | 'name' | 'type' | 'permissions'>>
    /** The ids and attachment objects */
    attachments: Record<string, DiscordAttachment>
  }
  /** The params + values from the user */
  options?: DiscordInteractionDataOption[]
  /** The target id if this is a context menu command. */
  target_id?: string
  /** the id of the guild the command is registered to */
  guild_id?: string
}

export interface DiscordInteractionDataOption {
  /** Name of the parameter */
  name: string
  /** Value of application command option type */
  type: ApplicationCommandOptionTypes
  /** Value of the option resulting from user input */
  value?: string | boolean | number
  /** Present if this option is a group or subcommand */
  options?: DiscordInteractionDataOption[]
  /** `true` if this option is the currently focused option for autocomplete */
  focused?: boolean
}

export interface DiscordListActiveThreads {
  /** The active threads */
  threads: DiscordChannel[]
  /** A thread member object for each returned thread the current user has joined */
  members: DiscordThreadMember[]
}

export interface DiscordListArchivedThreads extends DiscordListActiveThreads {
  /** Whether there are potentially additional threads that could be returned on a subsequent call */
  has_more: boolean
}

export interface DiscordThreadListSync {
  /** The id of the guild */
  guild_id: string
  /** The parent channel ids whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channelIds that have no active threads as well, so you know to clear that data */
  channel_ids?: string[]
  /** All active threads in the given channels that the current user can access */
  threads: DiscordChannel[]
  /** All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to */
  members: DiscordThreadMember[]
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface DiscordAuditLog {
  /** List of webhooks found in the audit log */
  webhooks: DiscordWebhook[]
  /** List of users found in the audit log */
  users: DiscordUser[]
  /** List of audit log entries, sorted from most to least recent */
  audit_log_entries: DiscordAuditLogEntry[]
  /** List of partial integration objects */
  integrations: Array<Partial<DiscordIntegration>>
  /**
   * List of threads found in the audit log.
   * Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are included in the threads map since archived threads might not be kept in memory by clients.
   */
  threads: DiscordChannel[]
  /** List of guild scheduled events found in the audit log */
  guild_scheduled_events?: DiscordScheduledEvent[]
  /** List of auto moderation rules referenced in the audit log */
  auto_moderation_rules?: DiscordAutoModerationRule[]
  /** List of application commands referenced in the audit log */
  application_commands: DiscordApplicationCommand[]
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object */
export interface DiscordAutoModerationRule {
  /** The id of this rule */
  id: string
  /** The guild id of the rule */
  guild_id: string
  /** The name of the rule */
  name: string
  /** The id of the user who created this rule. */
  creator_id: string
  /** Indicates in what event context a rule should be checked. */
  event_type: AutoModerationEventTypes
  /** The type of trigger for this rule */
  trigger_type: AutoModerationTriggerTypes
  /** The metadata used to determine whether a rule should be triggered. */
  trigger_metadata: DiscordAutoModerationRuleTriggerMetadata
  /** Actions which will execute whenever a rule is triggered. */
  actions: DiscordAutoModerationAction[]
  /** Whether the rule is enabled. */
  enabled: boolean
  /** The role ids that are whitelisted. Max 20. */
  exempt_roles: string[]
  /** The channel ids that are whitelisted. Max 50. */
  exempt_channels: string[]
}

export enum AutoModerationEventTypes {
  /** When a user sends a message */
  MessageSend = 1,
}

export enum AutoModerationTriggerTypes {
  Keyword = 1,
  HarmfulLink,
  Spam,
  KeywordPreset,
  MentionSpam,
}

export interface DiscordAutoModerationRuleTriggerMetadata {
  /** The keywords needed to match. Only present when TriggerType.Keyword */
  keyword_filter?: string[]
  /** Regular expression patterns which will be matched against content. Only present when TriggerType.Keyword */
  regex_patterns: string[]
  /** The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset */
  presets?: DiscordAutoModerationRuleTriggerMetadataPresets[]
  /** The substrings which will exempt from triggering the preset trigger type. Only present when TriggerType.KeywordPreset */
  allow_list?: string[]
  /** Total number of mentions (role & user) allowed per message (Maximum of 50). Only present when TriggerType.MentionSpam */
  mention_total_limit?: number
  /** Whether to automatically detect mention raids. Only present when TriggerType.MentionSpam */
  mention_raid_protection_enabled?: boolean
}

export enum DiscordAutoModerationRuleTriggerMetadataPresets {
  /** Words that may be considered forms of swearing or cursing */
  Profanity = 1,
  /** Words that refer to sexually explicit behavior or activity */
  SexualContent,
  /** Personal insults or words that may be considered hate speech */
  Slurs,
}

export interface DiscordAutoModerationAction {
  /** The type of action to take when a rule is triggered */
  type: AutoModerationActionType
  /** additional metadata needed during execution for this specific action type */
  metadata: DiscordAutoModerationActionMetadata
}

export enum AutoModerationActionType {
  /** Blocks the content of a message according to the rule */
  BlockMessage = 1,
  /** Logs user content to a specified channel */
  SendAlertMessage,
  /** Times out user for specified duration */
  Timeout,
}

export interface DiscordAutoModerationActionMetadata {
  /** The id of channel to which user content should be logged. Only in ActionType.SendAlertMessage */
  channel_id?: string
  /** Additional explanation that will be shown to members whenever their message is blocked. Maximum of 150 characters. Only supported for AutoModerationActionType.BlockMessage */
  custom_message?: string
  /** Timeout duration in seconds maximum of 2419200 seconds (4 weeks). Only supported for TriggerType.Keyword && Only in ActionType.Timeout */
  duration_seconds?: number
}

/** https://discord.com/developers/docs/topics/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
export interface DiscordAutoModerationActionExecution {
  /** The id of the guild */
  guild_id: string
  /** The id of the rule that was executed */
  rule_id: string
  /** The id of the user which generated the content which triggered the rule */
  user_id: string
  /** The content from the user */
  content: string
  /** Action which was executed */
  action: DiscordAutoModerationAction
  /** The trigger type of the rule that was executed. */
  rule_trigger_type: AutoModerationTriggerTypes
  /** The id of the channel in which user content was posted */
  channel_id?: string | null
  /** The id of the message. Will not exist if message was blocked by automod or content was not part of any message */
  message_id?: string | null
  /** The id of any system auto moderation messages posted as a result of this action */
  alert_system_message_id?: string | null
  /** The word or phrase that triggerred the rule. */
  matched_keyword: string | null
  /** The substring in content that triggered the rule */
  matched_content: string | null
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface DiscordAuditLogEntry {
  /** ID of the affected entity (webhook, user, role, etc.) */
  target_id: string | null
  /** Changes made to the `target_id` */
  changes?: DiscordAuditLogChange[]
  /** User or app that made the changes */
  user_id: string | null
  /** ID of the entry */
  id: string
  /** Type of action that occurred */
  action_type: AuditLogEvents
  /** Additional info for certain event types */
  options?: DiscordOptionalAuditEntryInfo
  /** Reason for the change (1-512 characters) */
  reason?: string
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export type DiscordAuditLogChange =
  | {
      new_value: string
      old_value: string
      key:
        | 'name'
        | 'description'
        | 'discovery_splash_hash'
        | 'banner_hash'
        | 'preferred_locale'
        | 'rules_channel_id'
        | 'public_updates_channel_id'
        | 'icon_hash'
        | 'image_hash'
        | 'splash_hash'
        | 'owner_id'
        | 'region'
        | 'afk_channel_id'
        | 'vanity_url_code'
        | 'widget_channel_id'
        | 'system_channel_id'
        | 'topic'
        | 'application_id'
        | 'permissions'
        | 'allow'
        | 'deny'
        | 'code'
        | 'channel_id'
        | 'inviter_id'
        | 'nick'
        | 'avatar_hash'
        | 'id'
        | 'location'
        | 'command_id'
    }
  | {
      new_value: number
      old_value: number
      key:
        | 'afk_timeout'
        | 'mfa_level'
        | 'verification_level'
        | 'explicit_content_filter'
        | 'default_message_notifications'
        | 'prune_delete_days'
        | 'position'
        | 'bitrate'
        | 'rate_limit_per_user'
        | 'color'
        | 'max_uses'
        | 'uses'
        | 'max_age'
        | 'expire_behavior'
        | 'expire_grace_period'
        | 'user_limit'
        | 'privacy_level'
        | 'auto_archive_duration'
        | 'default_auto_archive_duration'
        | 'entity_type'
        | 'status'
        | 'communication_disabled_until'
    }
  | {
      new_value: Array<Partial<DiscordRole>>
      old_value?: Array<Partial<DiscordRole>>
      key: '$add' | '$remove'
    }
  | {
      new_value: boolean
      old_value: boolean
      key:
        | 'widget_enabled'
        | 'nsfw'
        | 'hoist'
        | 'mentionable'
        | 'temporary'
        | 'deaf'
        | 'mute'
        | 'enable_emoticons'
        | 'archived'
        | 'locked'
        | 'invitable'
    }
  | {
      new_value: DiscordOverwrite[]
      old_value: DiscordOverwrite[]
      key: 'permission_overwrites'
    }
  | {
      new_value: string | number
      old_value: string | number
      key: 'type'
    }

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface DiscordOptionalAuditEntryInfo {
  /**
   * ID of the app whose permissions were targeted.
   *
   * Event types: `APPLICATION_COMMAND_PERMISSION_UPDATE`
   */
  application_id: string
  /**
   * Name of the Auto Moderation rule that was triggered.
   *
   * Event types: `AUTO_MODERATION_BLOCK_MESSAGE`, `AUTO_MODERATION_FLAG_TO_CHANNEL`, `AUTO_MODERATION_USER_COMMUNICATION_DISABLED`
   */
  auto_moderation_rule_name: string
  /**
   * Trigger type of the Auto Moderation rule that was triggered.
   *
   * Event types: `AUTO_MODERATION_BLOCK_MESSAGE`, `AUTO_MODERATION_FLAG_TO_CHANNEL`, `AUTO_MODERATION_USER_COMMUNICATION_DISABLED`
   */
  auto_moderation_rule_trigger_type: string
  /**
   * Channel in which the entities were targeted.
   *
   * Event types: `MEMBER_MOVE`, `MESSAGE_PIN`, `MESSAGE_UNPIN`, `MESSAGE_DELETE`, `STAGE_INSTANCE_CREATE`, `STAGE_INSTANCE_UPDATE`, `STAGE_INSTANCE_DELETE`
   */
  channel_id: string
  /**
   * Number of entities that were targeted.
   *
   * Event types: `MESSAGE_DELETE`, `MESSAGE_BULK_DELETE`, `MEMBER_DISCONNECT`, `MEMBER_MOVE`
   */
  count: string
  /**
   * Number of days after which inactive members were kicked.
   *
   * Event types: `MEMBER_PRUNE`
   */
  delete_member_days: string
  /**
   * ID of the overwritten entity.
   *
   * Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`
   */
  id: string
  /**
   * Number of members removed by the prune.
   *
   * Event types: `MEMBER_PRUNE`
   */
  members_removed: string
  /**
   * ID of the message that was targeted.
   *
   * Event types: `MESSAGE_PIN`, `MESSAGE_UNPIN`, `STAGE_INSTANCE_CREATE`, `STAGE_INSTANCE_UPDATE`, `STAGE_INSTANCE_DELETE`
   */
  message_id: string
  /**
   * Name of the role if type is "0" (not present if type is "1").
   *
   * Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`
   */
  role_name: string
  /**
   * Type of overwritten entity - "0", for "role", or "1" for "member".
   *
   * Event types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`
   */
  type: string
  /**
   * The type of integration which performed the action
   *
   * Event types: `MEMBER_KICK`, `MEMBER_ROLE_UPDATE`
   */
  integration_type: string
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
}

export interface DiscordScheduledEventEntityMetadata {
  /** location of the event */
  location?: string
}

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
export interface DiscordGetGatewayBot {
  /** The WSS URL that can be used for connecting to the gateway */
  url: string
  /** The recommended number of shards to use when connecting */
  shards: number
  /** Information on the current session start limit */
  session_start_limit: DiscordSessionStartLimit
}

/** https://discord.com/developers/docs/topics/gateway#session-start-limit-object */
export interface DiscordSessionStartLimit {
  /** The total number of session starts the current user is allowed */
  total: number
  /** The remaining number of session starts the current user is allowed */
  remaining: number
  /** The number of milliseconds after which the limit resets */
  reset_after: number
  /** The number of identify requests allowed per 5 seconds */
  max_concurrency: number
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

export interface DiscordInviteStageInstance {
  /** The members speaking in the Stage */
  members: Array<Partial<DiscordMember>>
  /** The number of users in the Stage */
  participant_count: number
  /** The number of users speaking in the Stage */
  speaker_count: number
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure */
export interface DiscordApplicationCommand extends DiscordCreateApplicationCommand {
  /** Unique ID of command */
  id: string
  /** ID of the parent application */
  application_id: string
  /** Guild id of the command, if not global */
  guild_id?: string
}

export interface DiscordCreateApplicationCommand {
  /** Type of command, defaults to `ApplicationCommandTypes.ChatInput` */
  type?: ApplicationCommandTypes
  /**
   * Name of command, 1-32 characters.
   * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
   */
  name: string
  /** Localization object for `name` field. Values follow the same restrictions as `name` */
  name_localizations?: Localization | null
  /** Description for `ApplicationCommandTypes.ChatInput` commands, 1-100 characters. */
  description?: string
  /** Localization object for `description` field. Values follow the same restrictions as `description` */
  description_localizations?: Localization | null
  /** Parameters for the command, max of 25 */
  options?: DiscordApplicationCommandOption[]
  /** Set of permissions represented as a bit set */
  default_member_permissions?: string | null
  /**
   * Installation context(s) where the command is available
   *
   * @remarks
   * This is currently in preview.
   */
  integration_types?: DiscordApplicationIntegrationType[]
  /**
   * Interaction context(s) where the command can be used, only for globally-scoped commands. By default, all interaction context types included.
   *
   * @remarks
   * This is currently in preview.
   */
  contexts?: DiscordInteractionContextType[] | null
  /**
   * Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.
   *
   * @deprecated use {@link contexts} instead
   */
  dm_permission?: boolean
  /** Indicates whether the command is age-restricted, defaults to false */
  nsfw?: boolean
  /** Auto incrementing version identifier updated during substantial record changes */
  version?: string
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure */
export interface DiscordApplicationCommandOption {
  /** Type of option */
  type: ApplicationCommandOptionTypes
  /**
   * Name of command, 1-32 characters.
   * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
   */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: Localization | null
  /** 1-100 character description */
  description: string
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  description_localizations?: Localization | null
  /** If the parameter is required or optional--default `false` */
  required?: boolean
  /** Choices for the option types `ApplicationCommandOptionTypes.String`, `ApplicationCommandOptionTypes.Integer`, and `ApplicationCommandOptionTypes.Number`, from which the user can choose, max 25 */
  choices?: DiscordApplicationCommandOptionChoice[]
  /** If the option is a subcommand or subcommand group type, these nested options will be the parameters */
  options?: DiscordApplicationCommandOption[]
  /**
   * If autocomplete interactions are enabled for this option.
   *
   * Only available for `ApplicationCommandOptionTypes.String`, `ApplicationCommandOptionTypes.Integer` and `ApplicationCommandOptionTypes.Number` option types
   */
  autocomplete?: boolean
  /** If the option is a channel type, the channels shown will be restricted to these types */
  channel_types?: ChannelTypes[]
  /** If the option type is `ApplicationCommandOptionTypes.Integer` or `ApplicationCommandOptionTypes.Number`, the minimum permitted value */
  min_value?: number
  /** If the option type is `ApplicationCommandOptionTypes.Integer` or `ApplicationCommandOptionTypes.Number`, the maximum permitted value */
  max_value?: number
  /** If the option type is `ApplicationCommandOptionTypes.String`, the minimum permitted length */
  min_length?: number
  /** If the option type is `ApplicationCommandOptionTypes.String`, the maximum permitted length  */
  max_length?: number
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object */
export interface DiscordApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: Localization | null
  /** Value for the choice, up to 100 characters if string */
  value: string | number
}

/** https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions */
export interface DiscordGuildApplicationCommandPermissions {
  /** ID of the command or the application ID. When the `id` field is the application ID instead of a command ID, the permissions apply to all commands that do not contain explicit overwrites. */
  id: string
  /** ID of the application the command belongs to */
  application_id: string
  /** ID of the guild */
  guild_id: string
  /** Permissions for the command in the guild, max of 100 */
  permissions: DiscordApplicationCommandPermissions[]
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions */
export interface DiscordApplicationCommandPermissions {
  /** ID of the role, user, or channel. It can also be a permission constant */
  id: string
  /** ApplicationCommandPermissionTypes.Role, ApplicationCommandPermissionTypes.User, or ApplicationCommandPermissionTypes.Channel */
  type: ApplicationCommandPermissionTypes
  /** `true` to allow, `false`, to disallow */
  permission: boolean
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

/** https://discord.com/developers/docs/resources/channel#followed-channel-object */
export interface DiscordFollowedChannel {
  /** Source message id */
  channel_id: string
  /** Created target webhook id */
  webhook_id: string
}

/** https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure */
export interface DiscordGatewayPayload {
  /** opcode for the payload */
  op: number
  /** Event data */
  d: unknown | null
  /** Sequence number, used for resuming sessions and heartbeats */
  s: number | null
  /** The event name for this payload */
  t: GatewayEventNames | null
}

/** https://discord.com/developers/docs/topics/gateway#guild-members-chunk */
export interface DiscordGuildMembersChunk {
  /** The id of the guild */
  guild_id: string
  /** Set of guild members */
  members: DiscordMemberWithUser[]
  /** The chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count) */
  chunk_index: number
  /** The total number of expected chunks for this response */
  chunk_count: number
  /** If passing an invalid id to `REQUEST_GUILD_MEMBERS`, it will be returned here */
  not_found?: string[]
  /** If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here */
  presences?: DiscordPresenceUpdate[]
  /** The nonce used in the Guild Members Request */
  nonce?: string
}

/** https://discord.com/developers/docs/topics/gateway#channel-pins-update */
export interface DiscordChannelPinsUpdate {
  /** The id of the guild */
  guild_id?: string
  /** The id of the channel */
  channel_id: string
  /** The time at which the most recent pinned message was pinned */
  last_pin_timestamp?: string | null
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-delete */
export interface DiscordGuildRoleDelete {
  /** id of the guild */
  guild_id: string
  /** id of the role */
  role_id: string
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add */
export interface DiscordGuildBanAddRemove {
  /** id of the guild */
  guild_id: string
  /** The banned user */
  user: DiscordUser
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove */
export interface DiscordMessageReactionRemove extends Omit<DiscordMessageReactionAdd, 'member'> {}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add */
export interface DiscordMessageReactionAdd {
  /** The id of the user */
  user_id: string
  /** The id of the channel */
  channel_id: string
  /** The id of the message */
  message_id: string
  /** The id of the guild */
  guild_id?: string
  /** The member who reacted if this happened in a guild */
  member?: DiscordMemberWithUser
  /** The emoji used to react */
  emoji: Partial<DiscordEmoji>
  /** The id of the author of this message */
  message_author_id?: string
}

/** https://discord.com/developers/docs/topics/gateway#voice-server-update */
export interface DiscordVoiceServerUpdate {
  /** Voice connection token */
  token: string
  /** The guild this voice server update is for */
  guild_id: string
  /** The voice server host */
  endpoint: string | null
}

/** https://discord.com/developers/docs/topics/gateway#invite-create */
export interface DiscordInviteCreate {
  /** The channel the invite is for */
  channel_id: string
  /** The unique invite code */
  code: string
  /** The time at which the invite was created */
  created_at: string
  /** The guild of the invite */
  guild_id?: string
  /** The user that created the invite */
  inviter?: DiscordUser
  /** How long the invite is valid for (in seconds) */
  max_age: number
  /** The maximum number of times the invite can be used */
  max_uses: number
  /** The type of target for this voice channel invite */
  target_type: TargetTypes
  /** The target user for this invite */
  target_user?: DiscordUser
  /** The embedded application to open for this voice channel embedded application invite */
  target_application?: Partial<DiscordApplication>
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean
  /** How many times the invite has been used (always will be 0) */
  uses: number
}

/** https://discord.com/developers/docs/topics/gateway#hello */
export interface DiscordHello {
  /** The interval (in milliseconds) the client should heartbeat with */
  heartbeat_interval: number
}

/** https://discord.com/developers/docs/topics/gateway#ready */
export interface DiscordReady {
  /** Gateway version */
  v: number
  /** Information about the user including email */
  user: DiscordUser
  /** The guilds the user is in */
  guilds: DiscordUnavailableGuild[]
  /** Used for resuming connections */
  session_id: string
  /** Gateway url for resuming connections */
  resume_gateway_url: string
  /** The shard information associated with this session, if sent when identifying */
  shard?: [number, number]
  /** Contains id and flags */
  application: Partial<DiscordApplication> & Pick<DiscordApplication, 'id' | 'flags'>
}

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export interface DiscordUnavailableGuild extends Pick<DiscordGuild, 'id' | 'unavailable'> {}

/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk */
export interface DiscordMessageDeleteBulk {
  /** The ids of the messages */
  ids: string[]
  /** The id of the channel */
  channel_id: string
  /** The id of the guild */
  guild_id?: string
}

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
  serialized_source_guild: Omit<
    PickPartial<
      DiscordGuild,
      | 'name'
      | 'description'
      | 'verification_level'
      | 'default_message_notifications'
      | 'explicit_content_filter'
      | 'preferred_locale'
      | 'afk_timeout'
      | 'channels'
      | 'afk_channel_id'
      | 'system_channel_id'
      | 'system_channel_flags'
    >,
    'roles'
  > & {
    roles: Array<
      Omit<PickPartial<DiscordRole, 'name' | 'color' | 'hoist' | 'mentionable' | 'permissions' | 'icon' | 'unicode_emoji'>, 'id'> & { id: number }
    >
  }
  /** Whether the template has un-synced changes */
  is_dirty: boolean | null
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-add */
export interface DiscordGuildMemberAdd extends DiscordMemberWithUser {
  /** id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/topics/gateway#message-delete */
export interface DiscordMessageDelete {
  /** The id of the message */
  id: string
  /** The id of the channel */
  channel_id: string
  /** The id of the guild */
  guild_id?: string
}

/** https://discord.com/developers/docs/topics/gateway#thread-members-update-thread-members-update-event-fields */
export interface DiscordThreadMembersUpdate {
  /** The id of the thread */
  id: string
  /** The id of the guild */
  guild_id: string
  /** The users who were added to the thread */
  added_members?: DiscordThreadMember[]
  /** The id of the users who were removed from the thread */
  removed_member_ids?: string[]
  /** the approximate number of members in the thread, capped at 50 */
  member_count: number
}

/** https://discord.com/developers/docs/topics/gateway#thread-member-update */
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

/** https://discord.com/developers/docs/topics/gateway#guild-role-create */
export interface DiscordGuildRoleCreate {
  /** The id of the guild */
  guild_id: string
  /** The role created */
  role: DiscordRole
}

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update */
export interface DiscordGuildEmojisUpdate {
  /** id of the guild */
  guild_id: string
  /** Array of emojis */
  emojis: DiscordEmoji[]
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-stickers-update */
export interface DiscordGuildStickersUpdate {
  /** id of the guild */
  guild_id: string
  /** Array of sticker */
  stickers: DiscordSticker[]
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-update */
export interface DiscordGuildMemberUpdate {
  /** The id of the guild */
  guild_id: string
  /** User role ids */
  roles: string[]
  /** The user */
  user: DiscordUser
  /** Nickname of the user in the guild */
  nick?: string | null
  /** the member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting) */
  avatar: string
  /** When the user joined the guild */
  joined_at: string
  /** When the user starting boosting the guild */
  premium_since?: string | null
  /** whether the user is deafened in voice channels */
  deaf?: boolean
  /** whether the user is muted in voice channels */
  mute?: boolean
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean
  /** when the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out. Will throw a 403 error if the user has the ADMINISTRATOR permission or is the owner of the guild */
  communication_disabled_until?: string
  /** Guild member flags */
  flags?: GuildMemberFlags
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all */
export interface DiscordMessageReactionRemoveAll extends Pick<DiscordMessageReactionAdd, 'channel_id' | 'message_id' | 'guild_id'> {}

/** https://discord.com/developers/docs/topics/gateway#guild-role-update */
export interface DiscordGuildRoleUpdate {
  /** The id of the guild */
  guild_id: string
  /** The role updated */
  role: DiscordRole
}

export interface DiscordScheduledEventUserAdd {
  /** id of the guild scheduled event  */
  guild_scheduled_event_id: string
  /** id of the user                   */
  user_id: string
  /** id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji */
export type DiscordMessageReactionRemoveEmoji = Pick<DiscordMessageReactionAdd, 'channel_id' | 'guild_id' | 'message_id' | 'emoji'>

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove */
export interface DiscordGuildMemberRemove {
  /** The id of the guild */
  guild_id: string
  /** The user who was removed */
  user: DiscordUser
}

/** https://discord.com/developers/docs/resources/guild#ban-object */
export interface DiscordBan {
  /** The reason for the ban */
  reason: string | null
  /** The banned user */
  user: DiscordUser
}

export interface DiscordScheduledEventUserRemove {
  /** id of the guild scheduled event */
  guild_scheduled_event_id: string
  /** id of the user */
  user_id: string
  /** id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/topics/gateway#invite-delete */
export interface DiscordInviteDelete {
  /** The channel of the invite */
  channel_id: string
  /** The guild of the invite */
  guild_id?: string
  /** The unique invite code */
  code: string
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

export interface DiscordInstallParams {
  /** Scopes to add the application to the server with */
  scopes: OAuth2Scope[]
  /** Permissions to request for the bot role */
  permissions: string
}

export interface DiscordForumTag {
  /** The id of the tag */
  id: string
  /** The name of the tag (0-20 characters) */
  name: string
  /** Whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission */
  moderated: boolean
  /** The id of a guild's custom emoji At most one of emoji_id and emoji_name may be set. */
  emoji_id: string
  /** The unicode character of the emoji */
  emoji_name: string | null
}

export interface DiscordDefaultReactionEmoji {
  /** The id of a guild's custom emoji */
  emoji_id: string
  /** The unicode character of the emoji */
  emoji_name: string | null
}

export interface DiscordModifyChannel {
  /** 1-100 character channel name */
  name?: string
  /** The type of channel; only conversion between text and news is supported and only in guilds with the "NEWS" feature */
  type?: ChannelTypes
  /** The position of the channel in the left-hand listing */
  position?: number | null
  /** 0-1024 character channel topic */
  topic?: string | null
  /** Whether the channel is nsfw */
  nsfw?: boolean | null
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rate_limit_per_user?: number | null
  /** The bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers) */
  bitrate?: number | null
  /** The user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit */
  user_limit?: number | null
  /** Channel or category-specific permissions */
  permission_overwrites?: DiscordOverwrite[] | null
  /** Id of the new parent category for a channel */
  parent_id?: string | null
  /** Voice region id for the voice channel, automatic when set to null */
  rtc_region?: string | null
  /** The camera video quality mode of the voice channel */
  video_quality_mode?: VideoQualityModes
  /** Whether the thread is archived */
  archived?: boolean
  /** Duration in minutes to automatically archive the thread after recent activity */
  auto_archive_duration?: 60 | 1440 | 4320 | 10080
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean
  /** The set of tags that can be used in a GUILD_FORUM channel */
  available_tags?: Array<{
    /** The id of the tag */
    id: string
    /** The name of the tag (0-20 characters) */
    name: string
    /** Whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission */
    moderated: boolean
    /** The id of a guild's custom emoji At most one of emoji_id and emoji_name may be set. */
    emoji_id: string
    /** The unicode character of the emoji */
    emoji_name: string
  }>
  /** The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel; limited to 5 */
  applied_tags?: string[]
  /** the emoji to show in the add reaction button on a thread in a GUILD_FORUM channel */
  default_reaction_emoji?: {
    /** The id of a guild's custom emoji */
    emoji_id: string
    /** The unicode character of the emoji */
    emoji_name: string | null
  }
  /** the initial rate_limit_per_user to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. */
  default_thread_rate_limit_per_user?: number
  /** the default sort order type used to order posts in forum channels */
  default_sort_order?: SortOrderTypes | null
  /** the default forum layout view used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin */
  default_forum_layout?: ForumLayout
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface DiscordCreateGuildEmoji {
  /** Name of the emoji */
  name: string
  /** The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  image: string
  /** Roles allowed to use this emoji */
  roles?: string[]
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface DiscordModifyGuildEmoji {
  /** Name of the emoji */
  name?: string
  /** Roles allowed to use this emoji */
  roles?: string[] | null
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

export interface DiscordFollowAnnouncementChannel {
  /** The id of the channel to send announcements to. */
  webhook_channel_id: string
}

export interface DiscordEditChannelPermissionOverridesOptions {
  /** Permission bit set */
  allow: string
  /** Permission bit set */
  deny: string
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes
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

/** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel */
export interface DiscordCreateForumPostWithMessage {
  /** 1-100 character channel name */
  name: string
  /** duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  auto_archive_duration?: 60 | 1440 | 4320 | 10080
  /** amount of seconds a user has to wait before sending another message (0-21600) */
  rate_limit_per_user?: number
  /** contents of the first message in the forum thread */
  message: {
    /** Message contents (up to 2000 characters) */
    content?: string
    /** Embedded rich content (up to 6000 characters) */
    embeds?: DiscordEmbed[]
    /** Allowed mentions for the message */
    allowed_mentions?: DiscordAllowedMentions[]
    /** Components to include with the message */
    components?: DiscordMessageComponents[]
    /** IDs of up to 3 stickers in the server to send in the message */
    sticker_ids?: string[]
    /** JSON-encoded body of non-file params, only for multipart/form-data requests. See {@link https://discord.com/developers/docs/reference#uploading-files Uploading Files} */
    payload_json?: string
    /** Attachment objects with filename and description. See {@link https://discord.com/developers/docs/reference#uploading-files Uploading Files} */
    attachments?: DiscordAttachment[]
    /** Message flags combined as a bitfield, only SUPPRESS_EMBEDS can be set */
    flags?: DiscordMessageFlag
  }
  /** the IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel */
  applied_tags?: string[]
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
  description: string | undefined
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

/** https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-structure */
export interface DiscordEntitlement {
  /** ID of the entitlement */
  id: string
  /** ID of the SKU */
  sku_id: string
  /** ID of the user that is granted access to the entitlement's sku */
  user_id?: string
  /** ID of the guild that is granted access to the entitlement's sku */
  guild_id?: string
  /** ID of the parent application */
  application_id: string
  /** Type of entitlement */
  type: DiscordEntitlementType
  /** Entitlement was deleted */
  deleted: boolean
  /** Start date at which the entitlement is valid. Not present when using test entitlements */
  starts_at?: string
  /** Date at which the entitlement is no longer valid. Not present when using test entitlements */
  ends_at?: string
}

/** https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types */
export enum DiscordEntitlementType {
  /** Entitlement was purchased as an app subscription */
  ApplicationSubscription = 8,
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
  flags: DiscordSkuFlag
}

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-types */
export enum DiscordSkuType {
  /** Represents a recurring subscription */
  Subscription = 5,
  /** System-generated group for each SUBSCRIPTION SKU created */
  SubscriptionGroup = 6,
}

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags */
export enum DiscordSkuFlag {
  /** SKU is available for purchase */
  Available = 1 << 2,
  /** Recurring SKU that can be purchased by a user and applied to a single server. Grants access to every user in that server. */
  GuildSubscription = 1 << 7,
  /** Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server. */
  UserSubscription = 1 << 8,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
export enum DiscordMessageFlag {
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

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types */
export enum DiscordInteractionContextType {
  /** Interaction can be used within servers */
  Guild = 0,
  /** Interaction can be used within DMs with the app's bot user */
  BotDm = 1,
  /** Interaction can be used within Group DMs and DMs other than the app's bot user */
  PrivateChannel = 2,
}

/** https://discord.com/developers/docs/resources/guild#bulk-guild-ban */
export interface DiscordBulkBan {
  /** list of user ids, that were successfully banned */
  banned_users: string[]
  /** list of user ids, that were not banned */
  failed_users: string[]
}
