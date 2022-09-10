import { BotWithCache } from "../../../deps.ts";

export function leaveThread(bot: BotWithCache) {
  const leaveThread = bot.helpers.leaveThread;

  bot.helpers.leaveThread = async function (threadId) {
    const channel = bot.channels.get(threadId);

    if (channel && !channel.archived) {
      throw new Error("You can not leave an archived channel.");
    }

    return await leaveThread(threadId);
  };
}
