import { Raw_Overwrite } from './guild'

export interface Channel_Create_Options {
  /** The id of this channel */
  id: string
  /** The type of the channel */
  type: Channel_Type
  /** The id of the guild */
  guild_id?: string
  /** Sorting position of the channel */
  position?: number
  /** Explicit permission overwrites for members and roles */
  permission_overwrites?: Raw_Overwrite[]
  /** The name of the channel (2-100 characters) */
	name?: string
	/** The channel topic (0-1024 characters) */
	topic?: string
	/** Whether the channel is nsfw */
	nsfw?: boolean
	/** The id of the last message sent in this channel (may not point to an existing or valid message) */
	last_message_id?: string | null
	/** The bitrate (in bits) of the voice channel */
	bitrate?: number
	/** The user limit of the voice channel */
	user_limit?: number
	/** Amount of seconds a user has to wait before sending another message (0-21600) Bots and users with the permission MANAGE_MESSAGES or MANAGE_CHANNEL are unaffected. */
	rate_limit_per_user?: number
	/** The parent category id */
	parent_id?: string | null
	/** When the last pinned message was pinned */
	last_pin_timestamp?: string
}

export type Channel_Type = 0 | 1 | 2 | 4 | 5 | 6

export enum Channel_Types {
  /** A text channel within a server */
  GUILD_TEXT,
  /** A direct message between users */
  DM,
  /** A voice channel within a server */
  GUILD_VOICE,
  /** A direct message between multiple users. */
  GROUP_DM,
  /** An organizational category that contains channels */
  GUILD_CATEGORY,
  /** A channel that users can follow and crosspost into their own server. */
  GUILD_NEWS,
  /** A channel in which game developers can sell their game on Discord. */
  GUILD_STORE
}
