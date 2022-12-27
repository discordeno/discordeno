import type { Camelize, DiscordEmoji } from '@discordeno/types'
import { s1nakelize1User } from './member.js'

export function s1nakelize1Emoji (payload: Camelize<DiscordEmoji>): DiscordEmoji {
  return {
    id: payload.id,
    name: payload.name,
    roles: payload.roles,
    managed: payload.managed,
    animated: payload.animated,
    available: payload.available,

    require_colons: payload.requireColons,

    user: payload.user && s1nakelize1User(payload.user)
  }
}
