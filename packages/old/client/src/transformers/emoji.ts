import type { DiscordEmoji, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'
import { EmojiToggles } from './toggles/emoji.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformEmoji (client: Client, payload: DiscordEmoji) {
  const emoji = {
    id: payload.id ? client.transformers.snowflake(payload.id) : undefined,
    name: payload.name,
    roles: payload.roles?.map((id) => client.transformers.snowflake(id)),
    user: payload.user
      ? client.transformers.user(client, payload.user)
      : undefined,
    toggles: new EmojiToggles(payload)
  }

  return emoji as Optionalize<typeof emoji>
}

export interface Emoji extends ReturnType<typeof transformEmoji> {}
