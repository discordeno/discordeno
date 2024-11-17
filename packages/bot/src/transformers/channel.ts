import type { BigString, DiscordChannel, DiscordForumTag } from '@discordeno/types'
import { type Channel, type ForumTag, type InternalBot, calculatePermissions, iconHashToBigInt } from '../index.js'
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

export const baseChannel: InternalBot['transformers']['$inferredTypes']['channel'] = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as InternalBot['transformers']['$inferredTypes']['channel']),

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
  get managed() {
    return !!this.toggles?.managed
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
      locked: !!this.toggles?.locked,
      invitable: !!this.toggles?.invitable,
      archived: !!this.toggles?.archived,
    }
  },
}

export function transformChannel(
  bot: InternalBot,
  payload: { channel: DiscordChannel; guildId?: BigString },
): typeof bot.transformers.$inferredTypes.channel {
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
  if (props.threadMetadata) {
    channel.internalThreadMetadata = {} as NonNullable<Channel['internalThreadMetadata']>
    if (payload.channel.thread_metadata?.archive_timestamp)
      channel.internalThreadMetadata.archiveTimestamp = Date.parse(payload.channel.thread_metadata.archive_timestamp)
    if (payload.channel.thread_metadata?.create_timestamp)
      channel.internalThreadMetadata.createTimestamp = Date.parse(payload.channel.thread_metadata.create_timestamp)
    if (payload.channel.thread_metadata?.auto_archive_duration)
      channel.internalThreadMetadata.autoArchiveDuration = payload.channel.thread_metadata.auto_archive_duration
  }
  if (props.defaultAutoArchiveDuration && payload.channel.default_auto_archive_duration)
    channel.defaultAutoArchiveDuration = payload.channel.default_auto_archive_duration
  if (props.permissions && payload.channel.permissions) channel.permissions = new Permissions(payload.channel.permissions)
  if (props.flags) channel.flags = payload.channel.flags
  if (props.permissionOverwrites && payload.channel.permission_overwrites)
    channel.internalOverwrites = payload.channel.permission_overwrites.map((o) => packOverwrites(o.allow ?? '0', o.deny ?? '0', o.id, o.type))
  if (props.parentId && payload.channel.parent_id) channel.parentId = bot.transformers.snowflake(payload.channel.parent_id)
  if (props.recipients && payload.channel.recipients) channel.recipients = payload.channel.recipients.map((u) => bot.transformers.user(bot, u))
  if (props.icon && payload.channel.icon) channel.icon = iconHashToBigInt(payload.channel.icon)
  if (props.applicationId && payload.channel.application_id) channel.applicationId = bot.transformers.snowflake(payload.channel.application_id)
  if (props.member && payload.channel.member) channel.member = bot.transformers.threadMember(bot, payload.channel.member)
  if (props.totalMessageSent && payload.channel.total_message_sent !== undefined) channel.totalMessageSent = payload.channel.total_message_sent
  if (props.availableTags && payload.channel.available_tags)
    channel.availableTags = payload.channel.available_tags.map((x) => bot.transformers.forumTag(bot, x))
  if (props.appliedTags && payload.channel.applied_tags) channel.appliedTags = payload.channel.applied_tags.map((x) => bot.transformers.snowflake(x))
  if (props.defaultReactionEmoji && payload.channel.default_reaction_emoji)
    channel.defaultReactionEmoji = bot.transformers.defaultReactionEmoji(bot, payload.channel.default_reaction_emoji)
  if (props.defaultThreadRateLimitPerUser && payload.channel.default_thread_rate_limit_per_user)
    channel.defaultThreadRateLimitPerUser = payload.channel.default_thread_rate_limit_per_user
  if (props.defaultSortOrder && payload.channel.default_sort_order !== undefined) channel.defaultSortOrder = payload.channel.default_sort_order
  if (props.defaultForumLayout && payload.channel.default_forum_layout !== undefined)
    channel.defaultForumLayout = payload.channel.default_forum_layout

  return bot.transformers.customizers.channel(bot, payload.channel, channel)
}

export function transformForumTag(bot: InternalBot, payload: DiscordForumTag): typeof bot.transformers.$inferredTypes.forumTag {
  const props = bot.transformers.desiredProperties.forumTag
  const forumTag = {} as ForumTag

  if (props.id && payload.id) forumTag.id = bot.transformers.snowflake(payload.id)
  if (props.name && payload.name) forumTag.name = payload.name
  if (props.moderated && payload.moderated) forumTag.moderated = payload.moderated
  if (props.emojiId && payload.emoji_id) forumTag.emojiId = bot.transformers.snowflake(payload.emoji_id)
  if (props.emojiName && payload.emoji_name) forumTag.emojiName = payload.emoji_name

  return bot.transformers.customizers.forumTag(bot, payload, forumTag)
}
