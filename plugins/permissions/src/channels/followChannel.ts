import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function followChannel(bot: BotWithCache) {
  const followChannelOld = bot.helpers.followChannel;

  bot.helpers.followChannel = async function (sourceChannelId, targetChannelId) {
    const sourceChannel = bot.channels.get(sourceChannelId);
    if (sourceChannel && sourceChannel.type !== ChannelTypes.GuildNews) {
      throw new Error("Source channel must be a guild news channel");
    }
    const targetChannel = bot.channels.get(targetChannelId);
    if (targetChannel) {
      if (targetChannel.type !== ChannelTypes.GuildText) {
        throw new Error("Target channel must be a guild text channel");
      }
      requireBotChannelPermissions(bot, targetChannel, ["MANAGE_WEBHOOKS"]);
    }

    return await followChannelOld(sourceChannelId, targetChannelId);
  };
}
