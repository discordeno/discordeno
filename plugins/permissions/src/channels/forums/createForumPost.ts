import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export default function createForumPosts(bot: BotWithCache) {
  const createForumPostsOld = bot.helpers.createForumPosts;

  bot.helpers.createForumPosts= async function (channelId, options) {
    const channel = bot.channels.get(channelId);

    if (channel) {
        await requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);
    }

    return await createForumPostsOld(channelId, options);
  };
}
