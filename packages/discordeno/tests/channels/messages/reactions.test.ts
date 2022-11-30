import { assertEquals, assertExists } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test({
  name: "[message] reaction related unit tests",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "reactions" });
    assertExists(channel?.id);

    const message = await bot.helpers.sendMessage(channel.id, {
      content: "discordeno is best lib",
    });
    assertExists(message?.id);

    // Add a reaction
    await t.step("[reactions] add a reaction", async (t) => {
      await bot.helpers.addReaction(channel.id, message.id, "👍");

      // fetch message to validate
      const fetched = await bot.helpers.getMessage(channel.id, message.id);
      assertExists(fetched);
      assertExists(fetched.reactions?.length);
    });

    // Remove a reaction
    await t.step("[reactions] remove a reaction", async () => {
      await bot.helpers.deleteOwnReaction(channel.id, message.id, "👍");

      // fetch message to validate
      const fetched = await bot.helpers.getMessage(channel.id, message.id);
      assertExists(fetched);
      assertEquals(fetched.reactions, undefined);
    });

    // TODO: (tests) Add a custom reaction
    // await t.step("[reactions] add a custom reaction", async () => {
    //   await bot.helpers.addReaction(channel.id, message.id, "<:discordeno:785403373817823272>");

    //   // fetch message to validate
    //   const fetched = await bot.helpers.getMessage(channel.id, message.id);
    //   assertExists(fetched);
    //   assertExists(fetched.reactions?.length);
    // });

    // Remove a custom reaction
    await t.step("[reactions] remove a custom reaction", async () => {
      await bot.helpers.deleteOwnReaction(channel.id, message.id, "<:discordeno:785403373817823272>");

      // fetch message to validate
      const fetched = await bot.helpers.getMessage(channel.id, message.id);
      assertExists(fetched);
      assertEquals(fetched.reactions, undefined);
    });

    // Add multiple reactions
    await t.step("[reactions] add multiple reactions", async (t) => {
      await bot.helpers.addReactions(channel.id, message.id, ["👍", "👎"]);

      // fetch message to validate
      const fetched = await bot.helpers.getMessage(channel.id, message.id);
      assertExists(fetched);
      assertEquals(fetched.reactions?.length, 2);

      // Remove emoji reactions
      await t.step("[reactions] remove reactions by single emoji", async () => {
        await bot.helpers.deleteReactionsEmoji(channel.id, message.id, "👍");

        // fetch message to validate
        const fetched = await bot.helpers.getMessage(channel.id, message.id);
        assertExists(fetched);
        assertEquals(fetched.reactions?.length, 1);
      });
    });

    // TODO: (tests) Add multiple custom reactions
    // await t.step("[reactions] add multiple custom reactions", async (t) => {
    //   await bot.helpers.addReactions(channel.id, message.id, [
    //     "<:discordeno:785403373817823272>",
    //     "<:blamewolf:814955268123000832>",
    //   ]);

    //   // fetch message to validate
    //   const fetched = await bot.helpers.getMessage(channel.id, message.id);
    //   assertExists(fetched);
    //   assertEquals(fetched.reactions?.length, 3);

    //   // Remove all reactions
    //   await t.step("[reactions] remove all reactions", async () => {
    //     await bot.helpers.removeAllReactions(channel.id, message.id);

    //     // fetch message to validate
    //     const fetched = await bot.helpers.getMessage(channel.id, message.id);
    //     assertExists(fetched);
    //     assertEquals(fetched.reactions, undefined);
    //   });
    // });

    // Add multiple reactions in order
    await t.step("[reactions] add multiple reactions in order", async (t) => {
      await bot.helpers.addReactions(channel.id, message.id, ["👍", "👎"], true);

      // fetch message to validate
      const fetched = await bot.helpers.getMessage(channel.id, message.id);
      assertExists(fetched);
      assertEquals(fetched.reactions?.length, 2);
    });

    // TODO: (tests) Add multiple custom reactions in order
    // await t.step("[reactions] add multiple custom reactions in order", async (t) => {
    //   await bot.helpers.addReactions(channel.id, message.id, [
    //     "<:discordeno:785403373817823272>",
    //     "<:blamewolf:814955268123000832>",
    //   ], true);

    //   // fetch message to validate
    //   const fetched = await bot.helpers.getMessage(channel.id, message.id);
    //   assertExists(fetched);
    //   assertEquals(fetched.reactions?.length, 4);
    // });

    await bot.helpers.deleteChannel(channel.id);
  },
});
