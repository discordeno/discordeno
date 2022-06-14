import { BotWithCache, ChannelTypes } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export default function getArchivedThreads(bot: BotWithCache) {
  const getArchivedThreadsOld = bot.helpers.getArchivedThreads;

  bot.helpers.getArchivedThreads = async function (channelId, options) {
    const channel = bot.channels.get(channelId);

    if (channel) {
      if (channel.type !== ChannelTypes.GuildText && channel.type !== ChannelTypes.GuildNews) {
        throw new Error("Channel must be a guild text or news channel");
      }

      await requireBotChannelPermissions(
        bot,
        channel,
        options?.type === "private" ? ["READ_MESSAGE_HISTORY", "MANAGE_THREADS"] : ["READ_MESSAGE_HISTORY"],
      );
    }

    return await getArchivedThreadsOld(channelId, options);
  };
}
