import { RequestMethod } from "../types/fetch.ts"
import { authorization } from "./client.ts"

// const queue = new Map<string, Queued_Request>()
// const ratelimited_paths = new Map<string, Rate_Limited_Path>()

export const Request_Manager = {
  // Something off about using run_method with get breaks when using fetch
  get: (url: string, body?: unknown) => {
    // TODO: Check rate limit

    const result = await fetch(url, create_request_body(body))

    // TODO: Handle rate limiting
    console.log('GET headers', result.headers)

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

const create_request_body = (body: unknown, method?: RequestMethod) => {
  // TODO: REASON should be added as a header if present in the body
  return {
    headers: {
      Authorization: authorization,
      "User-Agent": `Discordeno (https://github.com/skillz4killz/discordeno, 0.0.1)`
    },
    body: body ? JSON.stringify(body) : undefined,
    method
  }
}

const run_method = (method: RequestMethod, url: string, body?: unknown) => {
  // TODO: Check if this url is rate limited

  const response = await fetch(url, create_request_body(body, method))

  // TODO: Handle ratelimiting
  console.log(`${method} HEADERS:`, response.headers)

  return response.json()
}
