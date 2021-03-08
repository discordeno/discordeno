import { DiscordEmbedAuthor } from "./author.ts";
import { DiscordEmbedField } from "./field.ts";
import { DiscordEmbedFooter } from "./footer.ts";
import { DiscordEmbedImage } from "./image.ts";
import { DiscordEmbedProvider } from "./provider.ts";
import { DiscordEmbedThumbnail } from "./thumbnail.ts";
import { DiscordEmbedVideo } from "./video.ts";

export interface DiscordEmbed {
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
  footer?: DiscordEmbedFooter;
  /** image information */
  image?: DiscordEmbedImage;
  /** thumbnail information */
  thumbnail?: DiscordEmbedThumbnail;
  /** video information */
  video?: DiscordEmbedVideo;
  /** provider information */
  provider?: DiscordEmbedProvider;
  /** author information */
  author?: DiscordEmbedAuthor;
  /** fields information */
  fields?: DiscordEmbedField[];
}
