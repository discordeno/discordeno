import {
  DiscordApplicationCommandOptionChoice,
  Optionalize
} from '@discordeno/types'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommandOptionChoice (
  rest: RestManager,
  payload: DiscordApplicationCommandOptionChoice
) {
  const applicationCommandChoice = {
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    value: payload.value
  }

  return applicationCommandChoice as Optionalize<
    typeof applicationCommandChoice
  >
}

export interface ApplicationCommandOptionChoice
  extends ReturnType<typeof transformApplicationCommandOptionChoice> {}
