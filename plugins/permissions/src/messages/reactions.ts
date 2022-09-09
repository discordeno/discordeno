import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function addReaction(bot: BotWithCache) {
  const addReactionOld = bot.helpers.addReaction;

  bot.helpers.addReaction = async function (channelId, messageId, reaction) {
    requireBotChannelPermissions(bot, channelId, ["READ_MESSAGE_HISTORY", "ADD_REACTIONS"]);

    return await addReactionOld(channelId, messageId, reaction);
  };
}

export function addReactions(bot: BotWithCache) {
  const addReactionsOld = bot.helpers.addReactions;

  bot.helpers.addReactions = async function (channelId, messageId, reactions, ordered) {
    requireBotChannelPermissions(bot, channelId, ["READ_MESSAGE_HISTORY", "ADD_REACTIONS"]);

    return await addReactionsOld(channelId, messageId, reactions, ordered);
  };
}

export function deleteUserReaction(bot: BotWithCache) {
  const deleteUserReactionOld = bot.helpers.deleteUserReaction;

  bot.helpers.deleteUserReaction = async function (channelId, messageId, userId, reaction) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);

    return await deleteUserReactionOld(channelId, messageId, userId, reaction);
  };
}

export function deleteReactionsAll(bot: BotWithCache) {
  const DeleteReactionsAllOld = bot.helpers.deleteReactionsAll;

  bot.helpers.deleteReactionsAll = async function (channelId, messageId) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);

    return await DeleteReactionsAllOld(channelId, messageId);
  };
}

export function deleteReactionsEmoji(bot: BotWithCache) {
  const deleteReactionsEmojiOld = bot.helpers.deleteReactionsEmoji;

  bot.helpers.deleteReactionsEmoji = async function (channelId, messageId, reaction) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);

    return await deleteReactionsEmojiOld(channelId, messageId, reaction);
  };
}

export default function setupReactionsPermChecks(bot: BotWithCache) {
  addReaction(bot);
  addReactions(bot);
  deleteUserReaction(bot);
  deleteReactionsAll(bot);
  deleteReactionsEmoji(bot);
}
