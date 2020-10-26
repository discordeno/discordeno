import { assert, assertArrayContains, assertEquals, delay } from "../deps.ts";
import {
  botID,
  cache,
  Channel,
  createClient,
  createGuildChannel,
  createGuildRole,
  createServer,
  deleteChannel,
  deleteRole,
  deleteServer,
  editRole,
  getMessage,
  Guild,
  Intents,
  OverwriteType,
  Role,
  sendMessage,
} from "../mod.ts";
import { editChannel } from "../src/handlers/channel.ts";
import { getChannel } from "../src/handlers/guild.ts";

const token = Deno.env.get("DISCORD_TOKEN");
if (!token) throw "Token is not provided";

createClient({
  token,
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
});

// Default options for all test cases
const testOptions = {
  sanitizeOps: false,
  sanitizeResources: false,
};

Deno.test({
  name: "connect to the gateway",
  fn: async () => {
    // Delay the execution by 15 seconds (15000 ms)
    await delay(15000);

    // Check whether botID is nil or not
    assert(botID);
  },
  ...testOptions,
});

let guildID: string;

Deno.test({
  name: "create a guild",
  async fn() {
    // Create a guild "Discordeno Test"
    const createdGuild = (await createServer({
      name: "Discordeno Test",
    })) as Guild;

    // Check whether createdGuild is nil or not
    assert(createdGuild);

    guildID = createdGuild.id;
  },
  ...testOptions,
});

// Role
let roleID: string;

Deno.test({
  name: "create a role in a guild",
  async fn() {
    // Create a role "Role 1" in the guild "Discordeno Test"
    const createdRole = await createGuildRole(guildID, {
      name: "Role 1",
    });

    // Check whether the created role is nil or not
    assert(createdRole);

    roleID = createdRole.id;
  },
  ...testOptions,
});

Deno.test({
  name: "edit a role in a guild",
  async fn() {
    // Edit a role "Role 1" in the guild "Discordeno Test"
    const editedRole = (await editRole(guildID, roleID, {
      name: "Edited Role",
      color: 4320244,
      hoist: false,
      mentionable: false,
    })) as Role;

    // Assertions
    assert(editedRole);
    assertEquals(editedRole.name, "Edited Role");
    assertEquals(editedRole.color, 4320244);
    assertEquals(editedRole.hoist, false);
    assertEquals(editedRole.mentionable, false);

    roleID = editedRole.id;
  },
  ...testOptions,
});

// Channel

let channelID: string;

Deno.test({
  name: "create a channel in a guild",
  async fn() {
    const guild = cache.guilds.get(guildID);
    if (!guild) throw "Guild not found";
    const createdChannel = await createGuildChannel(guild, "test");

    // Check whether the created channel is nil or not
    assert(createdChannel);

    channelID = createdChannel.id;
  },
  ...testOptions,
});

Deno.test({
  name: "get a channel in a guild",
  async fn() {
    const channel = await getChannel(channelID);

    assertEquals(channel.id, channelID);
  },
  ...testOptions,
});

Deno.test({
  name: "edit a channel in a guild",
  async fn() {
    const channel = await editChannel(channelID, {
      name: "edited channel",
    }) as Channel;

    assert(channel);

    channelID = channel.id;
  },
});

Deno.test({
  name: "channel overwrite has permission",
  async fn() {
    const channel = cache.channels.get(channelID);
    if (!channel) throw "Channel not found";
    assertArrayContains(channel.permission_overwrites!, [
      {
        id: roleID,
        type: OverwriteType.ROLE,
        // The type for Channel#permission_overwrites is "RawOverwrite[] | undefined"
        // not "Overwrite[]"; therefore, permission strings cannot be used.
        // allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        // deny: ["USE_EXTERNAL_EMOJIS"],
      },
    ]);

    // THIS TEST CASE SHOULD BE REFACTORED AND IMPROVED
    // CURRENTLY, IT USES Channel#permission_overwrites
    // but preferably, it should use the channelOverwriteHasPermission()
  },
  ...testOptions,
});

// Message

let messageID: string;

Deno.test({
  name: "create a message in a guild",
  async fn() {
    const createdMessage = await sendMessage(channelID, "test");

    // Check whether the created message is nil or not
    assert(createdMessage);

    messageID = createdMessage.id;
  },
});

Deno.test({
  name: "get a message in a guild",
  async fn() {
    const message = await getMessage(channelID, messageID);

    assertEquals(messageID, message.id);
  },
});

// Clean up

Deno.test({
  name: "delete a role from the guild",
  async fn() {
    await deleteRole(guildID, roleID);
    roleID = "";
    assertEquals(roleID, "");
  },
});

Deno.test({
  name: "delete a channel in the guild",
  async fn() {
    await deleteChannel(guildID, channelID);
  },
  ...testOptions,
});

Deno.test({
  name: "delete a guild",
  async fn() {
    await deleteServer(guildID);
    guildID = "";
    assertEquals(guildID, "");
  },
  ...testOptions,
});

// This is meant to be the final test that forcefully crashes the bot
Deno.test({
  name: "exit the process forcefully after all the tests are done",
  async fn() {
    Deno.exit(1);
  },
  ...testOptions,
});
