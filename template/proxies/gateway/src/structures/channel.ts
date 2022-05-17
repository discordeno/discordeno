import { DiscordChannel } from "../../../../../types/discord.ts";

export function proxyChannel(payload: DiscordChannel) {
  return {
    id: payload.id,
    type: payload.type,
    position: payload.position,
    name: payload.name,
    topic: payload.topic,
    bitrate: payload.bitrate,
    permissions: payload.permissions,
    nsfw: payload.nsfw ?? false,

    guildId: payload.guild_id,
    lastMessageId: payload.last_message_id,
    ownerId: payload.owner_id,
    applicationId: payload.application_id,
    parentId: payload.parent_id,
    userLimit: payload.user_limit,
    rateLimitPerUser: payload.rate_limit_per_user,
    rtcRegion: payload.rtc_region,
    videoQualityMode: payload.video_quality_mode,
    messageCount: payload.message_count,
    memberCount: payload.member_count,
    permissionOverwrites: payload.permission_overwrites,
    lastPinTimestamp: payload.last_pin_timestamp,
    defaultAutoArchiveDuration: payload.default_auto_archive_duration,
    newlyCreated: payload.newly_created ?? false,

    threadMetadata: payload.thread_metadata
      ? {
        archived: payload.thread_metadata.archived,
        locked: payload.thread_metadata.locked,
        invitable: payload.thread_metadata.invitable ?? false,

        createTimestamp: payload.thread_metadata.create_timestamp,
        archiveTimestamp: payload.thread_metadata.archive_timestamp,
        autoArchiveDuration: payload.thread_metadata.auto_archive_duration,
      }
      : undefined,

    member: payload.member
      ? {
        id: payload.member.id,
        flags: payload.member.flags,
        userId: payload.member.user_id,
        joinTimestamp: payload.member.join_timestamp,
      }
      : undefined,
  };
}
