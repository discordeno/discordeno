import { WebSocket } from "https://deno.land/std/ws/mod.ts";

export const keepDiscordWebsocketAlive = (socket: WebSocket, millesecondsInterval: number, payload: number | null = null) => {
	let previousSequenceNumber = payload

	setInterval(() => {
		const response = await socket.send(JSON.stringify({
			op: 1,
			d: previousSequenceNumber
		}))

		console.log(response)

	}, millesecondsInterval)
}
