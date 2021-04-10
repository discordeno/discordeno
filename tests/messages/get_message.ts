import { cache, getMessage, sendMessage } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";

Deno.test({
  name: "[message] fetch a message",
  async fn() {
    const message = await sendMessage(tempData.channelId, "Hello World!");

    // Assertions
    assertExists(message);
    // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
    delayUntil(10000, () => cache.messages.has(message.id));
    // Make sure the message was created.
    if (!cache.messages.has(message.id)) {
      throw new Error("The message seemed to be sent but it was not cached.");
    }

    // Fetch the message
    const fetchedMessage = await getMessage(tempData.channelId, message.id);
    // Check if getMessage has worked
    assertEquals(fetchedMessage.id, message.id);
    assertEquals(fetchedMessage.content, message.content);
  },
  ...defaultTestOptions,
});
