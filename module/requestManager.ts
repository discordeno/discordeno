import { RequestMethod } from "../types/fetch.ts"
import { authorization } from "./client.ts"
import { sleep } from "../utils/utils.ts"

const ratelimitedPaths = new Map<string, RateLimitedPath>()

export interface RateLimitedPath {
  url: string
  resetTimestamp: number
}

setInterval(() => {
  const now = Date.now()
  ratelimitedPaths.forEach((value, key) => {
    if (value.resetTimestamp > now) return
    ratelimitedPaths.delete(key)
  })
}, 1000)

export const RequestManager = {
  // Something off about using runMethod with get breaks when using fetch
  get: async (url: string, body?: unknown) => {
    await checkRatelimits(url)
    const result = await fetch(url, createRequestBody(body))
    processHeaders(url, result.headers)

    return result.json()
  },
  post: (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Post, url, body)
  },
  delete: (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Delete, url, body)
  },
  patch: (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Patch, url, body)
  },
  put: (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Put, url, body)
  },
}

const createRequestBody = (body: any, method?: RequestMethod) => {
  return {
    headers: {
      Authorization: authorization,
      "User-Agent": `DiscordBot (https://github.com/skillz4killz/discordeno, 0.0.1)`,
      "Content-Type": "application/json",
      "X-Audit-Log-Reason": body ? encodeURIComponent(body.reason) : "",
    },
    body: JSON.stringify(body),
    method: method?.toUpperCase(),
  }
}

const runMethod = async (method: RequestMethod, url: string, body?: unknown) => {
  await checkRatelimits(url)
  const response = await fetch(url, createRequestBody(body, method))
  processHeaders(url, response.headers)

  // Sometimes Discord returns an empty 204 response that can't be made to JSON.
  if (response.status === 204) return

  return await response.json()
}

const checkRatelimits = async (url: string) => {
  const ratelimited = ratelimitedPaths.get(url)
  const global = ratelimitedPaths.get("global")

  const now = Date.now()
  if (ratelimited && now < ratelimited.resetTimestamp) await sleep(now - ratelimited.resetTimestamp)
  if (global && now < global.resetTimestamp) await sleep(now - global.resetTimestamp)
}

const processHeaders = (url: string, headers: Headers) => {
  // If a rate limit response is encountered this will become true and returned
  let ratelimited = false

  // Get all useful headers
  const remaining = headers.get("x-ratelimit-remaining")
  const resetTimestamp = headers.get("x-ratelimit-reset")
  const retryAfter = headers.get("retry-after")
  const global = headers.get("x-ratelimit-global")

  // If there is no remaining rate limit for this endpoint, we save it in cache
  if (remaining && remaining === "0") {
    ratelimited = true

    ratelimitedPaths.set(url, {
      url,
      resetTimestamp: Number(resetTimestamp),
    })
  }

  // If there is no remaining global limit, we save it in cache
  if (global) {
    ratelimited = true

    ratelimitedPaths.set("global", {
      url: "global",
      resetTimestamp: Date.now() + Number(retryAfter),
    })
  }

  // Returns a boolean to check if we need to request again once the rate limit resets
  return ratelimited
}
