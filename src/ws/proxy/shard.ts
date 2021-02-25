import {
  DiscordHeartbeatPayload,
  DiscordPayload,
  GatewayOpcode,
  ReadyPayload,
} from "../../types/discord.ts";
import { decompressWith } from "./deps.ts";
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
    socket.send(JSON.stringify({
      op: GatewayOpcode.Resume,
      d: {
        token: ws.identifyPayload.token,
        session_id: sessionID,
        seq: previousSequenceNumber,
      },
    }));
  };
}

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
      JSON.stringify(
        {
          op: GatewayOpcode.Identify,
          d: { ...ws.identifyPayload, shard: [shardID, maxShards] },
        },
      ),
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

export function heartbeat(shardID: number, interval: number) {
  ws.log("HEARTBEATING_STARTED", { shardID, interval });

  const shard = ws.shards.get(shardID);
  if (!shard) return;

  ws.log("HEARTBEATING_DETAILS", { shardID, interval, shard });

  shard.heartbeat.keepAlive = true;
  shard.heartbeat.acknowledged = false;
  shard.heartbeat.lastSentAt = Date.now();
  shard.heartbeat.interval = interval;

  shard.heartbeat.intervalID = setInterval(() => {
    const currentShard = ws.shards.get(shardID);
    if (!currentShard) return;

    ws.log("HEARTBEATING", { shardID, shard: currentShard });

    if (
      currentShard.ws.readyState === WebSocket.CLOSED ||
      !currentShard.heartbeat.keepAlive
    ) {
      ws.log("HEARTBEATING_CLOSED", { shardID, shard: currentShard });

      // STOP THE HEARTBEAT
      return clearInterval(currentShard.heartbeat.intervalID);
    }

    currentShard.ws.send(
      JSON.stringify(
        {
          op: GatewayOpcode.Heartbeat,
          d: currentShard.previousSequenceNumber,
        },
      ),
    );
  }, interval);
}

// deno-lint-ignore require-await
export async function createShard(shardID: number) {
  const socket = new WebSocket(ws.botGatewayData.url);
  socket.binaryType = "arraybuffer";

  socket.onerror = (errorEvent) => {
    ws.log("ERROR", { shardID, error: errorEvent });
  };

  socket.onmessage = ({ data: message }) => handleOnMessage(message, shardID);

  socket.onclose = (event) => {
    ws.log("CLOSED", { shardID, payload: event });

    // TODO: ENUM FOR THESE CODES?
    switch (event.code) {
      case 4001:
      case 4002:
      case 4004:
      case 4005:
      case 4010:
      case 4011:
      case 4012:
      case 4013:
      case 4014:
        throw new Error(
          event.reason || "Discord gave no reason! GG! You broke Discord!",
        );
        // THESE ERRORS CAN NO BE RESUMED! THEY MUST RE-IDENTIFY!
      case 4003:
      case 4007:
      case 4008:
      case 4009:
        ws.log("CLOSED_RECONNECT", { shardID, payload: event });
        identify(shardID, ws.maxShards);
        break;
      default:
        resume(shardID);
        break;
    }
  };

  return socket;
}

/** Handler for handling every message event from websocket. */
// deno-lint-ignore no-explicit-any
export function handleOnMessage(message: any, shardID: number) {
  if (message instanceof ArrayBuffer) {
    message = new Uint8Array(message);
  }

  if (message instanceof Uint8Array) {
    message = decompressWith(
      message,
      0,
      (slice: Uint8Array) => ws.utf8decoder.decode(slice),
    );
  }

  if (typeof message !== "string") return;

  const messageData = JSON.parse(message);
  ws.log("RAW", messageData);

  switch (messageData.op) {
    case GatewayOpcode.Hello:
      ws.heartbeat(
        shardID,
        (messageData.d as DiscordHeartbeatPayload).heartbeat_interval,
      );
      break;
    case GatewayOpcode.HeartbeatACK:
      if (ws.shards.has(shardID)) {
        ws.shards.get(shardID)!.heartbeat.acknowledged = true;
      }
      break;
    case GatewayOpcode.Reconnect:
      ws.log("RECONNECT", { shardID });

      if (ws.shards.has(shardID)) {
        ws.shards.get(shardID)!.resuming = true;
      }

      resume(shardID);
      break;
    case GatewayOpcode.InvalidSession:
      ws.log("INVALID_SESSION", { shardID, payload: messageData });

      // When d is false we need to reidentify
      if (!messageData.d) {
        identify(shardID, ws.maxShards);
        break;
      }

      if (ws.shards.has(shardID)) {
        ws.shards.get(shardID)!.resuming = true;
      }

      resume(shardID);
      break;
    default:
      if (messageData.t === "RESUMED") {
        ws.log("RESUMED", { shardID });

        if (ws.shards.has(shardID)) {
          ws.shards.get(shardID)!.resuming = false;
        }
        break;
      }

      // Important for RESUME
      if (messageData.t === "READY") {
        const shard = ws.shards.get(shardID);
        if (shard) {
          shard.sessionID = (messageData.d as ReadyPayload).session_id;
        }

        ws.loadingShards.get(shardID)?.resolve(true);
        ws.loadingShards.delete(shardID);
      }

      // Update the sequence number if it is present
      if (messageData.s) {
        const shard = ws.shards.get(shardID);
        if (shard) {
          shard.previousSequenceNumber = messageData.s;
        }
      }

      ws.handleDiscordPayload(messageData, shardID);
      break;
  }
}

/** Handler for processing all dispatch payloads that should be sent/forwarded to another server/vps/process. */
export async function handleDiscordPayload(
  data: DiscordPayload,
  shardID: number,
) {
  await fetch(ws.url, {
    method: "post",
    body: JSON.stringify({
      shardID,
      data,
    }),
  }).catch(console.error);
}
