import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function getPrivateArchivedThreads(bot: BotWithCache) {
  const getPrivateArchivedThreadsOld = bot.helpers.getPrivateArchivedThreads;
  bot.helpers.getPublicArchivedThreads = async function (channelId, options) {
    const channel = bot.channels.get(channelId);
    if (channel) {
      requireBotChannelPermissions(bot, channel, ["READ_MESSAGE_HISTORY", "MANAGE_MESSAGES"]);
    }
    return await getPrivateArchivedThreadsOld(channelId, options);
  };
}
