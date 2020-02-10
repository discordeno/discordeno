import Client from '../module/Client'
import { endpoints } from '../constants/discord'
import { formatImageURL } from '../utils/cdn'
import { createRole } from './role'
import { createEmoji } from './emoji'
import { createVoiceState } from './voiceState'
import { createMember } from './member'
import { createChannel } from './channel'
import { createPresence } from './presence'

interface CreateGuildPayload {
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
  roles: Role[]
  /** The custom guild emojis */
  emojis: Emoji[]
  /** Enabled guild features */
  features: GuildFeatures[]
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

interface Guild {
  /** The guild id */
  id: string
  /** The guild name 2-100 characters */
  name: string
  /** The guild icon image hash */
  icon: string | null
  /** The guild splash image hash */
  splash: string | null
  /** The id of the owner */
  ownerID: string
  /** The voice region id for the guild */
  region: string
  /** The afk channel id */
  afkChannelID: string | null
  /** AFK Timeout in seconds. */
  afkTimeout: number
  /** The verification level required for the guild */
  verificationLevel: number
  /** The roles in the guild */
  roles: Role[]
  /** The custom guild emojis */
  emojis: Emoji[]
  /** Enabled guild features */
  features: GuildFeatures[]
  /** Required MFA level for the guild */
  mfaLevel: number
  /** The id of the channel to which system mesages are sent */
  systemChannelID: string | null
  /** When this guild was joined at */
  joinedAt: number
  /** Whether this is considered a large guild */
  large: boolean
  /** Whether this guild is unavailable */
  unavailable: boolean
  /** Total number of members in this guild */
  memberCount: number
  voiceStates: VoiceState[]
  /** Users in the guild */
  members: Member[]
  /** Channels in the guild */
  channels: Channel[]
  presences: Presence[]
  /** The maximum amount of presences for the guild(the default value, currently 5000 is in effect when null is returned.) */
  maxPresences?: number | null
  /** The maximum amount of members for the guild */
  maxMembers?: number
  /** The vanity url code for the guild */
  vanityURLCode: string | null
  /** The description for the guild */
  description: string | null
  /** The banner hash */
  banner: string | null
  /** The premium tier */
  premiumTier: number
  /** The total number of users currently boosting this server. */
  premiumSubscriptionCount: number
  /** The preferred local of this guild only set if guild has the DISCOVERABLE feature, defaults to en-US */
  preferredLocale: string
  /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
  iconURL(): string | undefined
  /** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
  splashURL(): string | undefined
  /** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
  bannerURL(): string | undefined
  /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  createChannel(name: string, options: ChannelCreateOptions): Promise<Channel>
}

export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048
export type ImageFormats = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif'
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

export interface ChannelCreateOptions {
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
}

export const createGuild = (data: CreateGuildPayload, client: Client) => {
  const guild: Guild = {
    id: data.id,
    name: data.name,
    icon: data.icon,
    splash: data.splash,
    ownerID: data.owner_id,
    region: data.region,
    afkChannelID: data.afk_channel_id,
    afkTimeout: data.afk_timeout,
    verificationLevel: data.verification_level,
    roles: data.roles.map(role => createRole(role)),
    emojis: data.emojis.map(emoji => createEmoji(emoji)),
    features: data.features,
    mfaLevel: data.mfa_level,
    systemChannelID: data.system_channel_id,
    joinedAt: Date.parse(data.joined_at),
    large: data.large,
    unavailable: data.unavailable,
    memberCount: data.member_count,
    voiceStates: data.voice_states.map(voiceState => createVoiceState(voiceState)),
    members: data.members.map(member => createMember(member)),
    channels: data.channels.map(channel => createChannel(channel)),
    presences: data.presences.map(presence => createPresence(presence)),
    maxPresences: data.max_presences,
    maxMembers: data.max_members,
    vanityURLCode: data.vanity_url_code,
    description: data.description,
    banner: data.banner,
    premiumTier: data.premium_tier,
    premiumSubscriptionCount: data.premium_subscription_count,
    preferredLocale: data.preferred_locale,
    iconURL: (size: ImageSize = 128, format?: ImageFormats) =>
      data.icon ? formatImageURL(endpoints.GUILD_ICON(data.id, data.icon), size, format) : undefined,
    splashURL: (size: ImageSize = 128, format?: ImageFormats) =>
      data.splash ? formatImageURL(endpoints.GUILD_SPLASH(data.id, data.splash), size, format) : undefined,
    bannerURL: (size: ImageSize = 128, format?: ImageFormats) =>
      data.banner ? formatImageURL(endpoints.GUILD_BANNER(data.id, data.banner), size, format) : undefined,
    createChannel: (name: string, options?: ChannelCreateOptions) => {
      // TODO: Check if the bot has `MANAGE_CHANNELS` permission before making a channel
      return client.RequestManager.post(endpoints.GUILD_CHANNELS(data.id), {
        name,
        type: options?.type ? ChannelTypes[options.type] : undefined,
        permission_overwrites: options?.permission_overwrites
          ? options.permission_overwrites.map(perm => ({
              allow: perm.allow.map(p => Permissions[p]),
              deny: perm.deny.map(p => Permissions[p]),
              ...perm
            }))
          : undefined,
        ...options
      })
    }
  }

  return guild
}
