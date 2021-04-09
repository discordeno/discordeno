import { cache, sleep, editMessage, sendMessage } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";

Deno.test({
  name: "[message] edit a message",
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

    // Edit the message now
    await editMessage(message, "Goodbye World!");
    // Wait 5 seconds to give it time for MESSAGE_UPDATE event
    await sleep(5000);

    // Make sure it has been modified in cache
    assertEquals(cache.messages.get(message.id)?.content, "Goodbye World!");
  },
  ...defaultTestOptions,
});
