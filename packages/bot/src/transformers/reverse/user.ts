import type { DiscordCollectibles, DiscordNameplate } from '@discordeno/types';
import type { Bot } from '../../bot.js';
import type { Collectibles, Nameplate } from '../types.js';

export function transformCollectiblesToDiscordCollectibles(
  bot: Bot,
  payload: typeof bot.transformers.$inferredTypes.collectibles,
): DiscordCollectibles {
  const _payload = payload as Partial<Collectibles>;

  return {
    nameplate: _payload.nameplate ? bot.transformers.reverse.nameplate(bot, _payload.nameplate) : undefined,
  };
}

export function transformNameplateToDiscordNameplate(bot: Bot, payload: typeof bot.transformers.$inferredTypes.nameplate): DiscordNameplate {
  const _payload = payload as Partial<Nameplate>;

  return {
    asset: _payload.asset ? bot.transformers.reverse.snowflake(_payload.asset) : undefined!,
    sku_id: _payload.skuId ? bot.transformers.reverse.snowflake(_payload.skuId) : undefined!,
    label: _payload.label!,
    palette: _payload.palette!,
  };
}
