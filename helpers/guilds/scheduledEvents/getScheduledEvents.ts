import { Bot } from "../../../bot.ts";
import { DiscordenoScheduledEvent } from "../../../transformers/scheduledEvent.ts";
import { GetScheduledEvents, ScheduledEvent } from "../../../types/guilds/scheduledEvents.ts";
import { Collection } from "../../../util/collection.ts";

/** Get a list of guild scheduled event for the given guild. */
export async function getScheduledEvents(bot: Bot, guildId: bigint, options?: GetScheduledEvents) {
  const events = await bot.rest.runMethod<ScheduledEvent[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_SCHEDULED_EVENTS(guildId),
    {
      with_user_count: options?.withUserCount,
    },
  );

  return new Collection<bigint, DiscordenoScheduledEvent>(
    events.map((e) => {
      const event = bot.transformers.scheduledEvent(bot, e);
      return [event.id, event];
    }),
  );
}
