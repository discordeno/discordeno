import { Bot } from "../../../src/bot.ts";
import { assertEquals, assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function getMessagesTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  const message = await bot.helpers.sendMessage(channelId, "Hello World!");
  const secondMessage = await bot.helpers.sendMessage(channelId, "Hello World 2!");
  const thirdMessage = await bot.helpers.sendMessage(channelId, "Hello World 3!");

  // Assertions
  assertExists(message);
  assertExists(secondMessage);
  assertExists(thirdMessage);
  // Delay the execution by to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => bot.cache.messages.has(message.id) && bot.cache.messages.has(secondMessage.id) && bot.cache.messages.has(thirdMessage.id));
  // Make sure the messages was created.
  if (
      !bot.cache.messages.has(message.id) ||
      !bot.cache.messages.has(secondMessage.id) ||
      !bot.cache.messages.has(thirdMessage.id)
  ) {
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
