import { createClient, Intents, botID } from "../mod.ts";
import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { createServer, deleteServer } from "../src/handlers/guild.ts";
import { CreateGuildPayload } from "../src/types/guild.ts";
import { delay } from "https://deno.land/std@0.67.0/async/delay.ts";
import { basicShards } from "../src/module/basicShard.ts";
import { DISTANCE_EXTRA_BIT_BASE } from "https://deno.land/x/zlib.es@v1.0.0/const.ts";

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

let guildID = "";

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
    const shard = basicShards.first();

    await shard.socket.close();
    await delay(120000);
  },
});
