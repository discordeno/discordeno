import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function getPruneCount(bot: BotWithCache) {
  const getPruneCountOld = bot.helpers.getPruneCount;

  bot.helpers.getPruneCount = function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["KICK_MEMBERS"]);

    return getPruneCountOld(guildId, options);
  };
}
