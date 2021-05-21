import { cache, getPins, pin, sendMessage, unpin } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { DiscordenoMessage } from "../../src/structures/message.ts";
import { delayUntil } from "../util/delay_until.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw") {
  const message = await sendMessage(tempData.channelId, "Hello World!");

  // Assertions
  assertExists(message);

  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => cache.messages.has(message.id));

  if (!cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  await pin(message.channelId, message.id);

  // Be sure that the pin got added
  const pins = await getPins(tempData.channelId);
  assertEquals(pins.filter((msg: DiscordenoMessage) => msg.id === message.id).length, 1);

  if (type === "raw") {
    await unpin(message.channelId, message.id);
  } else {
    //await message.unpin();
  }

  // Be sure that the pin got removed
  const removedPins = await getPins(tempData.channelId);
  assertEquals(removedPins.filter((msg: DiscordenoMessage) => msg.id === message.id).length, 0);
}

Deno.test({
  name: "[message] unpin a message",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

/*
Deno.test({
  name: "[message] message.unpin()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});*/
