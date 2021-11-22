import { ScheduledEventPrivacyLevel, ScheduledEventEntityType } from "../../src/types/guilds/scheduledEvents.ts";
import { assertExists, assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test({
  name: "[scheduled event] create a guild scheduled event with external entity",
  fn: async (t) => {
    const options = {
      name: "lfg",
      description: "itoh is an imposter",
      scheduledStartTime: Date.now() + 600000,
      scheduledEndTime: Date.now() + 1200000,
      privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
      entityType: ScheduledEventEntityType.External,
      location: "heaven",
    };

    const event = await bot.helpers.createScheduledEvent(guild.id, options);

    // Assertions
    assertExists(event.id);
    assertEquals(event.location, options.location);
    assertEquals(event.name, options.name);
    assertEquals(event.description, options.description);
    assertEquals(event.scheduledStartTime, options.scheduledStartTime);
    assertEquals(event.scheduledEndTime, options.scheduledEndTime);
    assertEquals(event.privacyLevel, options.privacyLevel);
    assertEquals(event.entityType, options.entityType);
  },
});
