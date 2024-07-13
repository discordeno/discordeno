import type { DiscordDefaultReactionEmoji, DiscordEmoji } from '@discordeno/types'
import type { Bot, DefaultReactionEmoji, Emoji } from '../index.js'
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

export function transformDefaultReactionEmoji(bot: Bot, payload: DiscordDefaultReactionEmoji): DefaultReactionEmoji {
  const props = bot.transformers.desiredProperties.defaultReactionEmoji
  const defaultReactionEmoji = {} as DefaultReactionEmoji

  if (props.emojiId && payload.emoji_id) defaultReactionEmoji.emojiId = bot.transformers.snowflake(payload.emoji_id)
  if (props.emojiName && payload.emoji_name) defaultReactionEmoji.emojiName = payload.emoji_name

  return bot.transformers.customizers.defaultReactionEmoji(bot, payload, defaultReactionEmoji)
}
