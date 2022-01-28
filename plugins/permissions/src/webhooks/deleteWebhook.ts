import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function deleteWebhook(bot: BotWithCache) {
  const deleteWebhookOld = bot.helpers.deleteWebhook;

  bot.helpers.deleteWebhook = function (channelId, options) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS"]);

    return deleteWebhookOld(channelId, options);
  };
}
