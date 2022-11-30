import { Bot } from "../../../deps.ts";

export function addThreadMember(bot: Bot) {
  const addThreadMember = bot.helpers.addThreadMember;

  bot.helpers.addThreadMember = async function (threadId, userId) {
    if (userId === bot.id) throw new Error("To add the bot to a thread, you must use bot.helpers.joinThread()");

    return addThreadMember(threadId, userId);
  };
}
