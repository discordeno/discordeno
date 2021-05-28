import { cache } from "../../src/cache.ts";
import { deleteGuild } from "../../src/helpers/guilds/delete_guild.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[guild] delete a guild",
  async fn() {
    if (!tempData.guildId) {
      throw new Error("The guild id was not available to be deleted.");
    }
    if (!cache.guilds.has(tempData.guildId)) {
      throw new Error("The guild was not cached so impossible to delete.");
    }

    await deleteGuild(tempData.guildId);
    await delayUntil(10000, () => !cache.guilds.has(tempData.guildId));

    if (cache.guilds.has(tempData.guildId)) {
      throw new Error("The guild was not able to be deleted.");
    }
  },
  ...defaultTestOptions,
});
