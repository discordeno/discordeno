import { cache, getMessages, sendMessage } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";

Deno.test({
  name: "[message] fetch messages",
  async fn() {
    const message = await sendMessage(tempData.channelId, "Hello World!");
    const secondMessage = await sendMessage(tempData.channelId, "Hello World 2!");
    const thirdMessage = await sendMessage(tempData.channelId, "Hello World 3!");

    // Assertions
    assertExists(message);
    assertExists(secondMessage);
    assertExists(thirdMessage);
    // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
    await delayUntil(
      10000,
      () =>
        cache.messages.has(message.id) && cache.messages.has(secondMessage.id) && cache.messages.has(thirdMessage.id)
    );
    // Make sure the message was created.
    if (
      !cache.messages.has(message.id) ||
      !cache.messages.has(secondMessage.id) ||
      !cache.messages.has(thirdMessage.id)
    ) {
      throw new Error("The message seemed to be sent but it was not cached.");
    }

    // Fetch the messages
    const fetchedMessages = await getMessages(tempData.channelId, {
      after: message.id,
      limit: 2,
    });
    // Check if getMessages has worked
    assertEquals(fetchedMessages.size, 2);
  },
  ...defaultTestOptions,
});
