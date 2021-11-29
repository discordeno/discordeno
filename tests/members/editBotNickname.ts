import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test("[misc] edit a bot's nickname", async function () {
  const nick = "lts20050703";
  const nickname = await bot.helpers.editBotNickname(guild.id, { nick });
  assertEquals(nickname, nick);
});
