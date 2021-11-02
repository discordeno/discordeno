import { Bot } from "../../../src/bot.ts";
import { CreateGuildChannel } from "../../../src/types/guilds/create_guild_channel.ts";
import { DiscordChannelTypes } from "../../../src/types/mod.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function editGuildTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const guild = await bot.helpers.editGuild(guildId,{
    name: "Discordeno Test 1.0"
  });

  // Assertions
  assertExists(guild);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, async () => (await bot.cache.guilds.get(guild.id))?.name === "Discordeno Test 1.0");

  if (!bot.cache.guilds.has(guild.id)) {
    throw new Error(`The guild seemed to be edited but the cache didn't got updated.`);
  }
}
