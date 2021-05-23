import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { deleteChannel } from "../../src/helpers/channels/delete_channel.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[channel] delete a channel without a reason.",
  async fn() {
    // Create the necessary channels
    const channel = await createChannel(tempData.guildId, {
      name: "delete-channel",
    });
    // wait 5 seconds to give it time for CHANNEL_CREATE event
    await delayUntil(3000, () => cache.channels.has(channel.id));
    // Make sure the channel was created.
    if (!cache.channels.has(channel.id)) {
      throw new Error("The channel should have been created but it is not in the cache.");
    }

    // Delete the channel now without a reason
    await deleteChannel(channel.id);
    // wait 5 seconds to give it time for CHANNEL_DELETE event
    await delayUntil(3000, () => !cache.channels.has(channel.id));
    // Make sure it is gone from cache
    if (cache.channels.has(channel.id)) {
      throw new Error("The channel should have been deleted but it is still in cache.");
    }
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] delete a channel with a reason.",
  async fn() {
    // Create the necessary channels
    const channel = await createChannel(tempData.guildId, {
      name: "delete-channel",
    });
    // wait 5 seconds to give it time for CHANNEL_CREATE event
    await delayUntil(10000, () => cache.channels.has(channel.id));
    // Make sure the channel was created.
    if (!cache.channels.has(channel.id)) {
      throw new Error("The channel should have been created but it is not in the cache.");
    }

    // Delete the channel now without a reason
    await deleteChannel(channel.id, "with a reason");
    // wait 5 seconds to give it time for CHANNEL_DELETE event
    await delayUntil(10000, () => !cache.channels.has(channel.id));
    // Make sure it is gone from cache
    if (cache.channels.has(channel.id)) {
      throw new Error("The channel should have been deleted but it is still in cache.");
    }
  },
  ...defaultTestOptions,
});
