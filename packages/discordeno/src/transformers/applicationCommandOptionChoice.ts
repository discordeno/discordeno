import { Bot } from '../bot.js'
import { DiscordApplicationCommandOptionChoice } from '../types/discord.js'
import { Optionalize } from '../types/shared.js'

export function transformApplicationCommandOptionChoice(bot: Bot, payload: DiscordApplicationCommandOptionChoice) {
  const applicationCommandChoice = {
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    value: payload.value
  }

  return applicationCommandChoice as Optionalize<typeof applicationCommandChoice>
}

export interface ApplicationCommandOptionChoice extends ReturnType<typeof transformApplicationCommandOptionChoice> { }
