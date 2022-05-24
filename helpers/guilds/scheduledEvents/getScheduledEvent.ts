import { Bot } from "../../../bot.ts";
import { DiscordScheduledEvent } from "../../../types/discord.ts";

/** Get a guild scheduled event. */
export async function getScheduledEvent(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options?: { withUserCount?: boolean },
) {
  const event = await bot.rest.runMethod<DiscordScheduledEvent>(
    bot.rest,
    "GET",
    `${bot.constants.endpoints.GUILD_SCHEDULED_EVENT(guildId, eventId)}?with_user_count=${
      options?.withUserCount ?? false
    }`,
  );

  return bot.transformers.scheduledEvent(bot, event);
}
