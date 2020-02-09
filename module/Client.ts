import { endpoints } from "../constants/discord.ts"
import RequestManager from "../managers/RequestManager.ts";

class Client {
	/** The bot's token. This should never be used by end users. It is meant to be used internally to make requests to the Discord API. */
	token: string

	/** The Rate limit manager to handle all outgoing requests to discord. Not meant to be used by users. */
	protected requestManager: RequestManager;

	constructor(token: string) {
		this.token = `Bot ${token}`
		this.requestManager = new RequestManager(this, this.token);
	}

	async connect() {
		// const data = await fetch(endpoints.GATEWAY_BOT).then(res => res.json())
		// console.log(data)
		console.log(await this.requestManager.get(endpoints.GATEWAY_BOT))
	}
}

export default Client