/** Types for: https://docs.discord.com/developers/resources/message */

import type {
  AllowedMentionsTypes,
  DiscordAttachment,
  DiscordEmbed,
  DiscordMessageReferenceType,
  DiscordReactionType,
  MessageFlags,
} from '../discord/message.js';
import type { BigString, Camelize } from '../shared.js';
import type { MessageComponents } from './components.js';
import type { CreatePoll } from './poll.js';
import type { FileContent } from './reference.js';

// This needs the prefix Discordeno to avoid conflicts with the @discordeno/bot types.
/** https://docs.discord.com/developers/resources/message#message-reference-structure */
export interface DiscordenoMessageReference {
  /** Type of reference */
  type?: DiscordMessageReferenceType;
  /** id of the originating message */
  messageId?: BigString;
  /**
   * id of the originating message's channel
   * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
   */
  channelId?: BigString;
  /** id of the originating message's guild */
  guildId?: BigString;
  /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  failIfNotExists?: boolean;
}

/** https://docs.discord.com/developers/resources/message#allowed-mentions-object-default-settings-for-allowed-mentions */
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean;
  /** Array of role_ids to mention (Max size of 100) */
  roles?: bigint[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: bigint[];
}

/** https://docs.discord.com/developers/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesLimit {
  /** Max number of messages to return (1-100) default 50 */
  limit?: number;
}

/** https://docs.discord.com/developers/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAround extends GetMessagesLimit {
  /** Get messages around this message id */
  around?: BigString;
}

/** https://docs.discord.com/developers/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesBefore extends GetMessagesLimit {
  /** Get messages before this message id */
  before?: BigString;
}

/** https://docs.discord.com/developers/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAfter extends GetMessagesLimit {
  /** Get messages after this message id */
  after?: BigString;
}

/** https://docs.discord.com/developers/resources/channel#get-channel-messages-query-string-params */
export type GetMessagesOptions = GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit;

/** https://docs.discord.com/developers/resources/message#search-guild-messages-query-string-params */
export enum SearchGuildMessagesAuthorType {
  /** Return messages sent by user accounts */
  User = 'user',
  /** Return messages sent by bot accounts */
  Bot = 'bot',
  /** Return messages sent by webhooks */
  Webhook = 'webhook',
  /** Exclude messages sent by user accounts */
  ExcludeUser = '-user',
  /** Exclude messages sent by bot accounts */
  ExcludeBot = '-bot',
  /** Exclude messages sent by webhooks */
  ExcludeWebhook = '-webhook',
}

/** https://docs.discord.com/developers/resources/message#search-guild-messages-query-string-params */
export enum SearchGuildMessagesHas {
  /** Return messages that have an image */
  Image = 'image',
  /** Return messages that have a sound attachment */
  Sound = 'sound',
  /** Return messages that have a video */
  Video = 'video',
  /** Return messages that have an attachment */
  File = 'file',
  /** Return messages that have a sent sticker */
  Sticker = 'sticker',
  /** Return messages that have an embed */
  Embed = 'embed',
  /** Return messages that have a link */
  Link = 'link',
  /** Return messages that have a poll */
  Poll = 'poll',
  /** Return messages that have a forwarded message */
  Snapshot = 'snapshot',
  /** Exclude messages that have an image */
  ExcludeImage = '-image',
  /** Exclude messages that have a sound attachment */
  ExcludeSound = '-sound',
  /** Exclude messages that have a video */
  ExcludeVideo = '-video',
  /** Exclude messages that have an attachment */
  ExcludeFile = '-file',
  /** Exclude messages that have a sent sticker */
  ExcludeSticker = '-sticker',
  /** Exclude messages that have an embed */
  ExcludeEmbed = '-embed',
  /** Exclude messages that have a link */
  ExcludeLink = '-link',
  /** Exclude messages that have a poll */
  ExcludePoll = '-poll',
  /** Exclude messages that have a forwarded message */
  ExcludeSnapshot = '-snapshot',
}

/** https://docs.discord.com/developers/resources/message#search-guild-messages-query-string-params */
export enum SearchGuildMessagesEmbedType {
  /** Return messages that have an image embed */
  Image = 'image',
  /** Return messages that have a video embed */
  Video = 'video',
  /** Return messages that have a gifv embed */
  Gif = 'gif',
  /** Return messages that have a sound embed */
  Sound = 'sound',
  /** Return messages that have an article embed */
  Article = 'article',
}

/** https://docs.discord.com/developers/resources/message#search-guild-messages-query-string-params */
export enum SearchGuildMessagesSortBy {
  /** Sort by message creation time (default) */
  Timestamp = 'timestamp',
  /** Sort by relevance to the search query */
  Relevance = 'relevance',
}

