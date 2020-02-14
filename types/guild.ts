import { Role } from './role'
import { Emoji } from './discord'
import { Member } from '../structures/member'

export interface CreateGuildPayload {
  /** The guild id */
  id: string
  /** The guild name 2-100 characters */
  name: string
  /** The guild icon image hash */
  icon: string | null
  /** The guild splash image hash */
  splash: string | null
  /** The id of the owner */
  owner_id: string
  /** The voice region id for the guild */
  region: string
  /** The afk channel id */
  afk_channel_id: string | null
  /** AFK Timeout in seconds. */
  afk_timeout: number
  /** Whether this guild is embeddable (widget) */
  embed_enabled?: boolean
  /** If not null, the channel id that the widge will generate an invite to. */
  embed_channel_id?: string | null
  /** The verification level required for the guild */
  verification_level: number
  /** The roles in the guild */
  roles: Role[]
  /** The custom guild emojis */
  emojis: Emoji[]
  /** Enabled guild features */
  features: Guild_Features[]
  /** Required MFA level for the guild */
  mfa_level: number
  /** The id of the channel to which system mesages are sent */
  system_channel_id: string | null
  /** When this guild was joined at */
  joined_at: string
  /** Whether this is considered a large guild */
  large: boolean
  /** Whether this guild is unavailable */
  unavailable: boolean
  /** Total number of members in this guild */
  member_count: number
  voice_states: VoiceState[]
  /** Users in the guild */
  members: Member[]
  /** Channels in the guild */
  channels: Channel[]
  presences: Presence[]
  /** The maximum amount of presences for the guild(the default value, currently 5000 is in effect when null is returned.) */
  max_presences?: number | null
  /** The maximum amount of members for the guild */
  max_members?: number
  /** The vanity url code for the guild */
  vanity_url_code: string | null
  /** The description for the guild */
  description: string | null
  /** The banner hash */
  banner: string | null
  /** The premium tier */
  premium_tier: number
  /** The total number of users currently boosting this server. */
  premium_subscription_count: number
  /** The preferred local of this guild only set if guild has the DISCOVERABLE feature, defaults to en-US */
  preferred_locale: string
}

