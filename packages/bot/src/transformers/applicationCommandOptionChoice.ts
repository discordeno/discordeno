import { DiscordApplicationCommandOptionChoice, Optionalize } from '@discordeno/types'
import { Bot } from '../bot.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommandOptionChoice (bot: Bot, payload: DiscordApplicationCommandOptionChoice) {
  const applicationCommandChoice = {
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    value: payload.value
  }

  return applicationCommandChoice as Optionalize<typeof applicationCommandChoice>
}

export interface ApplicationCommandOptionChoice extends ReturnType<typeof transformApplicationCommandOptionChoice> { }
