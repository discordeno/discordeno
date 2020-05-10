import { Raw_Overwrite, Overwrite } from "./guild.ts";
import { Embed } from "./message.ts";

export interface ChannelEditOptions {
  /** 2-100 character channel name. All */
  name?: string;
  /**	the position of the channel in the left-hand listing	All  */
  position?: number;
  /** 0-1024 character channel topic. Text */
  topic?: string;
  /** whether the channel is nsfw	Text */
  nsfw?: boolean;
  /**	amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected	Text  */
  rate_limit_per_user?: number;
  /**	the bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers)	Voice  */
  bitrate?: number;
  /**	the user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit	Voice  */
  user_limit?: number;
  /** channel or category-specific permissions	All */
  permission_overwrites?: Overwrite[];
  /** id of the new parent category for a channel	Text, Voice */
  parent_id?: string;
}

export interface Base_Channel_Create {
  /** The id of the guild */
  guild_id?: string;
  /** Sorting position of the channel */
  position?: number;
  /** The name of the channel (2-100 characters) */
  name?: string;
  /** The channel topic (0-1024 characters) */
  topic?: string;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  last_message_id?: string | null;
  /** The bitrate (in bits) of the voice channel */
  bitrate?: number;
  /** The user limit of the voice channel */
  user_limit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600) Bots and users with the permission MANAGE_MESSAGES or MANAGE_CHANNEL are unaffected. */
  rate_limit_per_user?: number;
  /** The parent category id */
  parent_id?: string | null;
  /** When the last pinned message was pinned */
  last_pin_timestamp?: string;
}

export interface ChannelCreatePayload extends Base_Channel_Create {
  /** The id of this channel */
  id: string;
  /** The type of the channel */
  type: Channel_Type;
  /** Explicit permission overwrites for members and roles */
  permission_overwrites?: Raw_Overwrite[];
}

export interface CreateChannelOptions extends Base_Channel_Create {
  /** The type of the channel */
  type: ChannelTypes;
  /** Explicit permission overwrites for members and roles */
  permission_overwrites?: Overwrite[];
}

export type Channel_Type = 0 | 1 | 2 | 4 | 5 | 6;

export enum ChannelTypes {
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
  GUILD_STORE,
}

// export interface File_Content {

// }

export interface MessageContent {
  /** The message contents, up to 2000 characters */
  content?: string;
  /** A nonce that can be used for optimistic message sending. */
  nonce?: number | string;
  /** Whether this is a TextToSpeech message */
  tts?: boolean;
  // file?: File_Content
  /** The contents of the file being sent */
  file?: unknown;
  /** Embed object */
  embed?: Embed;
  /** JSON encoded body of any additional request fields. */
  payload_json?: string;
}

export interface GetMessages {
  /** Max number of messages to return(1-100). Defaults to 50. */
  limit?: number;
}

export interface GetMessagesAfter extends GetMessages {
  /** Get messages after this message id */
  after: string;
}

export interface GetMessagesBefore extends GetMessages {
  /** Get messages before this message id */
  before: string;
}

export interface GetMessagesAround extends GetMessages {
  /** Get messages around this message id. */
  around: string;
}

export interface CreateInviteOptions {
  /** Duration of invite in seconds before expiry, or 0 for never. Defaults to 86400 (24 hours) */
  max_age: number;
  /** Max number of uses or 0 for unlimited. Default 0 */
  max_uses: number;
  /** Whether this invite only grants temporary membership. */
  temporary: boolean;
  /** If true, don't try to reuse a similar invite (useful for creating many unique one time use invites.) */
  unique: boolean;
}
