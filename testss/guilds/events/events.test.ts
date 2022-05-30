import { ChannelTypes, ScheduledEventEntityType, ScheduledEventPrivacyLevel } from "../../../mod.ts";
import { assertEquals, assertExists } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test({
  name: "[events] unit tests for events",
  fn: async (t) => {
    const bot = await loadBot();

    // create a guild scheduled event with external entity with an end time
    await t.step(
      "[scheduled event] create a guild scheduled event with external entity with an end time.",
      async () => {
        const options = {
          name: "lfg",
          description: "itoh is an imposter",
          scheduledStartTime: Date.now() + 600000,
          scheduledEndTime: Date.now() + (600000 + 1),
          privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
          entityType: ScheduledEventEntityType.External,
          location: "heaven",
        };

        const event = await bot.helpers.createScheduledEvent(CACHED_COMMUNITY_GUILD_ID, options);

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
    );

    // create a guild scheduled event with stage entity with an end time
    await t.step(
      "[scheduled event] create a guild scheduled event with stage entity with an end time.",
      async () => {
        const stage = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
          name: "stage-event",
          type: ChannelTypes.GuildStageVoice,
        });
        assertExists(stage.id);

        const options = {
          name: "lfg",
          description: "itoh is an imposter",
          scheduledStartTime: Date.now() + 600000,
          scheduledEndTime: Date.now() + (600000 + 1),
          privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
          entityType: ScheduledEventEntityType.StageInstance,
          channelId: stage.id,
        };

        const event = await bot.helpers.createScheduledEvent(CACHED_COMMUNITY_GUILD_ID, options);

        // Assertions
        assertExists(event.id);

        assertEquals(event.name, options.name);
        assertEquals(event.description, options.description);
        assertEquals(event.scheduledStartTime, options.scheduledStartTime);
        assertEquals(event.scheduledEndTime, options.scheduledEndTime);
        assertEquals(event.privacyLevel, options.privacyLevel);
        assertEquals(event.entityType, options.entityType);
        assertEquals(event.channelId, options.channelId);

        await bot.helpers.deleteChannel(stage.id);
      },
    );

    // create a guild scheduled event with stage entity without an end time
    await t.step(
      "[scheduled event] create a guild scheduled event with stage entity without an end time.",
      async () => {
        const stage = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
          name: "stage-event",
          type: ChannelTypes.GuildStageVoice,
        });
        assertExists(stage.id);

        const options = {
          name: "lfg",
          description: "itoh is an imposter",
          scheduledStartTime: Date.now() + 600000,
          privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
          entityType: ScheduledEventEntityType.StageInstance,
          channelId: stage.id,
        };

        const event = await bot.helpers.createScheduledEvent(CACHED_COMMUNITY_GUILD_ID, options);

        // Assertions
        assertExists(event.id);

        assertEquals(event.name, options.name);
        assertEquals(event.description, options.description);
        assertEquals(event.scheduledStartTime, options.scheduledStartTime);
        assertEquals(event.privacyLevel, options.privacyLevel);
        assertEquals(event.entityType, options.entityType);

        await bot.helpers.deleteChannel(stage.id);
      },
    );

    // create a guild scheduled event with voice entity with an end time
    await t.step(
      "[scheduled event] create a guild scheduled event with voice entity with an end time.",
      async () => {
        const voice = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
          name: "voice-event",
          type: ChannelTypes.GuildVoice,
        });
        assertExists(voice.id);

        const options = {
          name: "lfg",
          description: "itoh is an imposter",
          scheduledStartTime: Date.now() + 600000,
          scheduledEndTime: Date.now() + (600000 + 1),
          privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
          entityType: ScheduledEventEntityType.Voice,
          channelId: voice.id,
        };

        const event = await bot.helpers.createScheduledEvent(CACHED_COMMUNITY_GUILD_ID, options);

        // Assertions
        assertExists(event.id);

        assertEquals(event.name, options.name);
        assertEquals(event.description, options.description);
        assertEquals(event.scheduledStartTime, options.scheduledStartTime);
        assertEquals(event.scheduledEndTime, options.scheduledEndTime);
        assertEquals(event.privacyLevel, options.privacyLevel);
        assertEquals(event.entityType, options.entityType);

        await bot.helpers.deleteChannel(voice.id);
      },
    );

    // create a guild scheduled event with voice entity without an end time
    await t.step(
      "[scheduled event] create a guild scheduled event with voice entity without an end time.",
      async (t) => {
        const voice = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
          name: "voice-event",
          type: ChannelTypes.GuildVoice,
        });
        assertExists(voice.id);

        const options = {
          name: "lfg",
          description: "itoh is an imposter",
          scheduledStartTime: Date.now() + 600000,
          privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
          entityType: ScheduledEventEntityType.Voice,
          channelId: voice.id,
        };

        const event = await bot.helpers.createScheduledEvent(CACHED_COMMUNITY_GUILD_ID, options);

        // Assertions
        assertExists(event.id);

        assertEquals(event.name, options.name);
        assertEquals(event.description, options.description);
        assertEquals(event.scheduledStartTime, options.scheduledStartTime);
        assertEquals(event.privacyLevel, options.privacyLevel);
        assertEquals(event.entityType, options.entityType);

        // Delete the guild scheduled event
        await t.step(
          "[scheduled event] delete the guild scheduled event.",
          async () => {
            await bot.helpers.deleteScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id);
            const fetchedEvent = await bot.helpers.getScheduledEvent(CACHED_COMMUNITY_GUILD_ID, event.id);
            assertEquals(fetchedEvent, undefined);
          },
        );

        await bot.helpers.deleteChannel(voice.id);
      },
    );

    // Edit a scheduled event
    await t.step(
      {
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
      },
    );
  },
});
