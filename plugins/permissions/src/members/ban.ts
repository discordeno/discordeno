import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function banMember(bot: BotWithCache) {
  const banMemberOld = bot.helpers.banMember;

  bot.helpers.banMember = function (guildId, id, options) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return banMemberOld(guildId, id, options);
  };
}

export function unbanMember(bot: BotWithCache) {
  const unbanMemberOld = bot.helpers.unbanMember;

  bot.helpers.unbanMember = function (guildId, id) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return unbanMemberOld(guildId, id);
  };
}

export default function setupBanPermChecks(bot: BotWithCache) {
  banMember(bot);
  unbanMember(bot);
}
