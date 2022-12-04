import {
  DiscordSticker,
  DiscordStickerPack,
  Optionalize
} from '@discordeno/types'
import { snowflakeToBigint } from '@discordeno/utils'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformSticker (rest: RestManager, payload: DiscordSticker) {
  const sticker = {
    id: snowflakeToBigint(payload.id),
    packId: payload.pack_id ? snowflakeToBigint(payload.pack_id) : undefined,
    name: payload.name,
    description: payload.description,
    tags: payload.tags,
    type: payload.type,
    formatType: payload.format_type,
    available: payload.available,
    guildId: payload.guild_id ? snowflakeToBigint(payload.guild_id) : undefined,
    user: payload.user ? rest.transformers.user(rest, payload.user) : undefined,
    sortValue: payload.sort_value
  }

  return sticker as Optionalize<typeof sticker>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformStickerPack (
  rest: RestManager,
  payload: DiscordStickerPack
) {
  const pack = {
    id: rest.transformers.snowflake(payload.id),
    stickers: payload.stickers.map((sticker) =>
      rest.transformers.sticker(rest, sticker)
    ),
    name: payload.name,
    skuId: rest.transformers.snowflake(payload.sku_id),
    coverStickerId: payload.cover_sticker_id
      ? rest.transformers.snowflake(payload.cover_sticker_id)
      : undefined,
    description: payload.description,
    bannerAssetId: payload.banner_asset_id
      ? rest.transformers.snowflake(payload.banner_asset_id)
      : undefined
  }

  return pack as Optionalize<typeof pack>
}

export interface Sticker extends ReturnType<typeof transformSticker> {}
export interface StickerPack extends ReturnType<typeof transformStickerPack> {}
