import { assertExists, assertEquals } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../constants.ts";

Deno.test({
  name: "[slash] Create a guild slash command",
  fn: async (t) => {
    let commands = new Map();
    await t.step({
      name: "[slash] Gets a bot's slash commands in a guild",
      fn: async (t) => {
        commands = await bot.helpers.getApplicationCommands(CACHED_COMMUNITY_GUILD_ID);
      },
    });

    if (commands.has("test")) {
      await t.step({
        name: "[slash] Delete a guild slash command",
        fn: async (t) => {
          await bot.helpers.deleteApplicationCommand(commands.get("test").id, CACHED_COMMUNITY_GUILD_ID);
          commands.delete("test");
          assertEquals(commands.has("test"), false);
        },
      });
    }

    await bot.helpers.createApplicationCommand(
      {
        name: "test",
        description: "Test slash command from the ddeno unit tests",
      },
      CACHED_COMMUNITY_GUILD_ID
    );
  },
});
