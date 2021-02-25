import { botGatewayData, eventHandlers, proxyWSURL } from "../bot.ts";
import {
  DiscordBotGatewayData,
  DiscordHeartbeatPayload,
  DiscordIdentify,
  DiscordPayload,
  FetchMembersOptions,
  GatewayOpcode,
  ReadyPayload,
} from "../types/mod.ts";
import { BotStatusRequest, delay } from "../util/utils.ts";
import { decompressWith } from "./deps.ts";
import { handleDiscordPayload } from "./shard_manager.ts";
import { Collection } from "../util/collection.ts";

const basicShards = new Collection<number, BasicShard>();
const heartbeating = new Map<number, boolean>();
const utf8decoder = new TextDecoder();
const RequestMembersQueue: RequestMemberQueuedRequest[] = [];
let processQueue = false;

export interface BasicShard {
  id: number;
  ws: WebSocket;
  resumeInterval: number;
  sessionID: string;
  previousSequenceNumber: number | null;
  needToResume: boolean;
}

interface RequestMemberQueuedRequest {
  guildID: string;
  shardID: number;
  nonce: string;
  options?: FetchMembersOptions;
}

export function createShard(
  data: DiscordBotGatewayData,
  identifyPayload: DiscordIdentify,
  resuming = false,
  shardID = 0,
) {
  const oldShard = basicShards.get(shardID);

  const ws = new WebSocket(proxyWSURL);
  ws.binaryType = "arraybuffer";
  const basicShard: BasicShard = {
    id: shardID,
    ws,
    resumeInterval: 0,
    sessionID: oldShard?.sessionID || "",
    previousSequenceNumber: oldShard?.previousSequenceNumber || 0,
    needToResume: false,
  };

  basicShards.set(basicShard.id, basicShard);

  ws.onopen = () => {
    if (!resuming) {
      // Initial identify with the gateway
      identify(basicShard, identifyPayload);
    } else {
      resume(basicShard, identifyPayload);
    }
  };

  ws.onerror = (errorEvent) => {
    eventHandlers.debug?.({
      type: "wsError",
      data: { shardID: basicShard.id, ...errorEvent },
    });
  };

  ws.onmessage = async ({ data: message }) => {
    if (message instanceof ArrayBuffer) {
      message = new Uint8Array(message);
    }

    if (message instanceof Uint8Array) {
      message = decompressWith(
        message,
        0,
        (slice: Uint8Array) => utf8decoder.decode(slice),
      );
    }

    if (typeof message === "string") {
      const messageData = JSON.parse(message);
      if (!messageData.t) eventHandlers.rawGateway?.(messageData);
      switch (messageData.op) {
        case GatewayOpcode.Hello:
          if (!heartbeating.has(basicShard.id)) {
            await heartbeat(
              basicShard,
              (messageData.d as DiscordHeartbeatPayload).heartbeat_interval,
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
            { type: "gatewayReconnect", data: { shardID: basicShard.id } },
          );
          basicShard.needToResume = true;
          await resumeConnection(data, identifyPayload, basicShard.id);
          break;
        case GatewayOpcode.InvalidSession:
          eventHandlers.debug?.(
            {
              type: "gatewayInvalidSession",
              data: { shardID: basicShard.id, data },
            },
          );
          // When d is false we need to reidentify
          if (!messageData.d) {
            createShard(data, identifyPayload, false, shardID);
            break;
          }
          basicShard.needToResume = true;
          await resumeConnection(data, identifyPayload, basicShard.id);
          break;
        default:
          if (messageData.t === "RESUMED") {
            eventHandlers.debug?.(
              { type: "gatewayResumed", data: { shardID: basicShard.id } },
            );

            basicShard.needToResume = false;
            break;
          }
          // Important for RESUME
          if (messageData.t === "READY") {
            basicShard.sessionID = (messageData.d as ReadyPayload).session_id;
          }

          // Update the sequence number if it is present
          if (messageData.s) basicShard.previousSequenceNumber = messageData.s;

          await handleDiscordPayload(messageData, basicShard.id);
          break;
      }
    }
  };

  ws.onclose = async ({ reason, code, wasClean }) => {
    eventHandlers.debug?.(
      {
        type: "wsClose",
        data: { shardID: basicShard.id, code, reason, wasClean },
      },
    );

    if ([4001, 4002, 4004, 4005, 4010, 4011, 4012, 4013, 4014].includes(code)) {
      throw new Error(reason);
    } else if ([4000, 4003, 4007, 4008, 4009].includes(code)) {
      eventHandlers.debug?.({
        type: "wsReconnect",
        data: { shardID: basicShard.id, code, reason, wasClean },
      });
      createShard(data, identifyPayload, false, shardID);
    } else if (code === 3069 && reason === "[discordeno] requested closure") {
      return;
    } else {
      basicShard.needToResume = true;
      await resumeConnection(botGatewayData, identifyPayload, shardID);
    }
  };
}

function identify(shard: BasicShard, payload: DiscordIdentify) {
  eventHandlers.debug?.(
    {
      type: "gatewayIdentify",
      data: {
        shardID: shard.id,
      },
    },
  );

  sendWS({
    op: GatewayOpcode.Identify,
    d: { ...payload, shard: [shard.id, payload.shard[1]] },
  }, shard.id);
}

function resume(shard: BasicShard, payload: DiscordIdentify) {
  sendWS({
    op: GatewayOpcode.Resume,
    d: {
      token: payload.token,
      session_id: shard.sessionID,
      seq: shard.previousSequenceNumber,
    },
  }, shard.id);
}

async function heartbeat(
  shard: BasicShard,
  interval: number,
  payload: DiscordIdentify,
  data: DiscordBotGatewayData,
) {
  // We lost socket connection between heartbeats, resume connection
  if (shard.ws.readyState === WebSocket.CLOSED) {
    shard.needToResume = true;
    await resumeConnection(data, payload, shard.id);
    heartbeating.delete(shard.id);
    return;
  }

  if (heartbeating.has(shard.id)) {
    const receivedACK = heartbeating.get(shard.id);
    // If a ACK response was not received since last heartbeat, issue invalid session close
    if (!receivedACK) {
      eventHandlers.debug?.(
        {
          type: "gatewayHeartbeatStopped",
          data: {
            interval,
            previousSequenceNumber: shard.previousSequenceNumber,
            shardID: shard.id,
          },
        },
      );

      return shard.ws.close(4009, "Session timed out");
    }
  }

  // Set it to false as we are issuing a new heartbeat
  heartbeating.set(shard.id, false);

  sendWS(
    { op: GatewayOpcode.Heartbeat, d: shard.previousSequenceNumber },
    shard.id,
  );
  eventHandlers.debug?.(
    {
      type: "gatewayHeartbeat",
      data: {
        interval,
        previousSequenceNumber: shard.previousSequenceNumber,
        shardID: shard.id,
      },
    },
  );
  await delay(interval);
  await heartbeat(shard, interval, payload, data);
}

async function resumeConnection(
  data: DiscordBotGatewayData,
  payload: DiscordIdentify,
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

  eventHandlers.debug?.({ type: "gatewayResume", data: { shardID: shard.id } });
  // Run it once
  createShard(data, payload, true, shard.id);
  // Then retry every 15 seconds
  await delay(1000 * 15);
  if (shard.needToResume) await resumeConnection(data, payload, shardID);
}

export async function requestGuildMembers(
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
      return processGatewayQueue();
    }
    return;
  }

  // If its closed add back to queue to redo on resume
  if (shard?.ws.readyState === WebSocket.CLOSED) {
    await requestGuildMembers(guildID, shardID, nonce, options);
    return;
  }

  sendWS({
    op: GatewayOpcode.RequestGuildMembers,
    d: {
      guild_id: guildID,
      // If a query is provided use it, OR if a limit is NOT provided use ""
      query: options?.query || (options?.limit ? undefined : ""),
      limit: options?.limit || 0,
      presences: options?.presences || false,
      user_ids: options?.userIDs,
      nonce,
    },
  }, shard?.id);
}

