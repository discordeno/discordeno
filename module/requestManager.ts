import { RequestMethod } from "../types/fetch.ts";
import { authorization } from "./client.ts";
import { delay } from "https://deno.land/std@0.50.0/async/delay.ts";
import { Errors } from "../types/errors.ts";

const queue: Array<() => Promise<unknown>> = [];
const ratelimitedPaths = new Map<string, RateLimitedPath>();
let globallyRateLimited = false;
let queueInProcess = false;

export interface RateLimitedPath {
  url: string;
  resetTimestamp: number;
}

async function processRateLimitedPaths() {
  const now = Date.now();
  ratelimitedPaths.forEach((value, key) => {
    if (value.resetTimestamp > now) return;
    ratelimitedPaths.delete(key);
    if (key === "global") globallyRateLimited = false;
  });

  await delay(1000);
  processRateLimitedPaths();
}

async function processQueue() {
  if (queue.length && !globallyRateLimited) {
    const callback = queue.shift();
    if (callback) await callback();
  }

  if (queue.length) processQueue();
  else queueInProcess = false;
}

processRateLimitedPaths();

export const RequestManager = {
  // Something off about using runMethod with get breaks when using fetch
  get: async (url: string, body?: unknown) => {
    await checkRatelimits(url);
    const result = await fetch(url, createRequestBody(body));
    processHeaders(url, result.headers);

    return result.json();
  },
  post: (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Post, url, body);
  },
  delete: (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Delete, url, body);
  },
  patch: (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Patch, url, body);
  },
  put: (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Put, url, body);
  },
};

function createRequestBody (body: any, method?: RequestMethod) {
  return {
    headers: {
      Authorization: authorization,
      "User-Agent":
        `DiscordBot (https://github.com/skillz4killz/discordeno, 0.0.1)`,
      "Content-Type": "application/json",
      "X-Audit-Log-Reason": body ? encodeURIComponent(body.reason) : "",
    },
    body: JSON.stringify(body),
    method: method?.toUpperCase(),
  };
};

async function checkRatelimits(url: string) {
  const ratelimited = ratelimitedPaths.get(url);
  const global = ratelimitedPaths.get("global");

  const now = Date.now();
  if (ratelimited && now < ratelimited.resetTimestamp) {
    await delay(now - ratelimited.resetTimestamp);
  }
  if (global && now < global.resetTimestamp) {
    await delay(now - global.resetTimestamp);
  }
}

async function runMethod(
  method: RequestMethod,
  url: string,
  body?: unknown,
  retryCount = 0,
) {
  return new Promise((resolve, reject) => {
    const callback = async () => {
      try {
        await checkRatelimits(url);
        const response = await fetch(url, createRequestBody(body, method));
        processHeaders(url, response.headers);

        // Sometimes Discord returns an empty 204 response that can't be made to JSON.
        if (response.status === 204) resolve();

        const json = await response.json();
        if (
          json.retry_after || json.message === "You are being rate limited."
        ) {
          if (retryCount > 10) throw new Error(Errors.RATE_LIMIT_RETRY_MAXED);
          await delay(json.retry_after);
          return runMethod(method, url, body, retryCount++)
        }

        return resolve(json);
      } catch (error) {
        return reject(error);
      }
    };

    queue.push(callback);
    if (!queueInProcess) {
      queueInProcess = true;
      processQueue();
    }
  });
};

function processHeaders(url: string, headers: Headers) {
  // If a rate limit response is encountered this will become true and returned
  let ratelimited = false;

  // Get all useful headers
  const remaining = headers.get("x-ratelimit-remaining");
  const resetTimestamp = headers.get("x-ratelimit-reset");
  const retryAfter = headers.get("retry-after");
  const global = headers.get("x-ratelimit-global");
  // const bucketID = headers.get("x-ratelimit-bucket");

  // If there is no remaining rate limit for this endpoint, we save it in cache
  if (remaining && remaining === "0") {
    ratelimited = true;

    ratelimitedPaths.set(url, {
      url,
      resetTimestamp: Number(resetTimestamp),
    });
  }

  // If there is no remaining global limit, we save it in cache
  if (global) {
    globallyRateLimited = true;
    ratelimited = true;

    ratelimitedPaths.set("global", {
      url: "global",
      resetTimestamp: Date.now() + Number(retryAfter),
    });
  }

  // Returns a boolean to check if we need to request again once the rate limit resets
  return ratelimited;
};
