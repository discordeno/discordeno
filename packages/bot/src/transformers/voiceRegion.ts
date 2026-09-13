import type { DiscordVoiceRegion } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { VoiceRegion } from './types.js';

export function transformVoiceRegion(bot: Bot, payload: Partial<DiscordVoiceRegion>, extra?: { partial?: boolean }) {
  const voiceRegion = {} as SetupDesiredProps<VoiceRegion, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id) voiceRegion.id = payload.id;
  if (payload.name) voiceRegion.name = payload.name;
  if (payload.optimal !== undefined) voiceRegion.optimal = payload.optimal;
  if (payload.deprecated !== undefined) voiceRegion.deprecated = payload.deprecated;
  if (payload.custom !== undefined) voiceRegion.custom = payload.custom;

  return callCustomizer('voiceRegion', bot, payload, voiceRegion, {
    partial: extra?.partial ?? false,
  });
}
