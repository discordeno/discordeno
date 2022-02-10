import { Bot } from "../../../../src/bot.ts";
import { ChannelTypes } from "../../../../types/channels/channelTypes.ts";
import { CreateScheduledEvent, ScheduledEventEntityType } from "../../../../types/guilds/scheduledEvents.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../../constants.ts";
import { assertEquals, assertExists } from "../../../deps.ts";

export async function createScheduledEventTests(
  bot: Bot,
  guildId: bigint,
  options: CreateScheduledEvent,
  t: Deno.TestContext,
) {
  const channel = [
      ScheduledEventEntityType.StageInstance,
      ScheduledEventEntityType.Voice,
      ScheduledEventEntityType.External,
    ].includes(options.entityType)
    ? await bot.helpers.createChannel(guildId, {
      name: "entity",
      type: options.entityType === ScheduledEventEntityType.Voice
        ? ChannelTypes.GuildVoice
        : options.entityType === ScheduledEventEntityType.StageInstance
        ? ChannelTypes.GuildStageVoice
        : ChannelTypes.GuildText,
    })
    : undefined;

  if (channel && options.entityType !== ScheduledEventEntityType.External) options.channelId = channel.id;

  const event = await bot.helpers.createScheduledEvent(guildId, options);

  if (channel && guildId === CACHED_COMMUNITY_GUILD_ID) {
    await bot.helpers.deleteChannel(channel.id);
  }

  // Assertions
  assertExists(event.id);

  assertEquals(event.channelId, options.channelId);
  assertEquals(event.location, options.location);
  assertEquals(event.name, options.name);
  assertEquals(event.description, options.description);
  assertEquals(event.scheduledStartTime, options.scheduledStartTime);
  assertEquals(event.scheduledEndTime, options.scheduledEndTime);
  assertEquals(event.privacyLevel, options.privacyLevel);
  assertEquals(event.entityType, options.entityType);
}
