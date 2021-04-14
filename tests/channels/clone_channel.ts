import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { cloneChannel } from "../../src/helpers/channels/clone_channel.ts";
import { delayUntil } from "../util/delay_until.ts";

Deno.test({
  name: "[channel] clone a channel",
  async fn() {
    const cloned = await cloneChannel(tempData.channelId, "testing");

    //Get channel that was cloned
    const originalChannel = cache.channels.get(tempData.channelId);

    //Assertation
    assertExists(cloned);
    assertEquals(cloned.type, originalChannel.type);

    // Delay the execution to allow CHANNEL_CREATE event to be processed
    await delayUntil(10000, () => cache.channels.has(cloned.id));

    if (!cache.channels.has(cloned.id)) {
      throw new Error(`The channel seemed to be cloned but was not cached.`);
    }

    if (originalChannel.topic && cloned.topic !== originalChannel.topic) {
      throw new Error(
        "The clone was supposed to have a topic but it does not appear to be the same topic."
      );
    }

    if (originalChannel.bitrate && cloned.bitrate !== originalChannel.bitrate) {
      throw new Error(
        "The clone was supposed to have a bitrate but it does not appear to be the same bitrate."
      );
    }

    if (
      originalChannel.permissionOverwrites &&
      cloned.permissionOverwrites?.length !==
        originalChannel.permissionOverwrites.length
    ) {
      throw new Error(
        "The clone was supposed to have a permissionOverwrites but it does not appear to be the same permissionOverwrites."
      );
    }
  },
});
