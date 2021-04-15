import { delay } from "../../src/util/utils.ts";
import { closeWS } from "../../src/ws/close_ws.ts";
import { ws } from "../../src/ws/ws.ts";
import { defaultTestOptions } from "./start_bot.ts";

// Exit the Deno process once all tests are done.
Deno.test({
  name: "[ws] Close all shards manually.",
  async fn() {
    ws.shards.forEach((shard) => {
      clearInterval(shard.heartbeat.intervalId);
      closeWS(shard.ws, 3061, "Discordeno Testing Finished! Do Not RESUME!");
    });

    await delay(3000);
  },
  ...defaultTestOptions,
});
