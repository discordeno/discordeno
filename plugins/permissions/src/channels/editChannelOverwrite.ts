import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function editChannelOverwrite(bot: BotWithCache) {
  const editChannelOverwriteOld = bot.helpers.editChannelOverwrite;

  bot.helpers.editChannelOverwrite = function (channelId, overwriteId, options) {
    const channel = bot.channels.get(channelId);
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["MANAGE_ROLES"]);
    }

    return editChannelOverwriteOld(channelId, overwriteId, options);
  };
}
