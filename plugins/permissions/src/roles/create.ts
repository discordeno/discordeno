import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function createRole(bot: BotWithCache) {
  const createRoleOld = bot.helpers.createRole;

  bot.helpers.createRole = function (
    guildId,
    options,
    reason,
  ) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

    return createRoleOld(guildId, options, reason);
  };
}
