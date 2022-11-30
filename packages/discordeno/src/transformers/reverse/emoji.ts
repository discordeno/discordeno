import { Bot } from '../../bot.js'
import { DiscordEmoji } from '../../types/discord.js'
import { Emoji } from '../emoji.js'

export function transformEmojiToDiscordEmoji(bot: Bot, payload: Emoji): DiscordEmoji {
  return {
    id: payload.id ? bot.transformers.reverse.snowflake(payload.id) : undefined,
    name: payload.name || undefined,
    roles: payload.roles?.map((id) => bot.transformers.reverse.snowflake(id)),
    user: (payload.user != null) ? bot.transformers.reverse.user(bot, payload.user) : undefined,
    require_colons: payload.toggles.requireColons,
    managed: payload.toggles.managed,
    animated: payload.toggles.animated,
    available: payload.toggles.available
  }
}
