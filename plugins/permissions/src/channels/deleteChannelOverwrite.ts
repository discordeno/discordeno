import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function deleteChannelOverwrite(bot: BotWithCache) {
  const deleteChannelOverwriteOld = bot.helpers.deleteChannelOverwrite;

  bot.helpers.deleteChannelOverwrite = async function (channelId, overwriteId) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["VIEW_CHANNEL", "MANAGE_ROLES"]);
    }

    return await deleteChannelOverwriteOld(channelId, overwriteId);
  };
}
