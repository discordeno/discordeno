import type { DiscordApplicationCommandOptionChoice } from '@discordeno/bot'
import type { Bot } from '../../index.js'
import type { ApplicationCommandOptionChoice } from '../applicationCommandOptionChoice.js'

export function transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice(
  bot: Bot,
  payload: ApplicationCommandOptionChoice,
): DiscordApplicationCommandOptionChoice {
  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    value: payload.value,
  }
}
