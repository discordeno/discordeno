import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { delay } from "../../src/util/utils.ts";
import { createGuild } from "../../src/helpers/guilds/create_guild.ts";

Deno.test({
  name: "[guild] create a new guild",
  async fn() {
    const guild = await createGuild({
      name: "Discordeno Test",
    });

    // Assertions
    assertExists(guild);

    tempData.guildId = guild.id;

    // Delay the execution by 5 seconds to allow GUILD_CREATE event to be processed
    await delay(3000);

    if (!cache.guilds.has(guild.id)) {
      throw new Error("The guild seemed to be created but it was not cached.");
    }
  },
  ...defaultTestOptions,
});
