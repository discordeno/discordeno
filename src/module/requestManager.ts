import { RequestMethod } from "../types/fetch.ts";
import { authorization, eventHandlers } from "./client.ts";
import { delay } from "https://deno.land/std@0.67.0/async/delay.ts";
import { Errors } from "../types/errors.ts";
import { HttpResponseCode } from "../types/discord.ts";
import { logRed } from "../utils/logger.ts";
import { baseEndpoints } from "../constants/discord.ts";

const pathQueues: { [key: string]: QueuedRequest[] } = {};
const ratelimitedPaths = new Map<string, RateLimitedPath>();
let globallyRateLimited = false;
let queueInProcess = false;

export interface QueuedRequest {
  callback: () => Promise<
    void | {
      rateLimited: any;
      beforeFetch: boolean;
      bucketID?: string | null;
    }
  >;
  bucketID?: string | null;
  url: string;
}

export interface RateLimitedPath {
  url: string;
  resetTimestamp: number;
  bucketID: string | null;
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

function addToQueue(request: QueuedRequest) {
  const route = request.url.substring(baseEndpoints.BASE_URL.length + 1);
  const parts = route.split("/");
  // Remove the major param
  parts.shift();
  const [id] = parts;

  if (pathQueues[id]) {
    pathQueues[id].push(request);
  } else {
    pathQueues[id] = [request];
  }
}

async function cleanupQueues() {
  Object.entries(pathQueues).map(([key, value]) => {
    if (!value.length) {
      // Remove it entirely
      delete pathQueues[key];
    }
  });
}

async function processQueue() {
  if (
    (Object.keys(pathQueues).length) && !globallyRateLimited
  ) {
    await Promise.allSettled(
      Object.values(pathQueues).map(async (pathQueue) => {
        const request = pathQueue.shift();
        if (!request) return;

        const rateLimitedURLResetIn = await checkRatelimits(request.url);

        if (request.bucketID) {
          const rateLimitResetIn = await checkRatelimits(request.bucketID);
          if (rateLimitResetIn) {
            // This request is still rate limited readd to queue
            addToQueue(request);
          } else if (rateLimitedURLResetIn) {
            // This URL is rate limited readd to queue
            addToQueue(request);
          } else {
            // This request is not rate limited so it should be run
            const result = await request.callback();
            if (result && result.rateLimited) {
              addToQueue(
                { ...request, bucketID: result.bucketID || request.bucketID },
              );
            }
          }
        } else {
          if (rateLimitedURLResetIn) {
            // This URL is rate limited readd to queue
            addToQueue(request);
          } else {
            // This request has no bucket id so it should be processed
            const result = await request.callback();
            if (request && result && result.rateLimited) {
              addToQueue(
                { ...request, bucketID: result.bucketID || request.bucketID },
              );
            }
          }
        }
      }),
    );
  }

  if (Object.keys(pathQueues).length) {
    await delay(1000);
    processQueue();
    cleanupQueues();
  } else queueInProcess = false;
}

processRateLimitedPaths();

export const RequestManager = {
  get: async (url: string, body?: unknown) => {
    return runMethod(RequestMethod.Get, url, body);
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

function createRequestBody(body: any, method: RequestMethod) {
  const headers: { [key: string]: string } = {
    Authorization: authorization,
    "User-Agent":
      `DiscordBot (https://github.com/skillz4killz/discordeno, 6.0.0)`,
  };

  if (method === "get") body = undefined;

  if (body?.reason) {
    headers["X-Audit-Log-Reason"] = encodeURIComponent(body.reason);
  }

  if (body?.file) {
    const form = new FormData();
    form.append("file", body.file.blob, body.file.name);
    form.append("payload_json", JSON.stringify({ ...body, file: undefined }));
    body.file = form;
  } else if (
    body && ![RequestMethod.Get, RequestMethod.Delete].includes(method)
  ) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    body: body?.file || JSON.stringify(body),
    method: method.toUpperCase(),
  };
}

async function checkRatelimits(url: string) {
  const ratelimited = ratelimitedPaths.get(url);
  const global = ratelimitedPaths.get("global");
  const now = Date.now();

  if (ratelimited && now < ratelimited.resetTimestamp) {
    return ratelimited.resetTimestamp - now;
  }
  if (global && now < global.resetTimestamp) {
    return global.resetTimestamp - now;
  }

  return false;
}

async function runMethod(
  method: RequestMethod,
  url: string,
  body?: unknown,
  retryCount = 0,
  bucketID?: string | null,
) {
  eventHandlers.debug?.(
    {
      type: "requestManager",
      data: { method, url, body, retryCount, bucketID },
    },
  );

  return new Promise((resolve, reject) => {
    const callback = async () => {
      try {
        const rateLimitResetIn = await checkRatelimits(url);
        if (rateLimitResetIn) {
          return { rateLimited: rateLimitResetIn, beforeFetch: true, bucketID };
        }

        const query = method === "get" && body
          ? Object.entries(body as any).map(([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
          )
            .join("&")
          : "";
        const urlToUse = method === "get" && query ? `${url}?${query}` : url;

        eventHandlers.debug?.(
          {
            type: "requestManagerFetching",
            data: { method, url, body, retryCount, bucketID },
          },
        );
        const response = await fetch(urlToUse, createRequestBody(body, method));
        eventHandlers.debug?.(
          {
            type: "requestManagerFetched",
            data: { method, url, body, retryCount, bucketID, response },
          },
        );
        const bucketIDFromHeaders = processHeaders(url, response.headers);
        handleStatusCode(response);

        // Sometimes Discord returns an empty 204 response that can't be made to JSON.
        if (response.status === 204) return resolve();

        const json = await response.json();
        if (
          json.retry_after ||
          json.message === "You are being rate limited."
        ) {
          if (retryCount > 10) {
            throw new Error(Errors.RATE_LIMIT_RETRY_MAXED);
          }

          return {
            rateLimited: json.retry_after,
            beforeFetch: false,
            bucketID: bucketIDFromHeaders,
          };
        }

        eventHandlers.debug?.(
          {
            type: "requestManagerSuccess",
            data: { method, url, body, retryCount, bucketID },
          },
        );
        return resolve(json);
      } catch (error) {
        eventHandlers.debug?.(
          {
            type: "requestManagerFailed",
            data: { method, url, body, retryCount, bucketID },
          },
        );
        return reject(error);
      }
    };

    addToQueue({
      callback,
      bucketID,
      url,
    });
    if (!queueInProcess) {
      queueInProcess = true;
      processQueue();
    }
  });
}

function handleStatusCode(response: Response) {
  const status = response.status;

  if (
    (status >= 200 && status < 400) ||
    status === HttpResponseCode.TooManyRequests
  ) {
    return true;
  }

  console.error(response);
  logRed(response);

  switch (status) {
    case HttpResponseCode.BadRequest:
    case HttpResponseCode.Unauthorized:
    case HttpResponseCode.Forbidden:
    case HttpResponseCode.NotFound:
    case HttpResponseCode.MethodNotAllowed:
      throw new Error(Errors.REQUEST_CLIENT_ERROR);
    case HttpResponseCode.GatewayUnavailable:
      throw new Error(Errors.REQUEST_SERVER_ERROR);
  }

  // left are all unknown
  throw new Error(Errors.REQUEST_UNKNOWN_ERROR);
}

function processHeaders(url: string, headers: Headers) {
  let ratelimited = false;

  // Get all useful headers
  const remaining = headers.get("x-ratelimit-remaining");
  const resetTimestamp = headers.get("x-ratelimit-reset");
  const retryAfter = headers.get("retry-after");
  const global = headers.get("x-ratelimit-global");
  const bucketID = headers.get("x-ratelimit-bucket");

  // If there is no remaining rate limit for this endpoint, we save it in cache
  if (remaining && remaining === "0") {
    ratelimited = true;

    ratelimitedPaths.set(url, {
      url,
      resetTimestamp: Number(resetTimestamp) * 1000,
      bucketID,
    });

    if (bucketID) {
      ratelimitedPaths.set(bucketID, {
        url,
        resetTimestamp: Number(resetTimestamp) * 1000,
        bucketID,
      });
    }
  }

  // If there is no remaining global limit, we save it in cache
  if (global) {
    const reset = Date.now() + Number(retryAfter);
    eventHandlers.debug?.(
      { type: "globallyRateLimited", data: { url, reset } },
    );
    globallyRateLimited = true;
    ratelimited = true;

    ratelimitedPaths.set("global", {
      url: "global",
      resetTimestamp: reset,
      bucketID,
    });

    if (bucketID) {
      ratelimitedPaths.set(bucketID, {
        url: "global",
        resetTimestamp: reset,
        bucketID,
      });
    }
  }

  return ratelimited ? bucketID : undefined;
}
