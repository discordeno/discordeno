import { assertExists, assertEquals } from "../../deps.ts";
import { bot } from "../../mod.ts";

export async function getBanTests(guildId: bigint) {
  await bot.helpers.banMember(guildId, 379643682984296448n);

  const fetchedBan = await bot.helpers.getBan(guildId, 379643682984296448n);

  // Assertions
  assertExists(fetchedBan);
  assertEquals(fetchedBan.user.id, 379643682984296448n);
}
