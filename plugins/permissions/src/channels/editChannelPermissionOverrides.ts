import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function editChannelPermissionOverrides(bot: BotWithCache) {
  const editChannelPermissionOverrides = bot.helpers.editChannelPermissionOverrides;

  bot.helpers.editChannelPermissionOverrides = async function (channelId, overwrite) {
    const channel = bot.channels.get(channelId);
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["MANAGE_ROLES"]);
    }

    return await editChannelPermissionOverrides(channelId, overwrite);
  };
}
