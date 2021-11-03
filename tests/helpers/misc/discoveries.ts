import { Bot } from "../../../src/bot.ts";
import { assertEquals } from "../../deps.ts";

export async function getDiscoveryCategoriesTest(bot: Bot, t: Deno.TestContext) {
  const categories = await bot.helpers.getDiscoveryCategories();

  assertEquals(categories.size > 0, true);
}

export async function validDiscoveryTermTest(bot: Bot, t: Deno.TestContext) {
  const valid = await bot.helpers.validDiscoveryTerm("Bots");

  assertEquals(valid, true);
}
