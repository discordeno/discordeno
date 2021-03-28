import { DiscordChannelTypes } from "./channel_types.ts";
import { DiscordOverwrite } from "./overwrite.ts";

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface DiscordChannel {
  /** The id of the channel */
  id: string;
  /** The type of channel */
  type: DiscordChannelTypes;
  /** The id of the guild */
  guild_id?: string;
  /** Sorting position of the channel */
  position?: number;
  /** Explicit permission overwrites for members and roles */
  permission_overwrites?: DiscordOverwrite[];
  /** The name of the channel (2-100 characters) */
  name?: string;
  /** The channel topic (0-1024 characters) */
  topic?: string | null;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  last_message_id?: string | null;
  /** The bitrate (in bits) of the voice channel */
  bitrate?: number;
  /** The user limit of the voice channel */
  user_limit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rate_limit_per_user?: number;
  /** The recipients of the DM */
  recipients?: DiscordUser[];
  /** Icon hash */
  icon?: string | null;
  /** id of the DM creator */
  owner_id?: string;
  /** Application id of the group DM creator if it is bot-created */
  application_id?: string;
  /** id of the parent category for a channel (each parent category can contain up to 50 channels) */
  parent_id?: string | null;
  /** When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  last_pin_timestamp?: string | null;
}
