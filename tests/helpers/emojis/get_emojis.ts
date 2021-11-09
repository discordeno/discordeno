import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function getEmojisTest(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const emoji = await bot.helpers.createEmoji(guildId, {
    name: "blamewolf",
    image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
    roles: [],
  });

  // Assertions
  assertExists(emoji);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, async () => bot.cache.guilds.get(guildId)?.emojis?.has(emoji.id));

  if (!bot.cache.guilds.get(guildId)?.emojis?.has(emoji.id)) {
    throw new Error("The emoji seemed to be created but it was not cached.");
  }

  const emojis = await bot.helpers.getEmojis(guildId);

  if (emojis.size === 0) {
    throw new Error("The getEmojis function returned 0 emojis.");
  }
}
