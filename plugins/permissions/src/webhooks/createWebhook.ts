import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function createWebhook(bot: BotWithCache) {
  const createWebhook = bot.helpers.createWebhook;

  bot.helpers.createWebhook = async function (channelId, options) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS", "VIEW_CHANNEL"]);

    if (
      // Specific usernames that discord does not allow
      ["clyde", "everyone", "here"].includes(options.name) ||
      options.name.includes("discord") ||
      options.name.includes("@") ||
      options.name.includes("#") ||
      options.name.includes(":") ||
      options.name.includes("\/") ||
      !bot.utils.validateLength(options.name, { min: 2, max: 32 })
    ) {
      throw new Error(
        "The webhook name can not be clyde, everyone, here or include 'discord, @, #, :, ' and it must be between 2 and 32 characters long.",
      );
    }

    return await createWebhook(channelId, options);
  };
}
