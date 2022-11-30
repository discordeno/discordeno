import { Bot, ScheduledEventEntityType } from "../../../deps.ts";

export function createScheduledEvent(bot: Bot) {
  const createScheduledEvent = bot.helpers.createScheduledEvent;

  bot.helpers.createScheduledEvent = function (guildId, options) {
    if (options.entityType === ScheduledEventEntityType.StageInstance) {
      if (!options.channelId) {
        throw new Error(
          "A channel id is required for creating a stage scheduled event.",
        );
      }

      return createScheduledEvent(guildId, options);
    }

    if (options.entityType === ScheduledEventEntityType.Voice) {
      if (!options.channelId) {
        throw new Error(
          "A channel id is required for creating a voice scheduled event.",
        );
      }
    }

    return createScheduledEvent(guildId, options);
  };
}
