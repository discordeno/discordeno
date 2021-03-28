import { DiscordEmbedAuthor } from "./embed_author.ts";
import { DiscordEmbedField } from "./embed_field.ts";
import { DiscordEmbedFooter } from "./embed_footer.ts";
import { DiscordEmbedImage } from "./embed_image.ts";
import { DiscordEmbedProvider } from "./embed_provider.ts";
import { DiscordEmbedThumbnail } from "./embed_thumbnail.ts";
import { DiscordEmbedTypes } from "./embed_types.ts";
import { DiscordEmbedVideo } from "./embed_video.ts";

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface DiscordEmbed {
  /** Title of embed */
  title?: string;
  /** Type of embed (always "rich" for webhook embeds) */
  type?: DiscordEmbedTypes;
  /** Description of embed */
  description?: string;
  /** Url of embed */
  url?: string;
  /** Timestamp of embed content */
  timestamp?: string;
  /** Color code of the embed */
  color?: string;
  /** Footer information */
  footer?: DiscordEmbedFooter;
  /** Image information */
  image?: DiscordEmbedImage;
  /** Thumbnail information */
  thumbnail?: DiscordEmbedThumbnail;
  /** Video information */
  video?: DiscordEmbedVideo;
  /** Provider information */
  provider?: DiscordEmbedProvider;
  /** Author information */
  author?: DiscordEmbedAuthor;
  /** Fields information */
  fields?: DiscordEmbedField[];
}
