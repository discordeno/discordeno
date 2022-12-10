import { Bot } from "../../../bot.ts";
import { WithReason } from "../../../mod.ts";
import { ScheduledEvent } from "../../../transformers/scheduledEvent.ts";
import { DiscordScheduledEvent } from "../../../types/discord.ts";
import { BigString, ScheduledEventEntityType, ScheduledEventPrivacyLevel } from "../../../types/shared.ts";

/**
 * Creates a scheduled event in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to create the scheduled event in.
 * @param options - The parameters for the creation of the scheduled event.
 * @returns An instance of the created {@link ScheduledEvent}.
 *
 * @remarks
 * Requires the `MANAGE_EVENTS` permission.
 *
 * A guild can only have a maximum of 100 events with a status of {@link ScheduledEventStatus.Active} or {@link ScheduledEventStatus.Scheduled} (inclusive).
 *
 * Fires a _Guild Scheduled Event Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event}
 */
export async function createScheduledEvent(
  bot: Bot,
  guildId: BigString,
  options: CreateScheduledEvent,
): Promise<ScheduledEvent> {
  const result = await bot.rest.runMethod<DiscordScheduledEvent>(
    bot.rest,
    "POST",
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

  return bot.transformers.scheduledEvent(bot, result);
}

export interface CreateScheduledEvent extends WithReason {
  /** the channel id of the scheduled event. */
  channelId?: BigString;
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
}
