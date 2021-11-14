import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function editEmojiTest(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const emoji = await bot.helpers.createEmoji(guildId, {
    name: "blamewolf",
    image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
    roles: [],
  });

  // Assertions
  assertExists(emoji);

  // Delay the execution to allow event to be processed
  // await delayUntil(10000, async () => bot.cache.guilds.get(guildId)?.emojis?.has(emoji.id));

  // if (!bot.cache.guilds.get(guildId)?.emojis?.has(emoji.id)) {
  //   throw new Error("The emoji seemed to be created but it was not cached.");
  // }

  await bot.helpers.editEmoji(guildId, emoji.id, {
    name: "blamewolf_infinite",
  });

  // await delayUntil(
  //   10000,
  //   async () => bot.cache.guilds.get(guildId)?.emojis?.get(emoji.id)?.name === "blamewolf_infinite"
  // );

  // if (bot.cache.guilds.get(guildId)?.emojis?.get(emoji.id)?.name !== "blamewolf_infinite") {
  //   throw new Error("The emoji seemed to be edited but the cache was not updated.");
  // }
}
