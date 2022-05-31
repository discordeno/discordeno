import { assertEquals } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test("[misc] edit a bot's nickname", async function () {
  const bot = loadBot();

  const nick = "lts20050703";
  const nickname = await bot.helpers.editBotNickname(CACHED_COMMUNITY_GUILD_ID, { nick });
  assertEquals(nickname, nick);

  // Change nickname back
  const nickname2 = await bot.helpers.editBotNickname(CACHED_COMMUNITY_GUILD_ID, { nick: null });
  assertEquals(nickname2, undefined);
});
