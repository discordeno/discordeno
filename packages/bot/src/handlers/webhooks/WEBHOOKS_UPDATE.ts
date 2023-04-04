import type { DiscordGatewayPayload, DiscordWebhookUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleWebhooksUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  const payload = data.d as DiscordWebhookUpdate
  bot.events.webhooksUpdate?.({
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  })
}
