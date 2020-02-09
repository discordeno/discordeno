import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { GatewayOpcode } from "../types/discord.ts";

export const keepDiscordWebsocketAlive = (socket: WebSocket, millesecondsInterval: number, payload: number | null = null) => {
	let previousSequenceNumber = payload
	let doneInitial = false;

	setInterval(async () => {
		const response = await socket.send(JSON.stringify({
			op: 1,
			d: previousSequenceNumber
		}));

		console.log(response)

	}, millesecondsInterval)
}
