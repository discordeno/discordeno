import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID, delayUntil } from "../utils.ts";

Deno.test({
  name: "[emoji] get all guild emojis",
  fn: async (t) => {
    const bot = await loadBot();
    const emoji = await bot.helpers.createEmoji(CACHED_COMMUNITY_GUILD_ID, {
      name: "blamewolf",
      image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
      roles: [],
    });

    const emoji2 = await bot.helpers.createEmoji(CACHED_COMMUNITY_GUILD_ID, {
      name: "blamewolf2",
      image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
      roles: [],
    });

    // Assertions
    assertExists(emoji.id);
    assertExists(emoji2.id);

    const exists = await bot.helpers.getEmojis(CACHED_COMMUNITY_GUILD_ID);
    assertEquals(exists.size > 1, true);

    await bot.helpers.deleteEmoji(CACHED_COMMUNITY_GUILD_ID, emoji.id);
    await bot.helpers.deleteEmoji(CACHED_COMMUNITY_GUILD_ID, emoji2.id);
  },
});
