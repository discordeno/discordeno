import { WebSocket } from 'https://deno.land/std/ws/mod.ts'

let previousSequenceNumber: number | null = null

export const keepDiscordWebsocketAlive = (
  socket: WebSocket,
  millesecondsInterval: number,
  payload: number | null = null
) => {
  previousSequenceNumber = payload

  setInterval(() => {
    socket.send(
      JSON.stringify({
        op: 1,
        d: previousSequenceNumber
      })
    )
  }, millesecondsInterval)
}

export const updatePreviousSequenceNumber = (sequence: number | null = null) => {
  previousSequenceNumber = sequence
}
