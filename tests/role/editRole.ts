import { assertExists,assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

Deno.test({
  name: "[Role] edit a role",
  fn: async () => {
    const role = await bot.helpers.createRole(guild.id, {
      name: "hoti",
    });

    assertExists(role);

    // Delay the execution to allow event to be processed
    await delayUntil(10000, () => bot.cache.guilds.get(guild.id)?.roles.has(role.id));

    if (!bot.cache.guilds.get(guild.id)?.roles.has(role.id)) {
      throw new Error(`The role seemed to be created but it was not cached.`);
    }

    await bot.helpers.editRole(guild.id, role.id, {
      name: "#rememberAyntee",
    });

    // Delay the execution to allow event to be processed
    await delayUntil(10000, () => bot.cache.guilds.get(guild.id)?.roles.get(role.id)?.name === "#rememberAyntee");

    assertEquals(bot.cache.guilds.get(guild.id)?.roles.get(role.id)?.name === "#rememberAyntee", true);
  },
});
