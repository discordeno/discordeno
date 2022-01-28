import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function createStageInstance(bot: BotWithCache) {
  const createStageInstanceOld = bot.helpers.createStageInstance;

  bot.helpers.createStageInstance = function (channelId, topic, privacyLevel) {
    if (!bot.utils.validateLength(topic, { max: 120, min: 1 })) {
      throw new Error(
        "The topic length for creating a stage instance must be between 1-120.",
      );
    }

    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_CHANNELS",
      "MUTE_MEMBERS",
      "MOVE_MEMBERS",
    ]);

    return createStageInstanceOld(channelId, topic, privacyLevel);
  };
}

export function deleteStageInstance(bot: BotWithCache) {
  const deleteStageInstanceOld = bot.helpers.deleteStageInstance;

  bot.helpers.deleteStageInstance = function (channelId) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_CHANNELS",
      "MUTE_MEMBERS",
      "MOVE_MEMBERS",
    ]);

    return deleteStageInstanceOld(channelId);
  };
}

export function updateStageInstance(bot: BotWithCache) {
  const updateStageInstanceOld = bot.helpers.updateStageInstance;

  bot.helpers.updateStageInstance = function (channelId, data) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_CHANNELS",
      "MUTE_MEMBERS",
      "MOVE_MEMBERS",
    ]);

    return updateStageInstanceOld(channelId, data);
  };
}

export default function setupStagePermChecks(bot: BotWithCache) {
  createStageInstance(bot);
  deleteStageInstance(bot);
  updateStageInstance(bot);
}