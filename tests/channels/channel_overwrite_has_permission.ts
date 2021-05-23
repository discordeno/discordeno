import { botId } from "../../src/bot.ts";
import { cache } from "../../src/cache.ts";
import { channelOverwriteHasPermission } from "../../src/helpers/channels/channel_overwrite_has_permission.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { DiscordChannelTypes } from "../../src/types/channels/channel_types.ts";
import { DiscordOverwriteTypes } from "../../src/types/channels/overwrite_types.ts";
import { CreateGuildChannel } from "../../src/types/guilds/create_guild_channel.ts";
import { bigintToSnowflake } from "../../src/util/bigint.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

async function ifItFailsBlameWolf(options: CreateGuildChannel) {
  const channel = await createChannel(tempData.guildId, options);

  // Assertions
  assertExists(channel);
  assertEquals(channel.type, options.type || DiscordChannelTypes.GuildText);

  // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
  await delayUntil(10000, () => cache.channels.has(channel.id));

  if (!cache.channels.has(channel.id)) {
    throw new Error("The channel seemed to be created but it was not cached.");
  }

  if (options.permissionOverwrites && channel.permissionOverwrites?.length !== options.permissionOverwrites.length) {
    throw new Error(
      "The channel was supposed to have a permissionOverwrites but it does not appear to be the same permissionOverwrites."
    );
  }

  assertEquals(
    channelOverwriteHasPermission(
      channel.guildId,
      botId,
      cache.channels.get(channel.id)?.permissionOverwrites || [],
      options.permissionOverwrites ? options.permissionOverwrites[0].allow : []
    ),
    true
  );
}

Deno.test({
  name: "[channel] edit channel permission overwrites",
  async fn() {
    await ifItFailsBlameWolf({
      name: "Discordeno-test",
      permissionOverwrites: [
        {
          id: bigintToSnowflake(botId),
          type: DiscordOverwriteTypes.Member,
          allow: ["VIEW_CHANNEL"],
          deny: [],
        },
      ],
    });
  },
  ...defaultTestOptions,
});
