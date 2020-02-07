import { endpoints } from "../constants/discord.ts"
import RequestHandler from "../services/RequestHandler.ts"

class Client {
	/** The bot's token. This should never be used by end users. It is meant to be used internally to make requests to the Discord API. */
	token: string
	/** The Rate limit manager to handle all outgoing requests to discord. Not meant to be used by users. */
	RequestHandler: RequestHandler

	constructor(token: string) {
		this.token = `Bot ${token}`
		this.RequestHandler = new RequestHandler(this, this.token)
	}

	async connect() {
		// const data = await fetch(endpoints.GATEWAY_BOT).then(res => res.json())
		// console.log(data)
		console.log(await this.RequestHandler.get(endpoints.GATEWAY_BOT))
	}
}

export default Client