import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function editWebhook(bot: BotWithCache) {
  const editWebhookOld = bot.helpers.editWebhook;

  bot.helpers.editWebhook = function (webhookId, options) {
    if (options.channelId) requireBotChannelPermissions(bot, options.channelId, ["MANAGE_WEBHOOKS"]);

    return editWebhookOld(webhookId, options);
  };
}
