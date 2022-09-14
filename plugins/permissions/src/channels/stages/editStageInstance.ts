import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function editStageInstance(bot: BotWithCache) {
  const editStageInstance = bot.helpers.editStageInstance;

  bot.helpers.editStageInstance = async function (channelId, data) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_CHANNELS", "MUTE_MEMBERS", "MOVE_MEMBERS"]);

    return await editStageInstance(channelId, data);
  };
}
