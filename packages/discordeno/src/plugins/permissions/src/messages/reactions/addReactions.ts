import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function addReactions(bot: BotWithCache) {
  const addReactions = bot.helpers.addReactions;

  bot.helpers.addReactions = async function (channelId, messageId, reactions, ordered) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ["READ_MESSAGE_HISTORY", "ADD_REACTIONS"]);

    return await addReactions(channelId, messageId, reactions, ordered);
  };
}
