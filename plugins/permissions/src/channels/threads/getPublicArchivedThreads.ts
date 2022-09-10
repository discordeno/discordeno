import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function getPublicArchivedThreads(bot: BotWithCache) {
  const getPublicArchivedThreads = bot.helpers.getPublicArchivedThreads;
  bot.helpers.getPublicArchivedThreads = async function (channelId, options) {
    const channel = bot.channels.get(channelId);
    if (channel) {
      requireBotChannelPermissions(bot, channel, ["READ_MESSAGE_HISTORY"]);
    }
    return await getPublicArchivedThreads(channelId, options);
  };
}
