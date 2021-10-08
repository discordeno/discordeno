import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { GatewayManager } from "../bot.ts";

export function resume(gateway: GatewayManager, shardId: number) {
  gateway.log("RESUMING", { shardId });

  // NOW WE HANDLE RESUMING THIS SHARD
  // Get the old data for this shard necessary for resuming
  const oldShard = gateway.shards.get(shardId);

  if (oldShard) {
    // HOW TO CLOSE OLD SHARD SOCKET!!!
    gateway.closeWS(oldShard.gateway, 3064, "Resuming the shard, closing old shard.");
    // STOP OLD HEARTBEAT
    clearInterval(oldShard.heartbeat.intervalId);
  }

  // CREATE A SHARD
  const socket = gateway.createShard(gateway, shardId);

  const sessionId = oldShard?.sessionId || "";
  const previousSequenceNumber = oldShard?.previousSequenceNumber || 0;

  gateway.shards.set(shardId, {
    id: shardId,
    gateway: socket,
    resumeInterval: 0,
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
    queue: oldShard?.queue || [],
    processingQueue: false,
    queueStartedAt: Date.now(),
    queueCounter: 0,
  });

  // Resume on open
  socket.onopen = () => {
    gateway.sendShardMessage(
      gateway,
      shardId,
      {
        op: DiscordGatewayOpcodes.Resume,
        d: {
          token: gateway.identifyPayload.token,
          session_id: sessionId,
          seq: previousSequenceNumber,
        },
      },
      true
    );
  };
}
