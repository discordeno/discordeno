import { ButtonStyles, ChannelTypes, delay, MessageComponentTypes } from "../../../mod.ts";
import { assertEquals, assertExists, assertRejects } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test({
  name: "[messages] Run message related unit tests",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
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

    // Send a message with embeds
    await t.step("[message] Send a message with embeds", async () => {
      const message = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
        embeds: [
          {
            title: "Deno",
            description: "Deno is a modern web platform for building the web.",
            url: "https://deno.land/",
            color: 0x00ff00,
            fields: [
              {
                name: "Deno",
                value: "Deno is a modern web platform for building the web.",
                inline: true,
              },
              {
                name: "Deno",
                value: "Deno is a modern web platform for building the web.",
                inline: true,
              },
            ],
            footer: {
              text: "Deno",
              iconUrl: "https://deno.land/favicon.ico",
            },
            image: {
              url: "https://deno.land/favicon.ico",
            },
            thumbnail: {
              url: "https://deno.land/favicon.ico",
            },
          },
        ],
      });
      assertExists(message.id);
      assertEquals(message.content, "Hello Skillz");
      assertEquals(message.embeds.length, 1);
      assertEquals(message.embeds[0].title, "Deno");
      assertEquals(message.embeds[0].description, "Deno is a modern web platform for building the web.");
      assertEquals(message.embeds[0].url, "https://deno.land/");
      assertEquals(message.embeds[0].color, 0x00ff00);
      assertEquals(message.embeds[0].fields?.length, 2);
      assertEquals(message.embeds[0].fields?.[0].name, "Deno");
      assertEquals(message.embeds[0].fields?.[0].value, "Deno is a modern web platform for building the web.");
      assertEquals(message.embeds[0].fields?.[0].inline, true);
      assertEquals(message.embeds[0].fields?.[1].name, "Deno");
      assertEquals(message.embeds[0].fields?.[1].value, "Deno is a modern web platform for building the web.");
      assertEquals(message.embeds[0].fields?.[1].inline, true);
      assertEquals(message.embeds[0].footer?.text, "Deno");
      assertEquals(message.embeds[0].footer?.iconUrl, "https://deno.land/favicon.ico");
      assertEquals(message.embeds[0].image?.url, "https://deno.land/favicon.ico");
      assertEquals(message.embeds[0].thumbnail?.url, "https://deno.land/favicon.ico");
    });

    // Send a message with components
    await t.step("[message] Send a message with components", async () => {
      const message = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
        components: [
          {
            type: MessageComponentTypes.ActionRow,
            components: [
              {
                type: MessageComponentTypes.Button,
                label: "Doc",
                style: ButtonStyles.Link,
                url: `https://discordeno.mod.land/`,
              },
              {
                type: MessageComponentTypes.Button,
                label: "Server",
                style: ButtonStyles.Link,
                url: `https://discord.gg/ddeno`,
              },
            ],
          },
          {
            type: MessageComponentTypes.ActionRow,
            components: [
              {
                type: MessageComponentTypes.Button,
                label: "Hi",
                customId: `hi`,
                style: ButtonStyles.Primary,
              },
            ],
          },
        ],
      });
      assertExists(message.id);
      assertEquals(message.content, "Hello Skillz");
      assertEquals(message.components?.length, 2);
      assertEquals(message.components?.[0].type, MessageComponentTypes.ActionRow);
      assertEquals(message.components?.[0].components?.length, 2);
      assertEquals(message.components?.[0].components?.[0].type, MessageComponentTypes.Button);
      assertEquals(message.components?.[0].components?.[0].label, "Doc");
      assertEquals(message.components?.[0].components?.[0].style, ButtonStyles.Link);
      assertEquals(message.components?.[0].components?.[0].url, `https://discordeno.mod.land/`);
      assertEquals(message.components?.[0].components?.[1].type, MessageComponentTypes.Button);
      assertEquals(message.components?.[0].components?.[1].label, "Server");
      assertEquals(message.components?.[0].components?.[1].style, ButtonStyles.Link);
      assertEquals(message.components?.[0].components?.[1].url, `https://discord.gg/ddeno`);
      assertEquals(message.components?.[1].type, MessageComponentTypes.ActionRow);
      assertEquals(message.components?.[1].components?.length, 1);
      assertEquals(message.components?.[1].components?.[0].type, MessageComponentTypes.Button);
      assertEquals(message.components?.[1].components?.[0].label, "Hi");
      assertEquals(message.components?.[1].components?.[0].customId, `hi`);
      assertEquals(message.components?.[1].components?.[0].style, ButtonStyles.Primary);
    });

    // Edit the message
    await t.step("[message] Edit the message", async () => {
      const message = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message.id);
      assertEquals(message.content, "Hello Skillz");
      const editedMessage = await bot.helpers.editMessage(channel.id, message.id, {
        content: "Hello Skillz 2",
        embeds: [
          {
            title: "Deno",
            description: "Deno is a modern web platform for building the web.",
          },
        ],
      });

      assertEquals(editedMessage.content, "Hello Skillz 2");
      assertEquals(editedMessage.embeds.length, 1);
      assertEquals(editedMessage.embeds[0].title, "Deno");
      assertEquals(editedMessage.embeds[0].description, "Deno is a modern web platform for building the web.");
    });

    // Delete the message with a reason
    await t.step("[message] Delete the message with a reason", async () => {
      const message = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message.id);
      assertEquals(message.content, "Hello Skillz");

      await bot.helpers.deleteMessage(channel.id, message.id, "Test");
      await assertRejects(() => bot.helpers.getMessage(channel.id, message.id));
    });

    // Delete the message without a reason
    await t.step("[message] Delete the message with a reason", async () => {
      const message = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message.id);
      assertEquals(message.content, "Hello Skillz");

      await bot.helpers.deleteMessage(channel.id, message.id);
      await assertRejects(() => bot.helpers.getMessage(channel.id, message.id));
    });

    // Bulk delete messages with a reason
    await t.step("[message] Bulk delete messages with a reason", async () => {
      const message1 = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message1.id);
      assertEquals(message1.content, "Hello Skillz");

      const message2 = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz 2",
      });
      assertExists(message2.id);
      assertEquals(message2.content, "Hello Skillz 2");

      await bot.helpers.deleteMessages(channel.id, [message1.id, message2.id], "Test");
      await assertRejects(() => bot.helpers.getMessage(channel.id, message1.id));
      await assertRejects(() => bot.helpers.getMessage(channel.id, message2.id));
    });

    // Bulk delete messages without a reason
    await t.step("[message] Bulk delete messages without a reason", async () => {
      const message1 = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message1.id);
      assertEquals(message1.content, "Hello Skillz");

      const message2 = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz 2",
      });
      assertExists(message2.id);
      assertEquals(message2.content, "Hello Skillz 2");

      await bot.helpers.deleteMessages(channel.id, [message1.id, message2.id]);
      await delay(3000);
      await assertRejects(() => bot.helpers.getMessage(channel.id, message1.id));
      await assertRejects(() => bot.helpers.getMessage(channel.id, message2.id));
    });

    // Get a message
    await t.step("[message] Get a message", async () => {
      const message = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message.id);
      assertEquals(message.content, "Hello Skillz");

      const getMessage = await bot.helpers.getMessage(channel.id, message.id);
      assertExists(getMessage);
      assertEquals(getMessage.content, message.content);
      assertEquals(getMessage.id, message.id);
    });

    // Pin a message
    await t.step("[message] Pin a message", async (t) => {
      const message = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message.id);
      assertEquals(message.content, "Hello Skillz");

      await bot.helpers.pinMessage(channel.id, message.id);
      const pinnedMessages = await bot.helpers.getPinnedMessages(channel.id);
      assertEquals(pinnedMessages.size, 1);
      assertEquals(pinnedMessages.first()?.content, message.content);
      assertEquals(pinnedMessages.first()?.id, message.id);

      // Unpin a message
      await t.step("[message] Unpin a message", async () => {
        await bot.helpers.unpinMessage(channel.id, message.id);
        const pinnedMessages = await bot.helpers.getPinnedMessages(channel.id);
        assertEquals(pinnedMessages.size, 0);
      });
    });

    // Fetch multiple messages
    await t.step("[message] Fetch multiple messages", async () => {
      const message1 = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz",
      });
      assertExists(message1.id);
      assertEquals(message1.content, "Hello Skillz");

      const message2 = await bot.helpers.sendMessage(channel.id, {
        content: "Hello Skillz 2",
      });
      assertExists(message2.id);
      assertEquals(message2.content, "Hello Skillz 2");

      const messages = await bot.helpers.getMessages(channel.id, {
        limit: 2,
      });
      assertEquals(messages.size, 2);
      assertEquals(messages.get(message1.id)?.content, message1.content);
      assertEquals(messages.get(message2.id)?.content, message2.content);
    });

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});
