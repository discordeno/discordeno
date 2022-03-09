import { DiscordUser } from "../discord.ts";
import type { StickerFormatTypes } from "./stickerFormatTypes.ts";
import type { StickerTypes } from "./stickerTypes.ts";

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface Sticker {
  /** [Id of the sticker](https://discord.com/developers/docs/reference#image-formatting) */
  id: string;
  /** Id of the pack the sticker is from */
  packId?: string;
  /** Name of the sticker */
  name: string;
  /** Description of the sticker */
  description: string;
  /** a unicode emoji representing the sticker's expression */
  tags: string;
  /** [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types) */
  type: StickerTypes;
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  formatType: StickerFormatTypes;
  /**  Whether or not the sticker is available */
  available?: boolean;
  /** Id of the guild that owns this sticker */
  guildId?: string;
  /** The user that uploaded the sticker */
  user?: DiscordUser;
  /** A sticker's sort order within a pack */
  sortValue?: number;
}
