import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function getAuditLog(bot: BotWithCache) {
  const getAuditLogOld = bot.helpers.getAuditLog;

  bot.helpers.getAuditLog = async function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["VIEW_AUDIT_LOG"]);

    return await getAuditLogOld(guildId, options);
  };
}
