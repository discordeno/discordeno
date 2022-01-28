import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function getBans(bot: BotWithCache) {
  const getBansOld = bot.helpers.getBans;

  bot.helpers.getBans = function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return getBansOld(guildId);
  };
}
