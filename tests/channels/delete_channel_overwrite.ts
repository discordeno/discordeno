import { botId } from "../../src/bot.ts";
import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { deleteChannelOverwrite } from "../../src/helpers/channels/delete_channel_overwrite.ts";
import { DiscordChannelTypes } from "../../src/types/channels/channel_types.ts";
import { DiscordOverwriteTypes } from "../../src/types/channels/overwrite_types.ts";
import { CreateGuildChannel } from "../../src/types/guilds/create_guild_channel.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

async function ifItFailsBlameWolf(options: CreateGuildChannel, _save = false) {
  const channel = await createChannel(tempData.guildId, options);

  // Assertions
  assertExists(channel);
  assertEquals(channel.type, options.type || DiscordChannelTypes.GUILD_TEXT);

  // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
  await delayUntil(10000, () => cache.channels.has(channel.id));

  if (!cache.channels.has(channel.id)) {
    throw new Error("The channel seemed to be created but it was not cached.");
  }

  if (
    options.permissionOverwrites &&
    channel.permissionOverwrites?.length !== options.permissionOverwrites.length
  ) {
    throw new Error(
      "The channel was supposed to have a permissionOverwrites but it does not appear to be the same permissionOverwrites.",
    );
  }

  await deleteChannelOverwrite(channel.guildId, channel.id, botId);

  await delayUntil(
    10000,
    () => cache.channels.get(channel.id)?.permissionOverwrites?.length === 0,
  );

  if (cache.channels.get(channel.id)?.permissionOverwrites?.length !== 0) {
    throw new Error(
      "The channel permission overwrite was supposed to be deleted but it does not appear to be.",
    );
  }
}

Deno.test({
  name: "[channel] create a new text channel with permission overwrites",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-test",
        permissionOverwrites: [
          {
            id: botId,
            type: DiscordOverwriteTypes.MEMBER,
            allow: ["VIEW_CHANNEL"],
            deny: [],
          },
        ],
      },
      true,
    );
  },
  ...defaultTestOptions,
});
