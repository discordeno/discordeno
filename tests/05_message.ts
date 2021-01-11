import { defaultTestOptions, tempData } from "./01_main.ts";
import { assertEquals, assertExists, getMessage, sendMessage } from "./deps.ts";

Deno.test({
  name: "[message] send a message in a text channel",
  async fn() {
    if (!tempData.channelID) {
      throw new Error("channelID not present in temporary data");
    }

    const message = await sendMessage(tempData.channelID, {
      embed: {
        title: "Discordeno Test",
      },
    });

    // Assertions
    assertExists(message);
    assertEquals(message.embeds[0].title, "Discordeno Test");

    tempData.messageID = message.id;
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] get a message in a guild",
  async fn() {
    if (!tempData.channelID || !tempData.messageID) {
      throw new Error("channelID or messageID not present in temporary data");
    }

    const message = await getMessage(tempData.channelID, tempData.messageID);

    // Assertions
    assertExists(message);
    assertEquals(message.embeds[0].title, "Discordeno Test");
  },
});
