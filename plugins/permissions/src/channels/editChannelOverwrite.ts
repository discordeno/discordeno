import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function editChannelOverwrite(bot: BotWithCache) {
  const editChannelOverwriteOld = bot.helpers.editChannelOverwrite;

  bot.helpers.editChannelOverwrite = async function (channelId, overwrite) {
    const channel = bot.channels.get(channelId);
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["MANAGE_ROLES"]);
    }

    return await editChannelOverwriteOld(channelId, overwrite);
  };
}
