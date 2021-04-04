import { SnakeCaseProps } from "../util.ts";
import { DiscordMessageStickerFormatTypes } from "./message_sticker_format_types.ts";

export interface MessageSticker {
  /** id of the sticker */
  id: string;
  /** id of the pack the sticker is from */
  pack_id: string;
  /** Name of the sticker */
  name: string;
  /** Description of the sticker */
  description: string;
  /** A comma-separated list of tags for the sticker */
  tags?: string;
  /**
   * Sticker asset hash
   * Note: The URL for fetching sticker assets is currently private.
   */
  asset: string;
  /**
   * Sticker preview asset hash
   * Note: The URL for fetching sticker assets is currently private.
   */
  previewAsset?: string | null;
  /** Type of sticker format */
  formatType: DiscordMessageStickerFormatTypes;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure */
export type DiscordMessageSticker = SnakeCaseProps<MessageSticker>;
