/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { BigString, DiscordChannel } from '@discordeno/types'
import { calculatePermissions, type BaseChannel, type Bot, type Channel } from '../index.js'
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
  if (props.autoArchiveDuration && payload.channel.default_auto_archive_duration)
    channel.autoArchiveDuration = payload.channel.default_auto_archive_duration
  if (props.permissions && payload.channel.permissions) channel.permissions = new Permissions(payload.channel.permissions)
  if (props.flags) channel.flags = payload.channel.flags
  if (props.permissionOverwrites && payload.channel.permission_overwrites)
    channel.internalOverwrites = payload.channel.permission_overwrites.map((o) => packOverwrites(o.allow ?? '0', o.deny ?? '0', o.id, o.type))
  if (props.parentId && payload.channel.parent_id) channel.parentId = bot.transformers.snowflake(payload.channel.parent_id)

  return bot.transformers.customizers.channel(bot, payload.channel, channel)
}
