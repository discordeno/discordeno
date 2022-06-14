import { BotWithCache, ChannelTypes, GatewayIntents } from "../../../deps.ts";

export default function getThreadMembers(bot: BotWithCache) {
  const getThreadMembersOld = bot.helpers.getThreadMembers;

  bot.helpers.getThreadMembers = async function (threadId) {
    const channel = bot.channels.get(threadId);
    if (channel) {
      if (
        channel.type !== ChannelTypes.GuildNewsThread &&
        channel.type !== ChannelTypes.GuildPublicThread &&
        channel.type !== ChannelTypes.GuildPrivateThread
      ) {
        throw new Error("Channel must be a guild news thread, public thread, or private thread");
      }
    }

    const hasIntent = bot.intents & GatewayIntents.GuildMembers;
    if (!hasIntent) {
      throw new Error(
        "The get thread members endpoint requires GuildMembers intent.",
      );
    }

    return await getThreadMembersOld(threadId);
  };
}
