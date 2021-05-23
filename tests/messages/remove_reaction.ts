import { addReaction, cache, removeReaction, sendMessage } from "../../mod.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw", user = false) {
  const message = await sendMessage(tempData.channelId, "Hello World!");

  // Assertions
  assertExists(message);
  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => cache.messages.has(message.id));
  // Make sure the message was created.
  if (!cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  // Add reactions to the message
  await addReaction(message.channelId, message.id, "❤");
  // Delay the execution by 5 seconds to allow MESSAGE_REACTION_ALL event to be processed
  await delayUntil(10000, () => cache.messages.get(message.id)?.reactions?.length === 1);

  // Be sure that the message has the reactions
  assertEquals(await cache.messages.get(message.id)?.reactions?.length, 1);

  if (type === "raw") {
    await removeReaction(message.channelId, message.id, "❤", user ? { userId: message.authorId } : undefined);
  } else {
    await message.removeReaction("❤", user ? message.authorId : undefined);
  }

  // Delay the execution by 5 seconds to allow MESSAGE_REACTION_REMOVE_ALL event to be processed
  await delayUntil(10000, () => cache.messages.get(message.id)?.reactions === undefined);

  // Check if the reactions has been deleted
  assertEquals(await cache.messages.get(message.id)?.reactions, undefined);
}

Deno.test({
  name: "[message] remove a reaction",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.removeReaction()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] remove a user reaction",
  async fn() {
    await ifItFailsBlameWolf("raw", true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.removeReaction with user",
  async fn() {
    await ifItFailsBlameWolf("getter", true);
  },
  ...defaultTestOptions,
});
