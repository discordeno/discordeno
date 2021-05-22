import { addReaction, cache, removeReactionEmoji, sendMessage } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw") {
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
    await removeReactionEmoji(message.channelId, message.id, "❤");
  } else {
    await message.removeReactionEmoji("❤");
  }

  // Delay the execution by 5 seconds to allow MESSAGE_REACTION_REMOVE_ALL event to be processed
  await delayUntil(10000, () => cache.messages.get(message.id)?.reactions === undefined);

  // Check if the reactions has been deleted
  assertEquals(cache.messages.get(message.id)?.reactions, undefined);
}

Deno.test({
  name: "[message] remove a reaction emoji",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.removeReactionEmoji()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});
