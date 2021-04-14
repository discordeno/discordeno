import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { ws } from "./ws.ts";

export function heartbeat(shardId: number, interval: number) {
  ws.log("HEARTBEATING_STARTED", { shardId, interval });

  const shard = ws.shards.get(shardId);
  if (!shard) return;

  ws.log("HEARTBEATING_DETAILS", { shardId, interval, shard });

  shard.heartbeat.keepAlive = true;
  shard.heartbeat.acknowledged = false;
  shard.heartbeat.lastSentAt = Date.now();
  shard.heartbeat.interval = interval;

  shard.heartbeat.intervalId = setInterval(() => {
    ws.log("DEBUG", `Running setInterval in heartbeat file.`);
    const currentShard = ws.shards.get(shardId);
    if (!currentShard) return;

    ws.log("HEARTBEATING", { shardId, shard: currentShard });

    if (
      currentShard.ws.readyState === WebSocket.CLOSED ||
      !currentShard.heartbeat.keepAlive
    ) {
      ws.log("HEARTBEATING_CLOSED", { shardId, shard: currentShard });

      // STOP THE HEARTBEAT
      return clearInterval(currentShard.heartbeat.intervalId);
    }

    if (currentShard.ws.readyState !== WebSocket.OPEN) return;

    currentShard.ws.send(JSON.stringify({
      op: DiscordGatewayOpcodes.Heartbeat,
      d: currentShard.previousSequenceNumber,
    }));
  }, interval);
}
