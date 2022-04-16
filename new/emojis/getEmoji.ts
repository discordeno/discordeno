import { assertExists } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { Emoji } from "../../transformers/emoji.ts";

export default async function (emoji: Emoji) {
  const emojiId = emoji.id;
  assertExists(emojiId);
  const getEmoji = await bot.helpers.getEmoji(guild.id, emojiId);

  // Assertions
  assertExists(getEmoji);
}
