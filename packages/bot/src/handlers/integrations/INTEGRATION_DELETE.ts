import type { DiscordGatewayPayload, DiscordIntegrationDelete } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleIntegrationDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.integrationDelete) return

  const payload = data.d as DiscordIntegrationDelete

  bot.events.integrationDelete({
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
  })
}
