import { BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function deleteChannelPermissionOverride(bot: BotWithCache) {
  const deleteChannelPermissionOverride = bot.helpers.deleteChannelPermissionOverride;

  bot.helpers.deleteChannelPermissionOverride = async function (channelId, overwriteId) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));

    if (channel?.guildId) {
      const perms: PermissionStrings[] = ["VIEW_CHANNEL", "MANAGE_ROLES"];
      const isVoice = [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type);

      if (isVoice) perms.push("CONNECT");

      requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), perms);
    }

    return await deleteChannelPermissionOverride(channelId, overwriteId);
  };
}
