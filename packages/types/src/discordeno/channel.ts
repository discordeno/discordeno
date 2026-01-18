/** Types for: https://discord.com/developers/docs/resources/channel */

import type { ChannelFlags, ChannelTypes, ForumLayout, OverwriteTypes, SortOrderTypes, VideoQualityModes } from '../discord/channel.js';
import type { TargetTypes } from '../discord/invite.js';
import type { DiscordAttachment, DiscordEmbed, MessageFlags } from '../discord/message.js';
import type { PermissionStrings } from '../discord/permissions.js';
import type { BigString, Camelize } from '../shared.js';
import type { MessageComponents } from './components.js';
import type { AllowedMentions } from './message.js';
import type { FileContent } from './reference.js';

/** https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure */
export interface Overwrite {
  /** Role or user id */
  id: BigString;
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes;

  // NOTE:
  // - We allow PermissionStrings[] because in the rest manager we convert these value to the actual string discord wants
  // - Discord says that these are always present, we keep them as optional (and allow for null) because when it is sent it can be null / not present, https://discord.com/developers/docs/resources/guild#create-guild-channel-json-params, specificly the **
  /** Permission bit set */
  allow?: PermissionStrings[] | string | null;
  /** Permission bit set */
  deny?: PermissionStrings[] | string | null;
}

// This needs the prefix Discordeno to avoid conflicts with the @discordeno/bot types.
/** https://discord.com/developers/docs/resources/channel#default-reaction-object-default-reaction-structure */
export interface DiscordenoDefaultReactionEmoji {
  /** The id of a guild's custom emoji */
  emoji_id: BigString | null;
  /** The unicode character of the emoji */
  emoji_name: string | null;
}

// This needs the prefix Discordeno to avoid conflicts with the @discordeno/bot types.
/** https://discord.com/developers/docs/resources/channel#forum-tag-object-forum-tag-structure */
export interface DiscordenoForumTag {
  /** The id of the tag */
  id: string;
  /** The name of the tag (0-20 characters) */
  name: string;
  /** Whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission */
  moderated: boolean;
  /** The id of a guild's custom emoji. At most one of emoji_id and emoji_name may be set. */
  emoji_id: BigString | null;
  /** The unicode character of the emoji. At most one of emoji_id and emoji_name may be set. */
  emoji_name: string | null;
}

// Since this is a merge of 3 types, the properties appear in order of their first appearance in the 3 types
/**
 * - https://discord.com/developers/docs/resources/channel#modify-channel-json-params-group-dm
 * - https://discord.com/developers/docs/resources/channel#modify-channel-json-params-guild-channel
 * - https://discord.com/developers/docs/resources/channel#modify-channel-json-params-thread
 */
export interface ModifyChannel {
  // Group DM
  /**
   * 1-100 character channel name
   *
   * @remarks
   * This is valid only when editing group dms, any guild channel type, or a thread
   */
  name?: string;
  /**
   * Base64 encoded icon
   *
   * @remarks
   * This is valid only when editing group dms
   */
  icon?: string;

