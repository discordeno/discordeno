import { DiscordMessageStickerFormatTypes } from "./message_sticker_format_types.ts";

/** https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure */
export interface MessageSticker {
  /** id of the sticker */
  id: string;
  /** id of the pack the sticker is from */
  packId: string;
  /** Name of the sticker */
  name: string;
  /** Description of the sticker */
  description: string;
  /** For guild stickers, a unicode emoji representing the sticker's expression. For Nitro stickers, a comma-separated list of related expressions */
  tags?: string;
  /**
   * Sticker asset hash
   * Note: The URL for fetching sticker assets is currently private.
   */
  asset: string;
  /** Type of sticker format */
  formatType: DiscordMessageStickerFormatTypes;
}
