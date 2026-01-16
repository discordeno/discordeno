import type { Camelize, DiscordApplicationCommandOptionChoice } from '@discordeno/types';
import type { Bot } from '../../bot.js';
import type { ApplicationCommandOptionChoice } from '../types.js';

export function transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice(
  _bot: Bot,
  payload: ApplicationCommandOptionChoice | Camelize<DiscordApplicationCommandOptionChoice>,
): DiscordApplicationCommandOptionChoice {
  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    value: payload.value,
  };
}
