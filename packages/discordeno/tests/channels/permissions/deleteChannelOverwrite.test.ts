import { ChannelTypes, OverwriteTypes } from "../../../types/shared.ts";
import { assertEquals, assertExists } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test({
  name: "[channel] Delete a channel overwrite",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "deleteChannelOverwrite",
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
    assertEquals(channel.permissionOverwrites.length, 1);

    await bot.helpers.deleteChannelPermissionOverride(channel.id, bot.id);

    // Fetch the channel again to validate
    const fetchedChannel = await bot.helpers.getChannel(channel.id);
    assertExists(fetchedChannel?.id);
    assertEquals(fetchedChannel.permissionOverwrites.length, 0);

    await bot.helpers.deleteChannel(channel.id);
  },
});
