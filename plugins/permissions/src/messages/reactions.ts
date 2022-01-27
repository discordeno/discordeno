import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function addReaction(bot: BotWithCache) {
  const addReactionOld = bot.helpers.addReaction;

  bot.helpers.addReaction = function (channelId, messageId, reaction) {
    requireBotChannelPermissions(bot, channelId, [
      "READ_MESSAGE_HISTORY",
      "ADD_REACTIONS",
    ]);

    return addReactionOld(channelId, messageId, reaction);
  };
}

export function addReactions(bot: BotWithCache) {
  const addReactionsOld = bot.helpers.addReactions;

  bot.helpers.addReactions = function (
    channelId,
    messageId,
    reactions,
    ordered,
  ) {
    requireBotChannelPermissions(bot, channelId, [
      "READ_MESSAGE_HISTORY",
      "ADD_REACTIONS",
    ]);

    return addReactionsOld(channelId, messageId, reactions, ordered);
  };
}

export function removeReaction(bot: BotWithCache) {
  const removeReactionOld = bot.helpers.removeReaction;

  bot.helpers.removeReaction = function (
    channelId,
    messageId,
    reactions,
    options,
  ) {
    // IF REMOVING OTHER USER PERMS MANAGE MESSAGES IS REQUIRED
    if (options?.userId) {
      requireBotChannelPermissions(bot, channelId, [
        "MANAGE_MESSAGES",
      ]);
    }

    return removeReactionOld(channelId, messageId, reactions, options);
  };
}

export function removeAllReactions(bot: BotWithCache) {
  const removeAllReactionsOld = bot.helpers.removeAllReactions;

  bot.helpers.removeAllReactions = function (
    channelId,
    messageId,
  ) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_MESSAGES",
    ]);

    return removeAllReactionsOld(channelId, messageId);
  };
}

export function removeReactionEmoji(bot: BotWithCache) {
  const removeReactionEmojiOld = bot.helpers.removeReactionEmoji;

  bot.helpers.removeReactionEmoji = function (
    channelId,
    messageId,
    reaction,
  ) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_MESSAGES",
    ]);

    return removeReactionEmojiOld(channelId, messageId, reaction);
  };
}

export default function setupReactionsPermChecks(bot: BotWithCache) {
  addReaction(bot);
  addReactions(bot);
  removeReaction(bot);
  removeAllReactions(bot);
  removeReactionEmoji(bot);
}
