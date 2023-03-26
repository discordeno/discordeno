import type { DiscordGatewayPayload, DiscordMessageReactionAdd } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessageReactionAdd(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  const payload = data.d as DiscordMessageReactionAdd

  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const userId = bot.transformers.snowflake(payload.user_id)
  bot.events.reactionAdd?.({
    userId,
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId,
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
    user: payload.member ? bot.transformers.user(bot, payload.member.user) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji),
  })
}
