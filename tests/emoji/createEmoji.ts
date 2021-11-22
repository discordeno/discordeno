import { assertExists } from "../deps.ts";
import { bot,guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

Deno.test({
  name: "[emoji] create an emoji",
  fn: async (t) => {
    const emoji = await bot.helpers.createEmoji(guild.id, {
      name: "blamewolf",
      image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
      roles: [],
    });
  
    // Assertions
    assertExists(emoji);
  
    // Delay the execution to allow event to be processed
    await delayUntil(10000, async () => bot.cache.guilds.get(guild.id)?.emojis?.has(emoji.id));
  
    if (!bot.cache.guilds.get(guild.id)?.emojis?.has(emoji.id)) {
      throw new Error("The emoji seemed to be created but it was not cached.");
    }
  },
});
