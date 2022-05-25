import { BotWithCache, ChannelTypes } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export default function getArchivedThreads(bot: BotWithCache) {
  const getArchivedThreadsOld = bot.helpers.getArchivedThreads;

  bot.helpers.getArchivedThreads = async function (channelId, options) {
    const channel = bot.channels.get(channelId);

    if (channel) {
      if (channel.type !== ChannelTypes.GuildText && channel.type !== ChannelTypes.GuildNews) {
        throw new Error("Channel is not a Text or News channel");
      }

      requireBotChannelPermissions(
        bot,
        channel,
        options?.type === "private"
          ? ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "MANAGE_THREADS"]
          : ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
      );
    }

    return await getArchivedThreadsOld(channelId, options);
  };
}