/** https://docs.discord.com/developers/resources/message#search-guild-messages-query-string-params */
export interface SearchGuildMessagesOptions {
  /** Max number of messages to return (1-25, default 25) */
  limit?: number;
  /** Number to offset the returned messages by (max 9975) */
  offset?: number;
  /** Get messages before this message ID */
  maxId?: BigString;
  /** Get messages after this message ID */
  minId?: BigString;
  /** Max number of words to skip between matching tokens in the search content (max 100, default 2) */
  slop?: number;
  /** Filter messages by content (max 1024 characters) */
  content?: string;
  /** Filter messages by these channels (max 500) */
  channelId?: BigString[];
  /** Filter messages by author type */
  authorType?: SearchGuildMessagesAuthorType[];
  /** Filter messages by these authors (max 100) */
  authorId?: BigString[];
  /** Filter messages that mention these users (max 100) */
  mentions?: BigString[];
  /** Filter messages that mention these roles (max 100) */
  mentionsRoleId?: BigString[];
  /** Filter messages by whether they do or do not mention @everyone */
  mentionEveryone?: boolean;
  /** Filter messages that reply to these users (max 100) */
  repliedToUserId?: BigString[];
  /** Filter messages that reply to these messages (max 100) */
  repliedToMessageId?: BigString[];
  /** Filter messages by whether they are or are not pinned */
  pinned?: boolean;
  /** Filter messages by whether they have or do not have specific things */
  has?: SearchGuildMessagesHas[];
  /** Filter messages by embed type */
  embedType?: SearchGuildMessagesEmbedType[];
  /** Filter messages by embed provider (case-sensitive, max 256 characters, max 100) */
  embedProvider?: string[];
  /** Filter messages by link hostname (max 256 characters, max 100) */
  linkHostname?: string[];
  /** Filter messages by attachment filename (max 1024 characters, max 100) */
  attachmentFilename?: string[];
  /** Filter messages by attachment extension (max 256 characters, max 100) */
  attachmentExtension?: string[];
  /** The sorting algorithm to use */
  sortBy?: SearchGuildMessagesSortBy;
  /** The direction to sort (default desc); ignored when sorting by relevance */
  sortOrder?: 'asc' | 'desc';
  /** Whether to include results from age-restricted channels (default false) */
  includeNsfw?: boolean;
}

/** https://docs.discord.com/developers/resources/message#create-message-jsonform-params */
export interface CreateMessageOptions {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
  nonce?: string | number;
  /** true if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** Include to make your message a reply or a forward */
  messageReference?: DiscordenoMessageReference;
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
  /** IDs of up to 3 stickers in the server to send in the message */
  stickerIds?: BigString[];
  /** The contents of the files being sent */
  files?: FileContent[];
  /** Attachment objects with filename and description */
  attachments?: Pick<DiscordAttachment, 'filename' | 'description' | 'id'>[];
  /**
   * Message flags combined as a bitfield
   *
   * @readonly
   * Only SUPPRESS_EMBEDS, SUPPRESS_NOTIFICATIONS, IS_VOICE_MESSAGE, and IS_COMPONENTS_V2 can be set
   *
   * @see {@link MessageFlags}
   */
  flags?: number;
  /** If true and nonce is present, it will be checked for uniqueness in the past few minutes. If another message was created by the same author with the same nonce, that message will be returned and no new message will be created. */
  enforceNonce?: boolean;
  /** A poll object */
  poll?: CreatePoll;
}

/** https://docs.discord.com/developers/resources/message#get-reactions-query-string-params */
export interface GetReactions {
  /** The type of reaction */
  type?: DiscordReactionType;
  /** Get users after this user Id */
  after?: string;
  /** Max number of users to return (1-100) */
  limit?: number;
}

/** https://docs.discord.com/developers/resources/channel#edit-message-json-params */
export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[] | null;
  /**
   * Edit the flags of the message
   *
   * @remarks
   * Only `SUPPRESS_EMBEDS` and `IS_COMPONENT_V2`, only `SUPPRESS_EMBEDS` can be unset, both can be set
   *
   * @see {@link MessageFlags}
   */
  flags?: number | null;
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions | null;
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
  /** The contents of the files being sent/edited */
  files?: FileContent[];
  /** When specified (adding new attachments), attachments which are not provided in this list will be removed. */
  attachments?: Pick<DiscordAttachment, 'filename' | 'description' | 'id'>[];
}

/** https://docs.discord.com/developers/resources/message#get-channel-pins-query-string-params */
export interface GetChannelPinsOptions {
  /** Get messages pinned before this timestamp */
  before?: string;
  /** Max number of pins to return (1-50), defaults to 50 */
  limit?: number;
}
