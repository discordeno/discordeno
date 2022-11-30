import { Bot } from "../../../deps.ts";

export function removeThreadMember(bot: Bot) {
  const removeThreadMember = bot.helpers.removeThreadMember;

  bot.helpers.removeThreadMember = async function (threadId, userId) {
    if (userId === bot.id) throw new Error("To remove the bot from a thread, you must use bot.helpers.leaveThread()");

    return removeThreadMember(threadId, userId);
  };
}
