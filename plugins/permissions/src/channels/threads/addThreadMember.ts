import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function addThreadMember(bot: BotWithCache) {
  const addThreadMember = bot.helpers.addThreadMember;

  bot.helpers.addThreadMember = async function (threadId, userId) {
    const channel = bot.channels.get(threadId);

    if (channel) {
      if (channel.archived) {
        throw new Error("Cannot add user to thread if thread is archived.");
      }

      requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);
    }

    return await addThreadMember(threadId, userId);
  };
}
