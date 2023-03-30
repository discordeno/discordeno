import type { DiscordApplicationCommandOptionChoice } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommandOptionChoice(bot: Bot, payload: DiscordApplicationCommandOptionChoice) {
  const applicationCommandChoice = {
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    value: payload.value,
  }

  return applicationCommandChoice as Optionalize<typeof applicationCommandChoice>
}

export interface ApplicationCommandOptionChoice extends ReturnType<typeof transformApplicationCommandOptionChoice> {}
