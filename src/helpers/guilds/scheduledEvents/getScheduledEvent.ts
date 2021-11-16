import { Bot } from "../../../bot.ts";
import { ScheduledEvent } from "../../../types/guilds/scheduledEvents.ts";

/** Get a guild scheduled event. */
export async function getScheduledEvent(bot: Bot, guildId: bigint, eventId: bigint) {
  const event = await bot.rest.runMethod<ScheduledEvent>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_SCHEDULED_EVENT(guildId, eventId)
  );

  return bot.transformers.scheduledEvent(bot, event);
}
