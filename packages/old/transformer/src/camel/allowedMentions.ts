import type { Camelize, DiscordAllowedMentions } from '@discordeno/types'

export function c1amelize1AllowedMentions (
  payload: DiscordAllowedMentions
): Camelize<DiscordAllowedMentions> {
  return {
    parse: payload.parse,
    repliedUser: payload.replied_user,
    users: payload.users,
    roles: payload.roles
  }
}
