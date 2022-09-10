import { BotWithCache, GatewayIntents } from "../../../deps.ts";

export function getThreadMembers(bot: BotWithCache) {
  const getThreadMembers = bot.helpers.getThreadMembers;

  bot.helpers.getThreadMembers = async function (threadId) {
    const hasIntent = bot.intents & GatewayIntents.GuildMembers;
    if (!hasIntent) {
      throw new Error("The get thread members endpoint requires GuildMembers intent.");
    }

    return await getThreadMembers(threadId);
  };
}
