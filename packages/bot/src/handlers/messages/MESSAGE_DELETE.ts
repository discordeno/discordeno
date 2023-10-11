import type { DiscordGatewayPayload, DiscordMessageDelete } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessageDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.messageDelete) return

  const payload = data.d as DiscordMessageDelete

  bot.events.messageDelete({
    id: bot.transformers.snowflake(payload.id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
  })
}
