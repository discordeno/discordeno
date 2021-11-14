import { Bot } from "../../../src/bot.ts";
import { CreateGuildChannel } from "../../../src/types/guilds/createGuildChannel.ts";
import { ChannelTypes } from "../../../src/types/mod.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";
import { getAvailableVoiceRegions } from "../../../src/helpers/guilds/getAvailableVoiceRegions.ts";

export async function getBansTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  await bot.helpers.banMember(guildId, 416477607966670869n);
  await bot.helpers.banMember(guildId, 635383782576357407n);

  const fetchedBans = await bot.helpers.getBans(guildId);

  // Assertions
  assertExists(fetchedBans);

  if (fetchedBans.size === 0) {
    throw new Error("getBans didn't return any ban, but it should have returned at least 2 bans!");
  }
}
