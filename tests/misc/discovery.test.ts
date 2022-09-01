import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[discovery] get categories from discovery",
  fn: async (t) => {
    const bot = loadBot();
    const categories = await bot.helpers.getDiscoveryCategories();

    assertEquals(categories.size > 0, true);
  },
});

Deno.test({
  name: "[discovery] Validate a discovery search term",
  fn: async (t) => {
    const bot = loadBot();
    const valid = await bot.helpers.getIsValidDiscoveryTerm("Bots");

    assertEquals(valid, true);
  },
});
