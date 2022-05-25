import { BotWithCache, ChannelTypes } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export default function createForumPosts(bot: BotWithCache) {
  const createForumPostsOld = bot.helpers.createForumPost;

  bot.helpers.createForumPost = async function (channelId, options) {
    const channel = bot.channels.get(channelId);

    if (channel) {
      if (channel.type !== ChannelTypes.GuildForum) throw new Error("Channel is not a guild forum");
      requireBotChannelPermissions(bot, channel, ["VIEW_CHANNEL", "SEND_MESSAGES"]);
    }

    return await createForumPostsOld(channelId, options);
  };
}
