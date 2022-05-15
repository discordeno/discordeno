import type { Bot } from "../../bot.ts";
import { DiscordAuditLog } from "../../types/discord.ts";
import { AuditLogEvents } from "../../types/shared.ts";

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(bot: Bot, guildId: bigint, options?: GetGuildAuditLog) {
  if (options?.limit) options.limit = options.limit >= 1 && options.limit <= 100 ? options.limit : 50;

  let url = bot.constants.endpoints.GUILD_AUDIT_LOGS(guildId);
  if (options) {
    url += "?";

    if (options.actionType) url += `action_type=${options.actionType}`;
    if (options.before) url += `&before=${options.before}`;
    if (options.limit) url += `&limit=${options.limit}`;
    if (options.userId) url += `&user_id=${options.userId}`;
  }
  const auditlog = await bot.rest.runMethod<DiscordAuditLog>(
    bot.rest,
    "get",
    url,
  );

  return bot.transformers.auditLog(bot, { ...auditlog, guildId });
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLog {
  /** Filter the log for actions made by a user */
  userId?: bigint | string;
  /** The type of audit log event */
  actionType?: AuditLogEvents;
  /** Filter the log before a certain entry id */
  before?: bigint | string;
  /** How many entries are returned (default 50, minimum 1, maximum 100) */
  limit?: number;
}
