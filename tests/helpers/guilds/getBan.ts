import { Bot } from "../../../src/bot.ts";
import { CreateGuildChannel } from "../../../src/types/guilds/create_guild_channel.ts";
import { DiscordChannelTypes } from "../../../src/types/mod.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";
import { getAvailableVoiceRegions } from "../../../src/helpers/guilds/get_available_voice_regions.ts";

export async function getBanTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  await bot.helpers.ban(guildId, 379643682984296448n);

  const fetchedBan = await bot.helpers.getBan(guildId, 379643682984296448n);

  // Assertions
  assertExists(fetchedBan);
  assertEquals(fetchedBan.user.id, 379643682984296448n);
}
