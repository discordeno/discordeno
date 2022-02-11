import { EmbedAuthor } from "./embedAuthor.ts";
import { EmbedField } from "./embedField.ts";
import { EmbedFooter } from "./embedFooter.ts";
import { EmbedImage } from "./embedImage.ts";
import { EmbedProvider } from "./embedProvider.ts";
import { EmbedThumbnail } from "./embedThumbnail.ts";
import { EmbedTypes } from "./embedTypes.ts";
import { EmbedVideo } from "./embedVideo.ts";

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface Embed {
  /** Title of embed */
  title?: string;
  /** Type of embed (always "rich" for webhook embeds) */
  type?: EmbedTypes;
  /** Description of embed */
  description?: string;
  /** Url of embed */
  url?: string;
  /** Timestamp of embed content */
  timestamp?: string;
  /** Color code of the embed */
  color?: number;
  /** Footer information */
  footer?: EmbedFooter;
  /** Image information */
  image?: EmbedImage;
  /** Thumbnail information */
  thumbnail?: EmbedThumbnail;
  /** Video information */
  video?: EmbedVideo;
  /** Provider information */
  provider?: EmbedProvider;
  /** Author information */
  author?: EmbedAuthor;
  /** Fields information */
  fields?: EmbedField[];
}
