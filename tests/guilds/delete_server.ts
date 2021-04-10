import { cache } from "../../src/cache.ts";
import { deleteServer } from "../../src/helpers/guilds/delete_server.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { delayUntil } from "../util/delay_until.ts";

Deno.test({
  name: "[guild] delete a guild",
  async fn() {
    if (!tempData.guildId) {
      throw new Error("The guild id was not available to be deleted.");
    }
    if (!cache.guilds.has(tempData.guildId)) {
      throw new Error("The guild was not cached so impossible to delete.");
    }

    await deleteServer(tempData.guildId);
    delayUntil(3000, () => cache.guilds.has(tempData.guildId));

    if (cache.guilds.has(tempData.guildId)) {
      throw new Error("The guild was not able to be deleted.");
    }
  },
  ...defaultTestOptions,
});
