import { Bot } from "../../../bot.ts";
import { DiscordScheduledEvent } from "../../../types/discord.ts";
import { EditScheduledEvent } from "../../../types/guilds/scheduledEvents.ts";

/** Modify a guild scheduled event. To start or end an event, use this endpoint to modify the event's status. */
export async function editScheduledEvent(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options: Partial<EditScheduledEvent>,
) {
  if (options.name && !bot.utils.validateLength(options.name, { min: 1, max: 100 })) {
    throw new Error("Name must be between 1-100 characters.");
  }
  if (options.description && !bot.utils.validateLength(options.description, { max: 1000 })) {
    throw new Error("Description must be below 1000 characters.");
  }
  if (options.location && !bot.utils.validateLength(options.location, { max: 100 })) {
    throw new Error("Location must be below 100 characters.");
  }
  if (options.scheduledStartTime && options.scheduledEndTime && options.scheduledStartTime > options.scheduledEndTime) {
    throw new Error("Cannot schedule event to end before starting.");
  }

  const event = await bot.rest.runMethod<DiscordScheduledEvent>(
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
