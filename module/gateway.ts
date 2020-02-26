import { WebSocket } from "https://deno.land/std/ws/mod.ts"
import { GatewayOpcode } from "../types/discord.ts"
import { delay } from "https://deno.land/std/util/async.ts"

// Discord requests null if no number has yet been sent by discord
let previous_sequence_number: number | null = null

// TODO: If a client does not receive a heartbeat ack between its attempts at sending heartbeats, it should immediately terminate the connection with a non-1000 close code, reconnect, and attempt to resume.
export const send_constant_heartbeats = async (
  socket: WebSocket,
  interval: number
) => {
  console.log(interval)
  await delay(interval)
  console.log('past interval')
  // TODO: If the initial seq num is null, this will make it forever null until a restart. Is this good?
  socket.send(JSON.stringify({ op: GatewayOpcode.Heartbeat, d: previous_sequence_number }))
  console.log(previous_sequence_number, 'previous')
  send_constant_heartbeats(socket, interval)
}

export const update_previous_sequence_number = (sequence: number) => {
  previous_sequence_number = sequence
}
