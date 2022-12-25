import type { Camelize, DiscordAllowedMentions } from '@discordeno/types'

export function s1nakelize1AllowedMentions (
  payload: Camelize<DiscordAllowedMentions>
): DiscordAllowedMentions {
  return {
    parse: payload.parse,
    replied_user: payload.repliedUser,
    users: payload.users,
    roles: payload.roles
  }
}
