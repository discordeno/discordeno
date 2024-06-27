import type { DiscordGatewayPayload, DiscordMessageReactionRemove } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessageReactionRemove(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.reactionRemove) return

  const payload = data.d as DiscordMessageReactionRemove

  bot.events.reactionRemove({
    userId: bot.transformers.snowflake(payload.user_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji),
    burst: payload.burst,
  })
}
