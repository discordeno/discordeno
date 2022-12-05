import type { DiscordEmoji } from '@discordeno/types'
import type { Client } from '../../client.js'
import type { Emoji } from '../emoji.js'

export function transformEmojiToDiscordEmoji (
  client: Client,
  payload: Emoji
): DiscordEmoji {
  return {
    id: payload.id
      ? client.transformers.reverse.snowflake(payload.id)
      : undefined,
    name: payload.name,
    roles: payload.roles?.map((id) =>
      client.transformers.reverse.snowflake(id)
    ),
    user: payload.user
      ? client.transformers.reverse.user(client, payload.user)
      : undefined,
    require_colons: payload.toggles.requireColons,
    managed: payload.toggles.managed,
    animated: payload.toggles.animated,
    available: payload.toggles.available
  }
}
