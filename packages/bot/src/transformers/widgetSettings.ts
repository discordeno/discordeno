import type { DiscordGuildWidgetSettings } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { GuildWidgetSettings } from './types.js';

export function transformGuildWidgetSettings(bot: Bot, payload: Partial<DiscordGuildWidgetSettings>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.guildWidgetSettings;
  const guildWidgetSettings = {} as SetupDesiredProps<GuildWidgetSettings, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.enabled && payload.enabled !== undefined) guildWidgetSettings.enabled = payload.enabled;
  if (props.channelId && payload.channel_id) guildWidgetSettings.channelId = payload.channel_id;

  return callCustomizer('guildWidgetSettings', bot, payload, guildWidgetSettings, {
    partial: extra?.partial ?? false,
  });
}
