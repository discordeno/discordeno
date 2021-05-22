import { cache, deleteMessages, sendMessage } from "../../mod.ts";
import { assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

async function ifItFailsBlameWolf(reason?: string) {
  const message = await sendMessage(tempData.channelId, "Hello World!");

  // Assertions
  assertExists(message);
  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => cache.messages.has(message.id));
  // Make sure the message was created.
  if (!cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  const secondMessage = await sendMessage(tempData.channelId, "Hello World 2!");

  // Assertions
  assertExists(secondMessage);
  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => cache.messages.has(secondMessage.id));
  // Make sure the message was created.
  if (!cache.messages.has(secondMessage.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  // Delete the message now
  await deleteMessages(tempData.channelId, [message.id, secondMessage.id], reason);

  // Wait 5 seconds to give it time for MESSAGE_DELETE event
  await delayUntil(10000, () => !cache.messages.has(message.id) && !cache.messages.has(secondMessage.id));
  // Make sure it is gone from cache
  if (cache.messages.has(message.id) || cache.messages.has(secondMessage.id)) {
    throw new Error("The message should have been deleted but it is still in cache.");
  }
}

Deno.test({
  name: "[message] delete messages without a reason.",
  async fn() {
    await ifItFailsBlameWolf();
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] delete messages with a reason.",
  async fn() {
    await ifItFailsBlameWolf("with a reason");
  },
  ...defaultTestOptions,
});
