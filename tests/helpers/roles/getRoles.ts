import { Bot } from "../../../src/bot.ts";
import { assertEquals } from "../../deps.ts";

export async function getRolesTest(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const roles = await bot.helpers.getRoles(guildId);

  assertEquals(bot.guilds.get(guildId)?.roles.size, roles.size);
}
