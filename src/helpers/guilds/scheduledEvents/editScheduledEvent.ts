import { Bot } from "../../../bot.ts";
import { EditScheduledEvent, ScheduledEvent, ScheduledEventEntityType } from "../../../types/guilds/scheduledEvents.ts";

/** Modify a guild scheduled event. To start or end an event, use this endpoint to modify the event's status. */
export async function editScheduledEvent(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options: Partial<EditScheduledEvent>,
) {
  if (options.scheduledStartTime && options.scheduledEndTime && options.scheduledStartTime > options.scheduledEndTime) {
    throw new Error("Cannot schedule event to end before starting.");
  }

  const event = await bot.rest.runMethod<ScheduledEvent>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_SCHEDULED_EVENT(guildId, eventId),
    {
      channel_id: options.channelId === null ? null : options.channelId?.toString(),
      entity_metadata: options.location ? { location: options.location } : undefined,
      name: options.name,
      description: options.description,
      scheduled_start_time: options.scheduledStartTime ? new Date(options.scheduledStartTime).toISOString() : undefined,
      scheduled_end_time: options.scheduledEndTime ? new Date(options.scheduledEndTime).toISOString() : undefined,
      privacy_level: options.privacyLevel,
      entity_type: options.entityType,
      status: options.status,
      reason: options.reason,
    },
  );

  return bot.transformers.scheduledEvent(bot, event);
}
