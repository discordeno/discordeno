import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[channel] Get a channel",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "fetching",
    });

    const fetched = await bot.helpers.getChannel(channel.id);
    assertExists(fetched);
    assertEquals(channel.id, fetched.id);
    assertEquals(channel.name, fetched.name);

    await bot.helpers.deleteChannel(channel.id);
  },
});
