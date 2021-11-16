import { Bot } from "../../../bot.ts";
import { EditScheduledEvent, ScheduledEvent } from "../../../types/guilds/scheduledEvents.ts";

/** Modify a guild scheduled event. To start or end an event, use this endpoint to modify the event's status. */
export async function editScheduledEvent(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options: Partial<EditScheduledEvent>
) {
  // TODO: validate name length
  // TODO: validate description length
  // TODO: validate location length
  // TODO: validate speaker ids length

  const event = await bot.rest.runMethod<ScheduledEvent>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_SCHEDULED_EVENT(guildId, eventId),
    {
      channel_id: options.channelId?.toString(),
      entity_metadata:
        options.location || options.speakerIds
          ? { location: options.location, speakerIds: options.speakerIds?.map((id) => id.toString()) }
          : undefined,
      name: options.name,
      description: options.description,
      scheduled_start_time: options.scheduledStartTime ? new Date(options.scheduledStartTime).toISOString() : undefined,
      scheduled_end_time: options.scheduledEndTime ? new Date(options.scheduledEndTime).toISOString() : undefined,
      privacy_level: options.privacyLevel,
      entity_type: options.entityType,
      status: options.status,
    }
  );

  return bot.transformers.scheduledEvent(bot, event);
}
