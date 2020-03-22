import { RequestMethod } from "../types/fetch.ts"
import { authorization } from "./client.ts"
import { sleep } from "../utils/utils.ts"

const ratelimited_paths = new Map<string, Rate_Limited_Path>()

export interface Rate_Limited_Path {
  url: string
  reset_timestamp: number
}

setInterval(() => {
  const now = Date.now()
  ratelimited_paths.forEach((value, key) => {
    if (value.reset_timestamp > now) return
    ratelimited_paths.delete(key)
  })
}, 1000)

export const Request_Manager = {
  // Something off about using run_method with get breaks when using fetch
  get: async (url: string, body?: unknown) => {
    await check_ratelimits(url)
    const result = await fetch(url, create_request_body(body))
    process_headers(url, result.headers)

    return result.json()
  },
  post: (url: string, body?: unknown) => {
    return run_method(RequestMethod.Post, url, body)
  },
  delete: (url: string, body?: unknown) => {
    return run_method(RequestMethod.Delete, url, body)
  },
  patch: (url: string, body?: unknown) => {
    return run_method(RequestMethod.Patch, url, body)
  },
  put: (url: string, body?: unknown) => {
    return run_method(RequestMethod.Put, url, body)
  }
}

const create_request_body = (body: any, method?: RequestMethod) => {
  return {
    headers: {
      Authorization: authorization,
      "User-Agent": `DiscordBot (https://github.com/skillz4killz/discordeno, 0.0.1)`,
      "Content-Type": "application/json",
      "X-Audit-Log-Reason": body?.reason,
    },
    body: body ? JSON.stringify(body) : undefined,
    method: method?.toUpperCase()
  }
}

const run_method = async (method: RequestMethod, url: string, body?: unknown) => {
  await check_ratelimits(url)
  const response = await fetch(url, create_request_body(body, method))
  process_headers(url, response.headers)

  // Sometimes Discord returns an empty 204 response that can't be made to JSON.
  if (response.status === 204) return

  return await response.json()
}

const check_ratelimits = async (url: string) => {
  const ratelimited = ratelimited_paths.get(url)
  const global = ratelimited_paths.get("global")

  const now = Date.now()
  if (ratelimited && now < ratelimited.reset_timestamp) await sleep(now - ratelimited.reset_timestamp)
  if (global && now < global.reset_timestamp) await sleep(now - global.reset_timestamp)
}

const process_headers = (url: string, headers: Headers) => {
  // If a rate limit response is encountered this will become true and returned
  let ratelimited = false

  // Get all useful headers
  const remaining = headers.get("x-ratelimit-remaining")
  const reset_timestamp = headers.get("x-ratelimit-reset")
  const retry_after = headers.get("retry-after")
  const global = headers.get("x-ratelimit-global")

  // If there is no remaining rate limit for this endpoint, we save it in cache
  if (remaining && remaining === "0") {
    ratelimited = true

    ratelimited_paths.set(url, {
      url,
      reset_timestamp: Number(reset_timestamp)
    })
  }

  // If there is no remaining global limit, we save it in cache
  if (global) {
    ratelimited = true

    ratelimited_paths.set("global", {
      url: "global",
      reset_timestamp: Date.now() + Number(retry_after)
    })
  }

  // Returns a boolean to check if we need to request again once the rate limit resets
  return ratelimited
}
