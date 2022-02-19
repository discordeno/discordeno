import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function pinMessage(bot: BotWithCache) {
  const pinMessageOld = bot.helpers.pinMessage;

  bot.helpers.pinMessage = async function (
    channelId,
    messageId,
  ) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_MESSAGES",
    ]);

    return await pinMessageOld(channelId, messageId);
  };
}

export function unpinMessage(bot: BotWithCache) {
  const unpinMessageOld = bot.helpers.unpinMessage;

  bot.helpers.unpinMessage = async function (
    channelId,
    messageId,
  ) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_MESSAGES",
    ]);

    return await unpinMessageOld(channelId, messageId);
  };
}

export default function setupPinMessagePermChecks(bot: BotWithCache) {
  pinMessage(bot);
  unpinMessage(bot);
}
