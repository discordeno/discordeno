import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { ws } from "./ws.ts";

export function identify(shardId: number, maxShards: number) {
  ws.log("IDENTIFYING", { shardId, maxShards });

  // Need to clear the old heartbeat interval
  const oldShard = ws.shards.get(shardId);
  if (oldShard) {
    ws.closeWS(oldShard.ws, 3065, "Reidentifying closure of old shard");
    clearInterval(oldShard.heartbeat.intervalId);
  }

  // CREATE A SHARD
  const socket = ws.createShard(shardId);

  // Identify can just set/reset the settings for the shard
  ws.shards.set(shardId, {
    id: shardId,
    ws: socket,
    resumeInterval: 0,
    sessionId: "",
    previousSequenceNumber: 0,
    resuming: false,
    ready: false,
    unavailableGuildIds: new Set(),
    lastAvailable: 0,
    heartbeat: {
      lastSentAt: 0,
      lastReceivedAt: 0,
      acknowledged: false,
      keepAlive: false,
      interval: 0,
      intervalId: 0,
    },
    queue: [],
    processingQueue: false,
    queueStartedAt: Date.now(),
    queueCounter: 0,
  });

  socket.onopen = () => {
    ws.sendShardMessage(
      shardId,
      {
        op: DiscordGatewayOpcodes.Identify,
        d: { ...ws.identifyPayload, shard: [shardId, maxShards] },
      },
      true
    );
  };

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(`[Identify Failure] Shard ${shardId} has not received READY event in over a minute.`);
    }, 600000);

    ws.loadingShards.set(shardId, {
      shardId,
      resolve: (args) => {
        clearTimeout(timeout);
        resolve(args);
      },
      startedAt: Date.now(),
    });
  });
}
