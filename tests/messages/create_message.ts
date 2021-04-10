import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { sendMessage } from "../../src/helpers/messages/send_message.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { delayUntil } from "../util/delay_until.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw") {
  const channel = await createChannel(tempData.guildId, {
    name: "Discordeno-test",
  });

  assertExists(channel);
  // Wait few seconds for the channel create event to arrive and cache it
  delayUntil(3000, () => cache.channels.has(channel.id));

  const message = type === "raw"
    ? await sendMessage(channel.id, "Hello World!")
    : await channel.send("Hello World!");

  // Assertions
  assertExists(message);

  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  delayUntil(3000, () => cache.messages.has(message.id));

  if (!cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }
}

Deno.test({
  name: "[message] send a new message",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] channel.send()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});
