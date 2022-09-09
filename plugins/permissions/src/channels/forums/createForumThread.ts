import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export default function createForumThread(bot: BotWithCache) {
  const createForumThreadOld = bot.helpers.createForumThread;

  bot.helpers.createForumThread = async function (channelId, options) {
    const channel = bot.channels.get(channelId);

    if (channel) {
      requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);
    }

    return await createForumThreadOld(channelId, options);
  };
}
