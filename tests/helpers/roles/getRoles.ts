import { Bot } from "../../../bot.ts";
import { assertEquals } from "../../deps.ts";

export async function getRolesTest(guildId: bigint) {
  const roles = await bot.helpers.getRoles(guildId);

  assertEquals(bot.guilds.get(guildId)?.roles.size, roles.size);
}
