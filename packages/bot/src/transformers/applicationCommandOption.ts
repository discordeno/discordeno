import type { DiscordApplicationCommandOption } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { ApplicationCommandOption } from './types.js';

export function transformApplicationCommandOption(bot: Bot, payload: Partial<DiscordApplicationCommandOption>, extra?: { partial?: boolean }) {
  const applicationCommandOption = {} as SetupDesiredProps<ApplicationCommandOption, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.type !== undefined) applicationCommandOption.type = payload.type;
  if (payload.name) applicationCommandOption.name = payload.name;
  if (payload.name_localizations) applicationCommandOption.nameLocalizations = payload.name_localizations;
  if (payload.description) applicationCommandOption.description = payload.description;
  if (payload.description_localizations) applicationCommandOption.descriptionLocalizations = payload.description_localizations;
  if (payload.required !== undefined) applicationCommandOption.required = payload.required;
  if (payload.choices)
    applicationCommandOption.choices = payload.choices.map((choice) => bot.transformers.applicationCommandOptionChoice(bot, choice));
  if (payload.autocomplete !== undefined) applicationCommandOption.autocomplete = payload.autocomplete;
  if (payload.channel_types) applicationCommandOption.channelTypes = payload.channel_types;
  if (payload.min_value !== undefined) applicationCommandOption.minValue = payload.min_value;
  if (payload.max_value !== undefined) applicationCommandOption.maxValue = payload.max_value;
  if (payload.min_length !== undefined) applicationCommandOption.minLength = payload.min_length;
  if (payload.max_length !== undefined) applicationCommandOption.maxLength = payload.max_length;
  if (payload.options) applicationCommandOption.options = payload.options.map((option) => bot.transformers.applicationCommandOption(bot, option));
  if (payload.file_types) applicationCommandOption.fileTypes = payload.file_types;

  return callCustomizer('applicationCommandOption', bot, payload, applicationCommandOption, {
    partial: extra?.partial ?? false,
  });
}
