import type { DiscordGatewayPayload, DiscordMessageReactionRemoveEmoji } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessageReactionRemoveEmoji(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.reactionRemoveEmoji) return

  const payload = data.d as DiscordMessageReactionRemoveEmoji

  bot.events.reactionRemoveEmoji({
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji),
  })
}
