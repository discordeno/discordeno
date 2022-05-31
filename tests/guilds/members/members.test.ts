import { assertEquals, assertExists } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test("[member] fetches the bot and compares the bot's id with the fetched member's id", async () => {
  const bot = loadBot();
  const member = await bot.helpers.getMember(CACHED_COMMUNITY_GUILD_ID, bot.id);
  assertExists(member?.id);
  assertEquals(member?.id, bot.id);
});

Deno.test("[member] Gets a member list and checks if the bot is in the member list", async () => {
  const bot = loadBot();

  const members = await bot.helpers.getMembers(CACHED_COMMUNITY_GUILD_ID, { "limit": 10 });
  assertEquals(members.has(bot.id), true);
});
