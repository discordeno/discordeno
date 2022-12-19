import type { Camelize, DiscordChannel } from '@discordeno/types'
import { c1amelize1User } from './member.js'

export function c1amelize1Channel (
  payload: DiscordChannel
): Camelize<DiscordChannel> {
  return {
    id: payload.id,
    type: payload.type,
    guildId: payload.guild_id,
    position: payload.position,
    permissionOverwrites: payload.permission_overwrites,
    name: payload.name,
    topic: payload.topic ?? undefined,
    nsfw: payload.nsfw,
    lastMessageId: payload.last_message_id,
    bitrate: payload.bitrate,
    userLimit: payload.user_limit,
    rateLimitPerUser: payload.rate_limit_per_user,
    recipients: payload.recipients?.map((user) => c1amelize1User(user)),
    icon: payload.icon,
    ownerId: payload.owner_id,
    applicationId: payload.application_id,
    parentId: payload.parent_id,
    lastPinTimestamp: payload.last_pin_timestamp,
    rtcRegion: payload.rtc_region ?? undefined,
    videoQualityMode: payload.video_quality_mode,
    messageCount: payload.message_count,
    memberCount: payload.member_count,
    threadMetadata: payload.thread_metadata && {
      archived: payload.thread_metadata.archived,
      autoArchiveDuration: payload.thread_metadata.auto_archive_duration,
      archiveTimestamp: payload.thread_metadata.archive_timestamp,
      locked: payload.thread_metadata.locked,
      invitable: payload.thread_metadata.invitable,
      createTimestamp: payload.thread_metadata.create_timestamp
    },
    member: payload.member && {
      flags: payload.member.flags,
      id: payload.member.id,
      userId: payload.member.user_id,
      joinTimestamp: payload.member.join_timestamp
    },
    defaultAutoArchiveDuration: payload.default_auto_archive_duration,
    permissions: payload.permissions,
    flags: payload.flags,
    totalMessageSent: payload.total_message_sent,
    availableTags: payload.available_tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      moderated: tag.moderated,
      emojiId: tag.emoji_id,
      emojiName: tag.name
    })),
    appliedTags: payload.applied_tags,
    defaultReactionEmoji: payload.default_reaction_emoji && {
      emojiId: payload.default_reaction_emoji.emoji_id,
      emojiName: payload.default_reaction_emoji.emoji_name
    },
    defaultThreadRateLimitPerUser: payload.default_thread_rate_limit_per_user,
    defaultSortOrder: payload.default_sort_order,
    defaultForumLayout: payload.default_forum_layout,
    newlyCreated: payload.newly_created
  }
}
