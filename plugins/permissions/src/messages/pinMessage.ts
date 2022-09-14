import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function pinMessage(bot: BotWithCache) {
  const pinMessage = bot.helpers.pinMessage;

  bot.helpers.pinMessage = async function (
    channelId,
    messageId,
  ) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_MESSAGES",
    ]);

    return await pinMessage(channelId, messageId);
  };
}
