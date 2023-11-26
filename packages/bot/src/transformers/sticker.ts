import type { DiscordSticker, DiscordStickerPack, StickerFormatTypes, StickerTypes } from '@discordeno/types'
import { checkIfExists, type Bot, type User } from '../index.js'

export function transformSticker(bot: Bot, payload: DiscordSticker): Sticker {
  const props = bot.transformers.desiredProperties.sticker
  const sticker = {} as Sticker

  if (props.id && checkIfExists(payload.id)) sticker.id = bot.transformers.snowflake(payload.id)
  if (props.packId && checkIfExists(payload.pack_id)) sticker.packId = bot.transformers.snowflake(payload.pack_id)
  if (props.name && checkIfExists(payload.name)) sticker.name = payload.name
  if (props.description && checkIfExists(payload.description)) sticker.description = payload.description
  if (props.tags && checkIfExists(payload.tags)) sticker.tags = payload.tags
  if (props.type && checkIfExists(payload.type)) sticker.type = payload.type
  if (props.formatType && checkIfExists(payload.format_type)) sticker.formatType = payload.format_type
  if (props.available && checkIfExists(payload.available)) sticker.available = payload.available
  if (props.guildId && checkIfExists(payload.guild_id)) sticker.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.user && checkIfExists(payload.user)) sticker.user = bot.transformers.user(bot, payload.user)
  if (props.sortValue && checkIfExists(payload.sort_value)) sticker.sortValue = payload.sort_value

  return bot.transformers.customizers.sticker(bot, payload, sticker)
}

export function transformStickerPack(bot: Bot, payload: DiscordStickerPack): StickerPack {
  const pack = {
    id: bot.transformers.snowflake(payload.id),
    stickers: payload.stickers.map((sticker) => bot.transformers.sticker(bot, sticker)),
    name: payload.name,
    skuId: bot.transformers.snowflake(payload.sku_id),
    coverStickerId: payload.cover_sticker_id ? bot.transformers.snowflake(payload.cover_sticker_id) : undefined,
    description: payload.description,
    bannerAssetId: payload.banner_asset_id ? bot.transformers.snowflake(payload.banner_asset_id) : undefined,
  } as StickerPack

  return bot.transformers.customizers.stickerPack(bot, payload, pack)
}

export interface Sticker {
  /** [Id of the sticker](https://discord.com/developers/docs/reference#image-formatting) */
  id: bigint
  /** Id of the pack the sticker is from */
  packId?: bigint
  /** Name of the sticker */
  name: string
  /** Description of the sticker */
  description: string
  /** a unicode emoji representing the sticker's expression */
  tags: string
  /** [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types) */
  type: StickerTypes
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  formatType: StickerFormatTypes
  /**  Whether or not the sticker is available */
  available?: boolean
  /** Id of the guild that owns this sticker */
  guildId?: bigint
  /** The user that uploaded the sticker */
  user?: User
  /** A sticker's sort order within a pack */
  sortValue?: number
}
export interface StickerPack {
  coverStickerId?: bigint
  bannerAssetId?: bigint
  id: bigint
  name: string
  description: string
  stickers: Sticker[]
  skuId: bigint
}
