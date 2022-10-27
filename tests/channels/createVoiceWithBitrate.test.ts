import { ChannelTypes } from "../../mod.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[channel] create a new voice channel with a bitrate",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
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
