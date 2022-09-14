import { BotWithCache, ChannelTypes } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function addThreadMember(bot: BotWithCache) {
  const addThreadMember = bot.helpers.addThreadMember;

  bot.helpers.addThreadMember = async function (threadId, userId) {
    const channel = bot.channels.get(threadId);

    if (channel) {
      if (
        ![ChannelTypes.PublicThread, ChannelTypes.PrivateThread, ChannelTypes.AnnouncementThread].includes(channel.type)
      ) {
        throw new Error("Channel must be a thread channel");
      }

      if (channel.archived) throw new Error("Cannot add user to thread if thread is archived.");

      requireBotChannelPermissions(bot, channel, ["VIEW_CHANNEL", "SEND_MESSAGES"]);
    }

    return await addThreadMember(threadId, userId);
  };
}
