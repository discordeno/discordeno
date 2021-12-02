import { assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";

export async function getBansTests(guildId: bigint) {
  await bot.helpers.banMember(guildId, 416477607966670869n);
  await bot.helpers.banMember(guildId, 635383782576357407n);

  const fetchedBans = await bot.helpers.getBans(guildId);

  // Assertions
  assertExists(fetchedBans);

  if (fetchedBans.size === 0) {
    throw new Error("getBans didn't return any ban, but it should have returned at least 2 bans!");
  }
}
