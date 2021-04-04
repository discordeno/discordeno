import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { ws } from "./ws.ts";

export async function identify(shardID: number, maxShards: number) {
  ws.log("IDENTIFYING", { shardID, maxShards });

  // CREATE A SHARD
  const socket = await ws.createShard(shardID);

  // Identify can just set/reset the settings for the shard
  ws.shards.set(shardID, {
    id: shardID,
    ws: socket,
    resumeInterval: 0,
    sessionID: "",
    previousSequenceNumber: 0,
    resuming: false,
    heartbeat: {
      lastSentAt: 0,
      lastReceivedAt: 0,
      acknowledged: false,
      keepAlive: false,
      interval: 0,
      intervalID: 0,
    },
  });

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        op: DiscordGatewayOpcodes.Identify,
        d: { ...ws.identifyPayload, shard: [shardID, maxShards] },
      })
    );
  };

  return new Promise((resolve, reject) => {
    ws.loadingShards.set(shardID, {
      shardID,
      resolve,
      reject,
      startedAt: Date.now(),
    });

    ws.cleanupLoadingShards();
  });
}
