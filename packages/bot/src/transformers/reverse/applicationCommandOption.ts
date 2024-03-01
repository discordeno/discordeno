import type { ApplicationCommandOption, Bot, DiscordApplicationCommandOption } from '../../index.js'

export function transformApplicationCommandOptionToDiscordApplicationCommandOption(
  bot: Bot,
  payload: ApplicationCommandOption,
): DiscordApplicationCommandOption {
  return {
    type: payload.type,
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    required: payload.required,
    choices: payload.choices?.map((choice) => bot.transformers.reverse.applicationCommandOptionChoice(bot, choice)),
    options: payload.options?.map((option) => bot.transformers.reverse.applicationCommandOption(bot, option)),
    channel_types: payload.channelTypes,
    min_value: payload.minValue,
    max_value: payload.maxValue,
    min_length: payload.minLength,
    max_length: payload.maxLength,
    autocomplete: payload.autocomplete,
  }
}
