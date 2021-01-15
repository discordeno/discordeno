import { defaultTestOptions, tempData } from "./01_main.test.ts";
import { assertExists, createServer, delay, Guild } from "./deps.ts";

Deno.test({
  name: "[guild] create a new guild",
  async fn() {
    const guild = await createServer({
      name: "Discordeno Test",
    }) as Guild;

    // Assertions
    assertExists(guild);

    tempData.guildID = guild.id;

    // Delay the execution by 5 seconds to allow GUILD_CREATE event to be processed
    await delay(5000);
  },
  ...defaultTestOptions,
});
