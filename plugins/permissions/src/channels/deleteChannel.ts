import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function deleteChannel(bot: BotWithCache) {
  const deleteChannelOld = bot.helpers.deleteChannel;

  bot.helpers.deleteChannel = function (channelId, reason) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      const guild = bot.guilds.get(channel.guildId);
      if (!guild) throw new Error("GUILD_NOT_FOUND");

      if (guild.rulesChannelId === channelId) {
        throw new Error("RULES_CHANNEL_CANNOT_BE_DELETED");
      }

      if (guild.publicUpdatesChannelId === channelId) {
        throw new Error("UPDATES_CHANNEL_CANNOT_BE_DELETED");
      }

      const isThread = [
        ChannelTypes.GuildNewsThread,
        ChannelTypes.GuildPublicThread,
        ChannelTypes.GuildPrivateThread,
      ].includes(channel.type);

      requireBotGuildPermissions(
        bot,
        guild,
        isThread ? ["MANAGE_THREADS"] : ["MANAGE_CHANNELS"],
      );
    }

    return deleteChannelOld(channelId, reason);
  };
}
