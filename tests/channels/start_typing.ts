import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { startTyping } from "../../src/helpers/channels/start_typing.ts";
import { assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[channel] is typing.",
  async fn() {
    const channel = await createChannel(tempData.guildId, {
      name: "typing-channel",
    });

    // Assertions
    assertExists(channel);

    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delayUntil(10000, () => cache.channels.has(channel.id));

    if (!cache.channels.has(channel.id)) {
      throw new Error("The channel seemed to be created but it was not cached.");
    }

    await startTyping(channel.id);
  },
  ...defaultTestOptions,
});
