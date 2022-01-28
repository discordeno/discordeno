import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function deleteChannelOverwrite(bot: BotWithCache) {
  const deleteChannelOverwriteOld = bot.helpers.deleteChannelOverwrite;

  bot.helpers.deleteChannelOverwrite = function (channelId, overwriteId) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["MANAGE_ROLES"]);
    }

    return deleteChannelOverwriteOld(channelId, overwriteId);
  };
}
