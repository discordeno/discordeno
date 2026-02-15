/** Types for: https://docs.discord.com/developers/resources/sticker */

import type { DiscordUser } from './user.js';

/** https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-structure */
export interface DiscordSticker {
  /** [Id of the sticker](https://docs.discord.com/developers/reference#image-formatting) */
  id: string;
  /** Id of the pack the sticker is from */
  pack_id?: string;
  /** Name of the sticker */
  name: string;
  /** Description of the sticker */
  description: string | null;
  /**
   * Autocomplete/suggestion tags for the sticker
   * @remarks
   * Max 200 characters
   * A comma separated list of keywords is the format used in this field by standard stickers, but this is just a convention. Incidentally the client will always use a name generated from an emoji as the value of this field when creating or modifying a guild sticker.
   */
  tags: string;
  /** [type of sticker](https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-types) */
  type: StickerTypes;
  /** [Type of sticker format](https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-format-types) */
  format_type: StickerFormatTypes;
  /**  Whether or not the sticker is available */
  available?: boolean;
  /** Id of the guild that owns this sticker */
  guild_id?: string;
  /** The user that uploaded the sticker */
  user?: DiscordUser;
  /** A sticker's sort order within a pack */
  sort_value?: number;
}

/** https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-types */
export enum StickerTypes {
  /** an official sticker in a pack */
  Standard = 1,
  /** a sticker uploaded to a guild for the guild's members */
  Guild,
}

/** https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-format-types */
export enum StickerFormatTypes {
  Png = 1,
  APng,
  Lottie,
  Gif,
}

/** https://docs.discord.com/developers/resources/sticker#sticker-item-object-sticker-item-structure */
export interface DiscordStickerItem {
  /** Id of the sticker */
  id: string;
  /** Name of the sticker */
  name: string;
  /** [Type of sticker format](https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-format-types) */
  format_type: StickerFormatTypes;
}

/** https://docs.discord.com/developers/resources/sticker#sticker-pack-object-sticker-pack-structure */
export interface DiscordStickerPack {
  /** id of the sticker pack */
  id: string;
  /** the stickers in the pack */
  stickers: DiscordSticker[];
  /** name of the sticker pack */
  name: string;
  /** id of the pack's SKU */
  sku_id: string;
  /** id of a sticker in the pack which is shown as the pack's icon */
  cover_sticker_id?: string;
  /** description of the sticker pack */
  description: string;
  /** id of the sticker pack's [banner image](https://docs.discord.com/developers/reference#image-formatting) */
  banner_asset_id?: string;
}
