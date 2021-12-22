import { ChannelTypes, CreateGuildChannel, OverwriteTypes } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../constants.ts";
import { assertExists, assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

async function createChannelTests(guildId: bigint, options: CreateGuildChannel, autoDelete: boolean) {
  const channel = await bot.helpers.createChannel(guildId, options);

  // Assertions
  assertExists(channel);
  assertEquals(channel.type, options.type || ChannelTypes.GuildText);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.channels.has(channel.id));

  if (!bot.channels.has(channel.id)) {
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

  if (autoDelete) {
    await bot.helpers.deleteChannel(channel.id);
  }
}

Deno.test({
  name: "[channel] create a new text channel",
  async fn(t) {
    await createChannelTests(guild.id, { name: "Discordeno-test" }, false);
  },
});
Deno.test({
  name: "[channel] create a new category channel",
  async fn(t) {
    await createChannelTests(
      guild.id,
      {
        name: "Discordeno-test",
        type: ChannelTypes.GuildCategory,
      },
      false
    );
  },
});
Deno.test({
  name: "[channel] create a new news channel",
  async fn(t) {
    await createChannelTests(
      CACHED_COMMUNITY_GUILD_ID,
      { name: "Discordeno-test", type: ChannelTypes.GuildNews },
      true
    );
  },
});
Deno.test({
  name: "[channel] create a new voice channel",
  async fn(t) {
    await createChannelTests(
      guild.id,
      {
        name: "Discordeno-test",
        type: ChannelTypes.GuildVoice,
      },
      false
    );
  },
});
Deno.test({
  name: "[channel] create a new voice channel with a bitrate",
  async fn(t) {
    await createChannelTests(
      guild.id,
      {
        name: "discordeno-test",
        type: ChannelTypes.GuildVoice,
        bitrate: 32000,
      },
      false
    );
  },
});
Deno.test({
  name: "[channel] create a new voice channel with a user limit",
  async fn(t) {
    await createChannelTests(
      guild.id,
      {
        name: "Discordeno-test",
        type: ChannelTypes.GuildVoice,
        userLimit: 32,
      },
      false
    );
  },
});
Deno.test({
  name: "[channel] create a new text channel with a rate limit per user",
  async fn(t) {
    await createChannelTests(
      guild.id,
      {
        name: "Discordeno-test",
        rateLimitPerUser: 2423,
      },
      false
    );
  },
});
Deno.test({
  name: "[channel] create a new text channel with NSFW",
  async fn(t) {
    await createChannelTests(guild.id, { name: "Discordeno-test", nsfw: true }, false);
  },
});
Deno.test({
  name: "[channel] create a new text channel with permission overwrites",
  async fn(t) {
    await createChannelTests(
      guild.id,
      {
        name: "Discordeno-test",
        permissionOverwrites: [
          {
            id: bot.id,
            type: OverwriteTypes.Member,
            allow: ["VIEW_CHANNEL"],
            deny: [],
          },
        ],
      },
      false
    );
  },
});
