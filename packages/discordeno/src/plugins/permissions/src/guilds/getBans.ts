import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function getBans(bot: BotWithCache) {
  const getBans = bot.helpers.getBans;

  bot.helpers.getBans = async function (guildId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["BAN_MEMBERS"]);

    return await getBans(guildId);
  };
}
