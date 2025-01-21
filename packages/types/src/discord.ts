import type { DiscordApplication } from './discord/applications.js'
import type { ChannelTypes, DiscordChannel, DiscordOverwrite, DiscordThreadMember, SortOrderTypes } from './discord/channels.js'
import type { DiscordEmoji } from './discord/emojis.js'
import type { DiscordGuild, DiscordIntegration, DiscordMemberWithUser } from './discord/guilds.js'
import type { PremiumTypes, RoleFlags, SkuFlags, StickerFormatTypes, StickerTypes, TeamMembershipStates, WebhookTypes } from './shared.js'

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
