import type {
  Camelize,
  DiscordSticker,
  DiscordStickerPack
} from '@discordeno/types'
import { c1amelize1User } from './member.js'

export function c1amelize1Sticker (
  payload: DiscordSticker
): Camelize<DiscordSticker> {
  return {
    id: payload.id,
    packId: payload.pack_id,
    name: payload.name,
    description: payload.description,
    tags: payload.tags,
    type: payload.type,
    formatType: payload.format_type,
    available: payload.available,
    guildId: payload.guild_id,
    user: payload.user && c1amelize1User(payload.user),
    sortValue: payload.sort_value
  }
}

export function c1amelize1StickerPack (
  payload: DiscordStickerPack
): Camelize<DiscordStickerPack> {
  return {
    id: payload.id,
    stickers: payload.stickers.map((sticker) => c1amelize1Sticker(sticker)),
    name: payload.name,
    skuId: payload.sku_id,
    coverStickerId: payload.cover_sticker_id,
    description: payload.description,
    bannerAssetId: payload.banner_asset_id
  }
}
