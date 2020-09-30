import { assert } from "https://deno.land/std@0.70.0/testing/asserts.ts";
import { assertEquals, delay } from "../deps.ts";
import {
  botID,
  createClient,
  createGuildRole,
  deleteRole,
  deleteServer,
  editRole,
  Intents,
  Role,
} from "../mod.ts";
import { createServer } from "../src/handlers/guild.ts";
import { Guild } from "../src/structures/guild.ts";

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

// Roles
let roleID: string;

Deno.test({
  name: "create a role in a guild",
  async fn() {
    // Create a role "Role 1" in the guild "Discordeno Test"
    const createdRole = await createGuildRole(guildID, {
      name: "Role 1",
    });

    // Check whether the created role is nil or not
    assert(createdRole.id);

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
    assert(editedRole.id);
    assertEquals(editedRole.name, "Edited Role");
    assertEquals(editedRole.color, 4320244);
    assertEquals(editedRole.hoist, false);
    assertEquals(editedRole.mentionable, false);

    roleID = editedRole.id;
  },
  ...testOptions,
});

Deno.test({
  name: "delete a role from the guild",
  async fn() {
    await deleteRole(guildID, roleID);
    roleID = "";
    assertEquals(roleID, "");
  },
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
