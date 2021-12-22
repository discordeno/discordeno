import { Sticker } from "./sticker.ts";

/** https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure */
export interface StickerPack {
  /** id of the sticker pack */
  id: bigint;
  /** the stickers in the pack */
  stickers: Sticker[];
  /** name of the sticker pack */
  name: string;
  /** id of the pack's SKU */
  sku_id: bigint;
  /** id of a sticker in the pack which is shown as the pack's icon */
  cover_sticker_id?: bigint;
  /** description of the sticker pack */
  description: string;
  /** id of the sticker pack's [banner image](https://discord.com/developers/docs/reference#image-formatting) */
  banner_asset_id?: bigint;
}
