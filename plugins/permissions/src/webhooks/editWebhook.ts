import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function editWebhook(bot: BotWithCache) {
  const editWebhook = bot.helpers.editWebhook;

  bot.helpers.editWebhook = async function (webhookId, options, fromChannelId) {
    if (options.channelId) requireBotChannelPermissions(bot, options.channelId, ["MANAGE_WEBHOOKS", "VIEW_CHANNEL"]);
    if (fromChannelId) requireBotChannelPermissions(bot, fromChannelId, ["MANAGE_WEBHOOKS", "VIEW_CHANNEL"]);

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

    return await editWebhook(webhookId, options);
  };
}
