import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function createWebhook(bot: BotWithCache) {
  const createWebhook = bot.helpers.createWebhook;

  bot.helpers.createWebhook = async function (channelId, options) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ["MANAGE_WEBHOOKS", "VIEW_CHANNEL"]);

    return await createWebhook(channelId, options);
  };
}
