import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[channel] Get all channels",
  async fn() {
    const bot = loadBot();
    await Promise.all([
      bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "first" }),
      bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "second" }),
    ]);

    const channels = await bot.helpers.getChannels(CACHED_COMMUNITY_GUILD_ID);

    assertEquals(channels.size > 1, true);
  },
});
