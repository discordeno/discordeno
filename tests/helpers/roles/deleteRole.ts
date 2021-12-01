import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function deleteRoleTests(bot: Bot, guildId: bigint, options: { reason?: string }, t: Deno.TestContext) {
  const role = await bot.helpers.createRole(guildId, { name: "hoti" }, options.reason);

  assertExists(role);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.guilds.get(guildId)?.roles.has(role.id));

  assertExists(bot.guilds.get(guildId)?.roles.has(role.id));

  await bot.helpers.deleteRole(guildId, role.id);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => !bot.guilds.get(guildId)?.roles.has(role.id));

  if (bot.guilds.get(guildId)?.roles.has(role.id)) {
    throw new Error(`The role should have been deleted but it is still in cache.`);
  }
}
