import { Raw_Overwrite, Overwrite } from './guild.ts'
import { Embed } from './message.ts'

export interface Base_Channel_Create {
  /** The id of this channel */
  id: string
  /** The type of the channel */
  type: Channel_Type
  /** The id of the guild */
  guild_id?: string
  /** Sorting position of the channel */
  position?: number
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

export interface Channel_Create_Payload extends Base_Channel_Create {
  /** Explicit permission overwrites for members and roles */
  permission_overwrites?: Raw_Overwrite[]
}

export interface Channel_Create_Options extends Base_Channel_Create {
  /** Explicit permission overwrites for members and roles */
  permission_overwrites?: Overwrite[]
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

export interface MessageContent {
  /** The message contents, up to 2000 characters */
  content?: string
  /** A nonce that can be used for optimistic message sending. */
  nonce?: number | string
  /** Whether this is a TextToSpeech message */
  tts?: boolean
  /** The contents of the file being sent */
  file?: File_Content
  /** Embed object */
  embed?: Embed
  /** JSON encoded body of any additional request fields. */
  payload_json?: string
}

export interface Get_Messages {
  /** Max number of messages to return(1-100). Defaults to 50. */
  limit?: number
}

export interface Get_Messages_After extends Get_Messages {
  /** Get messages after this message id */
  after: string
}

export interface Get_Messages_Before extends Get_Messages {
  /** Get messages before this message id */
  before: string
}

export interface Get_Messages_Around extends Get_Messages {
  /** Get messages around this message id. */
  around: string
}

export interface Create_Invite_Options {
  /** Duration of invite in seconds before expiry, or 0 for never. Defaults to 86400 (24 hours) */
  max_age: number
  /** Max number of uses or 0 for unlimited. Default 0 */
  max_uses: number
  /** Whether this invite only grants temporary membership. */
  temporary: boolean
  /** If true, don't try to reuse a similar invite (useful for creating many unique one time use invites.) */
  unique: boolean
}