async function processGatewayQueue() {
  if (!RequestMembersQueue.length) {
    processQueue = false;
    return;
  }

  await Promise.all(basicShards.map(async (shard) => {
    const index = RequestMembersQueue.findIndex((q) => q.shardID === shard.id);
    // 2 events per second is the rate limit.
    const request = RequestMembersQueue[index];
    if (request) {
      eventHandlers.debug?.(
        {
          type: "requestMembersProcessing",
          data: {
            remaining: RequestMembersQueue.length,
            request,
          },
        },
      );
      await requestGuildMembers(
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
        eventHandlers.debug?.(
          {
            type: "requestMembersProcessing",
            data: {
              remaining: RequestMembersQueue.length,
              request,
            },
          },
        );
        await requestGuildMembers(
          secondRequest.guildID,
          secondRequest.shardID,
          secondRequest.nonce,
          secondRequest.options,
          true,
        );
        // Remove item from queue
        RequestMembersQueue.splice(secondIndex, 1);
      }
    }
  }));

  await delay(1500);

  await processGatewayQueue();
}

export function botGatewayStatusRequest(payload: BotStatusRequest) {
  basicShards.forEach((shard) => {
    sendWS({
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
    }, shard.id);
  });
}

/** Enqueues the specified data to be transmitted to the server over the WebSocket connection, */
export function sendWS(payload: DiscordPayload, shardID = 0) {
  const shard = basicShards.get(shardID);
  if (!shard) return false;

  const serialized = JSON.stringify(payload);
  shard.ws.send(serialized);

  return true;
}

/** Closes the WebSocket connection or connection attempt */
export function closeWS(shardID = 0) {
  const shard = basicShards.get(shardID);
  if (!shard) return false;

  shard.ws.close(3069, "[discordeno] requested closure");

  return true;
}
