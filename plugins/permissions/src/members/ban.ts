import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function banMember(bot: BotWithCache) {
  const banMemberOld = bot.helpers.banMember;

  bot.helpers.banMember = async function (guildId, id, options) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return await banMemberOld(guildId, id, options);
  };
}

export function unbanMember(bot: BotWithCache) {
  const unbanMemberOld = bot.helpers.unbanMember;

  bot.helpers.unbanMember = async function (guildId, id) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return await unbanMemberOld(guildId, id);
  };
}

export default function setupBanPermChecks(bot: BotWithCache) {
  banMember(bot);
  unbanMember(bot);
}
