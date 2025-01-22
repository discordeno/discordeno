/** Types for: https://discord.com/developers/docs/resources/sticker */

import type { DiscordUser } from './users.js'

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface DiscordSticker {
  /** [Id of the sticker](https://discord.com/developers/docs/reference#image-formatting) */
  id: string
  /** Id of the pack the sticker is from */
  pack_id?: string
  /** Name of the sticker */
  name: string
  /** Description of the sticker */
  description: string
  /** a unicode emoji representing the sticker's expression */
  tags: string
  /** [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types) */
  type: StickerTypes
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  format_type: StickerFormatTypes
  /**  Whether or not the sticker is available */
  available?: boolean
  /** Id of the guild that owns this sticker */
  guild_id?: string
  /** The user that uploaded the sticker */
  user?: DiscordUser
  /** A sticker's sort order within a pack */
  sort_value?: number
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types */
export enum StickerTypes {
  /** an official sticker in a pack */
  Standard = 1,
  /** a sticker uploaded to a guild for the guild's members */
  Guild,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types */
export enum StickerFormatTypes {
  Png = 1,
  APng,
  Lottie,
  Gif,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure */
export interface DiscordStickerItem {
  /** Id of the sticker */
  id: string
  /** Name of the sticker */
  name: string
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  format_type: StickerFormatTypes
}

/** https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure */
export interface DiscordStickerPack {
  /** id of the sticker pack */
  id: string
  /** the stickers in the pack */
  stickers: DiscordSticker[]
  /** name of the sticker pack */
  name: string
  /** id of the pack's SKU */
  sku_id: string
  /** id of a sticker in the pack which is shown as the pack's icon */
  cover_sticker_id?: string
  /** description of the sticker pack */
  description: string
  /** id of the sticker pack's [banner image](https://discord.com/developers/docs/reference#image-formatting) */
  banner_asset_id?: string
}
