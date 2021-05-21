import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { delayUntil } from "../util/delay_until.ts";
import { editChannel } from "../../src/helpers/channels/edit_channel.ts";
import { assertEquals } from "../deps.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw", reason?: string) {
  // Create the necessary channels
  const channel = await createChannel(tempData.guildId, {
    name: "edit-channel",
  });
  // wait 5 seconds to give it time for CHANNEL_CREATE event
  await delayUntil(3000, () => cache.channels.has(channel.id));
  // Make sure the channel was created.
  if (!cache.channels.has(channel.id)) {
    throw new Error("The channel should have been created but it is not in the cache.");
  }

  // Edit the channel now
  if (type === "raw") {
    await editChannel(
      channel.id,
      {
        name: "new-name",
      },
      reason
    );
  } else {
    await channel.edit({
      name: "new-name",
    });
  }
  // wait 5 seconds to give it time for CHANNEL_UPDATE event
  await delayUntil(3000, () => cache.channels.get(channel.id)?.name === "new-name");
  assertEquals(cache.channels.get(channel.id)?.name, "new-name");
}

Deno.test({
  name: "[channel] edit a channel without a reason.",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] edit a channel with a reason.",
  async fn() {
    await ifItFailsBlameWolf("raw", "with a reason");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] channel.edit() without a reason.",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] channel.edit() with a reason.",
  async fn() {
    await ifItFailsBlameWolf("getter", "with a reason");
  },
  ...defaultTestOptions,
});
