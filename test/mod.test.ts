import {
  createClient,
  Intents,
  botID,
  CreateGuildPayload,
  leave,
} from "../mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { delay } from "https://deno.land/std@0.67.0/async/delay.ts";

declare function createServer(options: any): Promise<CreateGuildPayload>;

Deno.test({
  name: "Connecting to gateway",
  fn: async () => {
    const token = Deno.env.get("DISCORD_TOKEN");
    if (!token) throw "No Token Provided!";

    try {
      await createClient({
        token,
        intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
        eventHandlers: {
          debug: function (data) {
            console.log(data);
          },
        },
      });
    } catch (error) {
      throw error;
    }

    await delay(15000);
    assertEquals(typeof botID, "string");
  },
  sanitizeOps: false,
});

let guildID = "";

Deno.test({
  name: "Creating a new guild(Fresh Env)",
  fn: async () => {
    const result = await createServer({ name: "Discordeno Test Zone" }).catch(
      (error: any) => console.error(error),
    ) as CreateGuildPayload;

    guildID = result.id;
    await delay(15000);
    assertEquals(typeof result.id, "string");
  },
  sanitizeOps: false,
});

Deno.test({
  name: "Leaving guild(Fresh Env)",
  fn: async () => {
    if (!guildID) throw "The guild id was not present.";
    await leave(guildID);

    assertEquals(typeof "", "string");
  },
  sanitizeOps: false,
});
