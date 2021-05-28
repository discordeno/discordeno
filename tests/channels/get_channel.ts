import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { getChannel } from "../../src/helpers/channels/get_channel.ts";
import { assertEquals } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[channel] get a channel",
  async fn() {
    // Create the necessary channels
    const channel = await createChannel(tempData.guildId, {
      name: "get-channel",
    });
    // wait 5 seconds to give it time for CHANNEL_CREATE event
    await delayUntil(3000, () => cache.channels.has(channel.id));
    // Make sure the channel was created.
    if (!cache.channels.has(channel.id)) {
      throw new Error("The channel should have been created but it is not in the cache.");
    }

    cache.channels.delete(channel.id);

    // Delete the channel now without a reason
    await getChannel(channel.id);
    await delayUntil(3000, () => cache.channels.has(channel.id));

    assertEquals(cache.channels.has(channel.id), true);
  },
  ...defaultTestOptions,
});
