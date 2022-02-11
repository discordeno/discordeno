import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function createStageInstance(bot: BotWithCache) {
  const createStageInstanceOld = bot.helpers.createStageInstance;

  bot.helpers.createStageInstance = function (channelId, topic) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_CHANNELS",
      "MUTE_MEMBERS",
      "MOVE_MEMBERS",
    ]);

    return createStageInstanceOld(channelId, topic);
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
