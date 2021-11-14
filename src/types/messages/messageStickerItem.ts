import { MessageStickerFormatTypes } from "./messageStickerFormatTypes.ts";

export interface MessageStickerItem {
  /** Id of the sticker */
  id: string;
  /** Name of the sticker */
  name: string;
  /** Type of sticker format */
  formatType: MessageStickerFormatTypes;
}
