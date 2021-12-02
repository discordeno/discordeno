import { assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";

export async function getAuditLogsTests(guildId: bigint) {
  const logs = await bot.helpers.getAuditLogs(guildId);

  // Assertions
  assertExists(logs);
}
