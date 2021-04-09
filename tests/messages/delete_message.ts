import { cache, sleep, deleteMessage, sendMessage } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertExists } from "../deps.ts";

Deno.test({
  name: "[message] delete a message without a reason.",
  async fn() {
    const message = await sendMessage(tempData.channelId, "Hello World!");

    // Assertions
    assertExists(message);
    // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
    await sleep(5000);
    // Make sure the message was created.
    if (!cache.messages.has(message.id)) {
      throw new Error(
        "The message seemed to be sent but it was not cached.",
      );
    }

    // Delete the message now without a reason
    await deleteMessage(tempData.channelId, message.id);
    // Wait 5 seconds to give it time for MESSAGE_DELETE event
    await sleep(5000);
    // Make sure it is gone from cache
    if (cache.messages.has(message.id)) {
      throw new Error(
        "The message should have been deleted but it is still in cache.",
      );
    }
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] delete a message with a reason.",
  async fn() {
    const message = await sendMessage(tempData.channelId, "Hello World!");

    // Assertions
    assertExists(message);
    // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
    await sleep(5000);
    // Make sure the message was created.
    if (!cache.messages.has(message.id)) {
      throw new Error(
        "The message seemed to be sent but it was not cached.",
      );
    }

    // Delete the message now without a reason
    await deleteMessage(tempData.channelId, message.id, "with a reason");
    // Wait 5 seconds to give it time for MESSAGE_DELETE event
    await sleep(5000);
    // Make sure it is gone from cache
    if (cache.messages.has(message.id)) {
      throw new Error(
        "The message should have been deleted but it is still in cache.",
      );
    }
  },
  ...defaultTestOptions,
});
