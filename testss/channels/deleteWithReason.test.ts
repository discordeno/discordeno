import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID, delayUntil } from "../utils.ts";

Deno.test({
  name: "[channel] delete a channel with a reason",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "delete-channel",
    });

    // Make sure the channel was created
    assertExists(channel.id);

    // Delete the channel now with a reason
    await bot.helpers.deleteChannel(channel.id, "with a reason");

    // Check if channel still exists
    const exists = await bot.helpers.getChannel(channel.id);
    assertEquals(exists, undefined);
  },
});
