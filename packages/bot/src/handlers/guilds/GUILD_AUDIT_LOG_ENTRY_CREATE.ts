import type { DiscordAuditLogEntry, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildAuditLogEntryCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.guildAuditLogEntryCreate) return

  // TODO: better type here
  const payload = data.d as DiscordAuditLogEntry & { guild_id: string }
  bot.events.guildAuditLogEntryCreate(bot.transformers.auditLogEntry(bot, payload), bot.transformers.snowflake(payload.guild_id))
}
