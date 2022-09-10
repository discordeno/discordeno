import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function getPrivateJoinedArchivedThreads(bot: BotWithCache) {
  const getPrivateJoinedArchivedThreads = bot.helpers.getPrivateJoinedArchivedThreads;
  bot.helpers.getPrivateJoinedArchivedThreads = async function (channelId, options) {
    const channel = bot.channels.get(channelId);
    if (channel) {
      requireBotChannelPermissions(bot, channel, ["READ_MESSAGE_HISTORY"]);
    }
    return await getPrivateJoinedArchivedThreads(channelId, options);
  };
}
