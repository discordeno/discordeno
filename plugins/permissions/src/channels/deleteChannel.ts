import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotChannelPermissions, requireBotGuildPermissions } from "../permissions.ts";

export function deleteChannel(bot: BotWithCache) {
  const deleteChannel = bot.helpers.deleteChannel;

  bot.helpers.deleteChannel = async function (channelId, reason) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      const guild = bot.guilds.get(channel.guildId);
      if (!guild) throw new Error("GUILD_NOT_FOUND");

      if (guild.rulesChannelId === channelId) throw new Error("RULES_CHANNEL_CANNOT_BE_DELETED");

      if (guild.publicUpdatesChannelId === channelId) throw new Error("UPDATES_CHANNEL_CANNOT_BE_DELETED");

      requireBotGuildPermissions(
        bot,
        guild,
        [ChannelTypes.AnnouncementThread, ChannelTypes.PublicThread, ChannelTypes.PrivateThread].includes(channel.type)
          ? ["MANAGE_THREADS"]
          : ["MANAGE_CHANNELS"],
      );

      requireBotChannelPermissions(
        bot,
        channelId,
        [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type)
          ? ["VIEW_CHANNEL", "CONNECT"]
          : ["VIEW_CHANNEL"],
      );
    }

    return await deleteChannel(channelId, reason);
  };
}
