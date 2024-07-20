import type { DiscordApplicationCommandOptionChoice } from '@discordeno/types'
import type { ApplicationCommandOptionChoice, Bot } from '../index.js'

export function transformApplicationCommandOptionChoice(bot: Bot, payload: DiscordApplicationCommandOptionChoice): ApplicationCommandOptionChoice {
  const applicationCommandOptionChoice = {
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    value: payload.value,
  } as ApplicationCommandOptionChoice

  return bot.transformers.customizers.applicationCommandOptionChoice(bot, payload, applicationCommandOptionChoice)
}
