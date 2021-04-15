import { botId } from "../../src/bot.ts";
import { cache } from "../../src/cache.ts";
import { cloneChannel } from "../../src/helpers/channels/clone_channel.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { DiscordChannelTypes } from "../../src/types/channels/channel_types.ts";
import { DiscordOverwriteTypes } from "../../src/types/channels/overwrite_types.ts";
import { CreateGuildChannel } from "../../src/types/guilds/create_guild_channel.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

// TODO: whats save
async function ifItFailsBlameWolf(options: CreateGuildChannel, _save = false) {
  const channel = await createChannel(tempData.guildId, options);

  const cloned = await cloneChannel(channel.id);

  //Assertations
  assertExists(cloned);
  assertEquals(cloned.type, channel.type);

  // Delay the execution to allow CHANNEL_CREATE event to be processed
  await delayUntil(10000, () => cache.channels.has(cloned.id));

  if (!cache.channels.has(cloned.id)) {
    throw new Error(`The channel seemed to be cloned but was not cached.`);
  }

  if (channel.topic && cloned.topic !== channel.topic) {
    throw new Error(
      "The clone was supposed to have a topic but it does not appear to be the same topic.",
    );
  }

  if (channel.bitrate && cloned.bitrate !== channel.bitrate) {
    throw new Error(
      "The clone was supposed to have a bitrate but it does not appear to be the same bitrate.",
    );
  }

  if (
    channel.permissionOverwrites &&
    cloned.permissionOverwrites?.length !== channel.permissionOverwrites.length
  ) {
    throw new Error(
      "The clone was supposed to have a permissionOverwrites but it does not appear to be the same permissionOverwrites.",
    );
  }
}
Deno.test({
  name: "[channel] clone a new text channel",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test" }, false);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new category channel",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GUILD_CATEGORY,
      },
      false,
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GUILD_VOICE,
      },
      false,
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel with a bitrate",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "discordeno-clone-test",
        type: DiscordChannelTypes.GUILD_VOICE,
        bitrate: 32000,
      },
      false,
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel with a user limit",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GUILD_VOICE,
        userLimit: 32,
      },
      false,
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with a rate limit per user",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        rateLimitPerUser: 2423,
      },
      false,
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with NSFW",
  async fn() {
    await ifItFailsBlameWolf(
      { name: "Discordeno-clone-test", nsfw: true },
      false,
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with permission overwrites",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        permissionOverwrites: [
          {
            id: botId,
            type: DiscordOverwriteTypes.MEMBER,
            allow: ["VIEW_CHANNEL"],
            deny: [],
          },
        ],
      },
      false,
    );
  },
  ...defaultTestOptions,
});
