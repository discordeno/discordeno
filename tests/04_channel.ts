import { Channel } from "../src/api/structures/mod.ts";
import { defaultTestOptions, tempData } from "./01_main.ts";
import {
  assertEquals,
  assertExists,
  cache,
  channelOverwriteHasPermission,
  createGuildChannel,
  delay,
  editChannel,
  getChannel,
  OverwriteType,
} from "./deps.ts";

Deno.test({
  name: "[channel] create a channel in a guild",
  async fn() {
    const guild = cache.guilds.get(tempData.guildID);
    if (!guild) throw new Error("Guild not found");

    const channel = await createGuildChannel(guild, "test");

    // Assertions
    assertExists(channel);

    tempData.channelID = channel.id;
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] get a channel in a guild",
  async fn() {
    const channel = await getChannel(tempData.channelID);

    // Assertions
    assertExists(channel);
    assertEquals(channel.id, tempData.channelID);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] edit a channel in a guild",
  async fn() {
    const channel = await editChannel(tempData.channelID, {
      name: "discordeno-test-edited",
      overwrites: [
        {
          id: tempData.roleID,
          type: OverwriteType.ROLE,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          deny: ["USE_EXTERNAL_EMOJIS"],
        },
      ],
    }) as Channel;

    // Wait 5s for CHANNEL_UPDATE to fire
    await delay(5000);

    // Assertions
    assertExists(channel);
    assertEquals(channel.name, "discordeno-test-edited");
  },
});

Deno.test({
  name: "[channel] channel overwrite has permission",
  fn() {
    const channel = cache.channels.get(tempData.channelID);
    if (!channel) throw new Error("Channel not found");
    if (!channel.permissionOverwrites) {
      throw new Error("permissionOverwrites not found");
    }

    const hasPerm = channelOverwriteHasPermission(
      tempData.guildID,
      tempData.roleID,
      channel.permissionOverwrites,
      ["VIEW_CHANNEL", "SEND_MESSAGES"],
    );
    const missingPerm = channelOverwriteHasPermission(
      tempData.guildID,
      tempData.roleID,
      channel.permissionOverwrites,
      ["USE_EXTERNAL_EMOJIS"],
    );

    assertEquals(hasPerm, true);
    assertEquals(missingPerm, false);
  },
  ...defaultTestOptions,
});
