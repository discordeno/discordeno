import { Bot } from "../../../bot.ts";
import { WithReason } from "../../../mod.ts";
import { ScheduledEvent } from "../../../transformers/scheduledEvent.ts";
import { DiscordScheduledEvent } from "../../../types/discord.ts";
import {
  BigString,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
} from "../../../types/shared.ts";

/**
 * Edits a scheduled event.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the scheduled event in.
 * @param eventId - The ID of the scheduled event to edit.
 * @returns An instance of the edited {@link ScheduledEvent}.
 *
 * @remarks
 * Requires the `MANAGE_EVENTS` permission.
 *
 * To start or end an event, modify the event's `status` property.
 *
 * The `entity_metadata` property is discarded for events whose `entity_type` is not {@link ScheduledEventEntityType.External}.
 *
 * Fires a _Guild Scheduled Event Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event}
 */
export async function editScheduledEvent(
  bot: Bot,
  guildId: BigString,
  eventId: BigString,
  options: Partial<EditScheduledEvent>,
): Promise<ScheduledEvent> {
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

  const result = await bot.rest.runMethod<DiscordScheduledEvent>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId),
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

  return bot.transformers.scheduledEvent(bot, result);
}

export interface EditScheduledEvent extends WithReason {
  /** the channel id of the scheduled event. null if switching to external event. */
  channelId: BigString | null;
  /** location of the event */
  location?: string;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description?: string;
  /** the time the scheduled event will start */
  scheduledStartTime: number;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: number;
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  /** the status of the scheduled event */
  status: ScheduledEventStatus;
}
