import type { Camelize, DiscordApplicationCommandOption } from '@discordeno/types'
import { s1nakelize1ApplicationCommandOptionChoice } from './applicationCommandOptionChoice.js'

export function s1nakelize1ApplicationCommandOption (payload: Camelize<DiscordApplicationCommandOption>): DiscordApplicationCommandOption {
  return {
    type: payload.type,
    name: payload.name,
    description: payload.description,
    autocomplete: payload.autocomplete,
    required: payload.required,

    name_localizations: payload.nameLocalizations,
    description_localizations: payload.descriptionLocalizations,
    channel_types: payload.channelTypes,
    min_value: payload.minValue,
    max_value: payload.maxValue,
    min_length: payload.minLength,
    max_length: payload.maxLength,

    options: payload.options?.map((option) =>
      s1nakelize1ApplicationCommandOption(option)
    ),
    choices: payload.choices?.map((choice) =>
      s1nakelize1ApplicationCommandOptionChoice(choice)
    )
  }
}
