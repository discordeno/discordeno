import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function followChannel(bot: BotWithCache) {
  const followChannelOld = bot.helpers.followChannel;

  bot.helpers.followChannel = async function (sourceChannelId, targetChannelId) {
    const sourceChannel = bot.channels.get(sourceChannelId);
    if (sourceChannel && sourceChannel.type !== ChannelTypes.GuildNews) {
      throw new Error("Channel is not a guild news channel");
    }

    const targetChannel = bot.channels.get(targetChannelId);
    if (targetChannel?.guildId) {
      requireBotChannelPermissions(bot, targetChannel, ["VIEW_CHANNEL", "MANAGE_WEBHOOKS"]);
    }

    return await followChannelOld(sourceChannelId, targetChannelId);
  };
}