export interface Guild {
  /** The guild id */
  id: string
  /** The guild name 2-100 characters */
  name: string
  /** The guild icon image hash */
  icon: string | null
  /** The guild splash image hash */
  splash: string | null
  /** The id of the owner */
  owner_id: string
  /** The voice region id for the guild */
  region: string
  /** The afk channel id */
  afk_channel_id: string | null
  /** AFK Timeout in seconds. */
  afk_timeout: number
  /** The verification level required for the guild */
  verification_level: number
  /** The roles in the guild */
  roles: Map<string, Role>
  /** The custom guild emojis */
  emojis: Emoji[]
  /** Enabled guild features */
  features: Guild_Features[]
  /** Required MFA level for the guild */
  mfa_level: number
  /** The id of the channel to which system mesages are sent */
  system_channel_id: string | null
  /** When this guild was joined at */
  joined_at: number
  /** Whether this is considered a large guild */
  large: boolean
  /** Whether this guild is unavailable */
  unavailable: boolean
  /** Total number of members in this guild */
  member_count: number
  voice_states: Map<string, Voice_State>
  /** Users in the guild */
  members: Map<string, Member>
  /** Channels in the guild */
  channels: Map<string, Channel>
  presences: Map<string, Presence>
  /** The maximum amount of presences for the guild(the default value, currently 5000 is in effect when null is returned.) */
  max_presences?: number | null
  /** The maximum amount of members for the guild */
  max_members?: number
  /** The vanity url code for the guild */
  vanity_url_code: string | null
  /** The description for the guild */
  description: string | null
  /** The banner hash */
  banner: string | null
  /** The premium tier */
  premium_tier: number
  /** The total number of users currently boosting this server. */
  premium_subscription_count: number
  /** The preferred local of this guild only set if guild has the DISCOVERABLE feature, defaults to en-US */
  preferred_locale: string
  /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
  icon_url(size?: Image_Size, format?: Image_Formats): string | undefined
  /** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
  splash_url(size?: Image_Size, format?: Image_Formats): string | undefined
  /** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
  banner_url(size?: Image_Size, format?: Image_Formats): string | undefined
  /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  create_channel(name: string, options: ChannelCreate_Options): Promise<Channel>
  /** Returns a list of guild channel objects.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
   */
  get_channels(): Promise<Channel[]>
  /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
  swap_channels(channel_positions: Position_Swap[]): Promise<void>
  /** Returns a guild member object for the specified user.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your members will be cached in your guild.**
   */
  get_member(id: string): Promise<Member>
  /** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. */
  create_emoji(name: string, image: string, options: Create_Emojis_Options): Promise<Emoji>
  /** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
  edit_emoji(id: string, options: Edit_Emojis_Options): Promise<Emoji>
  /** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
  delete_emoji(id: string, reason?: string): Promise<void>
  /** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
  create_role(options: Create_Role_Options): Promise<Role>
  /** Edi a guild role. Requires the MANAGE_ROLES permission. */
  edit_role(id: string, options: Create_Role_Options): Promise<Role>
  /** Delete a guild role. Requires the MANAGE_ROLES permission. */
  delete_role(id: string): Promise<void>
  /** Returns a list of role objects for the guild.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
   */
  get_roles(): Promise<Role[]>
  /** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. */
  swap_roles(role_positions: Position_Swap): Promise<Role[]>
  /** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
  get_prune_count(days: number): Promise<number>
  /** Begin pruning all members in the given time period */
  prune_members(days: number): Promise<void>
  /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
  get_audit_logs(options: Get_Audit_Logs_Options): Promise<AuditLog>
  /** Returns the guild embed object. Requires the MANAGE_GUILD permission. */
  get_embed(): Promise<Guild_Embed>
  /** Modify a guild embed object for the guild. Requires the MANAGE_GUILD permission. */
  edit_embed(enabled: boolean, channel_id?: string | null): Promise<Guild_Embed>
  /** Returns the code and uses of the vanity url for this server if it is enabled. Requires the MANAGE_GUILD permission. */
  get_vanity_url(): Promise<Vanity_Invite>
  /** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
  get_integrations(): Promise<Guild_Integration[]>
  /** Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. */
  edit_integration(id: string, options: Edit_Integration_Options): Promise<void>
  /** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
  delete_integration(id: string): Promise<void>
  /** Sync an integration. Requires teh MANAGE_GUILD permission. */
  sync_integration(id: string): Promise<void>
  /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
  get_bans(): Promise<BannedUser[]>
  /** Ban a user from the guild and optionally delete previous messages sent by the user. Requires teh BAN_MEMBERS permission. */
  ban(id: string, options: BanOptions): Promise<void>
  /** Remove the ban for a user. REquires BAN_MEMBERS permission */
  unban(id: string): Promise<void>
  /** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
  edit(options: Guild_Edit_Options): Promise<Guild>
  /** Get all the invites for this guild. Requires MANAGE_GUILD permission */
  get_invites(): Promise<Invite[]>
  /** Leave a guild */
  leave(): Promise<void>
  /** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
  get_voice_regions(): Promise<Voice_Region[]>
  /** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
  get_webhooks(): Promise<Webhook[]>
}

export type Guild_Features =
  | `INVITE_SPLASH`
  | `VIP_REGIONS`
  | `VANITY_URL`
  | `VERIFIED`
  | `PARTNERED`
  | `PUBLIC`
  | `COMMERCE`
  | `NEWS`
  | `DISCOVERABLE`
  | `FEATURABLE`
  | `ANIMATED_ICON`
  | `BANNER`

export interface Voice_Region {
  /** unique ID for the region */
  id: string
  /** name of the region */
  name: string
  /** true if this is a vip-only server */
  vip: boolean
  /** true for a single server that is closest to the current user's client */
  optimal: boolean
  /** whether this is a deprecated voice region (avoid switching to these) */
  deprecated: boolean
  /** whether this is a custom voice region (used for events/etc) */
  custom: boolean
}

export interface BanOptions {
  /** number of days to delete messages for (0-7) */
  delete_message_days?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** The reason for the ban. */
  reason?: string
}

