import { Bot } from "../../../src/bot.ts";
import { Channel } from "../../../src/types/channels/channel.ts";
import { SnakeCasedPropertiesDeep } from "../../../src/types/util.ts";
import { delayUntil } from "../../utils.ts";

export async function deleteChannelTests(bot: Bot, guildId: bigint, options: { reason?: string }, t: Deno.TestContext) {
  // Create the necessary channels
  const channel = await bot.helpers.createChannel(guildId, {
    name: "delete-channel",
  });

  await delayUntil(10000, () => bot.cache.channels.has(channel.id));
  // Make sure the channel was created.
  if (!bot.cache.channels.has(channel.id)) {
    throw new Error("The channel should have been created but it is not in the cache.");
  }

  const CHANNEL_DELETE = bot.handlers.CHANNEL_DELETE;
  
  // Delete the channel now without a reason
  await bot.helpers.deleteChannel(channel.id, options.reason);
  // wait to give it time for event
  await delayUntil(10000, () => !bot.cache.channels.has(channel.id));
  // Make sure it is gone from cache
  if (bot.cache.channels.has(channel.id)) {
    throw new Error("The channel should have been deleted but it is still in cache.");
  }
}
