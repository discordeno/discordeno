import type { ApplicationCommandOptionChoice, Bot, Camelize, DiscordApplicationCommandOptionChoice } from '../../index.js'

export function transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice(
  _bot: Bot,
  payload: ApplicationCommandOptionChoice | Camelize<DiscordApplicationCommandOptionChoice>,
): DiscordApplicationCommandOptionChoice {
  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    value: payload.value,
  }
}
