import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export default function createForumPosts(bot: BotWithCache) {
  const createForumPostsOld = bot.helpers.createForumPost;

  bot.helpers.createForumPost = async function (channelId, options) {
    const channel = bot.channels.get(channelId);

    if (channel) {
      requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);
    }

    return await createForumPostsOld(channelId, options);
  };
}
