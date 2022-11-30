import type { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordGuildIntegrationsUpdate } from '../../types/discord.js'

export async function handleGuildIntegrationsUpdate (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildIntegrationsUpdate

  bot.events.integrationUpdate(bot, { guildId: bot.transformers.snowflake(payload.guild_id) })
}
