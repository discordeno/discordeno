import { createGuild, delay } from "../mod.ts";
import { assertExists } from "./deps.ts";
import { defaultTestOptions, tempData } from "./mod.ts";

Deno.test({
  name: "[guild] create a new guild",
  async fn() {
    const guild = await createGuild({
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
