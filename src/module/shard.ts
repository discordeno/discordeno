import { delay, inflate } from "../../deps.ts";
import { eventHandlers } from "../../mod.ts";
import {
  DiscordBotGatewayData,
  DiscordHeartbeatPayload,
  GatewayOpcode,
  ReadyPayload,
} from "../types/discord.ts";
import { FetchMembersOptions } from "../types/guild.ts";
import { BotStatusRequest } from "../utils/utils.ts";
import { IdentifyPayload, proxyWSURL } from "./client.ts";
import { handleDiscordPayload } from "./shardingManager.ts";

const basicShards = new Map<number, BasicShard>();
const heartbeating = new Map<number, boolean>();
const utf8decoder = new TextDecoder();
const GatewayQueue: (RequestMemberQueuedRequest | RawGatewayRequest)[] = [];
let processQueue = false;

export interface BasicShard {
  id: number;
  socket: WebSocket;
  resumeInterval: number;
  sessionID: string;
  previousSequenceNumber: number | null;
  needToResume: boolean;
}

interface RequestMemberQueuedRequest {
  type: 1;
  guildID: string;
  shardID: number;
  nonce: string;
  options?: FetchMembersOptions;
}

interface RawGatewayRequest {
  type: 2;
  shardID: number;
  payload: Record<string, unknown>;
}

