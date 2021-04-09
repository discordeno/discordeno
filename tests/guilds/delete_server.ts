import { cache, delay, deleteServer } from "../../mod.ts";
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

    await deleteServer(tempData.guildId);
    await delay(3000);

    if (cache.guilds.has(tempData.guildId)) {
      throw new Error("The guild was not able to be deleted.");
    }
  },
  ...defaultTestOptions,
});
