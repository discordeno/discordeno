import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function createRole(bot: BotWithCache) {
  const createRole = bot.helpers.createRole;

  bot.helpers.createRole = async function (guildId, options, reason) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_ROLES"]);

    if (options.name && !bot.utils.validateLength(options.name, { max: 100 })) {
      throw new Error("Role name must be less than 100 characters");
    }

    return await createRole(guildId, options, reason);
  };
}
