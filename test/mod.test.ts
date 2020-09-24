import { createClient, Intents, botID } from "../mod.ts";
import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "Connecting to gateway",
  fn: async () => {
    const token = Deno.env.get("DISCORD_TOKEN")!;
    try {
      await createClient({
        token,
        intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
      });
    } catch (error) {
      throw error;
    }

    assertEquals(typeof botID, "string");
  },
  sanitizeOps: false,
});
