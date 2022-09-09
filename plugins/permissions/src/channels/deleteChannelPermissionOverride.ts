import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function deleteChannelPermissionOverride(bot: BotWithCache) {
  const deleteChannelPermissionOverrideOld = bot.helpers.deleteChannelPermissionOverride;

  bot.helpers.deleteChannelPermissionOverride = async function (channelId, overwriteId) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["MANAGE_ROLES"]);
    }

    return await deleteChannelPermissionOverrideOld(channelId, overwriteId);
  };
}
