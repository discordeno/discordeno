import { BASE_URL, USER_AGENT } from "../util/constants.ts";
import { restCache } from "./cache.ts";
import { ServerRequest } from "./deps.ts";
import { processQueue } from "./queue.ts";
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
  const route = request.url.substring(request.url.indexOf("api/"));
  const parts = route.split("/");
  // REMOVE THE API
  parts.shift();
  // REMOVES THE VERSION NUMBER
  if (parts[0]?.startsWith("v")) parts.shift();
  // SET THE NEW REQUEST URL
  request.url = `${BASE_URL}/v${options.apiVersion || 8}/${parts.join("/")}`;
  // REMOVE THE MAJOR PARAM
  parts.shift();

  const [id] = parts;

  const queue = restCache.pathQueues.get(id);
  // IF THE QUEUE EXISTS JUST ADD THIS TO THE QUEUE
  if (queue) {
    queue.push({ request, payload, options });
  } else {
    // CREATES A NEW QUEUE
    restCache.pathQueues.set(id, [{
      request,
      payload,
      options,
    }]);
    processQueue(id);
  }
}

/** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
export function createRequestBody(queuedRequest: QueuedRequest) {
  const headers: { [key: string]: string } = {
    Authorization: `Bot ${queuedRequest.options.token}`,
    "User-Agent": USER_AGENT,
  };

  // GET METHODS SHOULD NOT HAVE A BODY
  if (queuedRequest.request.method === "GET") {
    queuedRequest.payload.body = undefined;
  }

  // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
  if (queuedRequest.payload.body?.reason) {
    headers["X-Audit-Log-Reason"] = encodeURIComponent(
      queuedRequest.payload.body.reason,
    );
  }

  // IF A FILE/ATTACHMENT IS PRESENT WE NEED SPECIAL HANDLING
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
    !["GET", "DELETE"].includes(queuedRequest.request.method)
  ) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    body: queuedRequest.payload.body?.file ||
      JSON.stringify(queuedRequest.payload.body),
    method: queuedRequest.request.method,
  };
}

/** Processes the rate limit headers and determines if it needs to be ratelimited and returns the bucket id if available */
export function processRequestHeaders(url: string, headers: Headers) {
  let ratelimited = false;

  // GET ALL NECESSARY HEADERS
  const remaining = headers.get("x-ratelimit-remaining");
  const resetTimestamp = headers.get("x-ratelimit-reset");
  const retryAfter = headers.get("retry-after");
  const global = headers.get("x-ratelimit-global");
  const bucketID = headers.get("x-ratelimit-bucket");

  // IF THERE IS NO REMAINING RATE LIMIT, MARK IT AS RATE LIMITED
  if (remaining && remaining === "0") {
    ratelimited = true;

    // SAVE THE URL AS LIMITED, IMPORTANT FOR NEW REQUESTS BY USER WITHOUT BUCKET
    restCache.ratelimitedPaths.set(url, {
      url,
      resetTimestamp: Number(resetTimestamp) * 1000,
      bucketID,
    });

    // SAVE THE BUCKET AS LIMITED SINCE DIFFERENT URLS MAY SHARE A BUCKET
    if (bucketID) {
      restCache.ratelimitedPaths.set(bucketID, {
        url,
        resetTimestamp: Number(resetTimestamp) * 1000,
        bucketID,
      });
    }
  }

  // IF THERE IS NO REMAINING GLOBAL LIMIT, MARK IT RATE LIMITED GLOBALLY
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
    // IF THE TIME HAS NOT REACHED CANCEL
    if (value.resetTimestamp > now) return;
    // RATE LIMIT IS OVER, DELETE THE RATE LIMITER
    restCache.ratelimitedPaths.delete(key);
    // IF IT WAS GLOBAL ALSO MARK THE GLOBAL VALUE AS FALSE
    if (key === "global") restCache.globallyRateLimited = false;
  });

  // RECHECK IN 1 SECOND
  setTimeout(() => processRateLimitedPaths(), 1000);
}

/** Starts the loop */
processRateLimitedPaths();
