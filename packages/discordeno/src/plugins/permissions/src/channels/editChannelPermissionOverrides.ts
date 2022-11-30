import { BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function editChannelPermissionOverrides(bot: BotWithCache) {
  const editChannelPermissionOverrides = bot.helpers.editChannelPermissionOverrides;

  bot.helpers.editChannelPermissionOverrides = async function (channelId, overwrite) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));
    if (channel?.guildId) {
      const perms: PermissionStrings[] = ["VIEW_CHANNEL", "MANAGE_ROLES"];
      const isVoice = [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type);

      if (isVoice) perms.push("CONNECT");

      requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), perms);
    }

    return await editChannelPermissionOverrides(channelId, overwrite);
  };
}
