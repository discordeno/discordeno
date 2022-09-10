import { BotWithCache } from "../../../deps.ts";

export function joinThread(bot: BotWithCache) {
  const joinThread = bot.helpers.joinThread;

  bot.helpers.joinThread = async function (threadId) {
    const channel = bot.channels.get(threadId);

    if (channel && !channel.archived) throw new Error("You can not join an archived channel.");

    return await joinThread(threadId);
  };
}
