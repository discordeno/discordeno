import { DiscordBotGatewayData } from "../types/discord.ts";

export const shards = new Map<string, Shard>();

export function connectWebSocket(data: DiscordBotGatewayData) {
  const shard: Shard = {
    ws: new WebSocket(data.url),
  };


  shard.ws.onmessage = onWebSocketMessage;
  shard.ws.onclose = onWebSocketClose;
  shard.ws.onerror = onWebSocketError;
}

/** @private */
function onWebSocketMessage() {}

/** @private */
function onWebSocketClose() {}

/** @private */
function onWebSocketError() {}

export interface Shard {
  ws: WebSocket;
}
