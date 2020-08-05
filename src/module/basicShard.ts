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
import { FetchMembersOptions } from "../types/guild.ts";
import { BotStatusRequest } from "../utils/utils.ts";

const basicShards = new Map<number, BasicShard>();

export interface BasicShard {
  id: number;
  socket: WebSocket;
  resumeInterval: number;
  sessionID: string;
  previousSequenceNumber: number | null;
  needToResume: boolean;
}

const RequestMembersQueue: RequestMemberQueuedRequest[] = [];
let processQueue = false;

interface RequestMemberQueuedRequest {
  guildID: string;
  shardID: number;
  nonce: string;
  options?: FetchMembersOptions;
}

export async function createBasicShard(
  data: DiscordBotGatewayData,
  identifyPayload: IdentifyPayload,
  resuming = false,
  shardID = 0,
) {
  const oldShard = basicShards.get(shardID);

  const basicShard: BasicShard = {
    id: shardID,
    socket: await connectWebSocket(`${data.url}?v=6&encoding=json`),
    resumeInterval: 0,
    sessionID: oldShard?.sessionID || "",
    previousSequenceNumber: oldShard?.previousSequenceNumber || 0,
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
      if (!data.t) eventHandlers.rawGateway?.(data);
      switch (data.op) {
        case GatewayOpcode.Hello:
          if (!resuming) {
            heartbeat(
              basicShard,
              (data.d as DiscordHeartbeatPayload).heartbeat_interval,
            );
          }
          break;
        case GatewayOpcode.Reconnect:
          eventHandlers.debug?.(
            { type: "reconnect", data: { shardID: basicShard.id } },
          );
          basicShard.needToResume = true;
          resumeConnection(botGatewayData, identifyPayload);
          break;
        case GatewayOpcode.InvalidSession:
          eventHandlers.debug?.(
            { type: "invalidSession", data: { shardID: basicShard.id, data } },
          );
          // When d is false we need to reidentify
          if (!data.d) {
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

function identify(shard: BasicShard, payload: IdentifyPayload) {
  eventHandlers.debug?.(
    {
      type: "identifying",
      data: {
        shardID: shard.id,
      },
    },
  );
  return shard.socket.send(
    JSON.stringify(
      {
        op: GatewayOpcode.Identify,
        d: { ...payload, shard: [shard.id, payload.shard[1]] },
      },
    ),
  );
}

function resume(shard: BasicShard, payload: IdentifyPayload) {
  return shard.socket.send(JSON.stringify({
    op: GatewayOpcode.Resume,
    d: {
      token: payload.token,
      session_id: shard.sessionID,
      seq: shard.previousSequenceNumber,
    },
  }));
}

// TODO: If a client does not receive a heartbeat ack between its attempts at sending heartbeats, it should immediately terminate the connection with a non-1000 close code, reconnect, and attempt to resume.
async function heartbeat(
  shard: BasicShard,
  interval: number,
) {
  if (shard.socket.isClosed) return;

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
  await delay(interval);
  heartbeat(shard, interval);
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

  if (!shard.needToResume) return;

  eventHandlers.debug?.({ type: "resuming", data: { shardID: shard.id } });
  // Run it once
  createBasicShard(botGatewayData, payload, true, shard.id);
  // Then retry every 15 seconds
  await delay(1000 * 15);
  if (shard.needToResume) resumeConnection(botGatewayData, payload);
}

export function requestGuildMembers(
  guildID: string,
  shardID: number,
  nonce: string,
  options?: FetchMembersOptions,
  queuedRequest = false,
) {
  const shard = basicShards.get(shardID);

  // This request was not from this queue so we add it to queue first
  if (!queuedRequest) {
    RequestMembersQueue.push({
      guildID,
      shardID,
      nonce,
      options,
    });

    if (!processQueue) {
      processQueue = true;
      processGatewayQueue();
    }
    return;
  }

  // If its closed add back to queue to redo on resume
  if (shard?.socket.isClosed) {
    requestGuildMembers(guildID, shardID, nonce, options);
    return;
  }

  shard?.socket.send(JSON.stringify({
    op: GatewayOpcode.RequestGuildMembers,
    d: {
      guild_id: guildID,
      query: options?.query || "",
      limit: options?.query || 0,
      presences: options?.presences || false,
      user_ids: options?.userIDs,
      nonce,
    },
  }));
}

async function processGatewayQueue() {
  if (!RequestMembersQueue.length) {
    processQueue = false;
    return;
  }

  basicShards.forEach((shard) => {
    const index = RequestMembersQueue.findIndex((q) => q.shardID === shard.id);
    // 2 events per second is the rate limit.
    const request = RequestMembersQueue[index];
    if (request) {
      requestGuildMembers(
        request.guildID,
        request.shardID,
        request.nonce,
        request.options,
        true,
      );
      // Remove item from queue
      RequestMembersQueue.splice(index, 1);

      const secondIndex = RequestMembersQueue.findIndex((q) =>
        q.shardID === shard.id
      );
      const secondRequest = RequestMembersQueue[secondIndex];
      if (secondRequest) {
        requestGuildMembers(
          request.guildID,
          request.shardID,
          secondRequest.nonce,
          secondRequest.options,
          true,
        );
        // Remove item from queue
        RequestMembersQueue.splice(secondIndex, 1);
      }
    }
  });

  await delay(1500);

  eventHandlers.debug?.(
    {
      type: "requestMembersProcessing",
      data: {
        remaining: RequestMembersQueue.length,
        first: RequestMembersQueue[0],
      },
    },
  );
  processGatewayQueue();
}

export function botGatewayStatusRequest(payload: BotStatusRequest) {
  basicShards.forEach((shard) => {
    shard.socket.send(JSON.stringify({
      op: GatewayOpcode.StatusUpdate,
      d: {
        since: null,
        game: payload.game.name
          ? {
            name: payload.game.name,
            type: payload.game.type,
          }
          : null,
        status: payload.status,
        afk: false,
      },
    }));
  });
}
