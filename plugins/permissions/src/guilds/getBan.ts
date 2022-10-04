import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function getBan(bot: BotWithCache) {
  const getBan = bot.helpers.getBan;

  bot.helpers.getBan = async function (guildId, memberId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["BAN_MEMBERS"]);

    return await getBan(guildId, memberId);
  };
}
