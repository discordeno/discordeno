import { Bot } from "../../../bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function createEmojiTest(guildId: bigint) {
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
}
