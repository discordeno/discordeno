import type { DiscordApplicationCommandOptionChoice } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { ApplicationCommandOptionChoice } from './types.js';

export function transformApplicationCommandOptionChoice(bot: Bot, payload: DiscordApplicationCommandOptionChoice): ApplicationCommandOptionChoice {
  const applicationCommandOptionChoice = {
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    value: payload.value,
  } as ApplicationCommandOptionChoice;

  return bot.transformers.customizers.applicationCommandOptionChoice(bot, payload, applicationCommandOptionChoice);
}
