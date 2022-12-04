import { DiscordEmoji } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { Emoji } from '../emoji.js'

export function transformEmojiToDiscordEmoji (
  rest: RestManager,
  payload: Emoji
): DiscordEmoji {
  return {
    id: payload.id
      ? rest.transformers.reverse.snowflake(payload.id)
      : undefined,
    name: payload.name,
    roles: payload.roles?.map((id) => rest.transformers.reverse.snowflake(id)),
    user: payload.user
      ? rest.transformers.reverse.user(rest, payload.user)
      : undefined,
    require_colons: payload.toggles.requireColons,
    managed: payload.toggles.managed,
    animated: payload.toggles.animated,
    available: payload.toggles.available
  }
}
