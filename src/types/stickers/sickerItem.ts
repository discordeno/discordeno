import { StickerFormatTypes } from "./stickerFormatTypes.ts";

/** https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure */
export interface StickerItem {
  /** Id of the sticker */
  id: bigint;
  /** Name of the sticker */
  name: string;
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  formatType: StickerFormatTypes;
}
