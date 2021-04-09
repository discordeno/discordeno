import { cache, createGuild, delay } from "../../mod.ts";
import { tempData, defaultTestOptions } from "../ws/start_bot.ts";
import { assertExists, assertEquals } from "../deps.ts";

Deno.test({
  name: "[guild] create a new guild",
  async fn() {
    const guild = await createGuild({
      name: "Discordeno Test",
    });
    console.log(guild);

    // Assertions
    assertExists(guild);

    tempData.guildId = guild.id;
    assertEquals(tempData.guildId, guild.id);

    // Delay the execution by 5 seconds to allow GUILD_CREATE event to be processed
    await delay(5000);
  },
  ...defaultTestOptions,
});
