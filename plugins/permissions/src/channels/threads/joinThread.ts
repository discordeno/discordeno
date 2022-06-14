import { BotWithCache, ChannelTypes } from "../../../deps.ts";

export default function joinThread(bot: BotWithCache) {
  const joinThreadOld = bot.helpers.joinThread;

  bot.helpers.joinThread = async function (threadId) {
    const channel = bot.channels.get(threadId);

    if (channel) {
      if (
        channel.type !== ChannelTypes.GuildNewsThread &&
        channel.type !== ChannelTypes.GuildPublicThread &&
        channel.type !== ChannelTypes.GuildPrivateThread
      ) {
        throw new Error("Channel must be a guild news thread, public thread, or private thread");
      }
      if (channel.archived) {
        throw new Error("You can not join an archived channel.");
      }
    }

    return await joinThreadOld(threadId);
  };
}