export interface BannedUser {
  /** The reason for the ban */
  reason?: string
  /** The banned user object */
  user: User
}

export interface Position_Swap {
  /** The unique id */
  id: string
  /** The sorting position number. */
  position: number
}

export interface Guild_Edit_Options {
  /** The guild name */
  name?: string
  /** The guild voice region id */
  region?: string
  /** The verification level. 0 is UNRESTRICTED. 1 is Verified email. 2 is 5 minutes user. 3 is 10 minutes member in guild. 4 is verified phone number */
  verification_level?: 0 | 1 | 2 | 3
  /** The default message notification level. 0 is ALL_MESSAGES and 1 is ONLY_MENTINS */
  default_message_notifications?: 0 | 1
  /** Explicit content filter level. 0 is DISABLED 1 is members without roles. 2 is all members */
  explicit_content_filter?: 0 | 1 | 2
  /** The id for the afk channel. */
  afk_channel_id?: string
  /** The afk timeout in seconds. */
  afk_timeout?: number
  /** base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has ANIMATED_ICON feature) */
  icon?: string
  /** user id to transfer guild ownership to (must be owner) */
  owner_id?: string
  /** base64 16:9 png/jpeg image for the guild splash (when the server has INVITE_SPLASH feature) */
  splash?: string
  /** base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature) */
  banner?: string
  /** the id of the channel to which system messages are sent */
  system_channel_id?: string
}

export interface Edit_Integration_Options {
  /** The behavior when an integration subscription lapses. */
  expire_behavior: number
  /** The period in seconds where the integration will ignore lapsed subscriptions */
  expire_grace_period: number
  /** Whether emoticons should be synced for this integrations (twitch only currently) */
  enable_emoticons: boolean
}

export interface Guild_Integration {
  /** The integrations unique id */
  id: string
  /** the integrations name */
  name: string
  /** The integration type like twitch, youtube etc */
  type: string
  /** Is this integration enabled */
  enabled: boolean
  /** is this integration syncing */
  syncing: boolean
  /** id that this integration uses for "subscribers" */
  role_id: string
  /** The behavior of expiring subscribers */
  expire_behavior: number
  /** The grace period before expiring subscribers */
  expire_grace_period: number
  /** The user for this integration */
  user: User_Data
  /** The integration account information */
  account: Account
  /** When this integration was last synced */
  synced_at: string
}

export interface User_Data {
  /** The user's id */
  id: string
  /** the user's username, not unique across the platform */
  username: string
  /** The user's 4 digit discord tag */
  discriminator: string
  /** The user's avatar hash */
  avatar: string | null
  /** Whether the user is a bot */
  bot?: boolean
  /** Whether the user is an official discord system user (part of the urgent message system.) */
  system?: boolean
  /** Whether the user has two factor enabled on their account */
  mfa_enabled?: boolean
  /** the user's chosen language option */
  locale?: string
  /** Whether the email on this account has been verified */
  verified?: boolean
  /** The user's email */
  email?: string
  /** The flags on a user's account. */
  flags?: number
  /** The type of Nitro subscription on a user's account. */
  premium_type?: number
}

export enum User_Flags {
  NONE,
  DISCORD_EMPLOYEE,
  DISCORD_PARTNER,
  HYPE_SQUAD_EVENTS = 1 << 2,
  BUG_HUNTER = 1 << 3,
  HOUSE_BRAVERY = 1 << 6,
  HOUSE_BRILLIANCE = 1 << 7,
  HOUSE_BALANCE = 1 << 8,
  EARLY_SUPPORTER = 1 << 9,
  TEAM_USER = 1 << 10,
  SYSTEM = 1 << 12
}

export enum Nitro_Types {
  NITRO_CLASSIC = 1,
  NITRO
}

export interface Vanity_Invite {
  code: string | null
  uses: number
}

export interface Guild_Embed {
  /** Whether the embed is enbaled. */
  enabled: boolean
}

export interface Get_Audit_Logs_Options {
  /** Filter the logs for actions made by this user. */
  user_id?: string
  /** The type of audit log. */
  action_type?: AuditLogType
  /** Filter the logs before a certain log entry. */
  before?: string
  /** How many entries are returned. Between 1-100. Default 50. */
  limit?: number
}

