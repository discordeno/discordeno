import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function editWebhook(bot: BotWithCache) {
  const editWebhook = bot.helpers.editWebhook;

  bot.helpers.editWebhook = async function (webhookId, options, fromChannelId) {
    if (options.channelId) {
      requireBotChannelPermissions(bot, bot.transformers.snowflake(options.channelId), [
        "MANAGE_WEBHOOKS",
        "VIEW_CHANNEL",
      ]);
    }
    if (fromChannelId) requireBotChannelPermissions(bot, fromChannelId, ["MANAGE_WEBHOOKS", "VIEW_CHANNEL"]);

    return await editWebhook(webhookId, options);
  };
}
