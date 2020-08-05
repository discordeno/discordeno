import {
  connectWebSocket,
  isWebSocketCloseEvent,
  WebSocket,
} from "https://deno.land/std@0.61.0/ws/mod.ts";
import {
  GatewayOpcode,
  DiscordBotGatewayData,
  DiscordHeartbeatPayload,
  ReadyPayload,
} from "../types/discord.ts";
import { logRed } from "../utils/logger.ts";
import { FetchMembersOptions } from "../types/guild.ts";
import { delay } from "https://deno.land/std@0.61.0/async/delay.ts";
import { DebugArg } from "../types/options.ts";

let shardSocket: WebSocket;

/** The session id is needed for RESUME functionality when discord disconnects randomly. */
let sessionID = "";

// Discord requests null if no number has yet been sent by discord
let previousSequenceNumber: number | null = null;
let needToResume = false;
let shardID = 0;

const RequestMembersQueue: RequestMemberQueuedRequest[] = [];
let processQueue = false;

interface RequestMemberQueuedRequest {
  guildID: string;
  nonce: string;
  options?: FetchMembersOptions;
}

async function processRequestMembersQueue() {
  if (!RequestMembersQueue.length) {
    processQueue = false;
    return;
  }

  // 2 events per second is the rate limit.
  const request = RequestMembersQueue.shift();
  if (request) {
    requestGuildMembers(request.guildID, request.nonce, request.options, true);

    const secondRequest = RequestMembersQueue.shift();
    if (secondRequest) {
      requestGuildMembers(
        secondRequest.guildID,
        secondRequest.nonce,
        secondRequest.options,
        true,
      );
    }
  }

  await delay(1500);

  postDebug(
    {
      type: "requestMembersProcessing",
      data: { shardID, remaining: RequestMembersQueue.length },
    },
  );
  processRequestMembersQueue();
}

// TODO: If a client does not receive a heartbeat ack between its attempts at sending heartbeats, it should immediately terminate the connection with a non-1000 close code, reconnect, and attempt to resume.
async function sendConstantHeartbeats(
  interval: number,
) {
  await delay(interval);
  shardSocket.send(
    JSON.stringify({ op: GatewayOpcode.Heartbeat, d: previousSequenceNumber }),
  );
  postDebug(
    { type: "heartbeat", data: { interval, previousSequenceNumber, shardID } },
  );

  sendConstantHeartbeats(interval);
}

async function resumeConnection(
  botGatewayData: DiscordBotGatewayData,
  identifyPayload: object,
) {
  postDebug({ type: "resuming", data: { shardID } });
  // Run it once
  createShard(botGatewayData, identifyPayload, true);
  // Then retry every 15 seconds
  await delay(1000 * 15);
  if (needToResume) resumeConnection(botGatewayData, identifyPayload);
}

const createShard = async (
  botGatewayData: DiscordBotGatewayData,
  identifyPayload: object,
  resuming = false,
) => {
  postDebug({ type: "createShard", data: { shardID } });

  shardSocket = await connectWebSocket(botGatewayData.url);
  let resumeInterval = 0;

  if (!resuming) {
    // Intial identify with the gateway
    await shardSocket.send(
      JSON.stringify({ op: GatewayOpcode.Identify, d: identifyPayload }),
    );
  } else {
    await shardSocket.send(JSON.stringify({
      op: GatewayOpcode.Resume,
      d: {
        ...identifyPayload,
        session_id: sessionID,
        seq: previousSequenceNumber,
      },
    }));
  }

  for await (const message of shardSocket) {
    if (typeof message === "string") {
      const data = JSON.parse(message);

      switch (data.op) {
        case GatewayOpcode.Hello:
          sendConstantHeartbeats(
            (data.d as DiscordHeartbeatPayload).heartbeat_interval,
          );
          break;
        case GatewayOpcode.Reconnect:
        case GatewayOpcode.InvalidSession:
          // When d is false we need to reidentify
          if (!data.d) {
            postDebug({ type: "invalidSession", data: { shardID } });
            createShard(botGatewayData, identifyPayload);
            break;
          }
          needToResume = true;
          resumeConnection(botGatewayData, identifyPayload);
          break;
        default:
          if (data.t === "RESUMED") {
            postDebug({ type: "resumed", data: { shardID } });

            needToResume = false;
            break;
          }
          // Important for RESUME
          if (data.t === "READY") {
            sessionID = (data.d as ReadyPayload).session_id;
          }

          // Update the sequence number if it is present
          if (data.s) previousSequenceNumber = data.s;

          // @ts-ignore
          postMessage(
            {
              type: "HANDLE_DISCORD_PAYLOAD",
              payload: message,
              resumeInterval,
              shardID,
            },
          );
          break;
      }
    } else if (isWebSocketCloseEvent(message)) {
      postDebug({ type: "websocketClose", data: { shardID, message } });

      // These error codes should just crash the projects
      if ([4004, 4005, 4012, 4013, 4014].includes(message.code)) {
        logRed(`Close :( ${JSON.stringify(message)}`);
        postDebug({ type: "websocketErrored", data: { shardID, message } });

        throw new Error(
          "Shard.ts: Error occurred that is not resumeable or able to be reconnected.",
        );
      }
      // These error codes can not be resumed but need to reconnect from start
      if ([4003, 4007, 4008, 4009].includes(message.code)) {
        postDebug(
          { type: "websocketReconnecting", data: { shardID, message } },
        );
        createShard(botGatewayData, identifyPayload);
      } else {
        needToResume = true;
        resumeConnection(botGatewayData, identifyPayload);
      }
    }
  }
};

function requestGuildMembers(
  guildID: string,
  nonce: string,
  options?: FetchMembersOptions,
  queuedRequest = false,
) {
  // This request was not from this queue so we add it to queue first
  if (!queuedRequest) {
    RequestMembersQueue.push({
      guildID,
      nonce,
      options,
    });

    if (!processQueue) {
      processQueue = true;
      processRequestMembersQueue();
    }
    return;
  }

  // If its closed add back to queue to redo on resume
  if (shardSocket.isClosed) {
    requestGuildMembers(guildID, nonce, options);
    return;
  }

  shardSocket.send(JSON.stringify({
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

// TODO: Errors need to be fixed by VSC plugin
// @ts-ignore
postMessage({ type: "REQUEST_CLIENT_OPTIONS" });
// @ts-ignore
onmessage = (message: MessageEvent) => {
  if (message.data.type === "CREATE_SHARD") {
    createShard(
      message.data.botGatewayData,
      message.data.identifyPayload,
    );
    shardID = message.data.shardID;
  }

  if (message.data.type === "FETCH_MEMBERS") {
    requestGuildMembers(
      message.data.guildID,
      message.data.nonce,
      message.data.options,
    );
  }

  if (message.data.type === "EDIT_BOTS_STATUS") {
    shardSocket.send(JSON.stringify({
      op: GatewayOpcode.StatusUpdate,
      d: {
        since: null,
        game: message.data.game.name
          ? {
            name: message.data.game.name,
            type: message.data.game.type,
          }
          : null,
        status: message.data.status,
        afk: false,
      },
    }));
  }
};

function postDebug(details: DebugArg) {
  // TODO: Errors need to be fixed by VSC plugin
  postMessage({ type: "DEBUG_LOG", details });
}
