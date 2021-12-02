import { DiscordenoChannel } from "../../../src/transformers/channel.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { bot, channel } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function cloneChannelTests(
  options: { reason?: string },
) {
  // @ts-ignore for itoh
  const cloned = await bot.helpers.cloneChannel(channel, options.reason);

  //Assertations
  assertExists(cloned);
  assertEquals(cloned.type, channel.type);

  // Delay the execution to allow CHANNEL_CREATE event to be processed
  await delayUntil(10000, () => bot.channels.has(cloned.id));

  assertExists(bot.channels.has(cloned.id));
  assertEquals(channel.topic, cloned.topic);
  assertEquals(channel.bitrate, cloned.bitrate);
  assertEquals(channel.permissionOverwrites.length, cloned.permissionOverwrites.length);
}
