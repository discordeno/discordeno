import type { DiscordEmoji } from '@discordeno/types'
import type { Bot, User } from '../index.js'
import { EmojiToggles } from './toggles/emoji.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformEmoji(bot: Bot, payload: DiscordEmoji) {
  const props = bot.transformers.desiredProperties.emoji
  const emoji = {} as Emoji

  if (props.id && payload.id) emoji.id = bot.transformers.snowflake(payload.id)
  if (props.name && payload.name) emoji.name = payload.name
  if (props.roles && payload.roles) emoji.roles = payload.roles.map((id) => bot.transformers.snowflake(id))
  if (props.user && payload.user) emoji.user = bot.transformers.user(bot, payload.user)

  emoji.toggles = new EmojiToggles(payload)

  return emoji
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
