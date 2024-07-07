import type { DiscordEmoji } from '@discordeno/types'
import type { Bot, Emoji } from '../index.js'
import { EmojiToggles } from './toggles/emoji.js'

export function transformEmoji(bot: Bot, payload: DiscordEmoji): Emoji {
  const props = bot.transformers.desiredProperties.emoji
  const emoji = {} as Emoji

  if (props.id && payload.id) emoji.id = bot.transformers.snowflake(payload.id)
  if (props.name && payload.name) emoji.name = payload.name
  if (props.roles && payload.roles) emoji.roles = payload.roles.map((id) => bot.transformers.snowflake(id))
  if (props.user && payload.user) emoji.user = bot.transformers.user(bot, payload.user)

  emoji.toggles = new EmojiToggles(payload)

  return bot.transformers.customizers.emoji(bot, payload, emoji)
}
