import { ChannelTypes } from "../../mod.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[channel] create a new text channel with NSFW",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
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
