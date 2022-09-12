import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function deleteChannelPermissionOverride(bot: BotWithCache) {
  const deleteChannelPermissionOverride = bot.helpers.deleteChannelPermissionOverride;

  bot.helpers.deleteChannelPermissionOverride = async function (channelId, overwriteId) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) requireBotChannelPermissions(bot, channelId, ["MANAGE_ROLES"]);

    return await deleteChannelPermissionOverride(channelId, overwriteId);
  };
}
