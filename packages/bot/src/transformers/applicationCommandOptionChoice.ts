import type { DiscordApplicationCommandOptionChoice } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommandOptionChoice(bot: Bot, payload: DiscordApplicationCommandOptionChoice) {
  const applicationCommandOptionChoice = {
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    value: payload.value,
  }

  return bot.transformers.customizers.applicationCommandOptionChoice(
    bot,
    payload,
    applicationCommandOptionChoice as ApplicationCommandOptionChoice,
  ) as Optionalize<typeof applicationCommandOptionChoice>
}

export interface ApplicationCommandOptionChoice extends ReturnType<typeof transformApplicationCommandOptionChoice> {}
