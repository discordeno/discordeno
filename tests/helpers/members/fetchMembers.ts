import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";

export async function fetchSingleMemberTest(
  bot: Bot,
  guildId: bigint,
  t: Deno.TestContext
) {
  const fetchedMember = await bot.helpers.fetchMembers(guildId, 0, {
      userIds: [bot.id],
      limit: 1,
  });

  // Assertions
  assertExists(fetchedMember);
}
