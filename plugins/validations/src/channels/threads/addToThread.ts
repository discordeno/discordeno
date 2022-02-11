import { Bot } from "../../../deps.ts";

export default function addToThread(bot: Bot) {
  const addToThreadOld = bot.helpers.addToThread;

  bot.helpers.addToThread = async function (threadId, userId) {
    if (userId === bot.id) {
      throw new Error(
        "To add the bot to a thread, you must use bot.helpers.joinThread()",
      );
    }

    return addToThreadOld(threadId, userId);
  };
}
