import { BotWithCache, ChannelTypes } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function removeThreadMember(bot: BotWithCache) {
  const removeThreadMember = bot.helpers.removeThreadMember;

  bot.helpers.removeThreadMember = async function (threadId, userId) {
    const channel = bot.channels.get(threadId);

    if (channel) {
      if (channel.archived) throw new Error("Cannot remove user from thread if thread is archived.");

      if (!(bot.id === channel.ownerId && channel.type === ChannelTypes.PrivateThread)) {
        requireBotChannelPermissions(bot, channel, ["MANAGE_MESSAGES"]);
      }
    }

    return await removeThreadMember(threadId, userId);
  };
}
