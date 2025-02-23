/** Types for: https://discord.com/developers/docs/resources/channel */

import type { DiscordMember } from './guild.js'
import type { DiscordMessageComponents } from './interactions.js'
import type { DiscordAllowedMentions, DiscordAttachment, DiscordEmbed, MessageFlags } from './message.js'
import type { DiscordUser } from './user.js'

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-structure */
export interface DiscordChannel {
  /** The id of the channel */
  id: string
  /** The type of channel */
  type: ChannelTypes
  /** The id of the guild */
  guild_id?: string
  /** Sorting position of the channel (channels with the same position are sorted by id) */
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
  applied_tags?: string[]
  /** the emoji to show in the add reaction button on a thread in a GUILD_FORUM channel */
  default_reaction_emoji?: DiscordDefaultReactionEmoji | null
  /** the initial rate_limit_per_user to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. */
  default_thread_rate_limit_per_user?: number
  /** the default sort order type used to order posts in GUILD_FORUM channels. Defaults to null, which indicates a preferred sort order hasn't been set by a channel admin */
  default_sort_order?: SortOrderTypes | null
  /** the default forum layout view used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin */
  default_forum_layout?: ForumLayout
  /** When a thread is created this will be true on that channel payload for the thread. */
  newly_created?: boolean
}

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export enum ChannelTypes {
  /** A text channel within a server */
  GuildText,
  /** A direct message between users */
  DM,
  /** A voice channel within a server */
  GuildVoice,
  /** A direct message between multiple users */
  GroupDm,
  /** An organizational category that contains up to 50 channels */
  GuildCategory,
  /** A channel that users can follow and crosspost into their own server */
  GuildAnnouncement,
  /** A temporary sub-channel within a GUILD_ANNOUNCEMENT channel */
  AnnouncementThread = 10,
  /** A temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel */
  PublicThread,
  /** A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission */
  PrivateThread,
  /** A voice channel for hosting events with an audience */
  GuildStageVoice,
  /** A channel in a hub containing the listed servers */
  GuildDirectory,
  /** A channel which can only contains threads */
  GuildForum,
  /** Channel that can only contain threads, similar to GUILD_FORUM channels */
  GuildMedia,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes */
export enum VideoQualityModes {
  /** Discord chooses the quality for optimal performance */
  Auto = 1,
  /** 720p */
  Full,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-flags */
export enum ChannelFlags {
  None,
  /** this thread is pinned to the top of its parent `GUILD_FORUM` channel */
  Pinned = 1 << 1,
  /** Whether a tag is required to be specified when creating a thread in a `GUILD_FORUM` or a GUILD_MEDIA channel. Tags are specified in the `applied_tags` field. */
  RequireTag = 1 << 4,
  /** When set hides the embedded media download options. Available only for media channels. */
  HideMediaDownloadOptions = 1 << 15,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types */
export enum SortOrderTypes {
  /** Sort forum posts by activity */
  LatestActivity,
  /** Sort forum posts by creation time (from most recent to oldest) */
  CreationDate,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types */
export enum ForumLayout {
  /** No default has been set for forum channel. */
  NotSet = 0,
  /** Display posts as a list. */
  ListView = 1,
  /** Display posts as a collection of tiles. */
  GalleryView = 2,
}

/** https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure */
export interface DiscordFollowedChannel {
  /** Source message id */
  channel_id: string
  /** Created target webhook id */
  webhook_id: string
}

/** https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure */
export enum OverwriteTypes {
  Role,
  Member,
}

/** https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure */
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

/** https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure */
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

/** https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure */
export interface DiscordThreadMember {
  /** Any user-thread settings, currently only used for notifications */
  flags: number
  /** The id of the thread */
  id: string
  /** The id of the user */
  user_id: string
  /** The time the current user last joined the thread */
  join_timestamp: string
  /** The member object of the user */
  member?: DiscordMember
}

/** https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure, the first asterisk */
export interface DiscordThreadMemberGuildCreate {
  /** Any user-thread settings, currently only used for notifications */
  flags: number
  /** The time the current user last joined the thread */
  join_timestamp: string
}

/** https://discord.com/developers/docs/resources/channel#default-reaction-object-default-reaction-structure */
export interface DiscordDefaultReactionEmoji {
  /** The id of a guild's custom emoji */
  emoji_id: string
  /** The unicode character of the emoji */
  emoji_name: string | null
}

/** https://discord.com/developers/docs/resources/channel#forum-tag-object-forum-tag-structure */
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

/** https://discord.com/developers/docs/resources/channel#modify-channel */
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

/** https://discord.com/developers/docs/resources/channel#edit-channel-permissions-json-params */
export interface DiscordEditChannelPermissionOverridesOptions {
  /** Permission bit set */
  allow: string
  /** Permission bit set */
  deny: string
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes
}

/** https://discord.com/developers/docs/resources/channel#follow-announcement-channel-json-params */
export interface DiscordFollowAnnouncementChannel {
  /** The id of the channel to send announcements to. */
  webhook_channel_id: string
}

/** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel-jsonform-params */
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
    flags?: MessageFlags
  }
  /** the IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel */
  applied_tags?: string[]
}

/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-response-body */
// TODO: this should be ArchivedThreads, not Active
export interface DiscordActiveThreads {
  threads: DiscordChannel[]
  members: DiscordThreadMember[]
}

/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-response-body */
export type DiscordArchivedThreads = DiscordActiveThreads & {
  // TODO: this should be has_more, not hasMore
  hasMore: boolean
}

// TODO: What does this type exactly match to? The API doesn't seem to have a list ACTIVE threads, only list archived threads
export interface DiscordListActiveThreads {
  /** The active threads */
  threads: DiscordChannel[]
  /** A thread member object for each returned thread the current user has joined */
  members: DiscordThreadMember[]
}

/**
 * https://discord.com/developers/docs/resources/channel#list-public-archived-threads
 * https://discord.com/developers/docs/resources/channel#list-private-archived-threads
 * https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads
 */
export interface DiscordListArchivedThreads extends DiscordListActiveThreads {
  /** Whether there are potentially additional threads that could be returned on a subsequent call */
  has_more: boolean
}
