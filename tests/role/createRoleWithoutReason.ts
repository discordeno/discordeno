import { assertExists } from "../deps.ts";
import { createRoleTests } from "../helpers/roles/createRole.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

Deno.test({
  name: "[Role] create a role without a reason",
  fn: async (t) => {
    await createRoleTests(guild.id, {});

    const role = await bot.helpers.createRole(guild.id, { name: "hoti" });

    assertExists(role);

    // Delay the execution to allow event to be processed
    await delayUntil(10000, () => bot.guilds.get(guild.id)?.roles.has(role.id));

    assertExists(bot.guilds.get(guild.id)?.roles.has(role.id));
  },
});
