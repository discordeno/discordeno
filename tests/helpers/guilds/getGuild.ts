import { Bot } from "../../../src/bot.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function getGuildTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const fetchedGuild = await bot.helpers.getGuild(guildId);

  // Assertions
  assertExists(fetchedGuild);
  assertEquals(fetchedGuild.id, guildId);
}
