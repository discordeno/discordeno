import {
  connectWebSocket,
  isWebSocketCloseEvent,
  WebSocket,
} from "https://deno.land/std@0.50.0/ws/mod.ts";
import {
  GatewayOpcode,
  DiscordBotGatewayData,
  DiscordHeartbeatPayload,
  ReadyPayload,
} from "../types/discord.ts";
import { logRed } from "../utils/logger.ts";
import { FetchMembersOptions } from "../types/guild.ts";
import { delay } from "https://deno.land/std@0.50.0/async/delay.ts";
let shardSocket: WebSocket;

/** The session id is needed for RESUME functionality when discord disconnects randomly. */
let sessionID = "";

// Discord requests null if no number has yet been sent by discord
export let previousSequenceNumber: number | null = null;
let needToResume = false;

// TODO: If a client does not receive a heartbeat ack between its attempts at sending heartbeats, it should immediately terminate the connection with a non-1000 close code, reconnect, and attempt to resume.
async function sendConstantHeartbeats(
  interval: number,
) {
  await delay(interval);
  shardSocket.send(
    JSON.stringify({ op: GatewayOpcode.Heartbeat, d: previousSequenceNumber }),
  );
  sendConstantHeartbeats(interval);
}

async function resumeConnection(
  botGatewayData: DiscordBotGatewayData,
  identifyPayload: object,
) {
  // Run it once
  createShard(botGatewayData, identifyPayload, true);
  // Then retry every 15 seconds
  await delay(1000 * 15);
  if (needToResume) resumeConnection(botGatewayData, identifyPayload);
}

export const createShard = async (
  botGatewayData: DiscordBotGatewayData,
  identifyPayload: object,
  resuming = false,
) => {
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

  try {
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
            needToResume = true;
            resumeConnection(botGatewayData, identifyPayload);
            break;
          default:
            if (data.t === "RESUMED") {
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
              },
            );
            break;
        }
      } else if (isWebSocketCloseEvent(message)) {
        logRed(`Close :( ${JSON.stringify(message)}`);
        needToResume = true;
        resumeConnection(botGatewayData, identifyPayload);
      }
    }
  } catch (error) {
    logRed(error);
  }
};

export function requestGuildMembers(
  guildID: string,
  nonce: string,
  options?: FetchMembersOptions,
) {
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

// TODO: Remove ts-ignore once https://github.com/denoland/deno/issues/5262 fixed
// @ts-ignore
if (typeof self.postMessage === "function") {
  // @ts-ignore
  postMessage({ type: "REQUEST_CLIENT_OPTIONS" });
}
// @ts-ignore
if (typeof self.onmessage === "function") {
  // @ts-ignore
  onmessage = (message) => {
    if (message.data.type === "CREATE_SHARD") {
      createShard(
        message.data.botGatewayData,
        message.data.identifyPayload,
      );
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
}
