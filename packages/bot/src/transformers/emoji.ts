import { DiscordEmoji, Optionalize } from '@discordeno/types'
import { Bot } from '../bot.js'
import { EmojiToggles } from './toggles/emoji.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformEmoji (bot: Bot, payload: DiscordEmoji) {
  const emoji = {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    name: payload.name,
    roles: payload.roles?.map((id) => bot.transformers.snowflake(id)),
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    toggles: new EmojiToggles(payload)
  }

  return emoji as Optionalize<typeof emoji>
}

export interface Emoji extends ReturnType<typeof transformEmoji> {}
