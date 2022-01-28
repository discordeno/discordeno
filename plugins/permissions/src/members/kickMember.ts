import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function kickMember(bot: BotWithCache) {
  const editMemberOld = bot.helpers.kickMember;

  bot.helpers.kickMember = function (guildId, memberId, reason) {
    requireBotGuildPermissions(bot, guildId, ["KICK_MEMBERS"]);

    return editMemberOld(guildId, memberId, reason);
  };
}
