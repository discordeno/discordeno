import type { AuditLog } from "../../types/audit_log/audit_log.ts";
import type { GetGuildAuditLog } from "../../types/audit_log/get_guild_audit_log.ts";
import type { Bot } from "../../bot.ts";

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(bot: Bot, guildId: bigint, options?: GetGuildAuditLog) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["VIEW_AUDIT_LOG"]);

  return await bot.rest.runMethod<AuditLog>(bot.rest, "get", bot.constants.endpoints.GUILD_AUDIT_LOGS(guildId), {
    user_id: options?.userId,
    action_type: options?.actionType,
    before: options?.before,
    limit: options?.limit && options.limit >= 1 && options.limit <= 100 ? options.limit : 50,
  });
}
