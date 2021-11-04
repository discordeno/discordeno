import { Bot } from "../../../src/bot.ts";
import { DiscordenoChannel } from "../../../src/transformers/channel.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function cloneChannelTests(bot: Bot, guildId: bigint, channel: DiscordenoChannel, options: {reason?: string}, t: Deno.TestContext) {
  const cloned = await bot.helpers.cloneChannel(channel.id, options.reason);

  //Assertations
  assertExists(cloned);
  assertEquals(cloned.type, channel.type);

  // Delay the execution to allow CHANNEL_CREATE event to be processed
  await delayUntil(10000, () => bot.cache.channels.has(cloned.id));

  assertExists(bot.cache.channels.has(cloned.id));
  assertEquals(channel.topic, cloned.topic);
  assertEquals(channel.bitrate, cloned.bitrate);
  assertEquals(channel.permissionOverwrites.length, cloned.permissionOverwrites.length);
}
