import { assertEquals } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test({
  name: "[discovery] get categories from discovery",
  fn: async (t) => {
    const categories = await bot.helpers.getDiscoveryCategories();

    assertEquals(categories.size > 0, true);
  },
});
