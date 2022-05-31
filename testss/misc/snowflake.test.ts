import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[tranform] snowflake to bigint",
  fn: async (t) => {
    const bot = loadBot();
    assertEquals(130136895395987456n, bot.transformers.snowflake("130136895395987456"));
  },
});
