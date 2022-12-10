import type { DiscordApplicationCommandOptionChoice } from '@discordeno/types'
import type { Client } from '../../client.js'
import type { ApplicationCommandOptionChoice } from '../applicationCommandOptionChoice.js'

export function transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice (
  client: Client,
  payload: ApplicationCommandOptionChoice
): DiscordApplicationCommandOptionChoice {
  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    value: payload.value
  }
}
