import { assertEquals } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test("[misc] edit a bot's nickname", async function () {
  const bot = loadBot();

  const nick = "lts20050703";
  const member = await bot.helpers.editBotMember(CACHED_COMMUNITY_GUILD_ID, { nick });
  assertEquals(member.nick, nick);

  // Change nickname back
  const member2 = await bot.helpers.editBotMember(CACHED_COMMUNITY_GUILD_ID, { nick: null });
  assertEquals(member2.nick, undefined);
});
