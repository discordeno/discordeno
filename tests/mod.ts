import { createClient, Intents } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const env = config();

Deno.test("Connecting to gateway", () => {
  createClient({
    token: env.DISCORD_TOKEN,
    intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
    eventHandlers: {
      ready: () => console.log(`Successfully connected to gateway.`),
    },
  });
});
