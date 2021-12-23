import { assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function editMessageTest(channelId: bigint) {
  const message = await bot.helpers.sendMessage(channelId, { content: "Hello World!"});

  // Assertions
  assertExists(message);
  // Delay the execution by to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => bot.messages.has(message.id));
  // Make sure the message was created.
  if (!bot.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached. Reason: ${reason}");
  }

  // Edit the message
  await bot.helpers.editMessage(channelId, message.id, {content: "Goodbye World!"});

  // Wait to give it time for MESSAGE_UPDATE event
  // await delayUntil(10000, async () => bot.messages.get(message.id)?.content === "Goodbye World!");
  // Make sure it was edited
  // if (bot.messages.get(message.id)?.content !== "Goodbye World!") {
  // throw new Error("The message should have been edited but it was not.");
  // }
}
