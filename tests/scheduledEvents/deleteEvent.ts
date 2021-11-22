import { ScheduledEventPrivacyLevel, ScheduledEventEntityType } from "../../src/types/guilds/scheduledEvents.ts";
import { bot, guild } from "../mod.ts";

Deno.test({
  name: "[scheduled event] delete a scheduled event",
  fn: async (t) => {
    const event = await bot.helpers.createScheduledEvent(guild.id, {
      name: "lfg",
      description: "itoh is an imposter",
      scheduledStartTime: Date.now() + 600000,
      scheduledEndTime: Date.now() + 1200000,
      privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
      entityType: ScheduledEventEntityType.External,
      location: "heaven",
    });
    await bot.helpers.deleteScheduledEvent(guild.id, event.id);
  },
});
