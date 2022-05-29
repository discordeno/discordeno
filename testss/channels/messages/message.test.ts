import { ChannelTypes } from "../../../mod.ts";
import { assertEquals, assertExists, assertNotEquals } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test({
  name: "[messages] Run message related unit tests",
  async fn(t) {
    const bot = await loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "Discordeno-test",
      type: ChannelTypes.GuildText,
    });

    // Assertions
    assertExists(channel.id);

    // Send a message with text
    await t.step("[message] Send a message with text", async () => {
      const message = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message.id);
      assertEquals(message.content, "Hello Skillz");
    });

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

// Deno.test({
//     name: "[message] send message with text",
//     fn: async (t) => {
//       await sendMessageWithTextTest(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] send message with embeds",
//     fn: async (t) => {
//       await sendMessageWithEmbedsTest(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] send message with components",
//     fn: async (t) => {
//       await sendMessageWithComponents(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] edit message",
//     fn: async (t) => {
//       await editMessageTest(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] delete message without a reason",
//     fn: async (t) => {
//       await deleteMessageWithoutReasonTest(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] delete message with a reason",
//     fn: async (t) => {
//       await deleteMessageWithReasonTest(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] delete messages without a reason",
//     fn: async (t) => {
//       await deleteMessagesWithoutReasonTest(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] delete messages with a reason",
//     fn: async (t) => {
//       await deleteMessagesWithReasonTest(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] fetch a message",
//     fn: async (t) => {
//       await getMessageTest(channel.id);
//     },
//     ...sanitizeMode,
//   });
//   Deno.test({
//     name: "[message] fetch messages",
//     fn: async (t) => {
//       await getMessagesTest(channel.id);
//     },
//     ...sanitizeMode,
//   });

//   Deno.test({
//     name: "[message] pin a message",
//     fn: async (t) => {
//       await pinMessageTests(channel.id, message.id);
//     },
//     ...sanitizeMode,
//   });