export type AuditLogType =
  | `GUILD_UPDATE`
  | `CHANNEL_CREATE`
  | `CHANNEL_UPDATE`
  | `CHANNEL_DELETE`
  | `CHANNEL_OVERWRITE_CREATE`
  | `CHANNEL_OVERWRITE_UPDATE`
  | `CHANNEL_OVERWRITE_DELETE`
  | `MEMBER_KICK`
  | `MEMBER_PRUNE`
  | `MEMBER_BAN_ADD`
  | `MEMBER_BAN_REMOVE`
  | `MEMBER_UPDATE`
  | `MEMBER_ROLE_UPDATE`
  | `MEMBER_MOVE`
  | `MEMBER_DISCONNECT`
  | `BOT_ADD`
  | `ROLE_CREATE`
  | `ROLE_UPDATE`
  | `ROLE_DELETE`
  | `INVITE_CREATE`
  | `INVITE_UPDATE`
  | `INVITE_DELETE`
  | `WEBHOOK_CREATE`
  | `WEBHOOK_UPDATE`
  | `WEBHOOK_DELETE`
  | `EMOJI_CREATE`
  | `EMOJI_UPDATE`
  | `EMOJI_DELETE`
  | `MESSAGE_DELETE`
  | `MESSAGE_BULK_DELETE`
  | `MESSAGE_PIN`
  | `MESSAGE_UNPIN`
  | `INTEGRATION_CREATE`
  | `INTEGRATION_UPDATE`
  | `INTEGRATION_DELETE`

export enum AuditLogs {
  GUILD_UPDATE = 1,
  CHANNEL_CREATE = 10,
  CHANNEL_UPDATE,
  CHANNEL_DELETE,
  CHANNEL_OVERWRITE_CREATE,
  CHANNEL_OVERWRITE_UPDATE,
  CHANNEL_OVERWRITE_DELETE,
  MEMBER_KICK = 20,
  MEMBER_PRUNE,
  MEMBER_BAN_ADD,
  MEMBER_BAN_REMOVE,
  MEMBER_UPDATE,
  MEMBER_ROLE_UPDATE,
  MEMBER_MOVE,
  MEMBER_DISCONNECT,
  BOT_ADD,
  ROLE_CREATE = 30,
  ROLE_UPDATE,
  ROLE_DELETE,
  INVITE_CREATE = 40,
  INVITE_UPDATE,
  INVITE_DELETE,
  WEBHOOK_CREATE = 50,
  WEBHOOK_UPDATE,
  WEBHOOK_DELETE,
  EMOJI_CREATE = 60,
  EMOJI_UPDATE,
  EMOJI_DELETE,
  MESSAGE_DELETE = 72,
  MESSAGE_BULK_DELETE,
  MESSAGE_PIN,
  MESSAGE_UNPIN,
  INTEGRATION_CREATE = 80,
  INTEGRATION_UPDATE,
  INTEGRATION_DELETE
}

export type Image_Size = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048
export type Image_Formats = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif'
export type ChannelType = 'text' | 'dm' | 'news' | 'voice' | 'category' | 'store'

export type Permission =
  | `CREATE_INSTANT_INVITE`
  | `KICK_MEMBERS`
  | `BAN_MEMBERS`
  | `ADMINISTRATOR`
  | `MANAGE_CHANNELS`
  | `MANAGE_GUILD`
  | `ADD_REACTIONS`
  | `VIEW_AUDIT_LOG`
  | `VIEW_CHANNEL`
  | `SEND_MESSAGES`
  | `SEND_TTS_MESSAGES`
  | `MANAGE_MESSAGES`
  | `EMBED_LINKS`
  | `ATTACH_FILES`
  | `READ_MESSAGE_HISTORY`
  | `MENTION_EVERYONE`
  | `USE_EXTERNAL_EMOJIS`
  | `CONNECT`
  | `SPEAK`
  | `MUTE_MEMBERS`
  | `DEAFEN_MEMBERS`
  | `MOVE_MEMBERS`
  | `USE_VAD`
  | `PRIORITY_SPEAKER`
  | `STREAM`
  | `CHANGE_NICKNAME`
  | `MANAGE_NICKNAMES`
  | `MANAGE_ROLES`
  | `MANAGE_WEBHOOKS`
  | `MANAGE_EMOJIS`

