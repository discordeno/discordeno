import Client from "../module/Client.ts"
import { RequestMethod } from "../types/fetch.ts"

// type RequestBody = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | null | undefined

export default class DiscordDiscordRequestManager {
  client: Client
  token: string

  constructor(client: Client, token: string) {
    this.client = client
    this.token = token
  }

  async get(url: string, body?: unknown) {
    const headers = this.getDiscordHeaders()
    return fetch(url, { headers, body: body ? JSON.stringify(body) : undefined }).then(res => res.json())
  }

  async post(url: string, body?: unknown) {
    const headers = this.getDiscordHeaders()
    return fetch(url, {
      method: RequestMethod.Post,
      headers,
      body: body ? JSON.stringify(body) : undefined
    }).then(res => res.json())
  }

  async delete(url: string, body?: unknown) {
    const headers = this.getDiscordHeaders()
    return fetch(url, {
      method: RequestMethod.Delete,
      headers,
      body: body ? JSON.stringify(body) : undefined
    })
  }

  async patch(url: string, body: unknown) {
    const headers = this.getDiscordHeaders()
    return fetch(url, {
      method: RequestMethod.Patch,
      headers,
      body: body ? JSON.stringify(body) : undefined
    }).then(res => res.json())
	}

	async put(url: string, body: unknown) {
    const headers = this.getDiscordHeaders()
    return fetch(url, {
      method: RequestMethod.Put,
      headers,
      body: body ? JSON.stringify(body) : undefined
    }).then(res => res.json())
  }

  // The Record type here plays nice with Deno's `fetch.headers` expected type.
  getDiscordHeaders(): Record<string, string> {
    return {
      Authorization: this.token,
      "User-Agent": `DiscordBot (https://github.com/skillz4killz/discordeno, 0.0.1)`
    }
  }
}
