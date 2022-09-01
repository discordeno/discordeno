import { Bot } from "../../../bot.ts";

/** Delete a scheduled event. */
export async function deleteScheduledEvent(bot: Bot, guildId: bigint, eventId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId),
  );
}
