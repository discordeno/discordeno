import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function deleteUserReaction(bot: BotWithCache) {
  const deleteUserReaction = bot.helpers.deleteUserReaction;

  bot.helpers.deleteUserReaction = async function (channelId, messageId, userId, reaction) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ["MANAGE_MESSAGES"]);

    return await deleteUserReaction(channelId, messageId, userId, reaction);
  };
}
