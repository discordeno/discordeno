import { Bot, ScheduledEventEntityType } from "../../deps.ts";

export function createScheduledEvent(bot: Bot) {
  const createScheduledEventOld = bot.helpers.createScheduledEvent;

  bot.helpers.createScheduledEvent = function (guildId, options) {
    if (options.entityType === ScheduledEventEntityType.StageInstance) {
      if (!options.channelId) {
        throw new Error(
          "A channel id is required for creating a stage scheduled event.",
        );
      }

      return createScheduledEventOld(guildId, options);
    }

    if (options.entityType === ScheduledEventEntityType.Voice) {
      if (!options.channelId) {
        throw new Error(
          "A channel id is required for creating a voice scheduled event.",
        );
      }
    }

    return createScheduledEventOld(guildId, options);
  };
}

export function editScheduledEvent(bot: Bot) {
  const editScheduledEventOld = bot.helpers.editScheduledEvent;

  bot.helpers.editScheduledEvent = function (guildId, eventId, options) {
    if (options.entityType === ScheduledEventEntityType.StageInstance) {
      if (!options.channelId) {
        throw new Error(
          "A channel id is required for creating a stage scheduled event.",
        );
      }

      return editScheduledEventOld(guildId, eventId, options);
    }

    if (options.entityType === ScheduledEventEntityType.Voice) {
      if (!options.channelId) {
        throw new Error(
          "A channel id is required for creating a voice scheduled event.",
        );
      }

      return editScheduledEventOld(guildId, eventId, options);
    }

    return editScheduledEventOld(guildId, eventId, options);
  };
}

export default function setupEventsPermChecks(bot: Bot) {
  createScheduledEvent(bot);
  editScheduledEvent(bot);
}
