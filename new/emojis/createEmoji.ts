import { assertExists } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

export default async function () {
  const emoji = await bot.helpers.createEmoji(guild.id, {
    name: "blamewolf",
    image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
    roles: [],
  });

  // Assertions
  assertExists(emoji);
  const emojiId = emoji.id;
  assertExists(emojiId);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.guilds.get(guild.id)?.emojis.has(emojiId));

  // TODO: Uncomment when cache plugin got fixed
  // if (!bot.guilds.get(guild.id)?.emojis.has(emojiId)) {
  //   throw new Error("The emoji seemed to be created but it was not cached.");
  // }

  return emoji;
}
