import { Bot } from "../../../src/bot.ts";
import { CreateGuildChannel } from "../../../src/types/guilds/createGuildChannel.ts";
import { ChannelTypes } from "../../../src/types/mod.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function createGuildTests(bot: Bot, t: Deno.TestContext) {
  const guild = await bot.helpers.createGuild({
    name: "Isekai Maid Fake Server",
  });

  // Assertions
  assertExists(guild);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.guilds.has(guild.id));

  if (!bot.cache.guilds.has(guild.id)) {
    throw new Error(`The guild seemed to be created but it was not cached.`);
  }
}
