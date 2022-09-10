import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function getPrivateArchivedThreads(bot: BotWithCache) {
  const getPrivateArchivedThreads = bot.helpers.getPrivateArchivedThreads;
  bot.helpers.getPrivateArchivedThreads = async function (channelId, options) {
    const channel = bot.channels.get(channelId);
    if (channel) {
      requireBotChannelPermissions(bot, channel, ["READ_MESSAGE_HISTORY", "MANAGE_MESSAGES"]);
    }
    return await getPrivateArchivedThreads(channelId, options);
  };
}
