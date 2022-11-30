import { Bot } from "../../../bot.ts";
import { ScheduledEvent } from "../../../transformers/scheduledEvent.ts";
import { DiscordScheduledEvent } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Gets the list of scheduled events for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the scheduled events from.
 * @param options - The parameters for the fetching of the scheduled events.
 * @returns A collection of {@link ScheduledEvent} objects assorted by event ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild}
 */
export async function getScheduledEvents(
  bot: Bot,
  guildId: BigString,
  options?: GetScheduledEvents,
): Promise<Collection<bigint, ScheduledEvent>> {
  const results = await bot.rest.runMethod<DiscordScheduledEvent[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_SCHEDULED_EVENTS(guildId, options?.withUserCount),
  );

  return new Collection(
    results.map((result) => {
      const event = bot.transformers.scheduledEvent(bot, result);
      return [event.id, event];
    }),
  );
}

export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean;
}
