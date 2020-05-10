import {
  connectWebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std@0.50.0/ws/mod.ts";
import { GatewayOpcode, DiscordBotGatewayData } from "../types/discord.ts";
import { logRed } from "../utils/logger.ts";
import { handleDiscordPayload, resumeConnection } from "./shardingManager.ts";

export const createShard = async (
  botGatewayData: DiscordBotGatewayData,
  identifyPayload: object,
) => {
  const shardSocket = await connectWebSocket(botGatewayData.url);
  let resumeInterval = 0;

  // Intial identify with the gateway
  await shardSocket.send(
    JSON.stringify({ op: GatewayOpcode.Identify, d: identifyPayload }),
  );
  for await (const message of shardSocket) {
    console.log("inside socket", message);
    if (typeof message === "string") {
      handleDiscordPayload(JSON.parse(message), shardSocket, resumeInterval);
    } else if (isWebSocketCloseEvent(message)) {
      logRed(`Close :( ${JSON.stringify(message)}`);
      resumeInterval = await resumeConnection(identifyPayload, shardSocket);
    }
  }
};

postMessage({ type: "REQUEST_CLIENT_OPTIONS" });
onmessage = (message) => {
  if (message.data.type === "CREATE_SHARD") {
    createShard(message.data.botGatewayData, message.data.identifyPayload);
  }
};
