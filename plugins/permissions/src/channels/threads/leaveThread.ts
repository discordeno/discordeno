import { BotWithCache, ChannelTypes } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function leaveThread(bot: BotWithCache) {
  const leaveThread = bot.helpers.leaveThread;

  bot.helpers.leaveThread = async function (threadId) {
    const channel = bot.channels.get(threadId);

    if (channel) {
      const isThread = ![ChannelTypes.PublicThread, ChannelTypes.PrivateThread, ChannelTypes.AnnouncementThread]
        .includes(channel.type);

      if (isThread) throw new Error("Channel must be a thread channel");

      if (channel.archived) throw new Error("You can not leave an archived channel.");
    }
    requireBotChannelPermissions(bot, threadId, ["VIEW_CHANNEL"]);

    return await leaveThread(threadId);
  };
}
