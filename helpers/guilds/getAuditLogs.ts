import type { Bot } from "../../bot.ts";
import { DiscordAuditLog } from "../../types/discord.ts";
import { AuditLogEvents } from "../../types/shared.ts";

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(bot: Bot, guildId: bigint, options?: GetGuildAuditLog) {
  if (options?.limit) options.limit = options.limit >= 1 && options.limit <= 100 ? options.limit : 50;

  const auditlog = await bot.rest.runMethod<DiscordAuditLog>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_AUDIT_LOGS(guildId, options),
  );

  return bot.transformers.auditLog(bot, { ...auditlog, guildId });
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLog {
  /** Entries from a specific user ID */
  userId?: bigint | string;
  /** Entries for a specific audit log event */
  actionType?: AuditLogEvents;
  /** Entries that preceded a specific audit log entry ID */
  before?: bigint | string;
  /** Maximum number of entries (between 1-100) to return, defaults to 50 */
  limit?: number;
}
