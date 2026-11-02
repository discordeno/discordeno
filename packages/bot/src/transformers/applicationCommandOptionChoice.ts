import type { DiscordApplicationCommandOptionChoice } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { ApplicationCommandOptionChoice } from './types.js';

export function transformApplicationCommandOptionChoice(
  bot: Bot,
  payload: Partial<DiscordApplicationCommandOptionChoice>,
  extra?: { partial?: boolean },
) {
  const applicationCommandOptionChoice = {} as SetupDesiredProps<
    ApplicationCommandOptionChoice,
    TransformersDesiredProperties,
    DesiredPropertiesBehavior
  >;

  if (payload.name) applicationCommandOptionChoice.name = payload.name;
  if (payload.name_localizations) applicationCommandOptionChoice.nameLocalizations = payload.name_localizations;
  if (payload.value !== undefined) applicationCommandOptionChoice.value = payload.value;

  return callCustomizer('applicationCommandOptionChoice', bot, payload, applicationCommandOptionChoice, {
    partial: extra?.partial ?? false,
  });
}
