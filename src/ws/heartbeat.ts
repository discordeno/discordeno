import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { identify } from "./identify.ts";
import { ws } from "./ws.ts";

export function heartbeat(shardId: number, interval: number) {
  ws.log("HEARTBEATING_STARTED", { shardId, interval });

  const shard = ws.shards.get(shardId);
  if (!shard) return;

  ws.log("HEARTBEATING_DETAILS", { shardId, interval, shard });

  shard.heartbeat.keepAlive = true;
  shard.heartbeat.acknowledged = true;
  shard.heartbeat.lastSentAt = Date.now();
  shard.heartbeat.interval = interval;

  // The first heartbeat should not wait for the entire interval to pass
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

  if (!currentShard.heartbeat.acknowledged) {
    currentShard.ws.close(1001, "Did not receive an ACK in time.");
    return identify(shardId, ws.maxShards);
  }

  if (currentShard.ws.readyState !== WebSocket.OPEN) {
    currentShard.heartbeat.timeoutId = setTimeout(
      () => sendHeartbeat(shardId),
      currentShard.heartbeat.interval,
    );
    return;
  }

  currentShard.ws.send(JSON.stringify({
    op: DiscordGatewayOpcodes.Heartbeat,
    d: currentShard.previousSequenceNumber,
  }));

  currentShard.heartbeat.acknowledged = false;

  currentShard.heartbeat.timeoutId = setTimeout(
    () => sendHeartbeat(shardId),
    currentShard.heartbeat.interval,
  );
}
