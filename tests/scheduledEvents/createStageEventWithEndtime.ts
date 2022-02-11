import { ChannelTypes } from "../../mod.ts";
import { ScheduledEventEntityType, ScheduledEventPrivacyLevel } from "../../types/guilds/scheduledEvents.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../constants.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test({
  name: "[scheduled event] create a guild scheduled event with stage entity with an end time.",
  fn: async (t) => {
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "entity",
      type: ChannelTypes.GuildStageVoice,
    });

    const options = {
      name: "lfg",
      description: "itoh is an imposter",
      scheduledStartTime: Date.now() + 600000,
      scheduledEndTime: Date.now() + (600000 + 1),
      privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
      entityType: ScheduledEventEntityType.StageInstance,
      channelId: channel.id,
    };

    const event = await bot.helpers.createScheduledEvent(CACHED_COMMUNITY_GUILD_ID, options);

    await bot.helpers.deleteChannel(channel.id);

    // Assertions
    assertExists(event.id);

    assertEquals(event.channelId, options.channelId);
    assertEquals(event.name, options.name);
    assertEquals(event.description, options.description);
    assertEquals(event.scheduledStartTime, options.scheduledStartTime);
    assertEquals(event.scheduledEndTime, options.scheduledEndTime);
    assertEquals(event.privacyLevel, options.privacyLevel);
    assertEquals(event.entityType, options.entityType);
  },
});
