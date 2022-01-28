import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function pruneMembers(bot: BotWithCache) {
  const pruneMembersOld = bot.helpers.pruneMembers;

  bot.helpers.pruneMembers = function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["KICK_MEMBERS"]);

    return pruneMembersOld(guildId, options);
  };
}
