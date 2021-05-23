import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { sendMessage } from "../../src/helpers/messages/send_message.ts";
import { editMessage } from "../../src/helpers/messages/edit_message.ts";
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

  // Edit the message now
  if (type === "raw") {
    await editMessage(message, "Goodbye World!");
  } else {
    await message.edit("Goodbye World!");
  }
  // Wait 5 seconds to give it time for MESSAGE_UPDATE event
  await delayUntil(10000, () => cache.messages.get(message.id)?.content === "Goodbye World!");

  // Make sure it has been modified in cache
  assertEquals(cache.messages.get(message.id)?.content, "Goodbye World!");
}

Deno.test({
  name: "[message] edit a message",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.edit()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});
