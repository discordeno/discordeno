import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";

export async function fetchSingleMemberTest(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  await bot.helpers.fetchMembers(guildId, 0, {
    userIds: [bot.id],
    limit: 1,
  });

  // Assertions
  assertExists(bot.cache.members.get(BigInt(`${bot.id}${guildId}`)));
}
