import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export default function addToThread(bot: BotWithCache) {
  const addToThreadOld = bot.helpers.addToThread;

  bot.helpers.addToThread = async function (threadId, userId) {
    const channel = bot.channels.get(threadId);

    if (channel) {
      if (channel.archived) {
        throw new Error("Cannot add user to thread if thread is archived.");
      }

      requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);
    }

    return addToThreadOld(threadId, userId);
  };
}
