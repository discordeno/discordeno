import { roleChanges } from "../constants.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

Deno.test({
  name: "[Role] add a role to a member",
  fn: async (t) => {
    const role = await bot.helpers.createRole(guild.id, {
      name: "hoti",
    });

    assertExists(role);

    // Delay the execution to allow event to be processed
    await delayUntil(10000, () => bot.guilds.get(guild.id)?.roles.has(role.id));

    assertExists(bot.guilds.get(guild.id)?.roles.has(role.id));

    bot.events.guildMemberUpdate = function (bot, member, user) {
      roleChanges.set(user.id, member.roles);
    };

    await bot.helpers.addRole(guild.id, bot.id, role.id, "Blame wolf");

    // Delay the execution to allow event to be processed
    await delayUntil(10000, () => roleChanges.get(bot.id)?.includes(role.id));

    assertEquals(roleChanges.get(bot.id)?.includes(role.id), true);
  },
});
