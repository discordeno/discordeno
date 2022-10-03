import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function createRole(bot: BotWithCache) {
  const createRole = bot.helpers.createRole;

  bot.helpers.createRole = async function (guildId, options, reason) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_ROLES"]);

    return await createRole(guildId, options, reason);
  };
}
