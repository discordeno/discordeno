import { ChannelTypes } from "../../../src/types/channels/channelTypes.ts";
import { assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function categoryChildrenTest(guildId: bigint) {
  const category = await bot.helpers.createChannel(guildId, {
    name: "Discordeno-test",
    type: ChannelTypes.GuildCategory,
  });

  // Assertions
  assertExists(category);
  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.channels.has(category.id));

  assertExists(bot.channels.has(category.id));

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
  await delayUntil(10000, () => channels.every((c) => bot.channels.has(c.id)));

  // If every channel is not present in the cache, error out
  if (!channels.every((c) => bot.channels.has(c.id))) {
    throw new Error("The channels seemed to be created but it was not cached.");
  }

  // const ids = bot.channels.filter((c) => c.parentId === category.id);
  // if (ids.size !== channels.length || !channels.every((c) => ids.has(c.id))) {
  //   console.log("cccc 1", ids.size, channels.length);
  //   console.log(
  //     "cccc 2",
  //     channels.every((c) => ids.has(c.id)),
  //     ids
  //   );
  //   throw new Error("The category channel ids did not match with the category channels.");
  // }
}
