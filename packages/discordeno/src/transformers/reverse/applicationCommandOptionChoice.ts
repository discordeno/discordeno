import { Bot } from '../../bot.js'
import { DiscordApplicationCommandOptionChoice } from '../../types/discord.js'
import { ApplicationCommandOptionChoice } from '../applicationCommandOptionChoice.js'

export function transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice(
  bot: Bot,
  payload: ApplicationCommandOptionChoice
): DiscordApplicationCommandOptionChoice {
  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    value: payload.value
  }
}
