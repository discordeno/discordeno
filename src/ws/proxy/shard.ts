import {
  DiscordHeartbeatPayload,
  DiscordPayload,
  GatewayOpcode,
  ReadyPayload,
} from "../../types/discord.ts";
import { decompressWith } from "./deps.ts";
import { ws } from "./ws.ts";

export function resume(shardID: number) {
  // TODO: Log that this is happening

  // CREATE A SHARD
  const socket = ws.createShard(shardID);

  // NOW WE HANDLE RESUMING THIS SHARD
  // Get the old data for this shard necessary for resuming
  const oldShard = ws.shards.get(shardID);
  // TODO: HOW TO CLOSE OLD SHARD SOCKET!!!
  // TODO: STOP OLD HEARTBEAT
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

export function identify(shardID: number, maxShards: number) {
  // TODO: Log that this is happening

  // CREATE A SHARD
  const socket = ws.createShard(shardID);

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

  socket.send(
    JSON.stringify(
      {
        op: GatewayOpcode.Identify,
        d: { ...ws.identifyPayload, shard: [shardID, maxShards] },
      },
    ),
  );
}

export function heartbeat(shardID: number, interval: number) {
  // TODO: Log that this is happening

  const shard = ws.shards.get(shardID);
  if (!shard) return;

  shard.heartbeat.keepAlive = true;
  shard.heartbeat.acknowledged = false;
  shard.heartbeat.lastSentAt = Date.now();
  shard.heartbeat.interval = interval;

  shard.heartbeat.intervalID = setInterval(() => {
    // TODO: Log that this is happening

    const currentShard = ws.shards.get(shardID);
    if (!currentShard) return;

    if (
      currentShard.ws.readyState === WebSocket.CLOSED ||
      !currentShard.heartbeat.keepAlive
    ) {
      // TODO: Log that this is happening

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

export function createShard(shardID: number) {
  const socket = new WebSocket(ws.botGatewayData.url);
  socket.binaryType = "arraybuffer";

  socket.onerror = (errorEvent) => {
    // TODO: Log that this is happening

    // eventHandlers.debug?.({
    //   type: "wsError",
    //   data: { shardID, ...errorEvent },
    // });
  };

  socket.onmessage = ({ data: message }) => {
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
    // TODO: Log that this is happening
    //   if (!messageData.t) eventHandlers.rawGateway?.(messageData);
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
        // TODO: Log that this is happening
        // eventHandlers.debug?.(
        //   { type: "gatewayReconnect", data: { shardID } },
        // );
        if (ws.shards.has(shardID)) {
          ws.shards.get(shardID)!.resuming = true;
        }

        resume(shardID);
        break;
      case GatewayOpcode.InvalidSession:
        // TODO: Log that this is happening
        // eventHandlers.debug?.(
        //   {
        //     type: "gatewayInvalidSession",
        //     data: { shardID, data },
        //   },
        // );
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
          // TODO: Log that this is happening
          //   eventHandlers.debug?.(
          //     { type: "gatewayResumed", data: { shardID } },
          //   );

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
  };

  socket.onclose = ({ reason, code, wasClean }) => {
    // TODO: Log that this is happening
    // eventHandlers.debug?.(
    //   {
    //     type: "wsClose",
    //     data: { shardID, code, reason, wasClean },
    //   },
    // );

    // TODO: ENUM FOR THESE CODES?
    switch (code) {
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
          reason || "Discord gave no reason! GG! You broke Discord!",
        );
        // THESE ERRORS CAN NO BE RESUMED! THEY MUST RE-IDENTIFY!
      case 4003:
      case 4007:
      case 4008:
      case 4009:
        // TODO: Log that this is happening
        // eventHandlers.debug?.({
        //   type: "wsReconnect",
        //   data: { shardID, code, reason, wasClean },
        // });
        identify(shardID, ws.maxShards);
        break;
      default:
        resume(shardID);
        break;
    }
  };

  return socket;
}

export async function handleDiscordPayload(
  data: DiscordPayload,
  shardID: number,
) {
  // TODO: Log that this is happening
  //   eventHandlers.raw?.(data);
  //   await eventHandlers.dispatchRequirements?.(data, shardID);

  await fetch(ws.url, {
    method: "post",
    body: JSON.stringify({
      shardID,
      data,
    }),
  }).catch(console.error);
}
