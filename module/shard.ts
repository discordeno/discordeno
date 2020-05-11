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
import { sendConstantHeartbeats, previousSequenceNumber } from "./gateway.ts";

export const USELESS_ARG_TO_MAKE_DENO_CACHE_WORK = undefined;
/** The session id is needed for RESUME functionality when discord disconnects randomly. */
let sessionID = "";

async function resumeConnection(
  payload: object,
  botGatewayData: DiscordBotGatewayData,
  socket: WebSocket,
) {
  return setInterval(async () => {
    socket = await connectWebSocket(botGatewayData.url);
    await socket.send(
      JSON.stringify({
        op: GatewayOpcode.Resume,
        d: {
          ...payload,
          session_id: sessionID,
          seq: previousSequenceNumber,
        },
      }),
    );
  }, 1000 * 15);
}

export const createShard = async (
  botGatewayData: DiscordBotGatewayData,
  identifyPayload: object,
) => {
  console.log("inside create shard");
  const shardSocket = await connectWebSocket(botGatewayData.url);
  let resumeInterval = 0;

  // Intial identify with the gateway
  await shardSocket.send(
    JSON.stringify({ op: GatewayOpcode.Identify, d: identifyPayload }),
  );

  for await (const message of shardSocket) {
    if (typeof message === "string") {
      const data = JSON.parse(message);

      switch (data.op) {
        case GatewayOpcode.Hello:
          sendConstantHeartbeats(
            shardSocket,
            (data.d as DiscordHeartbeatPayload).heartbeat_interval,
          );
          break;
        case GatewayOpcode.Reconnect:
        case GatewayOpcode.InvalidSession:
          // Reconnect to the gateway https://discordapp.com/developers/docs/topics/gateway#reconnect
          // I think this should be handled automatically when the websocket closes
          break;
        case GatewayOpcode.Resume:
          clearInterval(resumeInterval);
          break;
        default:
          // Important for RESUME
          if (data.t === "READY") {
            sessionID = (data.d as ReadyPayload).session_id;
          }
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
      resumeInterval = await resumeConnection(
        identifyPayload,
        botGatewayData,
        shardSocket,
      );
    }
  }
};

// TODO: Remove ts-ignore when deno fixes
// @ts-ignore
postMessage({ type: "REQUEST_CLIENT_OPTIONS" });
// @ts-ignore
onmessage = (message) => {
  if (message.data.type === "CREATE_SHARD") {
    console.log("shard need to make shard");
    createShard(
      message.data.botGatewayData,
      message.data.identifyPayload,
    );
  }
};
