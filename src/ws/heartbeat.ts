import { GatewayOpcodes } from "../types/codes/gatewayOpcodes.ts";
import { delay } from "../util/utils.ts";
import { GatewayManager } from "../bot.ts";

export async function heartbeat(gateway: GatewayManager, shardId: number, interval: number) {
  gateway.debug("GW HEARTBEATING_STARTED", { shardId, interval });

  const shard = gateway.shards.get(shardId);
  if (!shard) return;

  gateway.debug("GW HEARTBEATING_DETAILS", { shardId, interval, shard });

  // The first heartbeat is special so we send it without set Interval: https://discord.com/developers/docs/topics/gateway#heartbeating
  await delay(Math.floor(shard.heartbeat.interval * Math.random()));

  if (shard.ws.readyState !== WebSocket.OPEN) return;

  shard.ws.send(
    JSON.stringify({
      op: GatewayOpcodes.Heartbeat,
      d: shard.previousSequenceNumber,
    }),
  );

  shard.heartbeat.keepAlive = true;
  shard.heartbeat.acknowledged = false;
  shard.heartbeat.lastSentAt = Date.now();
  shard.heartbeat.interval = interval;

  shard.heartbeat.intervalId = setInterval(async () => {
    console.log("heartbeat interval ran");
    gateway.debug("GW DEBUG", `Running setInterval in heartbeat file. Shard: ${shardId}`);
    const currentShard = gateway.shards.get(shardId);
    if (!currentShard) return;

    gateway.debug("GW HEARTBEATING", { shardId, shard: currentShard });

    if (currentShard.ws.readyState === WebSocket.CLOSED || !currentShard.heartbeat.keepAlive) {
      gateway.debug("GW HEARTBEATING_CLOSED", { shardId, shard: currentShard });

      // STOP THE HEARTBEAT
      return clearInterval(shard.heartbeat.intervalId);
    }

    if (!currentShard.heartbeat.acknowledged) {
      gateway.closeWS(currentShard.ws, 3066, "Did not receive an ACK in time.");
      return await gateway.identify(gateway, shardId, gateway.maxShards);
    }

    if (currentShard.ws.readyState !== WebSocket.OPEN) return;

    currentShard.heartbeat.acknowledged = false;

    currentShard.ws.send(
      JSON.stringify({
        op: GatewayOpcodes.Heartbeat,
        d: currentShard.previousSequenceNumber,
      }),
    );
  }, shard.heartbeat.interval);
}
