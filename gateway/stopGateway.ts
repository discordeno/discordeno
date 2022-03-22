import { delay } from "../util/utils.ts";
import { GatewayManager } from "./gatewayManager.ts";

/** Use this function to stop the gateway properly */
export async function stopGateway(
  gateway: GatewayManager,
  code = 3061,
  reason = "Discordeno Testing Finished! Do Not RESUME!",
) {
  // STOP WS
  gateway.shards.forEach((shard) => {
    clearInterval(shard.heartbeat.intervalId);
    gateway.closeWS(
      shard.ws,
      code,
      reason,
    );
  });

  await delay(5000);
}
