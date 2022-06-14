import { BotWithCache, ChannelTypes } from "../../../deps.ts";

export default function leaveThread(bot: BotWithCache) {
  const leaveThreadOld = bot.helpers.leaveThread;

  bot.helpers.leaveThread = async function (threadId) {
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
        throw new Error("You can not leave an archived channel.");
      }
    }

    return await leaveThreadOld(threadId);
  };
}
