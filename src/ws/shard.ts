import { FetchMembersOptions } from "../api/types/mod.ts";
import { botGatewayData, eventHandlers, proxyWSURL } from "../bot.ts";
import {
  GatewayOpcodes,
  GetGatewayBotPayload,
  HelloEventPayload,
  IdentifyPayload,
  ReadyEventPayload,
} from "../types/mod.ts";
import { BotStatusRequest, delay } from "../util/utils.ts";
import { decompressWith } from "./deps.ts";
import { handleDiscordPayload } from "./shard_manager.ts";

const basicShards = new Map<number, BasicShard>();
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
  data: GetGatewayBotPayload,
  identifyPayload: IdentifyPayload,
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

  ws.onerror = ({ timeStamp }) => {
    eventHandlers.debug?.({ type: "wsError", data: { timeStamp } });
  };

  ws.onmessage = ({ data: message }) => {
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
        case GatewayOpcodes.Hello:
          if (!heartbeating.has(basicShard.id)) {
            heartbeat(
              basicShard,
              (messageData.d as HelloEventPayload).heartbeat_interval,
              identifyPayload,
              data,
            );
          }
          break;
        case GatewayOpcodes.HeartbeatACK:
          heartbeating.set(shardID, true);
          break;
        case GatewayOpcodes.Reconnect:
          eventHandlers.debug?.(
            { type: "gatewayReconnect", data: { shardID: basicShard.id } },
          );
          basicShard.needToResume = true;
          resumeConnection(data, identifyPayload, basicShard.id);
          break;
        case GatewayOpcodes.InvalidSession:
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
          resumeConnection(data, identifyPayload, basicShard.id);
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
            basicShard.sessionID =
              (messageData.d as ReadyEventPayload).session_id;
          }

          // Update the sequence number if it is present
          if (messageData.s) basicShard.previousSequenceNumber = messageData.s;

          handleDiscordPayload(messageData, basicShard.id);
          break;
      }
    }
  };

  ws.onclose = ({ reason, code, wasClean }) => {
    eventHandlers.debug?.(
      {
        type: "wsClose",
        data: { shardID: basicShard.id, code, reason, wasClean },
      },
    );

    switch (code) {
      case 4001:
        throw new Error(
          "[Unknown opcode] Sent an invalid Gateway opcode or an invalid payload for an opcode.",
        );
      case 4002:
        throw new Error("[Decode error] Sent an invalid payload to API.");
      case 4004:
        throw new Error(
          "[Authentication failed] The account token sent with your identify payload is incorrect.",
        );
      case 4005:
        throw new Error(
          "[Already authenticated] Sent more than one identify payload.",
        );
      case 4010:
        throw new Error(
          "[Invalid shard] Sent an invalid shard when identifying.",
        );
      case 4011:
        throw new Error(
          "[Sharding required] The session would have handled too many guilds - you are required to shard your connection in order to connect.",
        );
      case 4012:
        throw new Error(
          "[Invalid API version] Sent an invalid version for the gateway.",
        );
      case 4013:
        throw new Error(
          "[Invalid intent(s)] Sent an invalid intent for a Gateway Intent.",
        );
      case 4014:
        throw new Error(
          "[Disallowed intent(s)] Sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not whitelisted for.",
        );
      case 4003:
      case 4007:
      case 4008:
      case 4009:
        eventHandlers.debug?.({
          type: "wsReconnect",
          data: { shardID: basicShard.id, code, reason, wasClean },
        });
        createShard(data, identifyPayload, false, shardID);
        break;
      default:
        basicShard.needToResume = true;
        resumeConnection(botGatewayData, identifyPayload, shardID);
        break;
    }
  };
}

function identify(shard: BasicShard, payload: IdentifyPayload) {
  eventHandlers.debug?.(
    {
      type: "gatewayIdentify",
      data: {
        shardID: shard.id,
      },
    },
  );

  return shard.ws.send(
    JSON.stringify(
      {
        op: GatewayOpcodes.Identify,
        d: { ...payload, shard: [shard.id, payload.shard[1]] },
      },
    ),
  );
}

function resume(shard: BasicShard, payload: IdentifyPayload) {
  return shard.ws.send(JSON.stringify({
    op: GatewayOpcodes.Resume,
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
  data: GetGatewayBotPayload,
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
      return shard.ws.send(JSON.stringify({ op: 4009 }));
    }
  }

  // Set it to false as we are issuing a new heartbeat
  heartbeating.set(shard.id, false);

  shard.ws.send(
    JSON.stringify(
      { op: GatewayOpcodes.Heartbeat, d: shard.previousSequenceNumber },
    ),
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
  data: GetGatewayBotPayload,
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

  eventHandlers.debug?.({ type: "gatewayResume", data: { shardID: shard.id } });
  // Run it once
  await createShard(data, payload, true, shard.id);
  // Then retry every 15 seconds
  await delay(1000 * 15);
  if (shard.needToResume) await resumeConnection(data, payload, shardID);
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
      return processGatewayQueue();
    }
    return;
  }

  // If its closed add back to queue to redo on resume
  if (shard?.ws.readyState === WebSocket.CLOSED) {
    requestGuildMembers(guildID, shardID, nonce, options);
    return;
  }

  shard?.ws.send(JSON.stringify({
    op: GatewayOpcodes.RequestGuildMembers,
    d: {
      guild_id: guildID,
      // If a query is provided use it, OR if a limit is NOT provided use ""
      query: options?.query || (options?.limit ? undefined : ""),
      limit: options?.limit || 0,
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
      eventHandlers.debug?.(
        {
          type: "requestMembersProcessing",
          data: {
            remaining: RequestMembersQueue.length,
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
        requestGuildMembers(
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
  });

  await delay(1500);

  await processGatewayQueue();
}

export function botGatewayStatusRequest(payload: BotStatusRequest) {
  basicShards.forEach((shard) => {
    shard.ws.send(JSON.stringify({
      op: GatewayOpcodes.PresenceUpdate,
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
