import { Bot } from "../../../src/bot.ts";
import { CreateGuildBan } from "../../../src/types/mod.ts";
import { assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

const banCounters = new Map<bigint, boolean>();

export async function banTest(bot: Bot, t: Deno.TestContext, guildId: bigint, id: bigint, options?: CreateGuildBan) {
  bot.events.guildBanAdd = function (bot, user, guildId) {
    banCounters.set(user.id, true);
  };

  await bot.helpers.ban(guildId, id, options);

  await delayUntil(10000, () => banCounters.get(id));

  assertEquals(banCounters.get(id), true);
}

export async function getBansTest(bot: Bot, t: Deno.TestContext, guildId: bigint) {
  const bans = await bot.helpers.getBans(guildId);
  assertEquals(bans.size > 1, true);
}

export async function unbanTest(bot: Bot, t: Deno.TestContext, guildId: bigint, id: bigint) {
  bot.events.guildBanRemove = function (bot, user, guildId) {
    banCounters.set(user.id, false);
  };

  await bot.helpers.unbanMember(guildId, id);

  await delayUntil(10000, () => !banCounters.get(id));

  assertEquals(banCounters.get(id), false);
}
