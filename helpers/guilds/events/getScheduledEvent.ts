import { Bot } from "../../../bot.ts";
import { ScheduledEvent } from "../../../transformers/scheduledEvent.ts";
import { DiscordScheduledEvent } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Gets a scheduled event by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the scheduled event from.
 * @param eventId - The ID of the scheduled event to get.
 * @param options - The parameters for the fetching of the scheduled event.
 * @returns An instance of {@link ScheduledEvent}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event}
 */
export async function getScheduledEvent(
  bot: Bot,
  guildId: BigString,
  eventId: BigString,
  options?: { withUserCount?: boolean },
): Promise<ScheduledEvent> {
  const result = await bot.rest.runMethod<DiscordScheduledEvent>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId, options?.withUserCount),
  );

  return bot.transformers.scheduledEvent(bot, result);
}
