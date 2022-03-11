import { Overwrite, OverwriteReadable } from "../discordeno.ts";
import { ChannelTypes, VideoQualityModes } from "../shared.ts";

export interface ModifyChannel {
  /** 1-100 character channel name */
  name?: string;
  /** The type of channel; only conversion between text and news is supported and only in guilds with the "NEWS" feature */
  type?: ChannelTypes;
  /** The position of the channel in the left-hand listing */
  position?: number | null;
  /** 0-1024 character channel topic */
  topic?: string | null;
  /** Whether the channel is nsfw */
  nsfw?: boolean | null;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number | null;
  /** The bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers) */
  bitrate?: number | null;
  /** The user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit */
  userLimit?: number | null;
  /** Channel or category-specific permissions */
  permissionOverwrites?: OverwriteReadable[] | null;
  /** Id of the new parent category for a channel */
  parentId?: bigint | null;
  /** Voice region id for the voice channel, automatic when set to null */
  rtcRegion?: string | null;
  /** The camera video quality mode of the voice channel */
  videoQualityMode?: VideoQualityModes;
  /** Whether the thread is archived */
  archived?: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
}
