import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function deleteStageInstance(bot: BotWithCache) {
  const deleteStageInstance = bot.helpers.deleteStageInstance;

  bot.helpers.deleteStageInstance = async function (channelId) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_CHANNELS", "MUTE_MEMBERS", "MOVE_MEMBERS"]);

    return await deleteStageInstance(channelId);
  };
}
