import { ChannelTypes } from "../../types/mod.ts";
import { Permission } from "./permission.ts";

/**
 * Update a channel's settings.
 * Requires the MANAGE_CHANNELS permission for the guild.
 * Returns a channel on success, and a 400 BAD REQUEST on invalid parameters.
 * Fires a Channel Update Gateway event. If modifying a category, individual Channel Update events will fire for each child channel that also changes.
 */
export interface ModifyChannelOptions {
  /** 2-100 character channel name */
  name?: string;
  /** the type of channel; only conversion between text and news is supported and only in guilds with the "NEWS" feature */
  type?: ChannelTypes;
  /** the position of the channel in the left-hand listing */
  position?: number | null;
  /** 0-1024 character channel topic */
  topic?: string | null;
  /** whether the channel is nsfw */
  nsfw?: boolean | null;
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNELS`, are unaffected */
  slowmode?: number | null;
  /** the bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers) */
  bitrate?: number | null;
  /** the user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit */
  userLimit?: number | null;
  /** channel or category-specific permissions */
  overwrites?: Overwrite[] | null;
  /** id of the new parent category for a channel */
  parentID?: string | null;
}

export interface Overwrite {
  /** the role or user id */
  id: string;
  /** whether this is a role or a member */
  type: OverwriteType;
  /** the permissions that this id is allowed */
  allow: Permission[];
  /** the permissions that this id is denied */
  deny: Permission[];
}

export enum OverwriteType {
  ROLE,
  MEMBER,
}
