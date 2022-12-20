import type { Camelize, DiscordChannel } from '@discordeno/types'
import { s1nakelize1User } from './member.js'

export function s1nakelize1Channel (
  payload: Camelize<DiscordChannel>
): DiscordChannel {
  return {
    id: payload.id,
    type: payload.type,
    name: payload.name,
    nsfw: payload.nsfw,
    icon: payload.icon,
    topic: payload.topic,
    flags: payload.flags,
    bitrate: payload.bitrate,
    position: payload.position,
    permissions: payload.permissions,

    guild_id: payload.guildId,
    owner_id: payload.ownerId,
    parent_id: payload.parentId,
    rtc_region: payload.rtcRegion,
    user_limit: payload.userLimit,
    member_count: payload.memberCount,
    applied_tags: payload.appliedTags,
    message_count: payload.messageCount,
    newly_created: payload.newlyCreated,
    application_id: payload.applicationId,
    last_message_id: payload.lastMessageId,
    rate_limit_per_user: payload.rateLimitPerUser,
    last_pin_timestamp: payload.lastPinTimestamp,
    video_quality_mode: payload.videoQualityMode,
    default_sort_order: payload.defaultSortOrder,
    total_message_sent: payload.totalMessageSent,
    default_forum_layout: payload.defaultForumLayout,
    permission_overwrites: payload.permissionOverwrites,
    default_auto_archive_duration: payload.defaultAutoArchiveDuration,
    default_thread_rate_limit_per_user: payload.defaultThreadRateLimitPerUser,

    thread_metadata: payload.threadMetadata && {
      locked: payload.threadMetadata.locked,
      archived: payload.threadMetadata.archived,
      invitable: payload.threadMetadata.invitable,

      create_timestamp: payload.threadMetadata.createTimestamp,
      archive_timestamp: payload.threadMetadata.archiveTimestamp,
      auto_archive_duration: payload.threadMetadata.autoArchiveDuration
    },
    member: payload.member && {
      id: payload.member.id,
      flags: payload.member.flags,

      user_id: payload.member.userId,
      join_timestamp: payload.member.joinTimestamp
    },
    available_tags: payload.availableTags?.map((tag) => ({
      id: tag.id,
      name: tag.name,
      moderated: tag.moderated,

      emoji_id: tag.emojiId,
      emoji_name: tag.emojiName
    })),
    default_reaction_emoji: payload.defaultReactionEmoji && {
      emoji_id: payload.defaultReactionEmoji.emojiId,
      emoji_name: payload.defaultReactionEmoji.emojiName
    },

    recipients: payload.recipients?.map((user) => s1nakelize1User(user))
  }
}
