import { Bot } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformEmbed(bot: Bot, payload: SnakeCasedPropertiesDeep<Embed>): DiscordenoEmbed {
  return {
    title: payload.title,
    type: payload.type,
    description: payload.description,
    url: payload.url,
    timestamp: payload.timestamp ? Date.parse(payload.timestamp) : undefined,
    color: payload.color,
    footer: payload.footer
      ? {
        text: payload.footer.text,
        iconUrl: payload.footer.icon_url,
        proxyIconUrl: payload.footer.proxy_icon_url,
      }
      : undefined,
    image: payload.image
      ? {
        url: payload.image.url,
        proxyUrl: payload.image.proxy_url,
        height: payload.image.height,
        width: payload.image.width,
      }
      : undefined,
    thumbnail: payload.thumbnail
      ? {
        url: payload.thumbnail.url,
        proxyUrl: payload.thumbnail.proxy_url,
        height: payload.thumbnail.height,
        width: payload.thumbnail.width,
      }
      : undefined,
    video: payload.video
      ? {
        url: payload.video.url,
        proxyUrl: payload.video.proxy_url,
        height: payload.video.height,
        width: payload.video.width,
      }
      : undefined,
    provider: payload.provider,
    author: payload.author
      ? {
        name: payload.author.name,
        url: payload.author.url,
        iconUrl: payload.author.icon_url,
        proxyIconUrl: payload.author.proxy_icon_url,
      }
      : undefined,
    fields: payload.fields,
  };
}

export interface DiscordenoEmbed {
  /** Title of embed */
  title?: string;
  /** Type of embed (always "rich" for webhook embeds) */
  type?: EmbedTypes;
  /** Description of embed */
  description?: string;
  /** Url of embed */
  url?: string;
  /** Timestamp of embed content */
  timestamp?: number;
  /** Color code of the embed */
  color?: number;
  /** Footer information */
  footer?: {
    /** Footer text */
    text: string;
    /** Url of footer icon (only supports http(s) and attachments) */
    iconUrl?: string;
    /** A proxied url of footer icon */
    proxyIconUrl?: string;
  };
  /** Image information */
  image?: {
    /** Source url of image (only supports http(s) and attachments) */
    url?: string;
    /** A proxied url of the image */
    proxyUrl?: string;
    /** Height of image */
    height?: number;
    /** Width of image */
    width?: number;
  };
  /** Thumbnail information */
  thumbnail?: {
    /** Source url of thumbnail (only supports http(s) and attachments) */
    url?: string;
    /** A proxied url of the thumbnail */
    proxyUrl?: string;
    /** Height of thumbnail */
    height?: number;
    /** Width of thumbnail */
    width?: number;
  };
  /** Video information */
  video?: {
    /** Source url of video */
    url?: string;
    /** A proxied url of the video */
    proxyUrl?: string;
    /** Height of video */
    height?: number;
    /** Width of video */
    width?: number;
  };
  /** Provider information */
  provider?: {
    /** Name of provider */
    name?: string;
    /** Url of provider */
    url?: string;
  };
  /** Author information */
  author?: {
    /** Name of author */
    name?: string;
    /** Url of author */
    url?: string;
    /** Url of author icon (only supports http(s) and attachments) */
    iconUrl?: string;
    /** A proxied url of author icon */
    proxyIconUrl?: string;
  };
  /** Fields information */
  fields?: {
    /** Name of the field */
    name: string;
    /** Value of the field */
    value: string;
    /** Whether or not this field should display inline */
    inline?: boolean;
  }[];
}
