import { BotWithCache } from "../../../deps.ts";

export default function joinThread(bot: BotWithCache) {
  const joinThreadOld = bot.helpers.joinThread;

  bot.helpers.joinThread = function (threadId) {
    const channel = bot.channels.get(threadId);

    if (channel && !channel.archived) {
      throw new Error("You can not join an archived channel.");
    }

    return joinThreadOld(threadId);
  };
}
