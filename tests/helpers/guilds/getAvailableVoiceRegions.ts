import { assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";

export async function getAvailableVoiceRegionsTests() {
  const regions = await bot.helpers.getAvailableVoiceRegions();

  // Assertions
  assertExists(regions);
}