  // Guild Channel
  /**
   * The type of channel
   *
   * @remarks
   * You can only convert between {@link ChannelTypes.GuildText} channels and {@link ChannelTypes.GuildAnnouncement} channels when the guild has the `NEWS` feature
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText} or {@link ChannelTypes.GuildAnnouncement}.
   */
  type?: ChannelTypes;
  /**
   * The position of the channel in the left-hand listing (channels with the same position are sorted by id)
   *
   * @remarks
   * This is only valid when editing a guild channel of any type
   */
  position?: number | null;
  /**
   * Channel topic
   *
   * @remarks
   * 0-1024 character channel topic, or for {@link ChannelTypes.GuildForum} and {@link ChannelTypes.GuildMedia} 0-4096
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildAnnouncement}, {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  topic?: string | null;
  /**
   * Whether the channel is nsfw
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildAnnouncement}, {@link ChannelTypes.GuildStageVoice} {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  nsfw?: boolean | null;
  /**
   * Amount of seconds a user has to wait before sending another message in seconds (0-21600)
   *
   * @remarks
   * Bots and users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNEL`, are unaffected
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice} {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}, or a thread.
   */
  rateLimitPerUser?: number | null;
  /**
   * The bitrate (in bits) of the voice or stage channel
   *
   * @remarks
   * Minimum of 8000 bits
   *
   * For voice channels:
   * - normal servers can set bitrate up to 96000
   * - servers with Boost level 1 can set up to 128000
   * - servers with Boost level 2 can set up to 256000
   * - servers with Boost level 3 or the `VIP_REGIONS` guild feature can set up to 384000.
   *
   * For stage channels, bitrate can be set up to 64000.
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice}.
   */
  bitrate?: number | null;
  /**
   * The user limit of the voice or stage channel (0 refers to no limit)
   *
   * @remarks
   * - For voice channels, the max is set to 99
   * - For stage channels, the max is set to 10,000
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice}.
   */
  userLimit?: number | null;
  /**
   * Channel or category-specific permissions
   *
   * @remarks
   * This is valid when editing a guild channel of any type
   */
  permissionOverwrites?: Overwrite[] | null;
  /**
   * Id of the new parent category for a channel
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildAnnouncement}, {@link ChannelTypes.GuildStageVoice} {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  parentId?: BigString | null;
  /**
   * Voice region id for the voice channel, automatic when set to null
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice}.
   */
  rtcRegion?: string | null;
  /**
   * The camera video quality mode of the voice channel
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice}.
   */
  videoQualityMode?: VideoQualityModes | null;
  /**
   * The default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildAnnouncement}, {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  defaultAutoArchiveDuration?: 60 | 1440 | 4320 | 10080 | null;
  /**
   * Channel flags combined as a bitfield.
   *
   * @remarks
   * - `REQUIRE_TAG` is supported only by {@link ChannelTypes.GuildForum} and {@link ChannelTypes.GuildMedia} channels.
   * - `HIDE_MEDIA_DOWNLOAD_OPTIONS` is supported only by {@link ChannelTypes.GuildMedia} channels
   * - `PINNED` can only be set for threads in {@link ChannelTypes.GuildForum} and {@link ChannelTypes.GuildMedia} channels
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}, or a thread.
   *
   * @see {@link ChannelFlags}
   */
  flags?: number;
  /**
   * The set of tags that can be used in a {@link ChannelTypes.GuildForum} or a {@link ChannelTypes.GuildMedia} channel
   *
   * @remarks
   * Limited to 20 tags
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  availableTags?: DiscordenoForumTag[];
  /**
   * The emoji to show in the add reaction button on a thread in a {@link ChannelTypes.GuildForum} or a {@link ChannelTypes.GuildMedia} channel
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  defaultReactionEmoji?: DiscordenoDefaultReactionEmoji | null;
  /**
   * The initial `rate_limit_per_user` to set on newly created threads in a channel.
   *
   * @remarks
   * This field is copied to the thread at creation time and does not live update.
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  defaultThreadRateLimitPerUser?: number;
  /**
   * The default sort order type used to order posts in {@link ChannelTypes.GuildForum} and {@link ChannelTypes.GuildMedia} channels
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  defaultSortOrder?: SortOrderTypes | null;
  /**
   * The default forum layout type used to display posts in {@link ChannelTypes.GuildForum} channels
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum}.
   */
  defaultForumLayout?: ForumLayout;

  // Thread
  /**
   * Whether the thread is archived
   *
   * @remarks
   * This is only valid when editing a thread
   */
  archived?: boolean;
  /**
   * The thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity
   *
   * @remarks
   * This is only valid when editing a thread
   */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /**
   * Whether the thread is locked. When a thread is locked, only users with `MANAGE_THREADS` can unarchive it
   *
   * @remarks
   * This is only valid when editing a thread
   */
  locked?: boolean;
  /**
   * Whether non-moderators can add other non-moderators to a thread
   *
   * @remarks
   * Only available on private threads
   *
   * This is only valid when editing a thread
   */
  invitable?: boolean;
  /**
   * The IDs of the set of tags that have been applied to a thread in a {@link ChannelTypes.GuildForum} or a {@link ChannelTypes.GuildMedia} channel
   *
   * @remarks
   * Limited to 5
   *
   * This is only valid when editing a thread
   */
  appliedTags?: BigString[];
}

