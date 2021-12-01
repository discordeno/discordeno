import { assertExists } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

Deno.test({
  name: "[Role] delete a role without a reason",
  fn: async (t) => {
    const role = await bot.helpers.createRole(guild.id, { name: "hoti" });

    assertExists(role);

    // Delay the execution to allow event to be processed
    await delayUntil(10000, () => bot.guilds.get(guild.id)?.roles.has(role.id));

    assertExists(bot.guilds.get(guild.id)?.roles.has(role.id));

    await bot.helpers.deleteRole(guild.id, role.id);

    // Delay the execution to allow event to be processed
    await delayUntil(10000, () => !bot.guilds.get(guild.id)?.roles.has(role.id));

    if (bot.guilds.get(guild.id)?.roles.has(role.id)) {
      throw new Error(`The role should have been deleted but it is still in cache.`);
    }
  },
});
