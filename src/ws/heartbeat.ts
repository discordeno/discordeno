import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { delay } from "../util/utils.ts";
import {GatewayManager} from "../bot.ts";

export async function heartbeat(gateway: GatewayManager, shardId: number, interval: number) {
  gateway.log("HEARTBEATING_STARTED", { shardId, interval });

  const shard = gateway.shards.get(shardId);
  if (!shard) return;

  gateway.log("HEARTBEATING_DETAILS", { shardId, interval, shard });

  // The first heartbeat is special so we send it without setInterval: https://discord.com/developers/docs/topics/gateway#heartbeating
  await delay(Math.floor(shard.heartbeat.interval * Math.random()));

  if (shard.gateway.readyState !== WebSocket.OPEN) return;

  shard.gateway.send(
    JSON.stringify({
      op: DiscordGatewayOpcodes.Heartbeat,
      d: shard.previousSequenceNumber,
    })
  );

  shard.heartbeat.keepAlive = true;
  shard.heartbeat.acknowledged = false;
  shard.heartbeat.lastSentAt = Date.now();
  shard.heartbeat.interval = interval;

  shard.heartbeat.intervalId = setInterval(async () => {
    gateway.log("DEBUG", `Running setInterval in heartbeat file. Shard: ${shardId}`);
    const currentShard = gateway.shards.get(shardId);
    if (!currentShard) return;

    gateway.log("HEARTBEATING", { shardId, shard: currentShard });

    if (currentShard.gateway.readyState === WebSocket.CLOSED || !currentShard.heartbeat.keepAlive) {
      gateway.log("HEARTBEATING_CLOSED", { shardId, shard: currentShard });

      // STOP THE HEARTBEAT
      return clearInterval(shard.heartbeat.intervalId);
    }

    if (!currentShard.heartbeat.acknowledged) {
      gateway.closeWS(currentShard.gateway, 3066, "Did not receive an ACK in time.");
      return await gateway.identify(gateway, shardId, gateway.maxShards);
    }

    if (currentShard.gateway.readyState !== WebSocket.OPEN) return;

    currentShard.heartbeat.acknowledged = false;

    currentShard.gateway.send(
      JSON.stringify({
        op: DiscordGatewayOpcodes.Heartbeat,
        d: currentShard.previousSequenceNumber,
      })
    );
  }, shard.heartbeat.interval);
}
