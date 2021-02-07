/** https://discord.com/developers/docs/resources/channel#embed-object-embed-structure */
export interface DiscordEmbedPayload {
  /** title of embed */
  title?: string;
  /** type of embed (always "rich" for webhook embeds) */
  type?: string;
  /** description of embed */
  description?: string;
  /** url of embed */
  url?: string;
  /** timestamp of embed content */
  timestamp?: string;
  /** color code of the embed */
  color?: number;
  /** footer information */
  footer?: DiscordEmbedFooterPayload;
  /** image information */
  image?: DiscordEmbedImagePayload;
  /** thumbnail information */
  thumbnail?: DiscordEmbedThumbnailPayload;
  /** video information */
  video?: DiscordEmbedVideoPayload;
  /** provider information */
  provider?: DiscordEmbedProviderPayload;
  /** author information */
  author?: DiscordEmbedAuthorPayload;
  /** fields information */
  fields?: DiscordEmbedFieldPayload[];
}

/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-types
 * @deprecated
 */
export type EmbedTypes =
  | "rich"
  | "image"
  | "video"
  | "gifv"
  | "article"
  | "link";

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface DiscordEmbedThumbnailPayload {
  /** source url of thumbnail (only supports http(s) and attachments) */
  url?: string;
  /** a proxied url of the thumbnail */
  proxy_url?: string;
  /** height of thumbnail */
  height?: number;
  /** width of thumbnail */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface DiscordEmbedVideoPayload {
  /** source url of video */
  url?: string;
  /** height of video */
  height?: number;
  /** width of video */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface DiscordEmbedImagePayload {
  /** source url of image (only supports http(s) and attachments) */
  url?: string;
  /** a proxied url of the image */
  proxy_url?: string;
  /** height of image */
  height?: number;
  /** width of image */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure */
export interface DiscordEmbedProviderPayload {
  /** name of provider */
  name?: string;
  /** url of provider */
  url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface DiscordEmbedAuthorPayload {
  /** name of author */
  name?: string;
  /** url of author */
  url?: string;
  /** url of author icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** a proxied url of author icon */
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface DiscordEmbedFooterPayload {
  /** footer text */
  text: string;
  /** url of footer icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** a proxied url of footer icon */
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface DiscordEmbedFieldPayload {
  /** name of the field */
  name: string;
  /** value of the field */
  value: string;
  /** whether or not this field should display inline */
  inline?: boolean;
}
