import type { DiscordGatewayPayload, DiscordGuildIntegrationsUpdate } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildIntegrationsUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.integrationUpdate) return

  const payload = data.d as DiscordGuildIntegrationsUpdate

  bot.events.integrationUpdate({
    guildId: bot.transformers.snowflake(payload.guild_id),
  })
}