/** https://discord.com/developers/docs/resources/channel#edit-channel-permissions-json-params */
export interface EditChannelPermissionOverridesOptions {
  // This is included in here however it is a route parameter
  /** Role or user id */
  id: BigString;

  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes;

  // We allow PermissionStrings[] because in the rest manager we convert these value to the actual string discord wants
  /** The bitwise value of all allowed permissions */
  allow?: PermissionStrings[] | string | null;
  /** The bitwise value of all disallowed permissions */
  deny?: PermissionStrings[] | string | null;
}

/** https://discord.com/developers/docs/resources/channel#create-channel-invite-json-params */
export interface CreateChannelInvite {
  /** Duration of invite in seconds before expiry, or 0 for never. Between 0 and 604800 (7 days). Default: 86400 (24 hours) */
  maxAge?: number;
  /** Max number of users or 0 for unlimited. Between 0 and 100. Default: 0 */
  maxUses?: number;
  /** Whether this invite only grants temporary membership. Default: false */
  temporary?: boolean;
  /** If true, don't try to reuse similar invite (useful for creating many unique one time use invites). Default: false */
  unique?: boolean;
  /** The type of target for this voice channel invite */
  targetType?: TargetTypes;
  /** The id of the user whose stream to display for this invite, required if `target_type` is 1, the user must be streaming in the channel */
  targetUserId?: BigString;
  /** The id of the embedded application to open for this invite, required if `target_type` is 2, the application must have the `EMBEDDED` flag */
  targetApplicationId?: BigString;
  /**
   * A csv file with a single column of user IDs for all the users able to accept this invite
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Uploading a file with invalid user IDs will result in a 400 with the invalid IDs described.
   */
  targetUsersFile?: Blob;
  /**
   * The role ID(s) for roles in the guild given to the users that accept this invite
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission and cannot assign roles with higher permissions than the sender.
   */
  roleIds?: BigString[];
}

/** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient-json-params */
export interface AddDmRecipientOptions {
  /** access token of a user that has granted your app the `gdm.join` scope */
  accessToken: string;
  /** nickname of the user being added */
  nick: string;
}

/** https://discord.com/developers/docs/resources/channel#start-thread-from-message-json-params */
export interface StartThreadWithMessage {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
}

/** https://discord.com/developers/docs/resources/channel#start-thread-without-message-json-params */
export interface StartThreadWithoutMessage {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** The type of thread to create. Defaults to PrivateThread */
  type?: ChannelTypes.AnnouncementThread | ChannelTypes.PublicThread | ChannelTypes.PrivateThread;
  /** Whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
  invitable?: boolean;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
}

/** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel-jsonform-params*/
export interface CreateForumPostWithMessage {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
  /** contents of the first message in the forum/media thread */
  message: ForumAndMediaThreadMessage;
  /** The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM or a GUILD_MEDIA channel */
  appliedTags?: BigString[];
  /** The contents of the files being sent */
  files?: FileContent[];
}

/** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel-forum-and-media-thread-message-params-object */
export interface ForumAndMediaThreadMessage {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
  /** IDs of up to 3 stickers in the server to send in the message */
  stickerIds?: BigString[];
  /** Attachment objects with `filename` and `description` */
  attachments?: Pick<DiscordAttachment, 'filename' | 'description' | 'id'>[];
  /**
   * Message flags combined as a bitfield, only SUPPRESS_EMBEDS, SUPPRESS_NOTIFICATIONS and IS_COMPONENTS_V2 can be set
   *
   * @see {@link MessageFlags}
   */
  flags?: number;
}

/** https://discord.com/developers/docs/resources/channel#get-thread-member-query-string-params */
export interface GetThreadMember {
  /** Whether to include a guild member object for the thread member */
  withMember?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#list-thread-members-query-string-params */
export interface ListThreadMembers {
  /** Whether to include a guild member object for the thread member */
  withMember?: boolean;
  /** Get thread members after this user ID */
  after?: BigString;
  /** Max number of thread members to return (1-100). Defaults to 100. */
  limit?: BigString;
}

/**
 * - https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params
 * - https://discord.com/developers/docs/resources/channel#list-private-archived-threads-query-string-params
 * - https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads-query-string-params
 */
export interface ListArchivedThreads {
  /** Returns threads before this timestamp */
  before?: number;
  /** Optional maximum number of threads to return */
  limit?: number;
}
