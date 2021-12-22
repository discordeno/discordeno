import { Bot } from "../../../src/bot.ts";
import { assertEquals, assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function editRoleTests(guildId: bigint) {
  const role = await bot.helpers.createRole(guildId, {
    name: "hoti",
  });

  assertExists(role);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.guilds.get(guildId)?.roles.has(role.id));

  if (!bot.guilds.get(guildId)?.roles.has(role.id)) {
    throw new Error(`The role seemed to be created but it was not cached.`);
  }

  await bot.helpers.editRole(guildId, role.id, {
    name: "#rememberAyntee",
  });

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.guilds.get(guildId)?.roles.get(role.id)?.name === "#rememberAyntee");

  assertEquals(bot.guilds.get(guildId)?.roles.get(role.id)?.name === "#rememberAyntee", true);
}
