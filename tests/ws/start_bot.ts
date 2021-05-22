import { botId, startBot } from "../../src/bot.ts";
import { cache } from "../../src/cache.ts";
import { deleteGuild } from "../../src/helpers/guilds/delete_guild.ts";
import { delay } from "../../src/util/utils.ts";
import { ws } from "../../src/ws/ws.ts";
import { assertEquals, assertExists } from "../deps.ts";

// Set necessary settings
// Disables the logger which logs everything
ws.log = function (_x: string, _d: unknown) {
  // if (["RAW", "GUILD_CREATE", "HEARTBEATING_DETAILS"].includes(_x))
  //   return console.log(_x);
  // console.log(_x, _d);
};

// Default options for tests
export const defaultTestOptions: Partial<Deno.TestDefinition> = {
  sanitizeOps: false,
  sanitizeResources: false,
};

// Temporary data
export const tempData = {
  guildId: 0n,
  roleId: 0n,
  channelId: 0n,
  messageId: 0n,
};

Deno.test({
  name: "[ws] connect to gateway",
  async fn() {
    const token = Deno.env.get("DISCORD_TOKEN");
    if (!token) throw new Error("Token is not provided");

    let didReady = false;

    await startBot({
      token,
      eventHandlers: {
        ready: () => (didReady = true),
      },
      intents: ["GuildMessages", "Guilds", "GuildEmojis", "GuildMessageReactions"],
    });

    // Delay the execution by 5 seconds
    await delay(3000);

    // DELETE GUILDS IF LESS THAN 10 SERVERS AS SAFETY MEASURE
    if (cache.guilds.size <= 10) {
      for (const guild of cache.guilds.values()) await deleteGuild(guild.id);
    }

    // Assertions
    assertExists(botId);
    assertEquals(true, didReady);
  },
  ...defaultTestOptions,
});
