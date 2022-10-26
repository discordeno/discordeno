import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[misc] Get gateway bot information",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const data = await bot.helpers.getGatewayBot();

    assertExists(data);
    assertEquals(data.url, "wss://gateway.discord.gg");
    assertEquals(data.shards, 1);
    assertEquals(data.sessionStartLimit.total, 1000);
    assertEquals(data.sessionStartLimit.maxConcurrency, 1);
  },
});
