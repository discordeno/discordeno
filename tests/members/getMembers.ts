import { bot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../constants.ts";
import { assertEquals } from "../deps.ts";

Deno.test("[member] Gets a member list and checks if the bot is in the member list", async () => {
  const members = await bot.helpers.getMembers(CACHED_COMMUNITY_GUILD_ID, { memberCount: 10 });
  assertEquals(members.has(bot.id), true);
});
