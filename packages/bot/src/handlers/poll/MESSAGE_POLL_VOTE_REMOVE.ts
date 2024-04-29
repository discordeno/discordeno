import type { DiscordGatewayPayload, DiscordPollVoteRemove } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessagePollVoteRemove(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.messagePollVoteRemove) return

  const payload = data.d as DiscordPollVoteRemove

  bot.events.messagePollVoteRemove({
    userId: bot.transformers.snowflake(payload.user_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    answerId: payload.answer_id,
  })
}
