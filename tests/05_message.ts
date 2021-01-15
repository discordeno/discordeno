import { defaultTestOptions, tempData } from "./01_main.ts";
import {
  addReaction,
  assertEquals,
  assertExists,
  getMessage,
  getPins,
  pin,
  removeReaction,
  sendMessage,
  unpin,
} from "./deps.ts";

Deno.test({
  name: "[message] send a message in a text channel",
  async fn() {
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
    const message = await getMessage(tempData.channelID, tempData.messageID);

    // Assertions
    assertExists(message);
    assertEquals(message.embeds[0].title, "Discordeno Test");
  },
});

Deno.test({
  name: "[message] pin a message in a channel",
  fn() {
    pin(tempData.channelID, tempData.messageID);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] get pinned message in a channel",
  async fn() {
    const [msg] = await getPins(tempData.channelID);

    // Assertions
    assertExists(msg);
    assertEquals(msg.id, tempData.messageID);
    assertEquals(msg.pinned, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] unpin a message",
  fn() {
    unpin(tempData.channelID, tempData.messageID);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] add a reaction to a message",
  fn() {
    // TODO: add tests for a guild emoji ― <:name:id>

    addReaction(tempData.channelID, tempData.messageID, "👍");
  },
  ...defaultTestOptions,
});

// TODO(ayntee): add unit tests for getReactions()

Deno.test({
  name: "[message] remove a reaction to a message",
  fn() {
    removeReaction(tempData.channelID, tempData.messageID, "👍");
  },
  ...defaultTestOptions,
});
