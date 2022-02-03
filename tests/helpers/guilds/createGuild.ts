import { assertEquals, assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function createGuildTests() {
  const guild = await bot.helpers.createGuild({
    name: "Isekai Maid Fake Server",
  });

  // Assertions
  assertExists(guild);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.guilds.has(guild.id));

  if (!bot.guilds.has(guild.id)) {
    throw new Error(`The guild seemed to be created but it was not cached.`);
  }
}
