import type { DiscordEmoji, Optionalize } from '@discordeno/types'
import type { RestManager } from '../restManager.js'
import { EmojiToggles } from './toggles/emoji.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformEmoji (rest: RestManager, payload: DiscordEmoji) {
  const emoji = {
    id: payload.id ? rest.transformers.snowflake(payload.id) : undefined,
    name: payload.name,
    roles: payload.roles?.map((id) => rest.transformers.snowflake(id)),
    user: payload.user ? rest.transformers.user(rest, payload.user) : undefined,
    toggles: new EmojiToggles(payload)
  }

  return emoji as Optionalize<typeof emoji>
}

export interface Emoji extends ReturnType<typeof transformEmoji> {}
