import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function getPrivateJoinedArchivedThreads(bot: BotWithCache) {
  const getPrivateJoinedArchivedThreadsOld = bot.helpers.getPrivateJoinedArchivedThreads;
  bot.helpers.getPublicArchivedThreads = async function (channelId, options) {
    const channel = bot.channels.get(channelId);
    if (channel) {
      requireBotChannelPermissions(bot, channel, ["READ_MESSAGE_HISTORY"]);
    }
    return await getPrivateJoinedArchivedThreadsOld(channelId, options);
  };
}
