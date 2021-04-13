import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { ws } from "./ws.ts";

export async function resume(shardId: number) {
  ws.log("RESUMING", { shardId });

  // CREATE A SHARD
  const socket = await ws.createShard(shardId);

  // NOW WE HANDLE RESUMING THIS SHARD
  // Get the old data for this shard necessary for resuming
  const oldShard = ws.shards.get(shardId);

  if (oldShard) {
    // HOW TO CLOSE OLD SHARD SOCKET!!!
    oldShard.ws.close(4009, "Resuming the shard, closing old shard.");
    // STOP OLD HEARTBEAT
    clearInterval(oldShard.heartbeat.intervalId);
  }

  const sessionId = oldShard?.sessionId || "";
  const previousSequenceNumber = oldShard?.previousSequenceNumber || 0;

  ws.shards.set(shardId, {
    id: shardId,
    ws: socket,
    resumeInterval: 0,
    sessionId,
    previousSequenceNumber,
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
  });

  // Resume on open
  socket.onopen = () => {
    ws.shards.get(shardId)?.queue.unshift({
      op: DiscordGatewayOpcodes.Resume,
      d: {
        token: ws.identifyPayload.token,
        session_id: sessionId,
        seq: previousSequenceNumber,
      },
    });
    
    if (oldShard?.queue.length) ws.processQueue(shardId);
  };
}
