import type { Camelize, DiscordApplicationCommandOptionChoice } from '@discordeno/types'

export function s1nakelize1ApplicationCommandOptionChoice (payload: Camelize<DiscordApplicationCommandOptionChoice>): DiscordApplicationCommandOptionChoice {
  return {
    name: payload.name,
    value: payload.value,

    name_localizations: payload.nameLocalizations
  }
}
