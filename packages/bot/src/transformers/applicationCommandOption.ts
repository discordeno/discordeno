import type { DiscordApplicationCommandOption } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { ApplicationCommandOption } from './types.js';

export function transformApplicationCommandOption(bot: Bot, payload: Partial<DiscordApplicationCommandOption>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.applicationCommandOption;
  const applicationCommandOption = {} as SetupDesiredProps<ApplicationCommandOption, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type !== undefined) applicationCommandOption.type = payload.type;
  if (props.name && payload.name) applicationCommandOption.name = payload.name;
  if (props.nameLocalizations && payload.name_localizations) applicationCommandOption.nameLocalizations = payload.name_localizations;
  if (props.description && payload.description) applicationCommandOption.description = payload.description;
  if (props.descriptionLocalizations && payload.description_localizations)
    applicationCommandOption.descriptionLocalizations = payload.description_localizations;
  if (props.required && payload.required !== undefined) applicationCommandOption.required = payload.required;
  if (props.choices && payload.choices)
    applicationCommandOption.choices = payload.choices.map((choice) => bot.transformers.applicationCommandOptionChoice(bot, choice));
  if (props.autocomplete && payload.autocomplete !== undefined) applicationCommandOption.autocomplete = payload.autocomplete;
  if (props.channelTypes && payload.channel_types) applicationCommandOption.channelTypes = payload.channel_types;
  if (props.minValue && payload.min_value !== undefined) applicationCommandOption.minValue = payload.min_value;
  if (props.maxValue && payload.max_value !== undefined) applicationCommandOption.maxValue = payload.max_value;
  if (props.minLength && payload.min_length !== undefined) applicationCommandOption.minLength = payload.min_length;
  if (props.maxLength && payload.max_length !== undefined) applicationCommandOption.maxLength = payload.max_length;
  if (props.options && payload.options)
    applicationCommandOption.options = payload.options.map((option) => bot.transformers.applicationCommandOption(bot, option));
  if (props.fileTypes && payload.file_types) applicationCommandOption.fileTypes = payload.file_types;

  return callCustomizer('applicationCommandOption', bot, payload, applicationCommandOption, {
    partial: extra?.partial ?? false,
  });
}
