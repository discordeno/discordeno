import Client from "../module/Client.ts";

class RequestManager {
	client: Client;
	token: string;
	currentRatelimit

	constructor(client: Client, token: string) {
		this.client = client
		this.token = token
	}

	async get(url: string, payload?: unknown, shouldRatelimit = true) {
		if (shouldRatelimit) {

		}
		const headers = this.getDiscordHeaders();
		console.log('payload', payload)
		
		const data = await fetch(url, { headers }).then(res => res.json())
		return data
	}

	// The Record type here plays nice with Deno's `fetch.headers` expected type.
	getDiscordHeaders (): Record<string, string> {
		return {
			Authorization: this.token,
			"User-Agent": `DiscordBot (https://github.com/skillz4killz/discordeno, 0.0.1)`,
		};
	}
}

export default RequestManager