export interface Overwrite {
  /** The role or user id */
  id: string
  /** Whether this is a role or a member */
  type: 'role' | 'member'
  /** The permissions that this id is allowed to do. (This will mark it as a green check.) */
  allow: Permission[]
  /** The permissions that this id is NOT allowed to do. (This will mark it as a red x.) */
  deny: Permission[]
}

export interface Raw_Overwrite {
  /** The role or user id */
  id: string
  /** Whether this is a role or a member */
  type: 'role' | 'member'
  /** The permissions that this id is allowed to do. (This will mark it as a green check.) */
  allow: number
  /** The permissions that this id is NOT allowed to do. (This will mark it as a red x.) */
  deny: number
}

export enum ChannelTypes {
  text,
  dm,
  voice,
  category = 4,
  news,
  store
}

export enum Permissions {
  CREATE_INSTANT_INVITE = 0x00000001,
  KICK_MEMBERS = 0x00000002,
  BAN_MEMBERS = 0x00000004,
  ADMINISTRATOR = 0x00000008,
  MANAGE_CHANNELS = 0x00000010,
  MANAGE_GUILD = 0x00000020,
  ADD_REACTIONS = 0x00000040,
  VIEW_AUDIT_LOG = 0x00000080,
  VIEW_CHANNEL = 0x00000400,
  SEND_MESSAGES = 0x00000800,
  SEND_TTS_MESSAGES = 0x00001000,
  MANAGE_MESSAGES = 0x00002000,
  EMBED_LINKS = 0x00004000,
  ATTACH_FILES = 0x00008000,
  READ_MESSAGE_HISTORY = 0x00010000,
  MENTION_EVERYONE = 0x00020000,
  USE_EXTERNAL_EMOJIS = 0x00040000,
  CONNECT = 0x00100000,
  SPEAK = 0x00200000,
  MUTE_MEMBERS = 0x00400000,
  DEAFEN_MEMBERS = 0x00800000,
  MOVE_MEMBERS = 0x01000000,
  USE_VAD = 0x02000000,
  PRIORITY_SPEAKER = 0x00000100,
  STREAM = 0x00000200,
  CHANGE_NICKNAME = 0x04000000,
  MANAGE_NICKNAMES = 0x08000000,
  MANAGE_ROLES = 0x10000000,
  MANAGE_WEBHOOKS = 0x20000000,
  MANAGE_EMOJIS = 0x40000000
}

export interface ChannelCreate_Options {
  /** The type of the channel */
  type?: ChannelType
  /** The channel topic. (0-1024 characters) */
  topic?: string
  /** The bitrate(in bits) of the voice channel. */
  bitrate?: number
  /** The user limit of the voice channel. */
  user_limit?: number
  /** The amount of seconds a user has to wait before sending another message. (0-21600 seconds). Bots, as well as users with the permission `manage_messages or manage_channel` are unaffected. */
  rate_limit_per_user?: number
  /** The sorting position of the channel */
  position?: number
  /** The channel's permission overwrites */
  permission_overwrites?: Overwrite[]
  /** The id of the parent category for the channel */
  parent_id?: string
  /** Whether the channel is nsfw */
  nsfw?: boolean
  /** The reason to add in the Audit Logs. */
  reason?: string
}

export interface Create_Emojis_Options {
  /** The roles for which this emoji will be whitelisted. Only the users with one of these roles can use this emoji. */
  roles: string[]
  /** The reason to have in the Audit Logs. */
  reason: string
}

export interface Edit_Emojis_Options {
  /** The name of the emoji */
  name: string
  /** The roles for which this emoji will be whitelisted. Only the users with one of these roles can use this emoji. */
  roles: string[]
}

export interface Create_Role_Options {
  name?: string
  permissions?: Permission[]
  color?: number
  hoist?: boolean
  mentionable?: boolean
}

export interface PrunePayload {
  pruned: number
}