export async function createShard(
  data: DiscordBotGatewayData,
  identifyPayload: IdentifyPayload,
  resuming = false,
  shardID = 0,
) {
  const oldShard = basicShards.get(shardID);

  const socket = new WebSocket(proxyWSURL);
  socket.binaryType = "arraybuffer";
  const basicShard: BasicShard = {
    id: shardID,
    socket,
    resumeInterval: 0,
    sessionID: oldShard?.sessionID || "",
    previousSequenceNumber: oldShard?.previousSequenceNumber || 0,
    needToResume: false,
  };

  basicShards.set(basicShard.id, basicShard);

  socket.onopen = async () => {
    if (!resuming) {
      // Initial identify with the gateway
      await identify(basicShard, identifyPayload);
    } else {
      await resume(basicShard, identifyPayload);
    }
  };

  socket.onerror = ({ timeStamp }) => {
    eventHandlers.debug?.({ type: "websocketErrored", data: { timeStamp } });
  };

  socket.onmessage = ({ data: message }) => {
    if (message instanceof ArrayBuffer) {
      message = new Uint8Array(message);
    }

    if (message instanceof Uint8Array) {
      message = inflate(
        message,
        0,
        (slice: Uint8Array) => utf8decoder.decode(slice),
      );
    }

    if (typeof message === "string") {
      const data = JSON.parse(message);
      if (!data.t) eventHandlers.rawGateway?.(data);
      switch (data.op) {
        case GatewayOpcode.Hello:
          if (!heartbeating.has(basicShard.id)) {
            heartbeat(
              basicShard,
              (data.d as DiscordHeartbeatPayload).heartbeat_interval,
              identifyPayload,
              data,
            );
          }
          break;
        case GatewayOpcode.HeartbeatACK:
          heartbeating.set(shardID, true);
          break;
        case GatewayOpcode.Reconnect:
          eventHandlers.debug?.(
            { type: "reconnect", data: { shardID: basicShard.id } },
          );
          basicShard.needToResume = true;
          resumeConnection(data, identifyPayload, basicShard.id);
          break;
        case GatewayOpcode.InvalidSession:
          eventHandlers.debug?.(
            { type: "invalidSession", data: { shardID: basicShard.id, data } },
          );
          // When d is false we need to reidentify
          if (!data.d) {
            createShard(data, identifyPayload, false, shardID);
            break;
          }
          basicShard.needToResume = true;
          resumeConnection(data, identifyPayload, basicShard.id);
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
    }
  };

  // TODO(ayntee): better ws* event names
  socket.onclose = ({ reason, code, wasClean }) => {
    eventHandlers.debug?.(
      {
        type: "websocketClose",
        data: { shardID: basicShard.id, code, reason, wasClean },
      },
    );

    // These error codes should just crash the projects
    if ([4004, 4005, 4012, 4013, 4014].includes(code)) {
      eventHandlers.debug?.(
        {
          type: "websocketErrored",
          data: { shardID: basicShard.id, code, reason, wasClean },
        },
      );

      throw new Error(
        "Shard.ts: Error occurred that is not resumeable or able to be reconnected.",
      );
    }

    // These error codes can not be resumed but need to reconnect from start
    if ([4003, 4007, 4008, 4009].includes(code)) {
      eventHandlers.debug?.(
        {
          type: "websocketReconnecting",
          data: { shardID: basicShard.id, code, reason, wasClean },
        },
      );
      createShard(data, identifyPayload, false, shardID);
    } else {
      basicShard.needToResume = true;
      resumeConnection(data, identifyPayload, basicShard.id);
    }
  };
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

async function heartbeat(
  shard: BasicShard,
  interval: number,
  payload: IdentifyPayload,
  data: DiscordBotGatewayData,
) {
  // We lost socket connection between heartbeats, resume connection
  if (shard.socket.readyState === WebSocket.CLOSED) {
    shard.needToResume = true;
    resumeConnection(data, payload, shard.id);
    heartbeating.delete(shard.id);
    return;
  }

  if (heartbeating.has(shard.id)) {
    const receivedACK = heartbeating.get(shard.id);
    // If a ACK response was not received since last heartbeat, issue invalid session close
    if (!receivedACK) {
      eventHandlers.debug?.(
        {
          type: "heartbeatStopped",
          data: {
            interval,
            previousSequenceNumber: shard.previousSequenceNumber,
            shardID: shard.id,
          },
        },
      );
      return shard.socket.send(JSON.stringify({ op: 4009 }));
    }
  }

  // Set it to false as we are issuing a new heartbeat
  heartbeating.set(shard.id, false);

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
  heartbeat(shard, interval, payload, data);
}

async function resumeConnection(
  data: DiscordBotGatewayData,
  payload: IdentifyPayload,
  shardID: number,
) {
  const shard = basicShards.get(shardID);
  if (!shard) {
    eventHandlers.debug?.(
      { type: "missingShard", data: { shardID: shardID } },
    );
    return;
  }

  if (!shard.needToResume) return;

  eventHandlers.debug?.({ type: "resuming", data: { shardID: shard.id } });
  // Run it once
  createShard(data, payload, true, shard.id);
  // Then retry every 15 seconds
  await delay(1000 * 15);
  if (shard.needToResume) resumeConnection(data, payload, shardID);
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
    GatewayQueue.push({
      type: 1,
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
  if (shard?.socket.readyState === WebSocket.CLOSED) {
    requestGuildMembers(guildID, shardID, nonce, options);
    return;
  }

  shard?.socket.send(JSON.stringify({
    op: GatewayOpcode.RequestGuildMembers,
    d: {
      guild_id: guildID,
      query: options?.query || "",
      limit: options?.limit || 0,
      presences: options?.presences || false,
      user_ids: options?.userIDs,
      nonce,
    },
  }));
}

async function processGatewayQueue() {
  if (!GatewayQueue.length) {
    processQueue = false;
    return;
  }

  basicShards.forEach((shard) => {
    const index = GatewayQueue.findIndex((q) => q.shardID === shard.id);
    // 2 events per second is the rate limit.
    const request = GatewayQueue[index];
    if (request) {
      if (request.type === 2) {
        eventHandlers.debug?.(
          {
            type: "gatewayRequestProcessing",
            data: {
              remaining: GatewayQueue.length,
              request,
            },
          },
        );

        const shard = basicShards.get(request.shardID);
        if (!shard) return;

        GatewayQueue.splice(index, 1);

        return shard.socket.send(JSON.stringify(request.payload));
      }

      eventHandlers.debug?.(
        {
          type: "requestMembersProcessing",
          data: {
            remaining: GatewayQueue.length,
            request,
          },
        },
      );
      requestGuildMembers(
        request.guildID,
        request.shardID,
        request.nonce,
        request.options,
        true,
      );
      // Remove item from queue
      GatewayQueue.splice(index, 1);

      const secondIndex = GatewayQueue.findIndex((q) => q.shardID === shard.id);
      const secondRequest = GatewayQueue[secondIndex];
      if (secondRequest) {
        if (secondRequest.type === 2) {
          eventHandlers.debug?.(
            {
              type: "gatewayRequestProcessing",
              data: {
                remaining: GatewayQueue.length,
                secondRequest,
              },
            },
          );

          const shard = basicShards.get(secondRequest.shardID);
          if (!shard) return;

          GatewayQueue.splice(secondIndex, 1);

          return shard.socket.send(JSON.stringify(secondRequest.payload));
        }

        eventHandlers.debug?.(
          {
            type: "requestMembersProcessing",
            data: {
              remaining: GatewayQueue.length,
              request,
            },
          },
        );
        requestGuildMembers(
          secondRequest.guildID,
          secondRequest.shardID,
          secondRequest.nonce,
          secondRequest.options,
          true,
        );
        // Remove item from queue
        GatewayQueue.splice(secondIndex, 1);
      }
    }
  });

  await delay(1500);

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

export function sendRawGatewayCommand(
  shardID: number,
  payload: Record<string, unknown>,
) {
  GatewayQueue.unshift({ type: 2, shardID, payload });
  if (!processQueue) {
    processQueue = true;
    processGatewayQueue();
  }
}
