import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function deleteWebhook(bot: BotWithCache) {
  const deleteWebhookOld = bot.helpers.deleteWebhook;

  bot.helpers.deleteWebhook = async function (channelId, options) {
    requireBotChannelPermissions(bot, channelId, ["VIEW_CHANNEL", "MANAGE_WEBHOOKS"]);

    return await deleteWebhookOld(channelId, options);
  };
}
