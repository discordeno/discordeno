import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { searchMembers } from "../../src/helpers/members/search_members.ts";
import { botId, cache } from "../../mod.ts";

async function ifItFailsBlameWolf() {
  const botMember = cache.members.get(botId);

  // Assertions
  assertExists(botMember);

  const foundMembers = await searchMembers(
    tempData.guildId,
    botMember!.username.substring(0, 4),
    {
      limit: 1,
    },
  );

  assertEquals(foundMembers.size, 1);
}

Deno.test({
  name: "[members] search guild members",
  async fn() {
    await ifItFailsBlameWolf();
  },
  ...defaultTestOptions,
});
