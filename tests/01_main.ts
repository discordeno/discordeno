import { assertExists, botID, delay, Intents, startBot } from "./deps.ts";

const token = Deno.env.get("DISCORD_TOKEN");
if (!token) throw new Error("Token is not provided");

startBot({
  token,
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
});

// Default options for tests
export const defaultTestOptions = {
  sanitizeOps: false,
  sanitizeResources: false,
};

// Temporary data
export const tempData = {
  guildID: "",
  roleID: "",
  channelID: "",
  messageID: "",
};

Deno.test({
  name: "[main] connect to gateway",
  fn: async () => {
    // Delay the execution by 5 seconds
    await delay(5000);

    // Assertions
    assertExists(botID);
  },
  ...defaultTestOptions,
});
