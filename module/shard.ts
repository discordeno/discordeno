import { connectWebSocket, isWebSocketCloseEvent } from "https://deno.land/std@v1.0.0-rc1/ws/mod.ts"
import { botGatewayData, identifyPayload } from "./client.ts"
import { GatewayOpcode } from "../types/discord.ts"
import { logRed } from "../utils/logger.ts"
import { handleDiscordPayload, resumeConnection } from "./shardingManager.ts"

let shardSocket = await connectWebSocket(botGatewayData.url)
let resumeInterval = 0

// Intial identify with the gateway
await shardSocket.send(JSON.stringify({ op: GatewayOpcode.Identify, d: identifyPayload }))

for await (const message of shardSocket) {
  if (typeof message === "string") {
    handleDiscordPayload(JSON.parse(message), shardSocket, resumeInterval)
  } else if (isWebSocketCloseEvent(message)) {
    logRed(`Close :( ${JSON.stringify(message)}`)
    resumeInterval = await resumeConnection(identifyPayload, shardSocket)
  }
}
