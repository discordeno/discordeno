import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function getBan(bot: BotWithCache) {
  const getBanOld = bot.helpers.getBan;

  bot.helpers.getBan = function (guildId, memberId) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return getBanOld(guildId, memberId);
  };
}
