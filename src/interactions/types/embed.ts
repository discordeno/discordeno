export interface Embed {
  /** The title of the embed */
  title?: string;
  /** The type of embed (always rich for webhook embeds) */
  type?: string;
  /** The description of embeds */
  description?: string;
  /** The url of embed */
  url?: string;
  /** The timestamp of the embed content */
  timestamp?: string;
  /** The color code of the embed */
  color?: number;
  /** The footer information */
  footer?: EmbedFooter;
  /** The image information */
  image?: EmbedImage;
  /** The thumbnail information */
  thumbnail?: EmbedThumbnail;
  /** The video information */
  video?: EmbedVideo;
  /** Provider information */
  provider?: EmbedProvider;
  /** Author information */
  author?: EmbedAuthor;
  /** Fields information */
  fields?: EmbedField[];
}

export interface EmbedFooter {
  /** The text of the footer */
  text: string;
  /** The url of the footer icon. Only supports http(s) and attachments */
  icon_url?: string;
  /** A proxied url of footer icon */
  proxy_icon_url?: string;
}

export interface EmbedImage {
  /** The source url of image (only supports http(s) and attachments) */
  url?: string;
  /** A proxied url of the image */
  proxy_url?: string;
  /** The height of image */
  height?: number;
  /** The width of the image */
  width?: number;
}

export interface EmbedThumbnail {
  /** The source url of image (only supports http(s) and attachments) */
  url?: string;
  /** A proxied url of the thumbnail */
  proxy_url?: string;
  /** The height of the thumbnail */
  height?: number;
  /** The width of the thumbnail */
  width?: number;
}

export interface EmbedVideo {
  /** The source url of video */
  url?: string;
  /** The height of the video */
  height?: number;
  /** The width of the video */
  width?: number;
}

export interface EmbedProvider {
  /** The name of the provider */
  name?: string;
  /** The url of the provider */
  url?: string;
}

export interface EmbedAuthor {
  /** The name of the author */
  name?: string;
  /** The url of the author */
  url?: string;
  /** The url of the author icon (supports http(s) and attachments) */
  icon_url?: string;
  /** A proxied url of author icon */
  proxy_icon_url?: string;
}

export interface EmbedField {
  /** The name of the field */
  name: string;
  /** The value of the field */
  value: string;
  /** Whether or not this field should display inline */
  inline?: boolean;
}
