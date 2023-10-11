import type { DiscordGatewayPayload, DiscordScheduledEventUserAdd } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

export async function handleGuildScheduledEventUserAdd(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.scheduledEventUserAdd) return

  const payload = data.d as DiscordScheduledEventUserAdd

  bot.events.scheduledEventUserAdd({
    guildScheduledEventId: bot.transformers.snowflake(payload.guild_scheduled_event_id),
    userId: bot.transformers.snowflake(payload.user_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  })
}
