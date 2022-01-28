import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function pinMessage(bot: BotWithCache) {
  const pinMessageOld = bot.helpers.pinMessage;

  bot.helpers.pinMessage = function (
    channelId,
    messageId,
  ) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_MESSAGES",
    ]);

    return pinMessageOld(channelId, messageId);
  };
}

export function unpinMessage(bot: BotWithCache) {
  const unpinMessageOld = bot.helpers.unpinMessage;

  bot.helpers.unpinMessage = function (
    channelId,
    messageId,
  ) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_MESSAGES",
    ]);

    return unpinMessageOld(channelId, messageId);
  };
}

export default function setupPinMessagePermChecks(bot: BotWithCache) {
  pinMessage(bot);
  unpinMessage(bot);
}
