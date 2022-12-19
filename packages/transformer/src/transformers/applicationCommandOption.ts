import type {
  Camelize,
  DiscordApplicationCommandOption
} from '@discordeno/types'
import { c1amelize1ApplicationCommandOptionChoice } from './applicationCommandOptionChoice.js'

export function c1amelize1ApplicationCommandOption (
  payload: DiscordApplicationCommandOption
): Camelize<DiscordApplicationCommandOption> {
  return {
    type: payload.type,
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    description: payload.description,
    descriptionLocalizations: payload.description_localizations ?? undefined,
    required: payload.required ?? false,
    choices: payload.choices?.map((choice) =>
      c1amelize1ApplicationCommandOptionChoice(choice)
    ),
    autocomplete: payload.autocomplete,
    channelTypes: payload.channel_types,
    minValue: payload.min_value,
    maxValue: payload.max_value,
    minLength: payload.min_length,
    maxLength: payload.max_length,
    options: payload.options?.map((option) =>
      c1amelize1ApplicationCommandOption(option)
    )
  }
}
