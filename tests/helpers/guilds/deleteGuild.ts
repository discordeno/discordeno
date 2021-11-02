import { Bot } from "../../../src/bot.ts";
import { CreateGuildChannel } from "../../../src/types/guilds/create_guild_channel.ts";
import { DiscordChannelTypes } from "../../../src/types/mod.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function deleteGuildTests(bot: Bot, t: Deno.TestContext) {
  const guild = await bot.helpers.createGuild({
    name: "Isekai Maid Fake Server"
  });

  // Assertions
  assertExists(guild);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.guilds.has(guild.id));

  if (!bot.cache.guilds.has(guild.id)) {
    throw new Error(`The guild seemed to be created but it was not cached.`);
  }

  await bot.helpers.deleteGuild(guild.id);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => !bot.cache.guilds.has(guild.id));

  if (bot.cache.guilds.has(guild.id)) {
    throw new Error(`The guild seemed to be deleted but it's still cached.`);
  }
}
