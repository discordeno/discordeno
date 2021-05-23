import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { getPins } from "../../src/helpers/channels/get_pins.ts";
import { sendMessage } from "../../src/helpers/messages/send_message.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[channel] get pins.",
  async fn() {
    const channel = await createChannel(tempData.guildId, {
      name: "pins-channel",
    });

    // Assertions
    assertExists(channel);

    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delayUntil(10000, () => cache.channels.has(channel.id));

    if (!cache.channels.has(channel.id)) {
      throw new Error("The channel seemed to be created but it was not cached.");
    }

    const message = await sendMessage(tempData.channelId, "Hello World!");
    const secondMessage = await sendMessage(tempData.channelId, "Goodbye World!");

    // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
    await delayUntil(10000, () => cache.messages.has(message.id) && cache.messages.has(secondMessage.id));

    await message.pin();
    await secondMessage.pin();

    const pins = await getPins(tempData.channelId);

    assertEquals(pins.length, 2);
  },
  ...defaultTestOptions,
});
