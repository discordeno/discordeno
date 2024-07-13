/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { BigString, ChannelTypes, DiscordChannel, DiscordThreadMember, OverwriteReadable, VideoQualityModes } from '@discordeno/types'
import { calculatePermissions, type Bot } from '../index.js'
import { Permissions } from './toggles/Permissions.js'
import { ChannelToggles } from './toggles/channel.js'

const Mask = (1n << 64n) - 1n

export function packOverwrites(allow: string, deny: string, id: string, type: number): bigint {
  return pack64(allow, 0) | pack64(deny, 1) | pack64(id, 2) | pack64(type, 3)
}
function unpack64(v: bigint, shift: number): bigint {
  return (v >> BigInt(shift * 64)) & Mask
}
function pack64(v: string | number, shift: number): bigint {
  const b = BigInt(v)
  if (b < 0 || b > Mask) throw new Error('should have been a 64 bit unsigned integer: ' + v.toString())
  return b << BigInt(shift * 64)
}
export function separateOverwrites(v: bigint): [number, bigint, bigint, bigint] {
  return [Number(unpack64(v, 3)), unpack64(v, 2), unpack64(v, 0), unpack64(v, 1)] as [number, bigint, bigint, bigint]
}

export const baseChannel: Partial<Channel> & BaseChannel = {
  get archived() {
    return !!this.toggles?.archived
  },
  get invitable() {
    return !!this.toggles?.invitable
  },
  get locked() {
    return !!this.toggles?.locked
  },
  get nsfw() {
    return !!this.toggles?.nsfw
  },
  get newlyCreated() {
    return !!this.toggles?.newlyCreated
  },
  get permissionOverwrites() {
    return (
      this.internalOverwrites?.map((overwrite) => {
        const [type, id, allow, deny] = separateOverwrites(overwrite)
        return {
          type,
          id,
          allow: calculatePermissions(allow),
          deny: calculatePermissions(deny),
        }
      }) ?? []
    )
  },
  get threadMetadata() {
    return {
      archiveTimestamp: this.internalThreadMetadata?.archiveTimestamp,
      createTimestamp: this.internalThreadMetadata?.createTimestamp,
      autoArchiveDuration: this.internalThreadMetadata?.autoArchiveDuration,
      locked: this.locked,
      invitable: this.invitable,
      archived: this.archived,
    }
  },
}

export function transformChannel(bot: Bot, payload: { channel: DiscordChannel } & { guildId?: BigString }): Channel {
  const channel = Object.create(baseChannel) as Channel
  const props = bot.transformers.desiredProperties.channel
  channel.toggles = new ChannelToggles(payload.channel)

  if (props.id && payload.channel.id) channel.id = bot.transformers.snowflake(payload.channel.id)
  if (props.guildId && (payload.guildId ?? payload.channel.guild_id))
    channel.guildId = payload.guildId ? bot.transformers.snowflake(payload.guildId) : bot.transformers.snowflake(payload.channel.guild_id!)
  if (props.type) channel.type = payload.channel.type
  if (props.position) channel.position = payload.channel.position
  if (props.name && payload.channel.name) channel.name = payload.channel.name
  if (props.topic && payload.channel.topic) channel.topic = payload.channel.topic
  if (props.lastMessageId && payload.channel.last_message_id) channel.lastMessageId = bot.transformers.snowflake(payload.channel.last_message_id)
  if (props.bitrate && payload.channel.bitrate) channel.bitrate = payload.channel.bitrate
  if (props.userLimit) channel.userLimit = payload.channel.user_limit
  if (props.rateLimitPerUser) channel.rateLimitPerUser = payload.channel.rate_limit_per_user
  if (props.ownerId && payload.channel.owner_id) channel.ownerId = bot.transformers.snowflake(payload.channel.owner_id)
  if (props.lastPinTimestamp && payload.channel.last_pin_timestamp) channel.lastPinTimestamp = Date.parse(payload.channel.last_pin_timestamp)
  if (props.rtcRegion && payload.channel.rtc_region) channel.rtcRegion = payload.channel.rtc_region
  if (props.videoQualityMode && payload.channel.video_quality_mode) channel.videoQualityMode = payload.channel.video_quality_mode
  if (props.messageCount) channel.messageCount = payload.channel.message_count
  if (props.memberCount) channel.memberCount = payload.channel.member_count
  if (props.archiveTimestamp || props.createTimestamp || props.autoArchiveDuration) {
    channel.internalThreadMetadata = {} as NonNullable<Channel['internalThreadMetadata']>
    if (props.archiveTimestamp && payload.channel.thread_metadata?.archive_timestamp)
      channel.internalThreadMetadata.archiveTimestamp = Date.parse(payload.channel.thread_metadata.archive_timestamp)
    if (props.createTimestamp && payload.channel.thread_metadata?.create_timestamp)
      channel.internalThreadMetadata.createTimestamp = Date.parse(payload.channel.thread_metadata.create_timestamp)
    if (props.autoArchiveDuration && payload.channel.thread_metadata?.auto_archive_duration)
      channel.internalThreadMetadata.autoArchiveDuration = payload.channel.thread_metadata.auto_archive_duration
  }
  if (props.defaultAutoArchiveDuration && payload.channel.default_auto_archive_duration)
    channel.defaultAutoArchiveDuration = payload.channel.default_auto_archive_duration
  if (props.permissions && payload.channel.permissions) channel.permissions = new Permissions(payload.channel.permissions)
  if (props.flags) channel.flags = payload.channel.flags
  if (props.permissionOverwrites && payload.channel.permission_overwrites)
    channel.internalOverwrites = payload.channel.permission_overwrites.map((o) => packOverwrites(o.allow ?? '0', o.deny ?? '0', o.id, o.type))
  if (props.parentId && payload.channel.parent_id) channel.parentId = bot.transformers.snowflake(payload.channel.parent_id)

  return bot.transformers.customizers.channel(bot, payload.channel, channel)
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
  defaultAutoArchiveDuration?: number
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
