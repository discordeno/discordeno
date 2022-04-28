import { assertEquals, assertExists, assertThrows, assertThrowsAsync } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[channel] delete a channel without a reason",
  async fn(t) {
    const bot = loadBot();
    // Create a channel to delete
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "delete-channel",
    });

    // Make sure the channel was created
    assertExists(channel.id);

    // Delete the channel now without a reason
    await bot.helpers.deleteChannel(channel.id);

    // Check if channel still exists
    const exists = await bot.helpers.getChannel(channel.id);
    assertEquals(exists, undefined);
  },
});
