import { delay } from "../util/utils.ts";
import { GatewayManager } from "./gatewayManager.ts";

/** Use this function to stop the gateway properly */
export async function stopGateway(
  gateway: GatewayManager,
  code: number,
  reason: string,
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
