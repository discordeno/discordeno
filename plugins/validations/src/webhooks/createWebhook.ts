import { Bot } from "../../deps.ts";

export function createWebhook(bot: Bot) {
  const createWebhook = bot.helpers.createWebhook;

  bot.helpers.createWebhook = function (channelId, options) {
    if (
      // Specific usernames that discord does not allow
      options.name === "clyde" ||
      !bot.utils.validateLength(options.name, { min: 2, max: 32 })
    ) {
      throw new Error(
        "The webhook name can not be clyde and it must be between 2 and 32 characters long.",
      );
    }

    return createWebhook(channelId, options);
  };
}
