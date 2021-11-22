import { assertEquals } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test({
  name: "[discovery] Validate a discovery search term",
  fn: async (t) => {
    const valid = await bot.helpers.validDiscoveryTerm("Bots");

    assertEquals(valid, true);
  },
});
