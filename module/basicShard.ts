import {
  DiscordBotGatewayData,
  GatewayOpcode,
  ReadyPayload,
} from "../types/discord.ts";
import {
  eventHandlers,
  botGatewayData,
  IdentifyPayload,
} from "./client.ts";
import { delay } from "https://deno.land/std@0.61.0/async/delay.ts";
import {
  connectWebSocket,
  isWebSocketCloseEvent,
  WebSocket,
} from "https://deno.land/std@0.61.0/ws/mod.ts";
import { DiscordHeartbeatPayload } from "../types/discord.ts";
import { logRed } from "../utils/logger.ts";
import { handleDiscordPayload } from "./shardingManager.ts";

const basicShards = new Map<number, BasicShard>();

export interface BasicShard {
  id: number;
  socket: WebSocket;
  resumeInterval: number;
  sessionID: string;
  previousSequenceNumber: number | null;
  needToResume: boolean;
}

export async function createBasicShard(
  data: DiscordBotGatewayData,
  identifyPayload: IdentifyPayload,
  resuming = false,
  shardID = 0,
) {
  const basicShard: BasicShard = {
    id: shardID,
    socket: await connectWebSocket(data.url),
    resumeInterval: 0,
    sessionID: "",
    previousSequenceNumber: 0,
    needToResume: false,
  };

  basicShards.set(basicShard.id, basicShard);

  if (!resuming) {
    // Intial identify with the gateway
    await identify(basicShard, identifyPayload);
  } else {
    await resume(basicShard, identifyPayload);
  }

  for await (const message of basicShard.socket) {
    if (typeof message === "string") {
      const data = JSON.parse(message);

      switch (data.op) {
        case GatewayOpcode.Hello:
          heartbeat(
            basicShard,
            identifyPayload,
            (data.d as DiscordHeartbeatPayload).heartbeat_interval,
          );
          break;
        case GatewayOpcode.Reconnect:
        case GatewayOpcode.InvalidSession:
          // When d is false we need to reidentify
          if (!data.d) {
            eventHandlers.debug?.(
              { type: "invalidSession", data: { shardID: basicShard.id } },
            );
            createBasicShard(botGatewayData, identifyPayload, false, shardID);
            break;
          }
          basicShard.needToResume = true;
          resumeConnection(botGatewayData, identifyPayload);
          break;
        default:
          if (data.t === "RESUMED") {
            eventHandlers.debug?.(
              { type: "resumed", data: { shardID: basicShard.id } },
            );

            basicShard.needToResume = false;
            break;
          }
          // Important for RESUME
          if (data.t === "READY") {
            basicShard.sessionID = (data.d as ReadyPayload).session_id;
          }

          // Update the sequence number if it is present
          if (data.s) basicShard.previousSequenceNumber = data.s;

          handleDiscordPayload(data, basicShard.id);
          break;
      }
    } else if (isWebSocketCloseEvent(message)) {
      eventHandlers.debug?.(
        { type: "websocketClose", data: { shardID: basicShard.id, message } },
      );

      // These error codes should just crash the projects
      if ([4004, 4005, 4012, 4013, 4014].includes(message.code)) {
        logRed(`Close :( ${JSON.stringify(message)}`);
        eventHandlers.debug?.(
          {
            type: "websocketErrored",
            data: { shardID: basicShard.id, message },
          },
        );

        throw new Error(
          "Shard.ts: Error occurred that is not resumeable or able to be reconnected.",
        );
      }
      // These error codes can not be resumed but need to reconnect from start
      if ([4003, 4007, 4008, 4009].includes(message.code)) {
        eventHandlers.debug?.(
          {
            type: "websocketReconnecting",
            data: { shardID: basicShard.id, message },
          },
        );
        createBasicShard(botGatewayData, identifyPayload, false, shardID);
      } else {
        basicShard.needToResume = true;
        resumeConnection(botGatewayData, identifyPayload);
      }
    }
  }
}

async function identify(shard: BasicShard, payload: IdentifyPayload) {
  await shard.socket.send(
    JSON.stringify(
      {
        op: GatewayOpcode.Identify,
        d: { ...payload, shard: [shard.id, payload.shard[1]] },
      },
    ),
  );
}

async function resume(shard: BasicShard, payload: IdentifyPayload) {
  await shard.socket.send(JSON.stringify({
    op: GatewayOpcode.Resume,
    d: {
      ...payload,
      session_id: shard.sessionID,
      seq: shard.previousSequenceNumber,
    },
  }));
}

// TODO: If a client does not receive a heartbeat ack between its attempts at sending heartbeats, it should immediately terminate the connection with a non-1000 close code, reconnect, and attempt to resume.
async function heartbeat(
  shard: BasicShard,
  payload: IdentifyPayload,
  interval: number,
) {
  await delay(interval);
  shard.socket.send(
    JSON.stringify(
      { op: GatewayOpcode.Heartbeat, d: shard.previousSequenceNumber },
    ),
  );
  eventHandlers.debug?.(
    {
      type: "heartbeat",
      data: {
        interval,
        previousSequenceNumber: shard.previousSequenceNumber,
        shardID: shard.id,
      },
    },
  );

  heartbeat(shard, payload, interval);
}

async function resumeConnection(
  botGatewayData: DiscordBotGatewayData,
  payload: IdentifyPayload,
) {
  const shard = basicShards.get(payload.shard[0]);
  if (!shard) {
    eventHandlers.debug?.(
      { type: "missingShard", data: { shardID: payload.shard[0] } },
    );
    return;
  }

  eventHandlers.debug?.({ type: "resuming", data: { shardID: shard.id } });
  // Run it once
  createBasicShard(botGatewayData, payload, true, shard.id);
  // Then retry every 15 seconds
  await delay(1000 * 15);
  if (shard.needToResume) resumeConnection(botGatewayData, payload);
}
