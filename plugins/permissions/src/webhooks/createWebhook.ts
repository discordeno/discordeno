import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function createWebhook(bot: BotWithCache) {
  const createWebhookOld = bot.helpers.createWebhook;

  bot.helpers.createWebhook = function (channelId, options) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS"]);

    if (
      // Specific usernames that discord does not allow
      options.name === "clyde" ||
      !bot.utils.validateLength(options.name, { min: 2, max: 32 })
    ) {
      throw new Error(
        "The webhook name can not be clyde and it must be between 2 and 32 characters long.",
      );
    }

    return createWebhookOld(channelId, options);
  };
}
