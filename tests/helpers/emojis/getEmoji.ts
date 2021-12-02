import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function getEmojiTest(guildId: bigint) {
  const emoji = await bot.helpers.createEmoji(guildId, {
    name: "blamewolf",
    image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
    roles: [],
  });

  // Assertions
  assertExists(emoji);

  // // Delay the execution to allow event to be processed
  // await delayUntil(10000, async () => bot.guilds.get(guildId)?.emojis?.has(emoji.id));

  // if (!bot.guilds.get(guildId)?.emojis?.has(emoji.id)) {
  //   throw new Error("The emoji seemed to be created but it was not cached.");
  // }

  // bot.guilds.get(guildId)?.emojis?.delete(emoji.id);

  // const getEmoji = await bot.helpers.getEmoji(guildId, emoji.id, true);

  // // Assertions
  // assertExists(getEmoji);

  // // Delay the execution to allow event to be processed
  // await delayUntil(10000, async () => bot.guilds.get(guildId)?.emojis?.has(emoji.id));

  // if (!bot.guilds.get(guildId)?.emojis?.has(emoji.id)) {
  //   throw new Error("The emoji didn't got added to cache after using the getEmoji function.");
  // }
}
