import { WebSocket } from "https://deno.land/std/ws/mod.ts"
import { GatewayOpcode } from "../types/discord.ts"
import { delay } from "https://deno.land/std/util/async.ts"

export const sendConstantHeartbeats = async (socket: WebSocket, interval: number, previousSequenceNumber: number | null = null) => {
  await delay(interval)

  if (previousSequenceNumber) previousSequenceNumber += 1

  // TODO: If the initial seq num is null, this will make it forever null until a restart. Is this good?
  socket.send(JSON.stringify({ op: GatewayOpcode.Heartbeat, d: previousSequenceNumber }))
  sendConstantHeartbeats(socket, interval, previousSequenceNumber)
}
