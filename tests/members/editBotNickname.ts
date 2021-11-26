import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test("editBotNickname", function () {
  const nick = "lts20050703";
  const nickname = bot.helpers.editBotNickname(guild.id, { nick });
  assertEquals(nickname, nick);
});
