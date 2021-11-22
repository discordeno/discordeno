import { assertEquals } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test({
  name: "[tranform] snowflake to bigint",
  fn: async (t) => {
    assertEquals(130136895395987456n, bot.transformers.snowflake("130136895395987456"));
  },
});
