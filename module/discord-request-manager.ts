import Client from "../module/client.ts"
import { RequestMethod } from "../types/fetch.ts"
import { Ratelimiter } from "./ratelimiter.ts"

// type RequestBody = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | null | undefined

export default class Request_Manager {
  ratelimiter = new Ratelimiter()

  constructor(public client: Client) {
    this.client = client
  }

  async get(url: string, body?: unknown) {
    return this.runMethod(RequestMethod.Get, url, body)
  }

  protected async addBucket(headers: Headers) {
    this.ratelimiter.addBucket(headers.get("X-RateLimit-Bucket")!, {
      retryAfter: parseInt(headers.get("X-RateLimit-Retry-After")!),
      limit: parseInt(headers.get("X-RateLimit-Limit")!),
      remaining: parseInt(headers.get("X-RateLimit-Remaining")!),
      reset: parseInt(headers.get("X-RateLimit-Reset")!)
    })
  }

  async post(url: string, body?: unknown) {
    return this.runMethod(RequestMethod.Post, url, body)
  }

  async delete(url: string, body?: unknown) {
    return this.runMethod(RequestMethod.Delete, url, body)
  }

  async patch(url: string, body: unknown) {
    return this.runMethod(RequestMethod.Patch, url, body)
  }

  async put(url: string, body?: unknown) {
    return this.runMethod(RequestMethod.Put, url, body)
  }

  protected async baseCreateRequestForMethod(method: RequestMethod, url: string, body?: unknown) {
    return fetch(this.resolveURL(url), {
      method,
      headers: this.getDiscordHeaders(),
      body: body ? JSON.stringify(body) : undefined
    })
  }

  async runMethod(method: RequestMethod, url: string, body?: unknown) {
    const response = await this.baseCreateRequestForMethod(method, url, body)
    return response.json()
  }

  // A hook for the RouteAwareRequestManager to override URLs.
  protected resolveURL(url: string) {
    return url
  }

  // The Record type here plays nice with Deno's `fetch.headers` expected type.
  getDiscordHeaders(): Record<string, string> {
    return {
      Authorization: this.client.authorization,
      "User-Agent": `Discordeno (https://github.com/skillz4killz/discordeno, 0.0.1)`
    }
  }
}
