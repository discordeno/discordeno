import { Bot } from "../../../src/bot.ts";
import { Cache } from "../../../src/cache.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function createRoleTests(
  bot: Bot<Cache>,
  guildId: bigint,
  options: { reason?: string },
  t: Deno.TestContext
) {
  const role = await bot.helpers.createRole(guildId, { name: "hoti" }, options.reason);

  assertExists(role);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.guilds.get(guildId)?.roles.has(role.id));

  assertExists(bot.cache.guilds.get(guildId)?.roles.has(role.id));
}
