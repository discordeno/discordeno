import { addReactions, cache, removeAllReactions, sendMessage } from "../../mod.ts";
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
  await addReactions(message.channelId, message.id, ["❤", "😃", "🤫"]);
  // Delay the execution by 5 seconds to allow MESSAGE_REACTION_ALL event to be processed
  await delayUntil(10000, () => cache.messages.get(message.id)?.reactions?.length === 3);

  // Be sure that the message has the reactions
  assertEquals(await cache.messages.get(message.id)?.reactions?.length, 3);

  if (type === "raw") {
    await removeAllReactions(message.channelId, message.id);
  } else {
    await message.removeAllReactions();
  }

  // Delay the execution by 5 seconds to allow MESSAGE_REACTION_REMOVE_ALL event to be processed
  await delayUntil(10000, () => cache.messages.get(message.id)?.reactions === undefined);

  // Check if the reactions has been deleted
  assertEquals(await cache.messages.get(message.id)?.reactions, undefined);
}

Deno.test({
  name: "[message] remove all reactions",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.removeAllReactions()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});
