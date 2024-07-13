import type { DiscordDefaultReactionEmoji, DiscordEmoji } from '@discordeno/types'
import type { Bot, User } from '../index.js'
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

export interface Emoji {
  /** Emoji name (can only be null in reaction emoji objects) */
  name?: string
  /** Emoji id */
  id?: bigint
  /** Roles allowed to use this emoji */
  roles?: bigint[]
  /** User that created this emoji */
  user?: User
  /** Whether this emoji must be wrapped in colons */
  requireColons?: boolean
  /** Whether this emoji is managed */
  managed?: boolean
  /** Whether this emoji is animated */
  animated?: boolean
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean
  toggles: EmojiToggles
}

export interface DefaultReactionEmoji {
  /** The id of a guild's custom emoji */
  emojiId: bigint
  /** The unicode character of the emoji */
  emojiName?: string
}
