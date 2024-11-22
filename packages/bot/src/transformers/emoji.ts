import type { DiscordDefaultReactionEmoji, DiscordEmoji } from '@discordeno/types'
import type { DefaultReactionEmoji, Emoji, InternalBot } from '../index.js'
import { EmojiToggles } from './toggles/emoji.js'

export const baseEmoji: InternalBot['transformers']['$inferredTypes']['emoji'] = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as InternalBot['transformers']['$inferredTypes']['emoji']),

  get animated() {
    return this.toggles?.animated
  },
  get requireColons() {
    return this.toggles?.requireColons
  },
  get managed() {
    return this.toggles?.managed
  },
  get available() {
    return this.toggles.available
  },
}

export function transformEmoji(bot: InternalBot, payload: DiscordEmoji): typeof bot.transformers.$inferredTypes.emoji {
  const props = bot.transformers.desiredProperties.emoji
  const emoji = Object.create(baseEmoji) as Emoji

  if (props.id && payload.id) emoji.id = bot.transformers.snowflake(payload.id)
  if (props.name && payload.name) emoji.name = payload.name
  if (props.roles && payload.roles) emoji.roles = payload.roles.map((id) => bot.transformers.snowflake(id))
  if (props.user && payload.user) emoji.user = bot.transformers.user(bot, payload.user)

  emoji.toggles = new EmojiToggles(payload)

  return bot.transformers.customizers.emoji(bot, payload, emoji)
}

export function transformDefaultReactionEmoji(
  bot: InternalBot,
  payload: DiscordDefaultReactionEmoji,
): typeof bot.transformers.$inferredTypes.defaultReactionEmoji {
  const props = bot.transformers.desiredProperties.defaultReactionEmoji
  const defaultReactionEmoji = {} as DefaultReactionEmoji

  if (props.emojiId && payload.emoji_id) defaultReactionEmoji.emojiId = bot.transformers.snowflake(payload.emoji_id)
  if (props.emojiName && payload.emoji_name) defaultReactionEmoji.emojiName = payload.emoji_name

  return bot.transformers.customizers.defaultReactionEmoji(bot, payload, defaultReactionEmoji)
}
