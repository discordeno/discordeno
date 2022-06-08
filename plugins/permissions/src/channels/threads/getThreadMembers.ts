import { BotWithCache, ChannelTypes, GatewayIntents } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

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
        throw new Error("Channel is not a guild thread");
      }

      const hasIntent = bot.intents & GatewayIntents.GuildMembers;
      if (!hasIntent) {
        throw new Error(
          "The get thread members endpoint requires GuildMembers intent.",
        );
      }

      requireBotChannelPermissions(bot, channel, ["VIEW_CHANNEL"]);
    }

    return await getThreadMembersOld(threadId);
  };
}
