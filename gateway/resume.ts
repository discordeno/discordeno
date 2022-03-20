import { GatewayOpcodes } from "../types/shared.ts";
import { GatewayManager } from "./gateway_manager.ts";

export function resume(gateway: GatewayManager, shardId: number) {
  gateway.debug("GW RESUMING", { shardId });

  // NOW WE HANDLE RESUMING THIS SHARD
  // Get the old data for this shard necessary for resuming
  const oldShard = gateway.shards.get(shardId);
  if (!oldShard) {
    return gateway.debug(
      "GW DEBUG",
      `[Error] Trying to resume a shard (id: ${shardId}) that was not first identified.`,
    );
  }

  // HOW TO CLOSE OLD SHARD SOCKET!!!
  gateway.closeWS(oldShard.ws, 3064, "Resuming the shard, closing old shard.");
  // STOP OLD HEARTBEAT
  clearInterval(oldShard.heartbeat.intervalId);

  // CREATE A SHARD
  const socket = gateway.createShard(gateway, shardId);

  const sessionId = oldShard.sessionId || "";
  const previousSequenceNumber = oldShard.previousSequenceNumber || 0;

  gateway.shards.set(shardId, {
    id: shardId,
    ws: socket,
    sessionId: sessionId,
    previousSequenceNumber: previousSequenceNumber,
    resuming: false,
    ready: false,
    unavailableGuildIds: new Set(),
    heartbeat: {
      lastSentAt: 0,
      lastReceivedAt: 0,
      acknowledged: false,
      keepAlive: false,
      interval: 0,
      intervalId: 0,
    },
    queue: oldShard.queue || [],
    processingQueue: false,
    queueStartedAt: Date.now(),
    queueCounter: 0,
    safeRequestsPerShard: oldShard.safeRequestsPerShard || 120,
  });

  // Resume on open
  socket.onopen = () => {
    gateway.sendShardMessage(
      gateway,
      shardId,
      {
        op: GatewayOpcodes.Resume,
        d: {
          token: `Bot ${gateway.token}`,
          session_id: sessionId,
          seq: previousSequenceNumber,
        },
      },
      true,
    );
  };
}
