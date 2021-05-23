import { botId } from "../../src/bot.ts";
import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { isChannelSynced } from "../../src/helpers/channels/is_channel_synced.ts";
import { DiscordChannelTypes } from "../../src/types/channels/channel_types.ts";
import { DiscordOverwriteTypes } from "../../src/types/channels/overwrite_types.ts";
import { bigintToSnowflake } from "../../src/util/bigint.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[channel] is channel synced.",
  async fn() {
    const category = await createChannel(tempData.guildId, {
      name: "synced-category",
      type: DiscordChannelTypes.GuildCategory,
      permissionOverwrites: [
        {
          id: bigintToSnowflake(botId),
          type: DiscordOverwriteTypes.Member,
          allow: ["VIEW_CHANNEL"],
          deny: [],
        },
      ],
    });

    // Assertions
    assertExists(category);

    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delayUntil(10000, () => cache.channels.has(category.id));

    if (!cache.channels.has(category.id)) {
      throw new Error("The channel seemed to be created but it was not cached.");
    }

    const channel = await createChannel(tempData.guildId, {
      name: "synced-channel",
      parentId: category.id,
    });

    // Assertions
    assertExists(channel);

    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delayUntil(10000, () => cache.channels.has(channel.id));

    if (!cache.channels.has(channel.id)) {
      throw new Error("The channel seemed to be created but it was not cached.");
    }

    const isSynced = await isChannelSynced(channel.id);

    assertEquals(isSynced, true);
  },
  ...defaultTestOptions,
});
