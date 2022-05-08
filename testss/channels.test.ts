import { ChannelTypes, OverwriteTypes } from "../mod.ts";
import { assertEquals, assertExists } from "./deps.ts";
import { loadBot } from "./mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "./utils.ts";

Deno.test({
  name: "[channel] Get a channel",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "fetching",
    });

    const fetched = await bot.helpers.getChannel(channel.id);
    assertExists(fetched);
    assertEquals(channel.id, fetched.id);
    assertEquals(channel.name, fetched.name);
  },
});

Deno.test({
  name: "[channel] delete a channel without a reason",
  async fn(t) {
    const bot = loadBot();
    // Create a channel to delete
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "delete-channel",
    });

    // Make sure the channel was created
    assertExists(channel.id);

    // Delete the channel now without a reason
    await bot.helpers.deleteChannel(channel.id);

    // Check if channel still exists
    const exists = await bot.helpers.getChannel(channel.id);
    assertEquals(exists, undefined);
  },
});

Deno.test({
  name: "[channel] delete a channel with a reason",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "delete-channel",
    });

    // Make sure the channel was created
    assertExists(channel.id);

    // Delete the channel now with a reason
    await bot.helpers.deleteChannel(channel.id, "with a reason");

    // Check if channel still exists
    const exists = await bot.helpers.getChannel(channel.id);
    assertEquals(exists, undefined);
  },
});

Deno.test({
  name: "[channel] create a new text channel",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "Discordeno-test" });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildText);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, undefined);
    assertEquals(channel.userLimit, undefined);
    assertEquals(channel.rateLimitPerUser, 0);
    assertEquals(channel.nsfw, false);
    assertEquals(channel.permissionOverwrites.length, 0);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

Deno.test({
  name: "[channel] create a new category channel",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "Discordeno-test",
      type: ChannelTypes.GuildCategory,
    });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildCategory);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, undefined);
    assertEquals(channel.userLimit, undefined);
    assertEquals(channel.rateLimitPerUser, undefined);
    assertEquals(channel.nsfw, undefined);
    assertEquals(channel.permissionOverwrites.length, 0);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

Deno.test({
  name: "[channel] create a new news channel",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "Discordeno-test",
      type: ChannelTypes.GuildNews,
    });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildNews);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, undefined);
    assertEquals(channel.userLimit, undefined);
    assertEquals(channel.rateLimitPerUser, 0);
    assertEquals(channel.nsfw, false);
    assertEquals(channel.permissionOverwrites.length, 0);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

Deno.test({
  name: "[channel] create a new voice channel",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "Discordeno-test",
      type: ChannelTypes.GuildVoice,
    });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildVoice);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, 64000);
    assertEquals(channel.userLimit, 0);
    assertEquals(channel.rateLimitPerUser, 0);
    assertEquals(channel.nsfw, false);
    assertEquals(channel.permissionOverwrites.length, 0);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

Deno.test({
  name: "[channel] create a new voice channel with a bitrate",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "discordeno-test",
      type: ChannelTypes.GuildVoice,
      bitrate: 32000,
    });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildVoice);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, 32000);
    assertEquals(channel.userLimit, 0);
    assertEquals(channel.rateLimitPerUser, 0);
    assertEquals(channel.nsfw, false);
    assertEquals(channel.permissionOverwrites.length, 0);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

Deno.test({
  name: "[channel] create a new voice channel with a user limit",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "discordeno-test",
      type: ChannelTypes.GuildVoice,
      userLimit: 32,
    });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildVoice);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, 64000);
    assertEquals(channel.userLimit, 32);
    assertEquals(channel.rateLimitPerUser, 0);
    assertEquals(channel.nsfw, false);
    assertEquals(channel.permissionOverwrites.length, 0);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

Deno.test({
  name: "[channel] create a new text channel with a rate limit per user",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "discordeno-test",
      rateLimitPerUser: 2423,
    });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildText);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, undefined);
    assertEquals(channel.userLimit, undefined);
    assertEquals(channel.rateLimitPerUser, 2423);
    assertEquals(channel.nsfw, false);
    assertEquals(channel.permissionOverwrites.length, 0);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

Deno.test({
  name: "[channel] create a new text channel with NSFW",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "discordeno-test",
      nsfw: true,
    });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildText);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, undefined);
    assertEquals(channel.userLimit, undefined);
    assertEquals(channel.rateLimitPerUser, 0);
    assertEquals(channel.nsfw, true);
    assertEquals(channel.permissionOverwrites.length, 0);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});

Deno.test({
  name: "[channel] create a new text channel with permission overwrites",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "discordeno-test",
      permissionOverwrites: [
        {
          id: bot.id,
          type: OverwriteTypes.Member,
          allow: ["VIEW_CHANNEL"],
          deny: [],
        },
      ],
    });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildText);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, undefined);
    assertEquals(channel.userLimit, undefined);
    assertEquals(channel.rateLimitPerUser, 0);
    assertEquals(channel.nsfw, false);
    assertEquals(channel.permissionOverwrites.length, 1);

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});
