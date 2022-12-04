import { DiscordApplicationCommandOptionChoice } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { ApplicationCommandOptionChoice } from '../applicationCommandOptionChoice.js'

export function transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice (
  rest: RestManager,
  payload: ApplicationCommandOptionChoice
): DiscordApplicationCommandOptionChoice {
  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    value: payload.value
  }
}
