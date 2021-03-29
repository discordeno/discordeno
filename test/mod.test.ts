import {
  addReaction,
  botId,
  cache,
  Channel,
  channelOverwriteHasPermission,
  createChannel,
  createGuild,
  createRole,
  delay,
  deleteChannel,
  deleteMessage,
  deleteRole,
  deleteServer,
  editChannel,
  editRole,
  getChannel,
  getMessage,
  getPins,
  Guild,
  OverwriteType,
  pinMessage,
  removeReaction,
  Role,
  sendMessage,
  startBot,
  unpinMessage,
} from "../mod.ts";
import { assertEquals, assertExists } from "./deps.ts";

// Default options for tests
export const defaultTestOptions: Partial<Deno.TestDefinition> = {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
};

// Temporary data
export const tempData = {
  guildId: "",
  roleId: "",
  channelId: "",
  messageId: "",
};

// Main
Deno.test({
  name: "[main] connect to gateway",
  async fn() {
    const token = Deno.env.get("DISCORD_TOKEN");
    if (!token) throw new Error("Token is not provided");

    await startBot({
      token,
      intents: ["GUILD_MESSAGES", "GUILDS"],
    });

    // Delay the execution by 5 seconds
    await delay(5000);

    // Assertions
    assertExists(botId);
  },
  ...defaultTestOptions,
});

// Guild

Deno.test({
  name: "[guild] create a new guild",
  async fn() {
    const guild = await createGuild({
      name: "Discordeno Test",
    }) as Guild;

    // Assertions
    assertExists(guild);

    tempData.guildId = guild.id;

    // Delay the execution by 5 seconds to allow GUILD_CREATE event to be processed
    await delay(5000);
  },
  ...defaultTestOptions,
});

// Role

Deno.test({
  name: "[role] create a role in a guild",
  async fn() {
    if (!tempData.guildId) {
      throw new Error("guildId not present in temporary data");
    }

    const name = "Discordeno Test";
    const role = await createRole(tempData.guildId, {
      name,
    });

    // Assertions
    assertExists(role);
    assertEquals(role.name, name);

    tempData.roleId = role.id;
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[role] edit a role in a guild",
  async fn() {
    const name = "Discordeno Test Edited";
    const color = 4320244;
    const role = await editRole(tempData.guildId, tempData.roleId, {
      name,
      color,
      hoist: false,
      mentionable: false,
    }) as Role;

    // Assertions
    assertExists(role);
    assertEquals(role.name, name);
    assertEquals(role.color, color);
    assertEquals(role.hoist, false);
    assertEquals(role.mentionable, false);

    tempData.roleId = role.id;
  },
  ...defaultTestOptions,
});

// Channel

Deno.test({
  name: "[channel] create a channel in a guild",
  async fn() {
    const channel = await createChannel(tempData.guildId, "test");

    // Assertions
    assertExists(channel);

    tempData.channelId = channel.id;
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] get a channel in a guild",
  async fn() {
    const channel = await getChannel(tempData.channelId);

    // Assertions
    assertExists(channel);
    assertEquals(channel.id, tempData.channelId);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] edit a channel in a guild",
  async fn() {
    const channel = await editChannel(tempData.channelId, {
      name: "discordeno-test-edited",
      overwrites: [
        {
          id: tempData.roleId,
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
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] channel overwrite has permission",
  fn() {
    const channel = cache.channels.get(tempData.channelId);
    if (!channel) throw new Error("Channel not found");
    if (!channel.permissionOverwrites) {
      throw new Error("permissionOverwrites not found");
    }

    const hasPerm = channelOverwriteHasPermission(
      tempData.guildId,
      tempData.roleId,
      channel.permissionOverwrites,
      ["VIEW_CHANNEL", "SEND_MESSAGES"],
    );
    const missingPerm = channelOverwriteHasPermission(
      tempData.guildId,
      tempData.roleId,
      channel.permissionOverwrites,
      ["USE_EXTERNAL_EMOJIS"],
    );

    assertEquals(hasPerm, true);
    assertEquals(missingPerm, false);
  },
  ...defaultTestOptions,
});

// Message

Deno.test({
  name: "[message] send a message in a text channel",
  async fn() {
    const message = await sendMessage(tempData.channelId, {
      embed: {
        title: "Discordeno Test",
      },
    });

    // Assertions
    assertExists(message);
    assertEquals(message.embeds[0].title, "Discordeno Test");

    tempData.messageId = message.id;
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] get a message in a guild",
  async fn() {
    const message = await getMessage(tempData.channelId, tempData.messageId);

    // Assertions
    assertExists(message);
    assertEquals(message.embeds[0].title, "Discordeno Test");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] pin a message in a channel",
  async fn() {
    await pinMessage(tempData.channelId, tempData.messageId);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] get pinned message in a channel",
  async fn() {
    const [msg] = await getPins(tempData.channelId);

    // Assertions
    assertExists(msg);
    assertEquals(msg.id, tempData.messageId);
    assertEquals(msg.pinned, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] unpin a message",
  async fn() {
    await unpinMessage(tempData.channelId, tempData.messageId);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] add a reaction to a message",
  async fn() {
    // TODO: add tests for a guild emoji ― <:name:id>

    await addReaction(tempData.channelId, tempData.messageId, "👍");
  },
  ...defaultTestOptions,
});

// TODO(ayntee): add unit tests for getReactions()

Deno.test({
  name: "[message] remove a reaction to a message",
  async fn() {
    await removeReaction(tempData.channelId, tempData.messageId, "👍");
  },
  ...defaultTestOptions,
});

// Cleanup

Deno.test({
  name: "[message] delete a message by channel Id",
  async fn() {
    await deleteMessage(tempData.channelId, tempData.messageId);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] delete a channel in a guild",
  async fn() {
    await deleteChannel(tempData.guildId, tempData.channelId);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[role] delete a role in a guild",
  async fn() {
    await deleteRole(tempData.guildId, tempData.roleId);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[guild] delete a guild",
  async fn() {
    await deleteServer(tempData.guildId);

    // TODO(ayntee): remove this weird shit lol
    // TODO(ayntee): check if the GUILD_DELETE event is fired
    tempData.guildId = "";
    assertEquals(tempData.guildId, "");
  },
  ...defaultTestOptions,
});

// Forcefully exit the Deno process once all tests are done.
Deno.test({
  name: "[main] exit the process forcefully",
  fn() {
    Deno.exit();
  },
  ...defaultTestOptions,
});
