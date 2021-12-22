import { assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

async function ifItFailsBlameWolf(channelId: bigint, reason?: string) {
  const message = await bot.helpers.sendMessage(channelId, "Hello World!");

  // Assertions
  assertExists(message);
  // Delay the execution by to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => bot.messages.has(message.id));
  // Make sure the message was created.
  if (!bot.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached. Reason: ${reason}");
  }

  // Delete the message now
  await bot.helpers.deleteMessage(channelId, message.id, reason);

  // Wait to give it time for MESSAGE_DELETE event
  await delayUntil(10000, () => !bot.messages.has(message.id));
  // Make sure it is gone from cache
  if (bot.messages.has(message.id)) {
    throw new Error("The message should have been deleted but it is still in cache.");
  }
}

export async function deleteMessageWithoutReasonTest(channelId: bigint) {
  await ifItFailsBlameWolf(channelId);
}

export async function deleteMessageWithReasonTest(channelId: bigint) {
  await ifItFailsBlameWolf(channelId, "with a reason");
}
