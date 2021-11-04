import { Bot } from "../../../src/bot.ts";
import { DiscordChannelTypes } from "../../../src/types/channels/channel_types.ts";
import { assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function categoryChildrenTest(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  const category = await bot.helpers.createChannel(guildId, {
    name: "Discordeno-test",
    type: DiscordChannelTypes.GuildCategory,
  });

  // Assertions
  assertExists(category);
  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.channels.has(category.id));

  assertExists(bot.cache.channels.has(category.id));

  const channelsToCreate = [1, 2, 3, 4, 5];
  const channels = await Promise.all(
    channelsToCreate.map((num) =>
      bot.helpers.createChannel(guildId, {
        name: `Discordeno-test-${num}`,
        parentId: category.id,
      })
    )
  );
  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => channels.every((c) => bot.cache.channels.has(c.id)));

  // If every channel is not present in the cache, error out
  if (!channels.every((c) => bot.cache.channels.has(c.id))) {
    throw new Error("The channels seemed to be created but it was not cached.");
  }

  const ids = await bot.helpers.categoryChildren(category.id);
  if (ids.size !== channelsToCreate.length || !channels.every((c) => ids.has(c.id))) {
    throw new Error("The category channel ids did not match with the category channels.");
  }
}
