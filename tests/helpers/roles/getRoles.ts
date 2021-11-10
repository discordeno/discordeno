import { Bot } from "../../../src/bot.ts";
import { Cache } from "../../../src/cache.ts";
import { assertEquals } from "../../deps.ts";

export async function getRolesTest(bot: Bot<Cache>, guildId: bigint, t: Deno.TestContext) {
  const roles = await bot.helpers.getRoles(guildId);

  assertEquals(bot.cache.guilds.get(guildId)?.roles.size, roles.size);
}
