import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { closeWS } from "./close_ws.ts";
import { identify } from "./identify.ts";
import { ws } from "./ws.ts";

export async function resume(shardId: number) {
  ws.log("RESUMING", { shardId });

  // NOW WE HANDLE RESUMING THIS SHARD
  // Get the old data for this shard necessary for resuming
  const oldShard = ws.shards.get(shardId);
  if (!oldShard?.sessionId) return identify(shardId, ws.maxShards);

  // CREATE A SHARD
  const socket = await ws.createShard(shardId);

  // HOW TO CLOSE OLD SHARD SOCKET!!!
  closeWS(oldShard.ws, 3064, "Resuming the shard, closing old shard.");
  // STOP OLD HEARTBEAT
  clearInterval(oldShard.heartbeat.intervalId);

  ws.shards.set(shardId, {
    id: shardId,
    ws: socket,
    resumeInterval: 0,
    sessionId: oldShard.sessionId,
    previousSequenceNumber: oldShard.previousSequenceNumber,
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
  });

  // Resume on open
  socket.onopen = () => {
    ws.shards.get(shardId)?.queue.unshift({
      op: DiscordGatewayOpcodes.Resume,
      d: {
        token: ws.identifyPayload.token,
        session_id: oldShard.sessionId,
        seq: oldShard.previousSequenceNumber,
      },
    });

    ws.processQueue(shardId);
  };
}
