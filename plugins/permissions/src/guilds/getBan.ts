import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function getBan(bot: BotWithCache) {
  const getBanOld = bot.helpers.getBan;

  bot.helpers.getBan = async function (guildId, memberId) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return await getBanOld(guildId, memberId);
  };
}
