import { Bot } from "../../../../src/bot.ts";
import { ScheduledEventEntityType, ScheduledEventPrivacyLevel } from "../../../../src/types/guilds/scheduledEvents.ts";

export async function deleteScheduledEventTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const event = await bot.helpers.createScheduledEvent(guildId, {
    name: "lfg",
    description: "itoh is an imposter",
    scheduledStartTime: Date.now() + 600000,
    scheduledEndTime: Date.now() + 1200000,
    privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
    entityType: ScheduledEventEntityType.External,
    location: "heaven",
  });
  await bot.helpers.deleteScheduledEvent(guildId, event.id);
}
