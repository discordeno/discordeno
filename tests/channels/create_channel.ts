import { botId } from "../../src/bot.ts";
import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { DiscordChannelTypes } from "../../src/types/channels/channel_types.ts";
import { DiscordOverwriteTypes } from "../../src/types/channels/overwrite_types.ts";
import { CreateGuildChannel } from "../../src/types/guilds/create_guild_channel.ts";
import { bigintToSnowflake } from "../../src/util/bigint.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

async function ifItFailsBlameWolf(options: CreateGuildChannel, save = false) {
  const channel = await createChannel(tempData.guildId, options);

  // Assertions
  assertExists(channel);
  assertEquals(channel.type, options.type || DiscordChannelTypes.GuildText);

  if (save) tempData.channelId = channel.id;

  // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
  await delayUntil(10000, () => cache.channels.has(channel.id));

  if (!cache.channels.has(channel.id)) {
    throw new Error("The channel seemed to be created but it was not cached.");
  }

  if (options.topic && channel.topic !== options.topic) {
    throw new Error("The channel was supposed to have a topic but it does not appear to be the same topic.");
  }

  if (options.bitrate && channel.bitrate !== options.bitrate) {
    throw new Error("The channel was supposed to have a bitrate but it does not appear to be the same bitrate.");
  }

  if (options.permissionOverwrites && channel.permissionOverwrites?.length !== options.permissionOverwrites.length) {
    throw new Error(
      "The channel was supposed to have a permissionOverwrites but it does not appear to be the same permissionOverwrites."
    );
  }
}

Deno.test({
  name: "[channel] create a new text channel",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-test" }, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] create a new category channel",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-test",
        type: DiscordChannelTypes.GuildCategory,
      },
      true
    );
  },
  ...defaultTestOptions,
});

// Deno.test({
//   name: "[channel] create a new news channel",
//   async fn() {
//     await ifItFailsBlameWolf({ name: "Discordeno-test", type: DiscordChannelTypes.GUILD_NEWS}, true);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] create a new store channel",
//   async fn() {
//     await ifItFailsBlameWolf({ name: "Discordeno-test", type: DiscordChannelTypes.GUILD_STORE}, true);
//   },
//   ...defaultTestOptions,
// });

Deno.test({
  name: "[channel] create a new voice channel",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-test",
        type: DiscordChannelTypes.GuildVoice,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] create a new voice channel with a bitrate",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "discordeno-test",
        type: DiscordChannelTypes.GuildVoice,
        bitrate: 32000,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] create a new voice channel with a user limit",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-test",
        type: DiscordChannelTypes.GuildVoice,
        userLimit: 32,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] create a new text channel with a rate limit per user",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-test",
        rateLimitPerUser: 2423,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] create a new text channel with NSFW",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-test", nsfw: true }, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] create a new text channel with permission overwrites",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-test",
        permissionOverwrites: [
          {
            id: bigintToSnowflake(botId),
            type: DiscordOverwriteTypes.Member,
            allow: ["VIEW_CHANNEL"],
            deny: [],
          },
        ],
      },
      true
    );
  },
  ...defaultTestOptions,
});
// TODO: Need to validate tests for these options
// /** Sorting position of the channel */
// position?: number;
