import { Bot, GatewayIntents } from "../../../deps.ts";

export function getThreadMembers(bot: Bot) {
  const getThreadMembers = bot.helpers.getThreadMembers;

  bot.helpers.getThreadMembers = function (threadId) {
    const hasIntent = bot.intents & GatewayIntents.GuildMembers;
    if (!hasIntent) throw new Error("The get thread members endpoint requires GuildMembers intent.");
    return getThreadMembers(threadId);
  };
}
