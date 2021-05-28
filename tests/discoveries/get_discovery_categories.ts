import { defaultTestOptions } from "../ws/start_bot.ts";
import { assertEquals } from "../deps.ts";
import { getDiscoveryCategories } from "../../src/helpers/discovery/get_discovery_categories.ts";

Deno.test({
  name: "[discovery] get categories",
  async fn() {
    const categories = await getDiscoveryCategories();

    assertEquals(categories.size > 0, true);
  },
  ...defaultTestOptions,
});
