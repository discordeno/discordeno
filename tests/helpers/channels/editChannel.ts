import { Bot } from "../../../src/bot.ts";
import { Cache } from "../../../src/cache.ts";
import { assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function editChannelTests(
  bot: Bot<Cache>,
  guildId: bigint,
  options: { reason?: string },
  t: Deno.TestContext
) {
  // Create the necessary channels
  const channel = await bot.helpers.createChannel(guildId, {
    name: "edit-channel",
  });
  // wait 5 seconds to give it time for CHANNEL_CREATE event
  await delayUntil(3000, () => bot.cache.channels.has(channel.id));
  // Make sure the channel was created.
  if (!bot.cache.channels.has(channel.id)) {
    throw new Error("The channel should have been created but it is not in the cache.");
  }

  // Edit the channel now

  await bot.helpers.editChannel(
    channel.id,
    {
      name: "new-name",
    },
    options.reason
  );

  // wait 5 seconds to give it time for CHANNEL_UPDATE event
  await delayUntil(3000, () => bot.cache.channels.get(channel.id)?.name === "new-name");
  assertEquals(bot.cache.channels.get(channel.id)?.name, "new-name");
}
