import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function kickMember(bot: BotWithCache) {
  const kickMember = bot.helpers.kickMember;

  bot.helpers.kickMember = async function (guildId, memberId, reason) {
    requireBotGuildPermissions(bot, guildId, ["KICK_MEMBERS"]);

    return await kickMember(guildId, memberId, reason);
  };
}
