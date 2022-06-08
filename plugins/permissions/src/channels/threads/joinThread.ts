import { BotWithCache, ChannelTypes } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

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
        throw new Error("Channel is not a guild thread");
      }
      if (channel.archived) {
        throw new Error("You can not join an archived channel.");
      }

      requireBotChannelPermissions(bot, channel, ["VIEW_CHANNEL"]);
    }

    return await joinThreadOld(threadId);
  };
}
