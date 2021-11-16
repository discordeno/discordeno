import { Bot } from "../../../bot.ts";

/** Delete a scheduled event. */
export async function deleteScheduledEvent(bot: Bot, guildId: bigint, eventId: bigint) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.GUILD_SCHEDULED_EVENT(guildId, eventId)
  );
}
