import { Bot } from "../../../bot.ts";
import { assertEquals, assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function getMessageTest(channelId: bigint) {
  const message = await bot.helpers.sendMessage(channelId, { content: "Hello World!" });

  // Assertions
  assertExists(message);
  // Delay the execution by to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => bot.messages.has(message.id));
  // Make sure the message was created.
  if (!bot.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached. Reason: ${reason}");
  }

  // Fetch the message
  const fetchedMessage = await bot.helpers.getMessage(channelId, message.id);
  // Check if getMessage has worked
  assertEquals(fetchedMessage.id, message.id);
  assertEquals(fetchedMessage.content, message.content);
}
