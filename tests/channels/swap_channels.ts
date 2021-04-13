import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { delayUntil } from "../util/delay_until.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { isChannelSynced } from "../../src/helpers/channels/is_channel_synced.ts";
import { DiscordChannelTypes } from "../../src/types/channels/channel_types.ts";
import { botId } from "../../src/bot.ts";
import { DiscordOverwriteTypes } from "../../src/types/channels/overwrite_types.ts";
import { startTyping } from "../../src/helpers/channels/start_typing.ts";
import { swapChannels } from "../../src/helpers/channels/swap_channels.ts";

Deno.test({
  name: "[channel] swap channels",
  async fn() {
    const channel = await createChannel(tempData.guildId, {
      name: "channel-1",
    });

    // Assertions
    assertExists(channel);

    const secondChannel = await createChannel(tempData.guildId, {
      name: "channel-2",
    });

    // Assertions
    assertExists(channel);

    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delayUntil(
      10000,
      () =>
        cache.channels.has(channel.id) && cache.channels.has(secondChannel.id),
    );

    if (
      !cache.channels.has(channel.id) || !cache.channels.has(secondChannel.id)
    ) {
      throw new Error(
        "The channel seemed to be created but it was not cached.",
      );
    }

    await swapChannels(tempData.guildId, [
      {
        id: channel.id,
        position: secondChannel.position!,
      },
      {
        id: secondChannel.id,
        position: channel.position!,
      },
    ]);

    // Delay the execution by 5 seconds to allow CHANNEL_UPDATE event to be processed
    await delayUntil(
      10000,
      () =>
        cache.channels.get(channel.id)?.position === secondChannel.position &&
        cache.channels.get(secondChannel.id)?.position === channel.position,
    );

    assertEquals(
      cache.channels.get(channel.id)?.position,
      secondChannel.position,
    );

    assertEquals(
      cache.channels.get(secondChannel.id)?.position,
      channel.position,
    );
  },
  ...defaultTestOptions,
});
