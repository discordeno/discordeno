import { assertExists, assertEquals } from "../../deps.ts";
import { bot } from "../../mod.ts";

export async function getGuildTests(guildId: bigint) {
  const fetchedGuild = await bot.helpers.getGuild(guildId);

  // Assertions
  assertExists(fetchedGuild);
  assertEquals(fetchedGuild.id, guildId);
}
