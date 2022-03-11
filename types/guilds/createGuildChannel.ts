import { OverwriteReadable } from "../discordeno.ts";
import { ChannelTypes } from "../shared.ts";

export interface CreateGuildChannel {
  /** Channel name (1-100 characters) */
  name: string;
  /** The type of channel */
  type?: ChannelTypes;
  /** Channel topic (0-1024 characters) */
  topic?: string;
  /** The bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number;
  /** The user limit of the voice channel (voice only) */
  userLimit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number;
  /** Sorting position of the channel */
  position?: number;
  /** The channel's permission overwrites */
  permissionOverwrites?: OverwriteReadable[];
  /** Id of the parent category for a channel */
  parentId?: bigint;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
}
