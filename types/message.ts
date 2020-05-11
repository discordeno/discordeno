import { ChannelType, UserPayload } from "./guild.ts";
import { User } from "../structures/user.ts";
import { Member, MemberCreatePayload } from "./member.ts";
import { Channel } from "../structures/channel.ts";

export interface MentionedUser extends User {
  member: Member;
}

export interface Mentioned_Channel {
  /** The id of the channel */
  id: string;
  /** The id of the guild containing the channel */
  guild_id: string;
  /** The type of the channel. */
  type: ChannelType;
  /** The name of the channel. */
  name: string;
}

export interface Attachment {
  /** Attachment id */
  id: string;
  /** The name of the file attached */
  filename: string;
  /** The size of file in bytes */
  size: number;
  /** Source url of file */
  url: string;
  /** A proxied url of file */
  proxy_url: string;
  /** The height of file if an image */
  height: number | null;
  /** The width of the file if an image */
  width: number | null;
}

export interface Embed {
  /** The title of the embed */
  title?: string;
  /** The type of embed (always rich for webhook embeds) */
  type?: string;
  /** The description of embeds */
  description?: string;
  /** The url of embed */
  url?: string;
  /** The timestap of the embed content */
  timestamp?: string;
  /** The color code of the embed */
  color?: number;
  /** The footer information */
  footer?: Embed_Footer;
  /** The image information */
  image?: Embed_Image;
  /** The thumbnail information */
  thumbnail?: Embed_Thumbnail;
  /** The video information */
  video?: Embed_Video;
  /** Provider information */
  provider?: Embed_Provider;
  /** Author information */
  author?: Embed_Author;
  /** Fields information */
  fields?: Embed_Field[];
}

export interface Embed_Footer {
  /** The text of the footer */
  text: string;
  /** The url of the footer icon. Only supports http(s) and attachments */
  iconURL?: string;
  /** A proxied url of footer icon */
  proxy_icon_url?: string;
}

export interface Embed_Image {
  /** The source url of image (only supports http(s) and attachments) */
  url?: string;
  /** A proxied url of the image */
  proxy_url?: string;
  /** The height of image */
  height?: number;
  /** The width of the image */
  width?: number;
}

export interface Embed_Thumbnail {
  /** The source url of image (only supports http(s) and attachments) */
  url?: string;
  /** A proxied url of the thumbnail */
  proxy_url?: string;
  /** The height of the thumbnail */
  height?: number;
  /** The width of the thumbnail */
  width?: number;
}

export interface Embed_Video {
  /** The source url of video */
  url?: string;
  /** The height of the video */
  height?: number;
  /** The width of the video */
  width?: number;
}

export interface Embed_Provider {
  /** The name of the provider */
  name?: string;
  /** The url of the provider */
  url?: string;
}

export interface Embed_Author {
  /** The name of the author */
  name?: string;
  /** The url of the author */
  url?: string;
  /** The url of the author icon (supports http(s) and attachments) */
  icon_url?: string;
  /** A proxied url of author icon */
  proxy_icon_url?: string;
}

export interface Embed_Field {
  /** The name of the field */
  name: string;
  /** The value of the field */
  value: string;
  /** Whether or not this field should display inline */
  inline?: boolean;
}

export interface Reaction {
  /** The times this emoji has been used to react */
  count: number;
  /** Whether the current user reacted using this emoji */
  me: boolean;
  /** The emoji information. Can be partial. */
  emoji: Emoji;
}

export enum Message_Types {
  DEFAULT,
  RECIPIENT_ADD,
  RECIPIENT_REMOVE,
  CALL,
  CHANNEL_NAME_CHANGE,
  CHANNEL_ICON_CHANGE,
  CHANNEL_PINNED_MESSAGE,
  GUILD_MEMBER_JOIN,
  USER_PREMIUM_GUILD_SUBSCRIPTION,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3,
  CHANNEL_FOLLOW_ADD,
}

export enum Activity_Types {
  JOIN = 1,
  SPECTATE,
  LISTEN,
  JOIN_REQUEST = 5,
}

export interface Activity {
  /** The type of message activity */
  type: 1 | 2 | 3 | 5;
  /** The party id from a rich presence event */
  party_id?: string;
}

export interface Application {
  /** The id of the application */
  id: string;
  /** The id of the embed's image asset */
  cover_image?: string;
  /** The application's description */
  description: string;
  /** The id of the application's icon */
  icon: string | null;
  /** The name of the application */
  name: string;
}

