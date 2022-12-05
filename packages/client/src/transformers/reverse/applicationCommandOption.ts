import type { DiscordApplicationCommandOption } from '@discordeno/types'
import type { Client } from '../../client.js'
import type { ApplicationCommandOption } from '../applicationCommandOption.js'

export function transformApplicationCommandOptionToDiscordApplicationCommandOption (
  client: Client,
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
      client.transformers.reverse.applicationCommandOptionChoice(client, choice)
    ),
    options: payload.options?.map((option) =>
      client.transformers.reverse.applicationCommandOption(client, option)
    ),
    channel_types: payload.channelTypes,
    min_value: payload.minValue,
    max_value: payload.maxValue,
    min_length: payload.minLength,
    max_length: payload.maxLength,
    autocomplete: payload.autocomplete
  }
}
