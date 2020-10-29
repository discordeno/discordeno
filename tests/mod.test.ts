import { assert, assertEquals, delay } from "../deps.ts";
import {
  botID,
  cache,
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
import {
  channelOverwriteHasPermission,
  editChannel,
} from "../src/handlers/channel.ts";
import { getChannel } from "../src/handlers/guild.ts";
import { Permissions } from "../src/types/permission.ts";

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

const data = {
  guildID: "",
  roleID: "",
  channelID: "",
};

Deno.test({
  name: "create a guild",
  async fn() {
    // Create a guild "Discordeno Test"
    const createdGuild = (await createServer({
      name: "Discordeno Test",
    })) as Guild;

    // Check whether createdGuild is nil or not
    assert(createdGuild);

    data.guildID = createdGuild.id;
  },
  ...testOptions,
});

// Role

Deno.test({
  name: "create a role in a guild",
  async fn() {
    // Create a role "Role 1" in the guild "Discordeno Test"
    const createdRole = await createGuildRole(data.guildID, {
      name: "Role 1",
    });

    // Check whether the created role is nil or not
    assert(createdRole);

    data.roleID = createdRole.id;
  },
  ...testOptions,
});

Deno.test({
  name: "edit a role in a guild",
  async fn() {
    // Edit a role "Role 1" in the guild "Discordeno Test"
    const editedRole = (await editRole(data.guildID, data.roleID, {
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

    data.roleID = editedRole.id;
  },
  ...testOptions,
});

// Channel

Deno.test({
  name: "create a channel in a guild",
  async fn() {
    const guild = cache.guilds.get(data.guildID);
    if (!guild) throw "Guild not found";
    const createdChannel = await createGuildChannel(guild, "test");

    // Check whether the created channel is nil or not
    assert(createdChannel);

    data.channelID = createdChannel.id;
  },
  ...testOptions,
});

Deno.test({
  name: "get a channel in a guild",
  async fn() {
    const channel = await getChannel(data.channelID);

    assertEquals(channel.id, data.channelID);
  },
  ...testOptions,
});

Deno.test({
  name: "edit a channel in a guild",
  async fn() {
    await editChannel(data.channelID, {
      name: "edited-channel",
      overwrites: [
        {
          id: data.roleID,
          type: OverwriteType.ROLE,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          deny: ["USE_EXTERNAL_EMOJIS"],
        },
      ],
    });
    // Wait 5 seconds for it to update
    await delay(5000);
    const editedChannel = await getChannel(data.channelID);

    assertEquals(editedChannel.name, "edited-channel");
  },
});

Deno.test({
  name: "channel overwrite has permission",
  async fn() {
    const channel = cache.channels.get(data.channelID);
    if (!channel) throw "Channel not found";

    if (!channel.permission_overwrites) throw "Channel overwrites not found.";

    const hasPerm = channelOverwriteHasPermission(
      data.guildID,
      data.roleID,
      channel.permission_overwrites,
      [Permissions.VIEW_CHANNEL, Permissions.SEND_MESSAGES],
    );
    const missingPerm = channelOverwriteHasPermission(
      data.guildID,
      data.roleID,
      channel.permission_overwrites,
      [Permissions.USE_EXTERNAL_EMOJIS],
    );

    assertEquals(hasPerm, true);
    assertEquals(missingPerm, false);
  },
  ...testOptions,
});

// Message

let messageID: string;

Deno.test({
  name: "create a message in a guild",
  async fn() {
    const createdMessage = await sendMessage(data.channelID, "test");

    // Check whether the created message is nil or not
    assert(createdMessage);

    messageID = createdMessage.id;
  },
});

Deno.test({
  name: "get a message in a guild",
  async fn() {
    const message = await getMessage(data.channelID, messageID);

    assertEquals(messageID, message.id);
  },
});

// Clean up

Deno.test({
  name: "delete a role from the guild",
  async fn() {
    await deleteRole(data.guildID, data.roleID);
    data.roleID = "";
    assertEquals(data.roleID, "");
  },
});

Deno.test({
  name: "delete a channel in the guild",
  async fn() {
    await deleteChannel(data.guildID, data.channelID);
  },
  ...testOptions,
});

Deno.test({
  name: "delete a guild",
  async fn() {
    await deleteServer(data.guildID);
    data.guildID = "";
    assertEquals(data.guildID, "");
  },
  ...testOptions,
});

// This is meant to be the final test that forcefully crashes the bot
Deno.test({
  name: "exit the process forcefully after all the tests are done",
  async fn() {
    Deno.exit();
  },
  ...testOptions,
});
