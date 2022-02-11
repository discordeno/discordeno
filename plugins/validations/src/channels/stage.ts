import { Bot } from "../../deps.ts";

export function createStageInstance(bot: Bot) {
  const createStageInstanceOld = bot.helpers.createStageInstance;

  bot.helpers.createStageInstance = function (channelId, topic) {
    if (!bot.utils.validateLength(topic, { max: 120, min: 1 })) {
      throw new Error(
        "The topic length for creating a stage instance must be between 1-120.",
      );
    }

    return createStageInstanceOld(channelId, topic);
  };
}

export default function setupStagePermChecks(bot: Bot) {
  createStageInstance(bot);
}
