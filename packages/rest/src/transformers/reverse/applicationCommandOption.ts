import { DiscordApplicationCommandOption } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { ApplicationCommandOption } from '../applicationCommandOption.js'

export function transformApplicationCommandOptionToDiscordApplicationCommandOption (
  rest: RestManager,
  payload: ApplicationCommandOption
): DiscordApplicationCommandOption {
  return {
    type: payload.type,
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    required: payload.required,
    choices: payload.choices?.map((choice) =>
      rest.transformers.reverse.applicationCommandOptionChoice(rest, choice)
    ),
    options: payload.options?.map((option) =>
      rest.transformers.reverse.applicationCommandOption(rest, option)
    ),
    channel_types: payload.channelTypes,
    min_value: payload.minValue,
    max_value: payload.maxValue,
    min_length: payload.minLength,
    max_length: payload.maxLength,
    autocomplete: payload.autocomplete
  }
}
