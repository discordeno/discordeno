import type { Camelize, DiscordEmoji } from '@discordeno/types'
import { c1amelize1User } from './member.js'

export function c1amelize1Emoji (payload: DiscordEmoji): Camelize<DiscordEmoji> {
  return {
    id: payload.id,
    name: payload.name,
    roles: payload.roles,
    user: payload.user && c1amelize1User(payload.user),
    requireColons: payload.require_colons,
    managed: payload.managed,
    animated: payload.animated,
    available: payload.animated
  }
}
