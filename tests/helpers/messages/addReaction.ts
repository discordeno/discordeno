import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function addReactionTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  const message = await bot.helpers.sendMessage(channelId, "Hello World!");

  // Assertions
  assertExists(message);
  // Delay the execution by to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => bot.cache.messages.has(message.id));
  // Make sure the message was created.
  if (!bot.cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  // Delete the message now
  await bot.helpers.addReaction(channelId, message.id, "☑️");

  // Wait to give it time for MESSAGE_UPDATE event
  await delayUntil(10000, async () => ((await bot.cache.messages.get(message.id))?.reactions?.length ?? 0) > 0);
  // Make sure it is gone from cache
  if ((await bot.cache.messages.get(message.id))?.reactions?.length === 0) {
    throw new Error("The message should have got a reaction but it doesn't have any.");
  }
}
