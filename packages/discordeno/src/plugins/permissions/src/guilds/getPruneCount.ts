import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function getPruneCount(bot: BotWithCache) {
  const getPruneCount = bot.helpers.getPruneCount;

  bot.helpers.getPruneCount = async function (guildId, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["KICK_MEMBERS"]);

    return await getPruneCount(guildId, options);
  };
}
