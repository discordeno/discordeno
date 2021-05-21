import { cache } from "../../src/cache.ts";
import { sendMessage } from "../../src/helpers/messages/send_message.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw", content: "string" | "embed" | "reply" = "string") {
  const channel = cache.channels.get(tempData.channelId);
  assertExists(channel);

  // deno-lint-ignore no-explicit-any
  let messageContent: any = "Hello World!";
  let secondMessageId = undefined;
  if (content === "embed") {
    messageContent = {
      content: "Hello World!",
      embed: {
        title: "Hello, Embed!",
        description: "This is an embedded message.",
        color: 0x41ebf4,
        fields: [],
      },
    };
  } else if (content === "reply") {
    const message = await sendMessage(channel!.id, "Test Message");
    assertExists(message);
    // Wait few seconds for the channel create event to arrive and cache it
    await delayUntil(10000, () => cache.messages.has(message.id));

    secondMessageId = message.id;

    messageContent = {
      content: "Hi",
      allowedMentions: {
        repliedUser: true,
      },
      messageReference: {
        messageId: message.id,
        channelId: channel?.id,
        guildId: tempData.guildId,
        failIfNotExists: true,
      },
    };
  }

  const message = type === "raw" ? await sendMessage(channel!.id, messageContent) : await channel?.send(messageContent);

  // Assertions
  assertExists(message);

  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => cache.messages.has(message!.id));

  if (!cache.messages.has(message!.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  if (content === "string") {
    assertEquals(cache.messages.get(message!.id)?.content, messageContent);
  } else if (content === "embed") {
    assertEquals(cache.messages.get(message!.id)?.embeds?.length, 1);
  } else {
    assertEquals(cache.messages.get(message!.id)?.messageReference?.messageId, secondMessageId);
  }
}

Deno.test({
  name: "[message] send a new message",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] channel.send()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] send a new message with an embed",
  async fn() {
    await ifItFailsBlameWolf("raw", "embed");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] channel.send() with an embed",
  async fn() {
    await ifItFailsBlameWolf("getter", "embed");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] send a message with a reply",
  async fn() {
    await ifItFailsBlameWolf("raw", "reply");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] channel.send() with a reply",
  async fn() {
    await ifItFailsBlameWolf("getter", "reply");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.reply()",
  async fn() {
    const channel = cache.channels.get(tempData.channelId);
    assertExists(channel);

    const message = await sendMessage(channel!.id, "Test Message");
    assertExists(message);
    // Wait few seconds for the channel create event to arrive and cache it
    await delayUntil(10000, () => cache.messages.has(message!.id));

    const reply = await message.reply("Welcome!");
    await delayUntil(10000, () => cache.messages.has(reply!.id));

    if (!cache.messages.has(reply!.id)) {
      throw new Error("The message seemed to be sent but it was not cached.");
    }

    assertEquals(cache.messages.get(reply.id)?.messageReference?.messageId, message.id);
  },
  ...defaultTestOptions,
});
