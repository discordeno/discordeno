import { DiscordMessageStickerFormatTypes } from "./message_sticker_format_types.ts";

/** https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure */
export interface DiscordMessageSticker {
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
  preview_asset?: string | null;
  /** Type of sticker format */
  format_type: DiscordMessageStickerFormatTypes;
}
