import {
  DiscordSticker,
  DiscordStickerPack,
  Optionalize
} from '@discordeno/types'
import { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformSticker (client: Client, payload: DiscordSticker) {
  const sticker = {
    id: client.utils.snowflakeToBigint(payload.id),
    packId: payload.pack_id
      ? client.utils.snowflakeToBigint(payload.pack_id)
      : undefined,
    name: payload.name,
    description: payload.description,
    tags: payload.tags,
    type: payload.type,
    formatType: payload.format_type,
    available: payload.available,
    guildId: payload.guild_id
      ? client.utils.snowflakeToBigint(payload.guild_id)
      : undefined,
    user: payload.user
      ? client.transformers.user(client, payload.user)
      : undefined,
    sortValue: payload.sort_value
  }

  return sticker as Optionalize<typeof sticker>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformStickerPack (
  client: Client,
  payload: DiscordStickerPack
) {
  const pack = {
    id: client.transformers.snowflake(payload.id),
    stickers: payload.stickers.map((sticker) =>
      client.transformers.sticker(client, sticker)
    ),
    name: payload.name,
    skuId: client.transformers.snowflake(payload.sku_id),
    coverStickerId: payload.cover_sticker_id
      ? client.transformers.snowflake(payload.cover_sticker_id)
      : undefined,
    description: payload.description,
    bannerAssetId: payload.banner_asset_id
      ? client.transformers.snowflake(payload.banner_asset_id)
      : undefined
  }

  return pack as Optionalize<typeof pack>
}

export interface Sticker extends ReturnType<typeof transformSticker> {}
export interface StickerPack extends ReturnType<typeof transformStickerPack> {}
