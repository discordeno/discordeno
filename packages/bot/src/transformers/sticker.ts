import type { DiscordSticker, DiscordStickerPack } from '@discordeno/types'
import type { InternalBot, Sticker, StickerPack } from '../index.js'

export function transformSticker(bot: InternalBot, payload: DiscordSticker): typeof bot.transformers.$inferredTypes.sticker {
  const props = bot.transformers.desiredProperties.sticker
  const sticker = {} as Sticker

  if (props.id && payload.id) sticker.id = bot.transformers.snowflake(payload.id)
  if (props.packId && payload.pack_id) sticker.packId = bot.transformers.snowflake(payload.pack_id)
  if (props.name && payload.name) sticker.name = payload.name
  if (props.description && payload.description) sticker.description = payload.description
  if (props.tags && payload.tags) sticker.tags = payload.tags
  if (props.type && payload.type) sticker.type = payload.type
  if (props.formatType && payload.format_type) sticker.formatType = payload.format_type
  if (props.available && payload.available) sticker.available = payload.available
  if (props.guildId && payload.guild_id) sticker.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.user && payload.user) sticker.user = bot.transformers.user(bot, payload.user)
  if (props.sortValue && payload.sort_value !== undefined) sticker.sortValue = payload.sort_value

  return bot.transformers.customizers.sticker(bot, payload, sticker)
}

export function transformStickerPack(bot: InternalBot, payload: DiscordStickerPack): StickerPack {
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
