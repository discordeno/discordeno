import { BotWithCache, ScheduledEventEntityType } from "../../../deps.ts";
import { requireBotChannelPermissions, requireBotGuildPermissions } from "../../permissions.ts";

export function editScheduledEvent(bot: BotWithCache) {
  const editScheduledEvent = bot.helpers.editScheduledEvent;

  bot.helpers.editScheduledEvent = async function (guildId, eventId, options) {
    if (options.entityType === ScheduledEventEntityType.StageInstance) {
      if (!options.channelId) {
        throw new Error(
          "A channel id is required for creating a stage scheduled event.",
        );
      }

      requireBotChannelPermissions(bot, bot.transformers.snowflake(options.channelId), [
        "MANAGE_CHANNELS",
        "MUTE_MEMBERS",
        "MOVE_MEMBERS",
      ]);

      // MANAGE_EVENTS at the guild level or at least MANAGE_EVENTS for the channel_id associated with the event
      try {
        requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), [
          "MANAGE_EVENTS",
        ]);
      } catch {
        requireBotChannelPermissions(bot, bot.transformers.snowflake(options.channelId), [
          "MANAGE_EVENTS",
        ]);
      }

      return editScheduledEvent(guildId, eventId, options);
    }

    if (options.entityType === ScheduledEventEntityType.Voice) {
      if (!options.channelId) {
        throw new Error(
          "A channel id is required for creating a voice scheduled event.",
        );
      }

      requireBotChannelPermissions(bot, bot.transformers.snowflake(options.channelId), [
        "VIEW_CHANNEL",
        "CONNECT",
      ]);

      // MANAGE_EVENTS at the guild level or at least MANAGE_EVENTS for the channel_id associated with the event
      try {
        requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), [
          "MANAGE_EVENTS",
        ]);
      } catch {
        requireBotChannelPermissions(bot, bot.transformers.snowflake(options.channelId), [
          "MANAGE_EVENTS",
        ]);
      }

      return editScheduledEvent(guildId, eventId, options);
    }

    // EXTERNAL EVENTS

    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), [
      "MANAGE_EVENTS",
    ]);

    return await editScheduledEvent(guildId, eventId, options);
  };
}
