import { cache, createChannel, delay } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertExists } from "../deps.ts";

Deno.test({
  name: "[channel] create a new channel",
  async fn() {
    const channel = await createChannel(tempData.guildId, {
      name: "Discordeno-test",
    });

    // Assertions
    assertExists(channel);

    tempData.channelId = channel.id;

    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delay(5000);

    if (!cache.channels.has(channel.id)) {
      throw new Error(
        "The channel seemed to be created but it was not cached.",
      );
    }
  },
  ...defaultTestOptions,
});
