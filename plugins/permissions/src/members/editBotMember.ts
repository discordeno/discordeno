import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function editBotMember(bot: BotWithCache) {
  const editBotMemberOld = bot.helpers.editBotMember;

  bot.helpers.editBotMember = async function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["CHANGE_NICKNAME"]);

    return await editBotMemberOld(guildId, options);
  };
}
