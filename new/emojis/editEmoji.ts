import { assertEquals, assertExists } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";
import { Emoji } from "../../transformers/emoji.ts";

export default async function (emoji: Emoji) {
  const emojiId = emoji.id;
  assertExists(emojiId);

  await bot.helpers.editEmoji(guild.id, emojiId, { name: "blamewolf_infinite" });

  await delayUntil(10000, () => bot.guilds.get(guild.id)?.emojis.get(emojiId)?.name === "blamewolf_infinite");

  // TODO: Uncomment when cache plugin got fixed
  // assertEquals(bot.guilds.get(guild.id)?.emojis.get(emojiId)?.name, "blamewolf_infinite");
}
