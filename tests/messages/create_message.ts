import { cache, sendMessage, sleep } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertExists } from "../deps.ts";

Deno.test({
  name: "[message] send a new message",
  async fn() {
    const message = await sendMessage(tempData.channelId, "Hello World!");

    // Assertions
    assertExists(message);

    // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
    await sleep(5000);

    if (!cache.messages.has(message.id)) {
      throw new Error(
        "The message seemed to be sent but it was not cached.",
      );
    }
  },
  ...defaultTestOptions,
});
