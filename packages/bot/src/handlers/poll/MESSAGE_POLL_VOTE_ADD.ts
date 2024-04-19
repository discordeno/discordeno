import type { DiscordGatewayPayload, DiscordPollVoteAdd } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessagePollVoteAdd(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.messagePollVoteAdd) return

  const payload = data.d as DiscordPollVoteAdd

  bot.events.messagePollVoteAdd({
    userId: bot.transformers.snowflake(payload.user_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    answerId: payload.answer_id,
  })
}
