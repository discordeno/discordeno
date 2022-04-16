import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

export default async function () {
  const emojis = await bot.helpers.getEmojis(guild.id);

  assertEquals(emojis.size > 0, true);
}
