import {
  DiscordGatewayPayload,
  DiscordGuildIntegrationsUpdate
} from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildIntegrationsUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildIntegrationsUpdate

  bot.events.integrationUpdate(bot, {
    guildId: bot.transformers.snowflake(payload.guild_id)
  })
}
