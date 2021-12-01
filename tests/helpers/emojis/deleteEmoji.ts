import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function ifItFailsBlameWolf(bot: Bot, guildId: bigint, reason?: string) {
  const emoji = await bot.helpers.createEmoji(guildId, {
    name: "blamewolf",
    image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
    roles: [],
  });

  // Assertions
  assertExists(emoji);

  // Delay the execution to allow event to be processed
  // await delayUntil(10000, async () => bot.guilds.get(guildId)?.emojis?.has(emoji.id));

  // if (!bot.guilds.get(guildId)?.emojis?.has(emoji.id)) {
  //   throw new Error("The emoji seemed to be created but it was not cached.");
  // }

  await bot.helpers.deleteEmoji(guildId, emoji.id, reason);

  // await delayUntil(10000, async () => !bot.guilds.get(guildId)?.emojis?.has(emoji.id));

  // if (bot.guilds.get(guildId)?.emojis?.has(emoji.id)) {
  //   throw new Error("The emoji seemed to be deleted but it's still cached.");
  // }
}

export async function deleteEmojiWithReasonTest(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  await ifItFailsBlameWolf(bot, guildId);
}

export async function deleteEmojiWithoutReasonTest(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  await ifItFailsBlameWolf(bot, guildId, "with a reason");
}
