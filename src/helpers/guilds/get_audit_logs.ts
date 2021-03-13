import { RequestManager } from "../../rest/request_manager.ts";
import { AuditLogs, GetAuditLogsOptions } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(
  guildID: string,
  options: GetAuditLogsOptions,
) {
  await requireBotGuildPermissions(guildID, ["VIEW_AUDIT_LOG"]);

  const result = await RequestManager.get(endpoints.GUILD_AUDIT_LOGS(guildID), {
    ...options,
    action_type: options.action_type
      ? AuditLogs[options.action_type]
      : undefined,
    limit: options.limit && options.limit >= 1 && options.limit <= 100
      ? options.limit
      : 50,
  });

  return result;
}
