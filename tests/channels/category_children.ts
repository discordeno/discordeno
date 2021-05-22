import { cache } from "../../src/cache.ts";
import { categoryChildren, createChannel } from "../../src/helpers/mod.ts";
import { DiscordChannelTypes } from "../../src/types/channels/channel_types.ts";
import { assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[channel] category channel ids",
  async fn() {
    const category = await createChannel(tempData.guildId, {
      name: "Discordeno-test",
      type: DiscordChannelTypes.GuildCategory,
    });

    // Assertions
    assertExists(category);
    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delayUntil(10000, () => cache.channels.has(category.id));

    if (!cache.channels.has(category.id)) {
      throw new Error("The channel seemed to be created but it was not cached.");
    }

    const channelsToCreate = [1, 2, 3, 4, 5];
    const channels = await Promise.all(
      channelsToCreate.map((num) =>
        createChannel(tempData.guildId, {
          name: `Discordeno-test-${num}`,
          parentId: category.id,
        })
      )
    );
    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delayUntil(10000, () => channels.every((c) => cache.channels.has(c.id)));

    // If every channel is not present in the cache, error out
    if (!channels.every((c) => cache.channels.has(c.id))) {
      throw new Error("The channels seemed to be created but it was not cached.");
    }

    const ids = await categoryChildren(category.id);
    if (ids.size !== channelsToCreate.length || !channels.every((c) => ids.has(c.id))) {
      throw new Error("The category channel ids did not match with the category channels.");
    }
  },
  ...defaultTestOptions,
});
