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

  // First heartbeat should be sent bevore
  shard.heartbeat.timeoutId = setTimeout(
    () => sendHeartbeat(shardId),
    Math.floor(shard.heartbeat.interval * Math.random()),
  );
}

function sendHeartbeat(shardId: number) {
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
    return;
  }

  if (currentShard.ws.readyState !== WebSocket.OPEN) {
    currentShard.heartbeat.timeoutId = setTimeout(
      () => sendHeartbeat(shardId),
      currentShard.heartbeat.interval,
    );
  }

  currentShard.ws.send(JSON.stringify({
    op: DiscordGatewayOpcodes.Heartbeat,
    d: currentShard.previousSequenceNumber,
  }));

  currentShard.heartbeat.timeoutId = setTimeout(
    () => sendHeartbeat(shardId),
    currentShard.heartbeat.interval,
  );
}
