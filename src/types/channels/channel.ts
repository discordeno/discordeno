import { User } from "../users/user.ts";
import { ChannelTypes } from "./channelTypes.ts";
import { Overwrite } from "./overwrite.ts";
import { ThreadMember } from "./threads/threadMember.ts";
import { ThreadMetadata } from "./threads/threadMetadata.ts";
import { VideoQualityModes } from "./videoQualityModes.ts";

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface Channel {
  /** The id of the channel */
  id: string;
  /** The type of channel */
  type: ChannelTypes;
  /** The id of the guild */
  guildId?: string;
  /** Sorting position of the channel */
  position?: number;
  /** Explicit permission overwrites for members and roles */
  permissionOverwrites?: Overwrite[];
  /** The name of the channel (1-100 characters) */
  name?: string;
  /** The channel topic (0-1024 characters) */
  topic?: string | null;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  lastMessageId?: string | null;
  /** The bitrate (in bits) of the voice channel */
  bitrate?: number;
  /** The user limit of the voice channel */
  userLimit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number;
  /** The recipients of the DM */
  recipients?: User[];
  /** Id of the creator of the group DM or thread */
  ownerId?: string;
  /** Application id of the group DM creator if it is bot-created */
  applicationId?: string;
  /** For guild channels: Id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created */
  parentId?: string | null;
  /** When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  lastPinTimestamp?: string | null;
  /** Voice region id for the voice channel, automatic when set to null */
  rtcRegion?: string | null;
  /** The camera video quality mode of the voice channel, 1 when not present */
  videoQualityMode?: VideoQualityModes;
  // TODO(threads): consider a ThreadChannel object
  /** An approximate count of messages in a thread, stops counting at 50 */
  messageCount?: number;
  /** An approximate count of users in a thread, stops counting at 50 */
  memberCount?: number;
  /** Thread-specifig fields not needed by other channels */
  threadMetadata?: ThreadMetadata;
  /** Thread member object for the current user, if they have joined the thread, only included on certain API endpoints */
  member?: ThreadMember;
  /** Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  defaultAutoArchiveDuration?: number;
  /** computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a application command interaction */
  permissions?: string;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
  /** timestamp when the thread was created; only populated for threads created after 2022-01-09 */
  createTimestamp?: string;
}
