import { ws } from "./ws.ts";
import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";

export function heartbeat(shardID: number, interval: number) {
  ws.log("HEARTBEATING_STARTED", { shardID, interval });

  const shard = ws.shards.get(shardID);
  if (!shard) return;

  ws.log("HEARTBEATING_DETAILS", { shardID, interval, shard });

  shard.heartbeat.keepAlive = true;
  shard.heartbeat.acknowledged = false;
  shard.heartbeat.lastSentAt = Date.now();
  shard.heartbeat.interval = interval;

  shard.heartbeat.intervalID = setInterval(() => {
    const currentShard = ws.shards.get(shardID);
    if (!currentShard) return;

    ws.log("HEARTBEATING", { shardID, shard: currentShard });

    if (
      currentShard.ws.readyState === WebSocket.CLOSED ||
      !currentShard.heartbeat.keepAlive
    ) {
      ws.log("HEARTBEATING_CLOSED", { shardID, shard: currentShard });

      // STOP THE HEARTBEAT
      return clearInterval(currentShard.heartbeat.intervalID);
    }

    currentShard.ws.send(
      JSON.stringify({
        op: DiscordGatewayOpcodes.Heartbeat,
        d: currentShard.previousSequenceNumber,
      })
    );
  }, interval);
}
