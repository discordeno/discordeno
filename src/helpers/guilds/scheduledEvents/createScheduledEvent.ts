import { Bot } from "../../../bot.ts";
import { CreateScheduledEvent, ScheduledEvent } from "../../../types/guilds/scheduledEvents.ts";

/** Create a guild scheduled event in the guild. A guild can have a maximum of 100 events with `SCHEDULED` or `ACTIVE` status at any time. */
export async function createScheduledEvent(bot: Bot, guildId: bigint, options: CreateScheduledEvent) {
  // TODO: validate name length
  // TODO: validate description length
  // TODO: validate location length
  // TODO: validate speaker ids length

  const event = await bot.rest.runMethod<ScheduledEvent>(
    bot.rest,
    "post",
    bot.constants.endpoints.GUILD_SCHEDULED_EVENTS(guildId),
    {
      channel_id: options.channelId?.toString(),
      entity_metadata:
        options.location || options.speakerIds
          ? { location: options.location, speakerIds: options.speakerIds?.map((id) => id.toString()) }
          : undefined,
      name: options.name,
      description: options.description,
      scheduled_start_time: new Date(options.scheduledStartTime).toISOString(),
      scheduled_end_time: options.scheduledEndTime ? new Date(options.scheduledEndTime).toISOString() : undefined,
      privacy_level: options.privacyLevel,
      entity_type: options.entityType,
    }
  );

  return bot.transformers.scheduledEvent(bot, event);
}
