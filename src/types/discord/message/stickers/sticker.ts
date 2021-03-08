import { DiscordMessageStickerFormatTypes } from "./type.ts";

export interface DiscordMessageSticker {
  /** id of the sticker */
  id: string;
  /** id of the pack the sticker is from */
  // deno-lint-ignore camelcase
  pack_id: string;
  /** name of the sticker */
  name: string;
  /** description of the sticker */
  description: string;
  /** a comma-separated list of tags for the sticker */
  tags?: string;
  /** sticker asset hash */
  asset: string;
  /** sticker preview asset hash */
  // deno-lint-ignore camelcase
  preview_asset: string | null;
  /** type of sticker format */
  // deno-lint-ignore camelcase
  format_type: DiscordMessageStickerFormatTypes;
}
