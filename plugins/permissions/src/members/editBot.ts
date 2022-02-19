import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function editBotNickname(bot: BotWithCache) {
  const editBotNicknameOld = bot.helpers.editBotNickname;

  bot.helpers.editBotNickname = async function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["CHANGE_NICKNAME"]);

    return await editBotNicknameOld(guildId, options);
  };
}
