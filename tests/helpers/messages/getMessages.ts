import { assertEquals, assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function getMessagesTest(channelId: bigint) {
  const message = await bot.helpers.sendMessage(channelId, { content: "Hello World!" });
  const secondMessage = await bot.helpers.sendMessage(channelId, { content: "Hello World 2!" });
  const thirdMessage = await bot.helpers.sendMessage(channelId, { content: "Hello World 3!" });

  // Assertions
  assertExists(message);
  assertExists(secondMessage);
  assertExists(thirdMessage);
  // Delay the execution by to allow MESSAGE_CREATE event to be processed
  await delayUntil(
    10000,
    () => bot.messages.has(message.id) && bot.messages.has(secondMessage.id) && bot.messages.has(thirdMessage.id),
  );
  // Make sure the messages was created.
  if (!bot.messages.has(message.id) || !bot.messages.has(secondMessage.id) || !bot.messages.has(thirdMessage.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  // Fetch the messages
  const fetchedMessages = await bot.helpers.getMessages(channelId, {
    after: message.id,
    limit: 2,
  });
  // Check if getMessage has worked
  assertEquals(fetchedMessages?.length, 2);
}
