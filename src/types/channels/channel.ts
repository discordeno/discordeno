import { User } from "../users/user.ts";
import { SnakeCaseProps } from "../util.ts";
import { DiscordChannelTypes } from "./channel_types.ts";
import { Overwrite } from "./overwrite.ts";

export interface Channel {
  /** The id of the channel */
  id: string;
  /** The type of channel */
  type: DiscordChannelTypes;
  /** The id of the guild */
  guildId?: string;
  /** Sorting position of the channel */
  position?: number;
  /** Explicit permission overwrites for members and roles */
  permissionOverwrites?: Overwrite[];
  /** The name of the channel (2-100 characters) */
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
  /** Icon hash */
  icon?: string | null;
  /** id of the DM creator */
  ownerId?: string;
  /** Application id of the group DM creator if it is bot-created */
  applicationId?: string;
  /** id of the parent category for a channel (each parent category can contain up to 50 channels) */
  parentId?: string | null;
  /** When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  lastPinTimestamp?: string | null;
}

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface DiscordChannel
  extends SnakeCaseProps<Omit<Channel, "permissionOverwrites">> {
  permission_overwrites?: DiscordOverwrite[];
}
