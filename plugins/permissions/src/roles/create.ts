import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function createRole(bot: BotWithCache) {
  const createRoleOld = bot.helpers.createRole;

  bot.helpers.createRole = async function (
    guildId,
    options,
    reason,
  ) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

    return await createRoleOld(guildId, options, reason);
  };
}
