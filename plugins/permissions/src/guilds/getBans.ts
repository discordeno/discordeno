import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function getBans(bot: BotWithCache) {
  const getBansOld = bot.helpers.getBans;

  bot.helpers.getBans = async function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return await getBansOld(guildId);
  };
}
