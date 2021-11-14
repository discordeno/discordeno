import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";
import { CreateMessage } from "../../../src/types/messages/createMessage.ts";
import { MessageComponentTypes } from "../../../src/types/messages/components/messageComponentTypes.ts";
import { ButtonStyles } from "../../../src/types/messages/components/buttonStyles.ts";

async function ifItFailsBlameWolf(bot: Bot, channelId: bigint, content: string | CreateMessage) {
  const message = await bot.helpers.sendMessage(channelId, content);
  // Assertions
  assertExists(message);
  // Delay the execution by to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => bot.cache.messages.has(message.id));
  // Make sure the message was created.
  if (!bot.cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }
}

export async function sendMessageWithTextTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  await ifItFailsBlameWolf(bot, channelId, "Hello World!");
}

export async function sendMessageWithComponents(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  await ifItFailsBlameWolf(bot, channelId, {
    content: "Hello World!",
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
}

export async function sendMessageWithEmbedsTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  await ifItFailsBlameWolf(bot, channelId, {
    embeds: [
      {
        title: "Hello World",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at cursus libero. Sed egestas nec ligula sit amet sollicitudin. Curabitur.",
        color: 0x00ff00,
        footer: {
          text: "Discordeno Best Lib",
        },
        author: {
          name: "Cacahe",
        },
      },
      {
        title: "Goodbye World",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean libero enim, blandit tincidunt magna non, auctor pellentesque lacus. Nulla diam.",
        color: 0x0000ff,
        footer: {
          text: "Discordeno Best Lib",
        },
        author: {
          name: "Wolf",
        },
      },
    ],
  });
}
