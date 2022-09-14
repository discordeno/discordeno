import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function deleteReactionsAll(bot: BotWithCache) {
  const deleteReactionsAll = bot.helpers.deleteReactionsAll;

  bot.helpers.deleteReactionsAll = async function (channelId, messageId) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);

    return await deleteReactionsAll(channelId, messageId);
  };
}
