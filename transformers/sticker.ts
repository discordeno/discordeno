import { Bot } from "../bot.ts";
import { DiscordSticker, DiscordStickerPack } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformSticker(bot: Bot, payload: DiscordSticker) {
  const sticker = {
    id: bot.utils.snowflakeToBigint(payload.id),
    packId: payload.pack_id ? bot.utils.snowflakeToBigint(payload.pack_id) : undefined,
    name: payload.name,
    description: payload.description,
    tags: payload.tags,
    type: payload.type,
    formatType: payload.format_type,
    available: payload.available,
    guildId: payload.guild_id ? bot.utils.snowflakeToBigint(payload.guild_id) : undefined,
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    sortValue: payload.sort_value,
  };

  return sticker as Optionalize<typeof sticker>;
}

export function transformStickerPack(bot: Bot, payload: DiscordStickerPack) {
  const pack = {
    id: bot.transformers.snowflake(payload.id),
    stickers: payload.stickers.map((sticker) => bot.transformers.sticker(bot, sticker)),
    name: payload.name,
    skuId: bot.transformers.snowflake(payload.sku_id),
    coverStickerId: payload.cover_sticker_id ? bot.transformers.snowflake(payload.cover_sticker_id) : undefined,
    description: payload.description,
    bannerAssetId: payload.banner_asset_id ? bot.transformers.snowflake(payload.banner_asset_id) : undefined,
  };

  return pack as Optionalize<typeof pack>;
}

export interface Sticker extends ReturnType<typeof transformSticker> {}
export interface StickerPack extends ReturnType<typeof transformStickerPack> {}
