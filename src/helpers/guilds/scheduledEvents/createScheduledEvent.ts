import { Bot } from "../../../bot.ts";
import {
  CreateScheduledEvent,
  ScheduledEvent,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
} from "../../../types/guilds/scheduledEvents.ts";

/** Create a guild scheduled event in the guild. A guild can have a maximum of 100 events with `SCHEDULED` or `ACTIVE` status at any time. */
export async function createScheduledEvent(bot: Bot, guildId: bigint, options: CreateScheduledEvent) {
  if (options.location) {
    if (options.entityType === ScheduledEventEntityType.Voice) {
      throw new Error("Location can not be provided for a Voice event.");
    }
  }
  if (options.entityType === ScheduledEventEntityType.External) {
    if (!options.scheduledEndTime) throw new Error("A scheduled end time is required when making an External event.");
    if (!options.location) throw new Error("A location is required when making an External event.");
  }
  if (options.scheduledStartTime && options.scheduledEndTime && options.scheduledStartTime > options.scheduledEndTime) {
    throw new Error("Cannot schedule event to end before starting.");
  }

  const event = await bot.rest.runMethod<ScheduledEvent>(
    bot.rest,
    "post",
    bot.constants.endpoints.GUILD_SCHEDULED_EVENTS(guildId),
    {
      channel_id: options.channelId?.toString(),
      entity_metadata: options.location ? { location: options.location } : undefined,
      name: options.name,
      description: options.description,
      scheduled_start_time: new Date(options.scheduledStartTime).toISOString(),
      scheduled_end_time: options.scheduledEndTime ? new Date(options.scheduledEndTime).toISOString() : undefined,
      privacy_level: options.privacyLevel || ScheduledEventPrivacyLevel.GuildOnly,
      entity_type: options.entityType,
      reason: options.reason,
    },
  );

  return bot.transformers.scheduledEvent(bot, event);
}
