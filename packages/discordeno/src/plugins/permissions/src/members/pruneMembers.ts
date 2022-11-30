import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function pruneMembers(bot: BotWithCache) {
  const pruneMembers = bot.helpers.pruneMembers;

  bot.helpers.pruneMembers = async function (guildId, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["KICK_MEMBERS"]);

    return await pruneMembers(guildId, options);
  };
}
