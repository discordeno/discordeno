import { defaultTestOptions } from "../ws/start_bot.ts";
import { assertEquals } from "../deps.ts";
import { validDiscoveryTerm } from "../../src/helpers/discovery/valid_discovery_term.ts";

Deno.test({
  name: "[discovery] get categories",
  async fn() {
    const valid = await validDiscoveryTerm("Bots");

    assertEquals(valid, true);
  },
  ...defaultTestOptions,
});
