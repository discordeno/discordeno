import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { createGuild } from "../../src/helpers/guilds/create_guild.ts";
import { delayUntil } from "../util/delay_until.ts";

Deno.test({
  name: "[guild] create a new guild",
  async fn() {
    const guild = await createGuild({
      name: "Discordeno Test",
    });

    // Assertions
    assertExists(guild);
    assertExists(guild.id);

    tempData.guildId = guild.id;

    // Delay the execution by 5 seconds to allow GUILD_CREATE event to be processed
    await delayUntil(10000, () => cache.guilds.has(guild.id));

    if (!cache.guilds.has(guild.id)) {
      throw new Error(`The guild seemed to be created but it was not cached. ${JSON.stringify(guild)}`);
    }
  },
  ...defaultTestOptions,
});
