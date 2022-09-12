import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function deleteReactionsEmoji(bot: BotWithCache) {
  const deleteReactionsEmoji = bot.helpers.deleteReactionsEmoji;

  bot.helpers.deleteReactionsEmoji = async function (channelId, messageId, reaction) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);

    return await deleteReactionsEmoji(channelId, messageId, reaction);
  };
}
