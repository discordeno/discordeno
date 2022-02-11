import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function createWebhook(bot: BotWithCache) {
  const createWebhookOld = bot.helpers.createWebhook;

  bot.helpers.createWebhook = function (channelId, options) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS"]);
    return createWebhookOld(channelId, options);
  };
}
