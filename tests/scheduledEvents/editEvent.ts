import { ChannelTypes } from "../../mod.ts";
import { ScheduledEventEntityType, ScheduledEventPrivacyLevel } from "../../src/types/guilds/scheduledEvents.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../constants.ts";
import { assertEquals } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test({
  name: "[scheduled event] edit a scheduled event",
  fn: async (t) => {
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "entity",
      type: ChannelTypes.GuildStageVoice,
    });
    const event = await bot.helpers.createScheduledEvent(CACHED_COMMUNITY_GUILD_ID, {
      name: "lfg",
      description: "itoh is an imposter",
      scheduledStartTime: Date.now() + 600000,
      privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
      entityType: ScheduledEventEntityType.StageInstance,
      channelId: channel.id,
    });
    let edited = await bot.helpers.editScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id, {
      name: "lfg2",
    });

    assertEquals(event.name, "lfg");
    assertEquals(edited.name, "lfg2");
    assertEquals(edited.description, "itoh is an imposter");

    edited = await bot.helpers.editScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id, {
      description: "skillz is not an imposter",
    });
    assertEquals(edited.description, "skillz is not an imposter");

    let edited2 = await bot.helpers.editScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id, {
      scheduledStartTime: edited.scheduledStartTime - 60000,
    });
    assertEquals(edited.scheduledStartTime > edited2.scheduledStartTime, true);

    let edited3 = await bot.helpers.editScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id, {
      scheduledStartTime: edited.scheduledStartTime + 600000,
    });
    assertEquals(edited2.scheduledStartTime < edited3.scheduledStartTime, true);

    const voice = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "xxx",
      type: ChannelTypes.GuildVoice,
    });
    edited2 = await bot.helpers.editScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id, {
      entityType: ScheduledEventEntityType.Voice,
      channelId: voice.id,
    });
    assertEquals(edited.entityType, ScheduledEventEntityType.StageInstance);
    assertEquals(edited2.entityType, ScheduledEventEntityType.Voice);

    edited2 = await bot.helpers.editScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id, {
      entityType: ScheduledEventEntityType.External,
      // @ts-ignore
      channelId: null,
      scheduledStartTime: Date.now() + 60000,
      scheduledEndTime: Date.now() + 600000,
      location: "heaven",
    });
    assertEquals(edited2.entityType, ScheduledEventEntityType.External);

    edited3 = await bot.helpers.editScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id, {
      entityType: ScheduledEventEntityType.Voice,
      channelId: voice.id,
    });
    assertEquals(edited2.entityType, ScheduledEventEntityType.External);
    assertEquals(edited3.entityType, ScheduledEventEntityType.Voice);

    await bot.helpers.deleteChannel(voice.id);
    await bot.helpers.deleteChannel(channel.id);
  },
});
