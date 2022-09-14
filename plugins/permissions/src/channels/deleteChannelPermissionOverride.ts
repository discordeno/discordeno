import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function deleteChannelPermissionOverride(bot: BotWithCache) {
  const deleteChannelPermissionOverride = bot.helpers.deleteChannelPermissionOverride;

  bot.helpers.deleteChannelPermissionOverride = async function (channelId, overwriteId) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      requireBotChannelPermissions(
        bot,
        channelId,
        [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type)
          ? ["VIEW_CHANNEL", "CONNECT", "MANAGE_ROLES"]
          : ["VIEW_CHANNEL", "MANAGE_ROLES"],
      );
    }

    return await deleteChannelPermissionOverride(channelId, overwriteId);
  };
}
