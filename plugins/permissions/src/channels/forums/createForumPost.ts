import { BotWithCache, ChannelTypes } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export default function createForumPosts(bot: BotWithCache) {
  const createForumPostsOld = bot.helpers.createForumPost;

  bot.helpers.createForumPost = async function (channelId, options) {
    const channel = bot.channels.get(channelId);

    if (channel) {
      if (channel.type !== ChannelTypes.GuildForum) {
        throw new Error("Channel must be a guild forum channel");
      }
      requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);
    }

    return await createForumPostsOld(channelId, options);
  };
}
