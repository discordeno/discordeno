import { BotWithCache, GatewayIntents } from "../../../deps.ts";

export default function getThreadMembers(bot: BotWithCache) {
  const getThreadMembersOld = bot.helpers.getThreadMembers;

  bot.helpers.getThreadMembers = function (threadId) {
    const hasIntent = bot.intents & GatewayIntents.GuildMembers;
    if (!hasIntent) {
      throw new Error(
        "The get thread members endpoint requires GuildMembers intent.",
      );
    }

    return getThreadMembersOld(threadId);
  };
}
