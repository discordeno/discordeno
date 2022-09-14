import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function createForumThread(bot: BotWithCache) {
  const createForumThread = bot.helpers.createForumThread;

  bot.helpers.createForumThread = async function (channelId, options) {
    const channel = bot.channels.get(channelId);

    if (channel) requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);

    return await createForumThread(channelId, options);
  };
}
