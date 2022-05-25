import { Bot } from "../../../bot.ts";
import { DiscordScheduledEvent } from "../../../types/discord.ts";
import { ScheduledEventEntityType, ScheduledEventPrivacyLevel } from "../../../types/shared.ts";

/** Create a guild scheduled event in the guild. A guild can have a maximum of 100 events with `SCHEDULED` or `ACTIVE` status at any time. */
export async function createScheduledEvent(bot: Bot, guildId: bigint, options: CreateScheduledEvent) {
  if (!bot.utils.validateLength(options.name, { min: 1, max: 100 })) {
    throw new Error("Name must be between 1-100 characters.");
  }
  if (options.description && !bot.utils.validateLength(options.description, { max: 1000 })) {
    throw new Error("Description must be below 1000 characters.");
  }
  if (options.location) {
    if (!bot.utils.validateLength(options.location, { max: 100 })) {
      throw new Error("Location must be below 100 characters.");
    }
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

  const event = await bot.rest.runMethod<DiscordScheduledEvent>(
    bot.rest,
    "post",
    bot.constants.routes.GUILD_SCHEDULED_EVENTS(guildId),
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

export interface CreateScheduledEvent {
  /** the channel id of the scheduled event. */
  channelId?: bigint;
  /** location of the event. Required for events with `entityType: ScheduledEventEntityType.External` */
  location?: string;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: number;
  /** the time the scheduled event will end if it does end. Required for events with `entityType: ScheduledEventEntityType.External` */
  scheduledEndTime?: number;
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  reason?: string;
}
