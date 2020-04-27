import { WebSocket } from "https://deno.land/std@v0.41.0/ws/mod.ts"
import { GatewayOpcode } from "../types/discord.ts"
import { delay } from "https://deno.land/std@v0.41.0/util/async.ts"

// Discord requests null if no number has yet been sent by discord
let previous_sequence_number: number | null = null

// TODO: If a client does not receive a heartbeat ack between its attempts at sending heartbeats, it should immediately terminate the connection with a non-1000 close code, reconnect, and attempt to resume.
export const send_constant_heartbeats = async (socket: WebSocket, interval: number) => {
  await delay(interval)
  socket.send(JSON.stringify({ op: GatewayOpcode.Heartbeat, d: previous_sequence_number }))
  send_constant_heartbeats(socket, interval)
}

export const update_previous_sequence_number = (sequence: number) => {
  previous_sequence_number = sequence
}
