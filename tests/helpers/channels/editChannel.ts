import { assertEquals } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function editChannelTests(guildId: bigint, options: { reason?: string }) {
  // Create the necessary channels
  const channel = await bot.helpers.createChannel(guildId, {
    name: "edit-channel",
  });
  // wait to give it time for events to process
  await delayUntil(3000, () => bot.channels.has(channel.id));
  // Make sure the channel was created.
  if (!bot.channels.has(channel.id)) {
    throw new Error("The channel should have been created but it is not in the cache.");
  }

  // Edit the channel now

  await bot.helpers.editChannel(
    channel.id,
    {
      name: "new-name",
    },
    options.reason,
  );

  // wait to give it time for events to process
  await delayUntil(3000, () => bot.channels.get(channel.id)?.name === "new-name");
  assertEquals(bot.channels.get(channel.id)?.name, "new-name");
}
