import { Bot } from "../../../src/bot.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function getBanTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  await bot.helpers.banMember(guildId, 379643682984296448n);

  const fetchedBan = await bot.helpers.getBan(guildId, 379643682984296448n);

  // Assertions
  assertExists(fetchedBan);
  assertEquals(fetchedBan.user.id, 379643682984296448n);
}
