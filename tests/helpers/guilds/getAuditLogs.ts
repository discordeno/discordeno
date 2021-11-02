import { Bot } from "../../../src/bot.ts";
import { CreateGuildChannel } from "../../../src/types/guilds/create_guild_channel.ts";
import { DiscordChannelTypes } from "../../../src/types/mod.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function getAuditLogsTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const logs = await bot.helpers.getAuditLogs(guildId);

  // Assertions
  assertExists(logs);
}
