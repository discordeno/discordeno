import type { DiscordSticker, DiscordStickerPack } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Sticker, StickerPack } from './types.js';

export function transformSticker(bot: Bot, payload: Partial<DiscordSticker>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.sticker;
  const sticker = {} as SetupDesiredProps<Sticker, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) sticker.id = bot.transformers.snowflake(payload.id);
  if (props.packId && payload.pack_id) sticker.packId = bot.transformers.snowflake(payload.pack_id);
  if (props.name && payload.name) sticker.name = payload.name;
  if (props.description && payload.description) sticker.description = payload.description;
  if (props.tags && payload.tags) sticker.tags = payload.tags;
  if (props.type && payload.type) sticker.type = payload.type;
  if (props.formatType && payload.format_type) sticker.formatType = payload.format_type;
  if (props.available && payload.available) sticker.available = payload.available;
  if (props.guildId && payload.guild_id) sticker.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.user && payload.user) sticker.user = bot.transformers.user(bot, payload.user);
  if (props.sortValue && payload.sort_value !== undefined) sticker.sortValue = payload.sort_value;

  return callCustomizer('sticker', bot, payload, sticker, {
    partial: extra?.partial ?? false,
  });
}

export function transformStickerPack(bot: Bot, payload: Partial<DiscordStickerPack>, extra?: { partial?: boolean }) {
  const stickerPack = {} as SetupDesiredProps<StickerPack, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id) stickerPack.id = bot.transformers.snowflake(payload.id);
  if (payload.stickers) stickerPack.stickers = payload.stickers.map((sticker) => bot.transformers.sticker(bot, sticker));
  if (payload.name) stickerPack.name = payload.name;
  if (payload.sku_id) stickerPack.skuId = bot.transformers.snowflake(payload.sku_id);
  if (payload.cover_sticker_id) stickerPack.coverStickerId = bot.transformers.snowflake(payload.cover_sticker_id);
  if (payload.description) stickerPack.description = payload.description;
  if (payload.banner_asset_id) stickerPack.bannerAssetId = bot.transformers.snowflake(payload.banner_asset_id);

  return callCustomizer('stickerPack', bot, payload, stickerPack, {
    partial: extra?.partial ?? false,
  });
}
