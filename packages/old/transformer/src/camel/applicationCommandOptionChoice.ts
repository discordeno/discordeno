import type {
  Camelize,
  DiscordApplicationCommandOptionChoice
} from '@discordeno/types'

export function c1amelize1ApplicationCommandOptionChoice (
  payload: DiscordApplicationCommandOptionChoice
): Camelize<DiscordApplicationCommandOptionChoice> {
  return {
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    value: payload.value
  }
}
