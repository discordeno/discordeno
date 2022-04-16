import { assertExists } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";
import { Emoji } from "../../transformers/emoji.ts";

export default async function (emoji: Emoji) {
  const emojiId = emoji.id;
  assertExists(emojiId);

  await bot.helpers.deleteEmoji(guild.id, emojiId);

  await delayUntil(10000, () => !bot.guilds.get(guild.id)?.emojis.has(emojiId));

  if (bot.guilds.get(guild.id)?.emojis?.has(emojiId)) {
    throw new Error("The emoji seemed to be deleted but it's still cached.");
  }
}
