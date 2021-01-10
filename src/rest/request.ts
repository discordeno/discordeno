import { USER_AGENT } from "../util/constants.ts";
import { restCache } from "./cache.ts";
import { ServerRequest } from "./deps.ts";
import { startQueue } from "./queue.ts";
import {
  QueuedRequest,
  RestServerOptions,
  RunMethodOptions,
} from "./types/mod.ts";

/** Processes a request and assigns it to a queue or creates a queue if none exists for it. */
export function processRequest(
  request: ServerRequest,
  payload: RunMethodOptions,
  options: RestServerOptions,
) {
  const route = payload.url.substring(payload.url.indexOf("api/"));
  const parts = route.split("/");
  // remove the api
  parts.shift();
  // removes the version number
  if (parts[0]?.startsWith("v")) parts.shift();
  // remove the major param
  parts.shift();

  const [id] = parts;

  const queue = restCache.pathQueues.get(id);
  // if the queue exists just add this to the queue
  if (queue) {
    queue.push({ request, payload, options });
  } else {
    // creates a new queue
    restCache.pathQueues.set(id, [{ request, payload, options }]);
  }

  startQueue();
}

/** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
export function createRequestBody(queuedRequest: QueuedRequest) {
  const headers: { [key: string]: string } = {
    Authorization: queuedRequest.options.token,
    "User-Agent": USER_AGENT,
  };

  // get methods should not have a body
  if (queuedRequest.payload.method === "get") {
    queuedRequest.payload.body = undefined;
  }

  // if a reason is provided encode it in headers
  if (queuedRequest.payload.body?.reason) {
    headers["X-Audit-Log-Reason"] = encodeURIComponent(
      queuedRequest.payload.body.reason,
    );
  }

  // if a file/attachment is present we need special handling
  if (queuedRequest.payload.body?.file) {
    const form = new FormData();
    form.append(
      "file",
      queuedRequest.payload.body.file.blob,
      queuedRequest.payload.body.file.name,
    );
    form.append(
      "payload_json",
      JSON.stringify({ ...queuedRequest.payload.body, file: undefined }),
    );
    queuedRequest.payload.body.file = form;
  } else if (
    queuedRequest.payload.body &&
    !["get", "delete"].includes(queuedRequest.payload.method)
  ) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    body: queuedRequest.payload.body?.file ||
      JSON.stringify(queuedRequest.payload.body),
    method: queuedRequest.payload.method.toUpperCase(),
  };
}

/** Processes the rate limit headers and determines if it needs to be ratelimited and returns the bucket id if available */
export function processRequestHeaders(url: string, headers: Headers) {
  let ratelimited = false;

  // get all necessary headers
  const remaining = headers.get("x-ratelimit-remaining");
  const resetTimestamp = headers.get("x-ratelimit-reset");
  const retryAfter = headers.get("retry-after");
  const global = headers.get("x-ratelimit-global");
  const bucketID = headers.get("x-ratelimit-bucket");

  // if there is no remaining rate limit, mark it as rate limited
  if (remaining && remaining === "0") {
    ratelimited = true;

    // save the url as limited, important for new requests by user without bucket
    restCache.ratelimitedPaths.set(url, {
      url,
      resetTimestamp: Number(resetTimestamp) * 1000,
      bucketID,
    });

    // save the bucket as limited since different urls may share a bucket
    if (bucketID) {
      restCache.ratelimitedPaths.set(bucketID, {
        url,
        resetTimestamp: Number(resetTimestamp) * 1000,
        bucketID,
      });
    }
  }

  // if there is no remaining global limit, mark it rate limited globally
  if (global) {
    const reset = Date.now() + (Number(retryAfter) * 1000);
    restCache.eventHandlers.globallyRateLimited(url, reset);
    restCache.globallyRateLimited = true;
    ratelimited = true;

    restCache.ratelimitedPaths.set("global", {
      url: "global",
      resetTimestamp: reset,
      bucketID,
    });

    if (bucketID) {
      restCache.ratelimitedPaths.set(bucketID, {
        url: "global",
        resetTimestamp: reset,
        bucketID,
      });
    }
  }

  return ratelimited ? bucketID : undefined;
}

/** This wll create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
function processRateLimitedPaths() {
  const now = Date.now();

  restCache.ratelimitedPaths.forEach((value, key) => {
    // if the time has not reached cancel
    if (value.resetTimestamp > now) return;
    // rate limit is over, delete the rate limiter
    restCache.ratelimitedPaths.delete(key);
    // if it was global also mark the global value as false
    if (key === "global") restCache.globallyRateLimited = false;
  });

  // recheck in 1 second
  setTimeout(() => processRateLimitedPaths(), 1000);
}

/** Starts the loop */
processRateLimitedPaths();
