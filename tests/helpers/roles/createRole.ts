import { assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function createRoleTests(guildId: bigint, options: { reason?: string }) {
  const role = await bot.helpers.createRole(guildId, { name: "hoti" }, options.reason);

  assertExists(role);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.guilds.get(guildId)?.roles.has(role.id));

  assertExists(bot.guilds.get(guildId)?.roles.has(role.id));
}
