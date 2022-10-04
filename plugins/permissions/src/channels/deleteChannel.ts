import { BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function deleteChannel(bot: BotWithCache) {
  const deleteChannel = bot.helpers.deleteChannel;

  bot.helpers.deleteChannel = async function (channelId, reason) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));

    if (channel?.guildId) {
      const guild = bot.guilds.get(channel.guildId);
      if (!guild) throw new Error("GUILD_NOT_FOUND");

      if (guild.rulesChannelId === channelId) throw new Error("RULES_CHANNEL_CANNOT_BE_DELETED");

      if (guild.publicUpdatesChannelId === channelId) throw new Error("UPDATES_CHANNEL_CANNOT_BE_DELETED");

      const perms: PermissionStrings[] = ["VIEW_CHANNEL"];
      const isThread = [ChannelTypes.AnnouncementThread, ChannelTypes.PublicThread, ChannelTypes.PrivateThread]
        .includes(channel.type);
      const isVoice = [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type);

      if (isThread) perms.push("MANAGE_THREADS");
      else perms.push("MANAGE_CHANNELS");

      if (isVoice) perms.push("CONNECT");

      requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), perms);
    }

    return await deleteChannel(channelId, reason);
  };
}
