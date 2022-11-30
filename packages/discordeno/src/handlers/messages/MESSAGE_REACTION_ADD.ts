import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordMessageReactionAdd } from '../../types/discord.js'

export async function handleMessageReactionAdd (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessageReactionAdd

  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const userId = bot.transformers.snowflake(payload.user_id)
  bot.events.reactionAdd(bot, {
    userId,
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId,
    member: (payload.member != null) && guildId ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
    user: (payload.member != null) ? bot.transformers.user(bot, payload.member.user) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji)
  })
}
