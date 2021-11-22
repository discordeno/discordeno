import { Bot } from "../../../src/bot.ts";
import { Cache } from "../../../src/cache.ts";
import { assertEquals, assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

const roleChanges = new Map<bigint, bigint[]>();

export async function addRoleTest(bot: Bot<Cache>, guildId: bigint, options: { reason?: string }, t: Deno.TestContext) {
  const role = await bot.helpers.createRole(guildId, {
    name: "hoti",
  });

  assertExists(role);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.guilds.get(guildId)?.roles.has(role.id));

  assertExists(bot.cache.guilds.get(guildId)?.roles.has(role.id));

  bot.events.guildMemberUpdate = function (bot, member, user) {
    roleChanges.set(user.id, member.roles);
  };

  await bot.helpers.addRole(guildId, bot.id, role.id, options.reason);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => roleChanges.get(bot.id)?.includes(role.id));

  assertEquals(roleChanges.get(bot.id)?.includes(role.id), true);
}

export async function removeRoleTest(
  bot: Bot<Cache>,
  guildId: bigint,
  options: { reason?: string },
  t: Deno.TestContext
) {
  
}