export interface Reference {
  /** The id of the originating message */
  message_id?: string;
  /** The id of the originating message's channel */
  channel_id: string;
  /** The id of the originating message's guild */
  guild_id?: string;
}

export enum Message_Flags {
  CROSSPOSTED = 1 << 0,
  IS_CROSSPOST = 1 << 1,
  SUPPRESS_EMBEDS = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT = 1 << 4,
}

export interface Emoji {
  /** The emoji id. */
  id?: string;
  /** The emoji name. Null in reaction emoji object if emoji is no longer on the server */
  name: string | null;
  /** The roles this emoji is whitelisted to */
  roles?: string[];
  /** The user that created this emoji */
  user?: User;
  /** Whether this emoji must be wrapped in colons */
  require_colons?: boolean;
  /** Whether this emoji is managed */
  managed?: boolean;
  /** Whether this emoji is animated */
  animated?: boolean;
}

export interface Reaction_Payload {
  /** The id of the reaction. Null usually if it is a default discord emoji. */
  id: string | null;
  /** The name of the reaction. Null if it was deleted from the guild and the custom data is no longer available */
  name: string | null;
  /** If the reaction is an animated emoji. */
  animated?: boolean;
}

export interface MessageCreateOptions {
  /** The id of the message */
  id: string;
  /** The id of the channel the message was sent in */
  channel_id: string;
  /** The id of the guild the message was sent in */
  guild_id?: string;
  /** The author of this message (not guaranteed to be a valid user such as a webhook.) */
  author: UserPayload;
  /** The member properties for this message's author. Can be partial. */
  member?: Member;
  /** The contents of the message */
  content: string;
  /** When this message was sent */
  timestamp: string;
  /** When this message was edited (if it was not edited, null) */
  edited_timestamp: string | null;
  /** Whether this was a TextToSpeech message. */
  tts: boolean;
  /** Whether this message mentions everyone */
  mentions_everyone: boolean;
  /** Users specifically mentioned in the message. */
  mentions: MentionedUser[];
  /** Roles specifically mentioned in this message */
  mention_roles: string[];
  /** Channels specifically mentioned in this message */
  mention_channels?: Mentioned_Channel[];
  /** Any attached files */
  attachments: Attachment[];
  /** Any embedded content */
  embeds: Embed[];
  /** Reactions to the message */
  reactions?: Reaction[];
  /** Used for validating a message was sent */
  nonce?: number | string;
  /** Whether this message is pinned */
  pinned: boolean;
  /** If the message is generated by a webhook, this is the webhooks id */
  webhook_id?: string;
  /** The type of message */
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** The activities sent with Rich Presence-related chat embeds. */
  activity?: Activity;
  /** Applications that sent with Rich Presence related chat embeds. */
  applications?: Application;
  /** The reference data sent with crossposted messages */
  message_reference?: Reference;
  /** The message flags combined like permission bits describe extra features of the message */
  flags?: 1 | 2 | 4 | 8 | 16;
}

export interface Base_Message_Delete_Payload {
  /** The id of the channel */
  channel_id: string;
  /** The id of the guild */
  guild_id?: string;
}

export interface MessageDeletePayload extends Base_Message_Delete_Payload {
  /** The id of the message */
  id: string;
}

export interface MessageDeleteBulkPayload extends Base_Message_Delete_Payload {
  /** The ids of the messages */
  ids: string[];
}

export interface MessageUpdatePayload {
  /** The message id */
  id: string;
  /** The channel id */
  channel_id: string;
}

export interface BaseMessageReactionPayload {
  /** The id of the channel */
  channel_id: string;
  /** The id of the message */
  message_id: string;
  /** The id of the guild */
  guild_id?: string;
}

export interface MessageReactionPayload extends BaseMessageReactionPayload {
  /** The id of the user */
  user_id: string;
  /** The member who reacted if this happened in a guild. Not available for MESSAGE_REACTION_REMOVE */
  member?: MemberCreatePayload;
  /** The emoji used to react */
  emoji: Reaction_Payload;
}

export interface MessageReactionRemoveEmojiPayload
  extends BaseMessageReactionPayload {
  /** The emoji that was removed. */
  emoji: Reaction_Payload;
}

export interface Partial_Message {
  id: string;
  channel: Channel;
}
