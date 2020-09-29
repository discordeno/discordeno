import { assertEquals, delay } from "../deps.ts";
import {
  botID,
  cache,
  createClient,
  createGuildRole,
  deleteRole,
  deleteServer,
  editRole,
  Intents,
} from "../mod.ts";
import { createServer } from "../src/handlers/guild.ts";
import { Guild } from "../src/structures/guild.ts";
import { Role } from "../src/structures/role.ts";

const token = "NzUxNzkyMDE3MzUyMjk0NDQx.X1OO4A.GFAh2FCeDNChFQfd3ZNiu6dEAmQ";
//const token = Deno.env.get("DISCORD_TOKEN");
if (!token) throw "No Token Provided!";

createClient({
  token,
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
});

const testOptions = {
  sanitizeOps: false,
  sanitizeResources: false,
};

Deno.test({
  name: "Connecting to the gateway",
  fn: async () => {
    await delay(15000);
    assertEquals(botID, "675412054529540107");
  },
  ...testOptions,
});

let createdGuild: Guild;

Deno.test({
  name: "Create a guild with and without options",
  async fn() {
    // Create a test guild
    const guild = (await createServer({
      name: "Discordeno Test",
    })) as Guild;
    assertEquals(typeof guild.id, "string");
    createdGuild = guild;
  },
  ...testOptions,
});

// Roles

let createdRole: Role;

Deno.test({
  name: "Create a role with and without options",
  fn: async () => {
    if (!createdGuild.id) throw "The test guild does not exist.";

    const role1 = await createGuildRole(createdGuild.id, {
      name: "Role 1",
    });
    assertEquals(role1.id, "string");

    // with options
    const role2 = await createGuildRole(createdGuild.id, {
      name: "Role 2",
      color: 15277667,
      hoist: true,
      permissions: ["ADMINISTRATOR"],
      mentionable: true,
    });
    assertEquals(typeof role2.id, "string");
    assertEquals(role2.name, "Role 2");
    assertEquals(role2.color, 15277667);
    assertEquals(role2.hoist, true);
    assertEquals(role2.mentionable, true);
    assertEquals(role2.permissions, 0x00000008);
    createdRole = role2;
  },
  ...testOptions,
});

Deno.test({
  name: "Edit a role",
  fn: async () => {
    if (!createdGuild.id) throw "The guild id was not present";

    await editRole(createdGuild.id, createdRole.id, {
      name: "Edited Role",
      color: 4320244,
      hoist: false,
      permissions: ["READ_MESSAGE_HISTORY"],
      mentionable: false,
    });

    const role = cache.guilds.get(createdRole.id)?.roles.get(createdRole.id);
    if (!role) throw "Role not found on edit.";
    assertEquals(typeof role.id, "string");
    assertEquals(role.name, "Discordeno Edited");
    assertEquals(role.color, 4320244);
    assertEquals(role.hoist, false);
    assertEquals(role.mentionable, false);
    createdRole = role;
  },
  ...testOptions,
});

Deno.test({
  name: "Delete Role",
  fn: async () => {
    await deleteRole(createdGuild.id, createdRole.id);
    createdRole.id = "";
    assertEquals(createdRole.id, "");
  },
});

Deno.test({
  name: "Deleting guild(Bot is owner)",
  fn: async () => {
    if (!createdGuild.id) throw "The guild id was not present.";
    await deleteServer(createdGuild.id);
    createdGuild.id = "";
    assertEquals(createdGuild, "");
  },
  ...testOptions,
});

// This is meant to be the final test that forcefully crashes the bot
Deno.test({
  name: "Exit the process forcefully after all the tests have passed",
  async fn() {
    Deno.exit(1);
  },
  ...testOptions,
});
