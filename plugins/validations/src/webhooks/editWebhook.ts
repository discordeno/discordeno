import { Bot } from "../../deps.ts";

export function editWebhook(bot: Bot) {
  const editWebhook = bot.helpers.editWebhook;

  bot.helpers.editWebhook = function (webhookId, options) {
    if (options.name) {
      if (
        // Specific usernames that discord does not allow
        options.name === "clyde" ||
        !bot.utils.validateLength(options.name, { min: 2, max: 32 })
      ) {
        throw new Error(
          "The webhook name can not be clyde and it must be between 2 and 32 characters long.",
        );
      }
    }

    return editWebhook(webhookId, options);
  };
}
