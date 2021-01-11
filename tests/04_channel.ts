import { Channel } from "../src/api/structures/mod.ts";
import { defaultTestOptions, tempData } from "./01_main.ts";
import {
  assertEquals,
  assertExists,
  cache,
  createGuildChannel,
  editChannel,
  getChannel,
  OverwriteType,
} from "./deps.ts";

Deno.test({
  name: "[channel] create a channel in a guild",
  async fn() {
    const guild = cache.guilds.get(tempData.guildID);
    if (!guild) throw new Error("guildID not present in temporary data");

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
    if (!tempData.channelID || !tempData.roleID) {
      throw new Error("channelID or roleID not present in temp");
    }

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

    // Assertions
    assertExists(channel);
    assertEquals(channel.name, "discordeno-test-edited");
  },
});
