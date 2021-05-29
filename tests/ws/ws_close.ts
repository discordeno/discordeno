import { cache } from "../../src/cache.ts";
import { delay } from "../../src/util/utils.ts";
import { ws } from "../../src/ws/ws.ts";
import { defaultTestOptions } from "./start_bot.ts";

// Exit the Deno process once all tests are done.
Deno.test({
  name: "[ws] Close all shards manually.",
  async fn() {
    ws.shards.forEach((shard) => {
      clearInterval(shard.heartbeat.intervalId);
      ws.closeWS(shard.ws, 3061, "Discordeno Testing Finished! Do Not RESUME!");
    });

    await delay(3000);

    // clear all the sweeper intervals
    for (const c of Object.values(cache)) {
      if (!(c instanceof Map)) continue;

      c.stopSweeper();
    }
  },
  ...defaultTestOptions,
});
