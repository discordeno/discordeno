import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test({
  name: "[Role] get all roles on a server",
  fn: async (t) => {
    const roles = await bot.helpers.getRoles(guild.id);

    assertEquals(bot.cache.guilds.get(guild.id)?.roles.size, roles.size);
  },
});
