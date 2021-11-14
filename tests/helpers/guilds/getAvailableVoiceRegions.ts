import { Bot } from "../../../src/bot.ts";
import { assertExists, assertEquals } from "../../deps.ts";

export async function getAvailableVoiceRegionsTests(bot: Bot, t: Deno.TestContext) {
  const regions = await bot.helpers.getAvailableVoiceRegions();

  // Assertions
  assertExists(regions);
}
