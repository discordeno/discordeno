import type { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordAuditLogEntry } from "../../types/discord.ts";

export async function handleGuildAuditLogEntryCreate(bot: Bot, data: DiscordGatewayPayload) {
  // TODO: better type here
  const payload = data.d as DiscordAuditLogEntry & { guild_id: string };
  bot.events.auditLogEntryCreate(bot, bot.transformers.auditLogEntry(bot, payload), bot.transformers.snowflake(payload.guild_id));
}
