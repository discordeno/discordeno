import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

async function ifItFailsBlameWolf(bot: Bot, channelId: bigint, reason?: string) {
  const message = await bot.helpers.sendMessage(channelId, "Hello World!");
  const secondMessage = await bot.helpers.sendMessage(channelId, "Hello World 2!");

  // Assertions
  assertExists(message);
  assertExists(secondMessage);
  // Delay the execution by to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => bot.messages.has(message.id) && bot.messages.has(secondMessage.id));
  // Make sure the message was created.
  if (!bot.messages.has(message.id) || !bot.messages.has(secondMessage.id)) {
    throw new Error(`The message seemed to be sent but it was not cached. Reason: ${reason}`);
  }

  // Delete the messages now
  await bot.helpers.deleteMessages(channelId, [message.id, secondMessage.id], reason);

  // Wait to give it time for MESSAGE_DELETE event
  await delayUntil(10000, () => !bot.messages.has(message.id) && !bot.messages.has(secondMessage.id));
  // Make sure they are gone from cache
  if (bot.messages.has(message.id) || bot.messages.has(secondMessage.id)) {
    throw new Error("The messages should have been deleted but they are still in cache.");
  }
}

export async function deleteMessagesWithoutReasonTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  await ifItFailsBlameWolf(bot, channelId);
}

export async function deleteMessagesWithReasonTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  await ifItFailsBlameWolf(bot, channelId, "with a reason");
}
