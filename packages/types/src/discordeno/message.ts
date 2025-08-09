/** Types for: https://discord.com/developers/docs/resources/message */

import type {
  AllowedMentionsTypes,
  DiscordAttachment,
  DiscordEmbed,
  DiscordMessageReferenceType,
  DiscordReactionType,
  MessageFlags,
} from '../discord/message.js'
import type { BigString, Camelize } from '../shared.js'
import type { MessageComponents } from './components.js'
import type { CreatePoll } from './poll.js'
import type { FileContent } from './reference.js'

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[]
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean
  /** Array of role_ids to mention (Max size of 100) */
  roles?: bigint[]
  /** Array of user_ids to mention (Max size of 100) */
  users?: bigint[]
}

// This needs the prefix Discordeno to avoid conflicts with the @discordeno/bot types.
/** https://discord.com/developers/docs/resources/message#message-reference-structure */
export interface DiscordenoMessageReference {
  /** Type of reference */
  type?: DiscordMessageReferenceType
  /** id of the originating message */
  messageId?: BigString
  /**
   * id of the originating message's channel
   * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
   */
  channelId?: BigString
  /** id of the originating message's guild */
  guildId?: BigString
  /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  failIfNotExists?: boolean
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesLimit {
  /** Max number of messages to return (1-100) default 50 */
  limit?: number
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAround extends GetMessagesLimit {
  /** Get messages around this message id */
  around?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesBefore extends GetMessagesLimit {
  /** Get messages before this message id */
  before?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAfter extends GetMessagesLimit {
  /** Get messages after this message id */
  after?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export type GetMessagesOptions = GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit

/** https://discord.com/developers/docs/resources/message#create-message-jsonform-params */
export interface CreateMessageOptions {
  /** The message contents (up to 2000 characters) */
  content?: string
  /** Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
  nonce?: string | number
  /** true if this is a TTS message */
  tts?: boolean
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** Include to make your message a reply or a forward */
  messageReference?: DiscordenoMessageReference
  /** The components you would like to have sent in this message */
  components?: MessageComponents
  /** IDs of up to 3 stickers in the server to send in the message */
  stickerIds?: [BigString] | [BigString, BigString] | [BigString, BigString, BigString]
  /** The contents of the files being sent */
  files?: FileContent[]
  /** Attachment objects with filename and description */
  attachments?: Pick<DiscordAttachment, 'filename' | 'description' | 'id'>[]
  /** Message flags combined as a bitfield, only SUPPRESS_EMBEDS, SUPPRESS_NOTIFICATIONS, IS_VOICE_MESSAGE, and IS_COMPONENTS_V2 can be set */
  flags?: MessageFlags
  /** If true and nonce is present, it will be checked for uniqueness in the past few minutes. If another message was created by the same author with the same nonce, that message will be returned and no new message will be created. */
  enforceNonce?: boolean
  /** A poll object */
  poll?: CreatePoll
}

/** https://discord.com/developers/docs/resources/message#get-reactions-query-string-params */
export interface GetReactions {
  /** The type of reaction */
  type: DiscordReactionType
  /** Get users after this user Id */
  after?: string
  /** Max number of users to return (1-100) */
  limit?: number
}

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[] | null
  /** Edit the flags of the message (only `SUPPRESS_EMBEDS` can currently be set/unset) */
  flags?: MessageFlags | null
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions | null
  /** The components you would like to have sent in this message */
  components?: MessageComponents
  /** The contents of the files being sent/edited */
  files?: FileContent[]
  /** When specified (adding new attachments), attachments which are not provided in this list will be removed. */
  attachments?: Pick<DiscordAttachment, 'filename' | 'description' | 'id'>[]
}

/** https://discord.com/developers/docs/resources/message#get-channel-pins-query-string-params */
export interface GetChannelPinsOptions {
  /** Get messages pinned before this timestamp */
  before?: string
  /** Max number of pins to return (1-50), defaults to 50 */
  limit?: number
}
