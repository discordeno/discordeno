import type { DiscordAvatarDecorationData } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import { callCustomizer } from '../transformers.js';
import type { AvatarDecorationData } from './types.js';

export function transformAvatarDecorationData(bot: Bot, payload: Partial<DiscordAvatarDecorationData>, extra?: { partial?: boolean }) {
  const data = {} as AvatarDecorationData;
  const props = bot.transformers.desiredProperties.avatarDecorationData;

  if (props.asset && payload.asset) data.asset = iconHashToBigInt(payload.asset);
  if (props.skuId && payload.sku_id) data.skuId = bot.transformers.snowflake(payload.sku_id);

  return callCustomizer('avatarDecorationData', bot, payload, data, {
    partial: extra?.partial ?? false,
  });
}
