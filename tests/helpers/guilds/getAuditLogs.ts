import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";

export async function getAuditLogsTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const logs = await bot.helpers.getAuditLogs(guildId);

  // Assertions
  assertExists(logs);
}
