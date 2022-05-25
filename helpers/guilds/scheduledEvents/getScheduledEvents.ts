import { Bot } from "../../../bot.ts";
import { ScheduledEvent } from "../../../transformers/scheduledEvent.ts";
import { DiscordScheduledEvent } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Get a list of guild scheduled event for the given guild. */
export async function getScheduledEvents(bot: Bot, guildId: bigint, options?: GetScheduledEvents) {
  const events = await bot.rest.runMethod<DiscordScheduledEvent[]>(
    bot.rest,
    "get",
    bot.constants.routes.GUILD_SCHEDULED_EVENTS(guildId, options?.withUserCount)
  );

  return new Collection<bigint, ScheduledEvent>(
    events.map((e) => {
      const event = bot.transformers.scheduledEvent(bot, e);
      return [event.id, event];
    }),
  );
}

export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean;
}
