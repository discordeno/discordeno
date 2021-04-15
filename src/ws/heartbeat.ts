import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { delay } from "../util/utils.ts";
import { closeWS } from "./close_ws.ts";
import { identify } from "./identify.ts";
import { ws } from "./ws.ts";

export async function heartbeat(shardId: number, interval: number) {
  ws.log("HEARTBEATING_STARTED", { shardId, interval });

  const shard = ws.shards.get(shardId);
  if (!shard) return;

  ws.log("HEARTBEATING_DETAILS", { shardId, interval, shard });

  shard.heartbeat.keepAlive = true;
  shard.heartbeat.acknowledged = false;
  shard.heartbeat.lastSentAt = Date.now();
  shard.heartbeat.interval = interval;

  // The first heartbeat is special so we send it without setInterval: https://discord.com/developers/docs/topics/gateway#heartbeating
  await delay(Math.floor(shard.heartbeat.interval * Math.random()));

  shard.queue.unshift({
    op: DiscordGatewayOpcodes.Heartbeat,
    d: shard.previousSequenceNumber,
  });
  ws.processQueue(shard.id);

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
      return clearInterval(shard.heartbeat.intervalId);
    }

    if (!currentShard.heartbeat.acknowledged) {
      closeWS(currentShard.ws, 3066, "Did not receive an ACK in time.");
      return identify(shardId, ws.maxShards);
    }

    if (currentShard.ws.readyState !== WebSocket.OPEN) return;

    currentShard.ws.send(JSON.stringify({
      op: DiscordGatewayOpcodes.Heartbeat,
      d: currentShard.previousSequenceNumber,
    }));

    currentShard.heartbeat.acknowledged = false;
  }, shard.heartbeat.interval);
}
