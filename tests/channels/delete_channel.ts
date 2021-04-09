import { cache, createChannel, delay, deleteChannel } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[channel] delete a channel without a reason.",
  async fn() {
    // Create the necessary channels
    const channel = await createChannel(tempData.guildId, {
      name: "delete-channel",
    });
    // wait 5 seconds to give it time for CHANNEL_CREATE event
    await delay(5000);
    // Make sure the channel was created.
    if (!cache.channels.has(channel.id))
      throw new Error(
        "The channel should have been created but it is not in the cache."
      );

    // Delete the channel now without a reason
    await deleteChannel(tempData.guildId, channel.id);
    // wait 5 seconds to give it time for CHANNEL_DELETE event
    await delay(5000);
    // Make sure it is gone from cache
    if (cache.channels.has(channel.id))
      throw new Error(
        "The channel should have been deleted but it is still in cache."
      );
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
      await delay(5000);
      // Make sure the channel was created.
      if (!cache.channels.has(channel.id))
        throw new Error(
          "The channel should have been created but it is not in the cache."
        );
        
      // Delete the channel now without a reason
      await deleteChannel(tempData.guildId, channel.id, "with a reason");
      // wait 5 seconds to give it time for CHANNEL_DELETE event
      await delay(5000);
      // Make sure it is gone from cache
      if (cache.channels.has(channel.id))
        throw new Error(
          "The channel should have been deleted but it is still in cache."
        );
    },
    ...defaultTestOptions,
  });