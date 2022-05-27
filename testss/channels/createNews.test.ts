import { ChannelTypes } from "../../mod.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[channel] create a new news channel",
  async fn(t) {
    console.log("news", 1);
    const bot = await loadBot();
    console.log("news", 2);
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "Discordeno-test",
      type: ChannelTypes.GuildNews,
    });
    console.log("news", 3);

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, ChannelTypes.GuildNews);
    assertEquals(channel.topic, undefined);
    assertEquals(channel.bitrate, undefined);
    assertEquals(channel.userLimit, undefined);
    assertEquals(channel.rateLimitPerUser, 0);
    assertEquals(channel.nsfw, false);
    assertEquals(channel.permissionOverwrites.length, 0);

    console.log("news", 4);
    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
    console.log("news", 5);
  },
});
