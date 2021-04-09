import { ws, delay } from "../../mod.ts";
import { defaultTestOptions } from "./start_bot.ts";

// Exit the Deno process once all tests are done.
Deno.test({
  name: "[ws] Close all shards manually.",
  async fn() {
    ws.shards.forEach((shard) => {
      clearInterval(shard.heartbeat.intervalId);
      shard.ws.close(3064, "Discordeno Testing Finished! Do Not RESUME!");
    });

    await delay(3000);
  },
  ...defaultTestOptions,
});
