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
    name: "text",
    async fn() {
      text = await createChannelTests(guild.id, { name: "text" });
    },
  });
  await t.step({
    name: "category",
    async fn() {
      category = await createChannelTests(guild.id, {
        name: "category",
        type: ChannelTypes.GuildCategory,
      });
    },
  });
  await t.step({
    name: "news",
    async fn() {
      news = await createChannelTests(
        guild.id,
        { name: "news", type: ChannelTypes.GuildNews },
        true,
      );
    },
  });
  await t.step({
    name: "voice",
    async fn() {
      voice = await createChannelTests(
        guild.id,
        { name: "voice", type: ChannelTypes.GuildVoice },
      );
    },
  });
  await t.step({
    name: "voice bitrate",
    async fn() {
      voiceBitRate = await createChannelTests(guild.id, {
        name: "voice-bitrate",
        type: ChannelTypes.GuildVoice,
        bitrate: 32000,
      });
    },
  });
  await t.step({
    name: "voice userLimit",
    async fn() {
      voiceUserLimit = await createChannelTests(guild.id, {
        name: "voice-user-limit",
        type: ChannelTypes.GuildVoice,
        userLimit: 32,
      });
    },
  });
  await t.step({
    name: "text rateLimitPerUser",
    async fn() {
      textRateLimitPerUser = await createChannelTests(guild.id, {
        name: "text-rate-limit-per-user",
        rateLimitPerUser: 2423,
      });
    },
  });
  await t.step({
    name: "stage",
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

  if (options.topic && channel.topic !== options.topic) {
    throw new Error("The channel was supposed to have a topic but it does not appear to be the same topic.");
  }

  if (options.bitrate && channel.bitrate !== options.bitrate) {
    throw new Error("The channel was supposed to have a bitrate but it does not appear to be the same bitrate.");
  }

  if (options.permissionOverwrites && channel.permissionOverwrites?.length !== options.permissionOverwrites.length) {
    throw new Error(
      "The channel was supposed to have a permissionOverwrites but it does not appear to be the same permissionOverwrites.",
    );
  }

  if (autoDelete) {
    await bot.helpers.deleteChannel(channel.id);
  }

  return channel;
}
