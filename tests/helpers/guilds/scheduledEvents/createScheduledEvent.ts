import { Bot } from "../../../../src/bot.ts";
import { ChannelTypes } from "../../../../src/types/channels/channelTypes.ts";
import { CreateScheduledEvent, ScheduledEventEntityType } from "../../../../src/types/guilds/scheduledEvents.ts";
import { assertEquals, assertExists } from "../../../deps.ts";

export async function createScheduledEventTests(
  bot: Bot,
  guildId: bigint,
  options: CreateScheduledEvent,
  t: Deno.TestContext
) {
  if ([ScheduledEventEntityType.StageInstance, ScheduledEventEntityType.Voice].includes(options.entityType)) {
    const channel = await bot.helpers.createChannel(guildId, {
      name: "entity",
      type:
        options.entityType === ScheduledEventEntityType.Voice ? ChannelTypes.GuildVoice : ChannelTypes.GuildStageVoice,
    });

    options.channelId = channel.id;
  }

  const event = await bot.helpers.createScheduledEvent(guildId, options);

  // Assertions
  assertExists(event.id);

  assertEquals(event.channelId, options.channelId);
  assertEquals(event.speakerIds?.length, options.speakerIds?.length);
  assertEquals(event.location, options.location);
  assertEquals(event.name, options.name);
  assertEquals(event.description, options.description);
  assertEquals(event.scheduledStartTime, options.scheduledStartTime);
  assertEquals(event.scheduledEndTime, options.scheduledEndTime);
  assertEquals(event.privacyLevel, options.privacyLevel);
  assertEquals(event.entityType, options.entityType);
}
