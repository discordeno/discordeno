import type {
  Camelize,
  DiscordSticker,
  DiscordStickerPack
} from '@discordeno/types'
import { s1nakelize1User } from './member.js'

export function s1nakelize1Sticker (payload: Camelize<DiscordSticker>): DiscordSticker {
  return {
    id: payload.id,
    name: payload.name,
    tags: payload.tags,
    type: payload.type,
    available: payload.available,
    description: payload.description,

    pack_id: payload.packId,
    guild_id: payload.guildId,
    sort_value: payload.sortValue,
    format_type: payload.formatType,

    user: payload.user && s1nakelize1User(payload.user)
  }
}

export function s1nakelize1StickerPack (payload: Camelize<DiscordStickerPack>): DiscordStickerPack {
  return {
    id: payload.id,
    name: payload.name,
    description: payload.description,

    sku_id: payload.skuId,
    banner_asset_id: payload.bannerAssetId,
    cover_sticker_id: payload.coverStickerId,

    stickers: payload.stickers.map((sticker) => s1nakelize1Sticker(sticker)),
  }
}
