import { ChannelTypes, CreateGuildChannel } from "../../mod.ts";
import { bot, guild } from "../mod.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../utils.ts";
import { Channel } from "../../transformers/channel.ts";

export default async function (t: Deno.TestContext) {
  let text: Channel | undefined;
  let category: Channel | undefined;
  let voice: Channel | undefined;
  let news: Channel | undefined;
  let voiceBitRate: Channel | undefined;
  let voiceUserLimit: Channel | undefined;
  let textRateLimitPerUser: Channel | undefined;
  let stage: Channel | undefined;
  await t.step({
    name: "text: Create a text channel",
    async fn() {
      text = await createChannelTests(guild.id, { name: "text" });
    },
  });
  await t.step({
    name: "category: Create a category channel",
    async fn() {
      category = await createChannelTests(guild.id, {
        name: "category",
        type: ChannelTypes.GuildCategory,
      });
    },
  });
  await t.step({
    name: "news: Create a news channel",
    async fn() {
      news = await createChannelTests(
        guild.id,
        { name: "news", type: ChannelTypes.GuildNews },
        true,
      );
    },
  });
  await t.step({
    name: "voice: Create a voice channel",
    async fn() {
      voice = await createChannelTests(
        guild.id,
        { name: "voice", type: ChannelTypes.GuildVoice },
      );
    },
  });
  await t.step({
    name: "voice bitrate: Create a voice channel with bitrate",
    async fn() {
      voiceBitRate = await createChannelTests(guild.id, {
        name: "voice-bitrate",
        type: ChannelTypes.GuildVoice,
        bitrate: 32000,
      });
    },
  });
  await t.step({
    name: "voice userLimit: Create a voice channel with user limit",
    async fn() {
      voiceUserLimit = await createChannelTests(guild.id, {
        name: "voice-user-limit",
        type: ChannelTypes.GuildVoice,
        userLimit: 32,
      });
    },
  });
  await t.step({
    name: "text rateLimitPerUser: Create a text channel with rate limit per user",
    async fn() {
      textRateLimitPerUser = await createChannelTests(guild.id, {
        name: "text-rate-limit-per-user",
        rateLimitPerUser: 2423,
      });
    },
  });
  await t.step({
    name: "stage: Create a stage channel",
    async fn() {
      stage = await createChannelTests(guild.id, {
        name: "stage",
        type: ChannelTypes.GuildStageVoice,
      });
    },
  });

  assertExists(text);
  assertExists(category);
  assertExists(news);
  assertExists(voice);
  assertExists(voiceBitRate);
  assertExists(voiceUserLimit);
  assertExists(textRateLimitPerUser);
  assertExists(stage);

  return { text, category, news, voice, voiceBitRate, voiceUserLimit, textRateLimitPerUser, stage };
}

async function createChannelTests(guildId: bigint, options: CreateGuildChannel, autoDelete?: boolean) {
  const channel = await bot.helpers.createChannel(guildId, options);

  // Assertions
  assertExists(channel);
  assertEquals(channel.type, options.type ?? ChannelTypes.GuildText);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.channels.has(channel.id));

  if (!bot.channels.has(channel.id)) {
    throw new Error("The channel seemed to be created but it was not cached.");
  }

  if (options.topic) assertEquals(channel.topic, options.topic);

  if (options.bitrate) assertEquals(channel.bitrate, options.bitrate);

  if (options.permissionOverwrites) {
    assertEquals(channel.permissionOverwrites.length, options.permissionOverwrites.length);
  }

  if (autoDelete) {
    await bot.helpers.deleteChannel(channel.id);
  }

  return channel;
}
