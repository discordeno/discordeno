import { createClient, Intents, botID } from "../mod.ts";
import { assertEquals } from "../deps.ts";
import {
  createGuildRole,
  createServer,
  deleteRole,
  deleteServer,
  editRole,
} from "../src/handlers/guild.ts";
import { CreateGuildPayload } from "../src/types/guild.ts";
import { delay } from "../deps.ts";
import { cache } from "../src/utils/cache.ts";

let guildID = "";
let roleToDelete = "";
let roleID = "";

const token = Deno.env.get("DISCORD_TOKEN");
if (!token) throw "No Token Provided!";

createClient({
  token,
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
  eventHandlers: {
    // debug: function (data) {
    //   console.log(data);
    // },
  },
});

Deno.test({
  name: "Connecting to gateway",
  fn: async () => {
    await delay(15000);
    assertEquals(botID, "675412054529540107");
  },
  sanitizeResources: false,
});

Deno.test({
  name: "Creating a new guild(Fresh Env)",
  fn: async () => {
    const result = await createServer({ name: "Discordeno Test Zone" }).catch(
      (error) => console.error(error),
    ) as CreateGuildPayload;

    guildID = result.id;
    assertEquals(typeof result.id, "string");
  },
  sanitizeOps: false,
});

Deno.test({
  name: "Create Role 1: Nothing Provided.",
  fn: async () => {
    if (!guildID) throw "The guild id was not present";

    const role = await createGuildRole(guildID, {});
    assertEquals(typeof role.id, "string");
    roleToDelete = role.id;
  },
  sanitizeOps: false,
});

Deno.test({
  name: "Create Role 2: Custom Options.",
  fn: async () => {
    if (!guildID) throw "The guild id was not present";

    const role = await createGuildRole(
      guildID,
      {
        name: "Discordeno",
        color: 15277667,
        hoist: true,
        permissions: ["ADMINISTRATOR"],
        mentionable: true,
      },
    );
    assertEquals(typeof role.id, "string");
    assertEquals(role.name, "Discordeno");
    assertEquals(role.color, 15277667);
    assertEquals(role.hoist, true);
    assertEquals(role.mentionable, true);
    if (
      !role.permissions.includes("ADMINISTRATOR")
    ) {
      throw "Missing admin perms on creation.";
    }

    roleID = role.id;
  },
  sanitizeOps: false,
});

Deno.test({
  name: "Edit Role",
  fn: async () => {
    if (!guildID) throw "The guild id was not present";

    await editRole(guildID, roleToDelete, {
      name: "Discordeno Edited",
      color: 4320244,
      hoist: false,
      permissions: ["READ_MESSAGE_HISTORY"],
      mentionable: false,
    });

    const role = cache.guilds.get(guildID)?.roles.get(roleToDelete);
    if (!role) throw "Role not found on edit.";

    assertEquals(typeof role.id, "string");
    assertEquals(role.name, "Discordeno Edited");
    assertEquals(role.color, 4320244);
    assertEquals(role.hoist, false);
    assertEquals(role.mentionable, false);
    if (
      role.permissions.includes("ADMINISTRATOR")
    ) {
      throw "Still have admin perms on edit.";
    }

    if (
      !role.permissions.includes("READ_MESSAGE_HISTORY")
    ) {
      throw "Missing read message history perms on edit.";
    }

    roleID = role.id;
  },
  sanitizeOps: false,
});

Deno.test({
  name: "Delete Role",
  fn: async () => {
    await deleteRole(guildID, roleToDelete);
    roleToDelete = "";
    assertEquals(roleToDelete, "");
  },
});

Deno.test({
  name: "Deleting guild(Bot is owner)",
  fn: async () => {
    if (!guildID) throw "The guild id was not present.";
    await deleteServer(guildID);
    guildID = "";

    assertEquals(guildID, "");
  },
  sanitizeOps: false,
});

// This is meant to be the final test that forcefully crashes the bot
Deno.test({
  name: "Closing Bot! Tests Complete!",
  fn: async () => {
    Deno.exit();
  },
  sanitizeOps: false,
  sanitizeResources: false,
});
