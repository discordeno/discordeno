import { ChannelTypes } from "../../mod.ts";
import { ScheduledEventPrivacyLevel, ScheduledEventEntityType } from "../../src/types/guilds/scheduledEvents.ts";
import { assertExists, assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test({
  name: "[scheduled event] create a guild scheduled event with voice entity",
  fn: async () => {
    const channel = await bot.helpers.createChannel(guild.id, {
      name: "entity",
      type: ChannelTypes.GuildVoice,
    });

    const options = {
      name: "lfg",
      description: "itoh is an imposter",
      scheduledStartTime: Date.now() + 600000,
      privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
      entityType: ScheduledEventEntityType.Voice,
      channelId: channel.id,
    };

    const event = await bot.helpers.createScheduledEvent(guild.id, options);

    // Assertions
    assertExists(event.id);

    assertEquals(event.channelId, options.channelId);
    assertEquals(event.name, options.name);
    assertEquals(event.description, options.description);
    assertEquals(event.scheduledStartTime, options.scheduledStartTime);
    assertEquals(event.privacyLevel, options.privacyLevel);
    assertEquals(event.entityType, options.entityType);
  },
});
