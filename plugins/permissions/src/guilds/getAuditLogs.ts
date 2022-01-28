import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function getAuditLogs(bot: BotWithCache) {
  const getAuditLogsOld = bot.helpers.getAuditLogs;

  bot.helpers.getAuditLogs = function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["VIEW_AUDIT_LOG"]);

    return getAuditLogsOld(guildId, options);
  };
}
