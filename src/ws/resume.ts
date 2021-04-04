import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { ws } from "./ws.ts";

export async function resume(shardID: number) {
  ws.log("RESUMING", { shardID });

  // CREATE A SHARD
  const socket = await ws.createShard(shardID);

  // NOW WE HANDLE RESUMING THIS SHARD
  // Get the old data for this shard necessary for resuming
  const oldShard = ws.shards.get(shardID);

  if (oldShard) {
    // HOW TO CLOSE OLD SHARD SOCKET!!!
    oldShard.ws.close(4009, "Resuming the shard, closing old shard.");
    // STOP OLD HEARTBEAT
    clearInterval(oldShard.heartbeat.intervalID);
  }

  const sessionID = oldShard?.sessionID || "";
  const previousSequenceNumber = oldShard?.previousSequenceNumber || 0;

  ws.shards.set(shardID, {
    id: shardID,
    ws: socket,
    resumeInterval: 0,
    sessionID,
    previousSequenceNumber,
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

  // Resume on open
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        op: DiscordGatewayOpcodes.Resume,
        d: {
          token: ws.identifyPayload.token,
          session_id: sessionID,
          seq: previousSequenceNumber,
        },
      })
    );
  };
}
