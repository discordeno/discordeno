import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID, delayUntil } from "../utils.ts";

Deno.test({
  name: "[emoji] Edit an emoji's roles",
  fn: async (t) => {
    const bot = await loadBot();
    const emoji = await bot.helpers.createEmoji(CACHED_COMMUNITY_GUILD_ID, {
      name: "blamewolf",
      image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
      roles: [],
    });

    // Assertions
    assertExists(emoji.id);
    assertEquals(emoji.name, "blamewolf");

    const role = await bot.helpers.createRole(CACHED_COMMUNITY_GUILD_ID, {
      name: "dd-test-emoji",
    });
    await bot.helpers.editEmoji(CACHED_COMMUNITY_GUILD_ID, emoji.id, {
      roles: [role.id],
    });

    const edited = await bot.helpers.getEmoji(CACHED_COMMUNITY_GUILD_ID, emoji.id);

    assertEquals(edited.roles?.length, 1);

    await bot.helpers.deleteEmoji(CACHED_COMMUNITY_GUILD_ID, emoji.id);
    await bot.helpers.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id);
  },
});
