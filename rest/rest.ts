// deno-lint-ignore-file no-unused-vars
import { checkRateLimits } from "./checkRateLimits.ts";
import { cleanupQueues } from "./cleanupQueues.ts";
import { createRequestBody } from "./createRequestBody.ts";
import { processQueue } from "./processQueue.ts";
import { processRateLimitedPaths } from "./processRateLimitedPaths.ts";
import { processRequest } from "./processRequest.ts";
import { processRequestHeaders } from "./processRequestHeaders.ts";
import { runMethod } from "./runMethod.ts";
import { simplifyUrl } from "./simplifyUrl.ts";

export const rest = {
  /** The bot token for this rest client. */
  token: "",
  /** The maximum amount of retries allowed */
  maxRetryCount: 10,
  apiVersion: "9",
  /** The secret authorization key to confirm that this was a request made by you and not a DDOS attack. */
  authorization: "discordeno_best_lib_ever",
  pathQueues: new Map<
    string,
    {
      request: RestRequest;
      payload: RestPayload;
    }[]
  >(),
  processingQueue: false,
  processingRateLimitedPaths: false,
  globallyRateLimited: false,
  rateLimitedPaths: new Map<string, RestRateLimitedPath>(),
  eventHandlers: {
    // BY DEFAULT WE WILL LOG ALL ERRORS TO CONSOLE. USER CAN CHOOSE TO OVERRIDE
    error: function (...args: unknown[]) {},
    // PLACEHOLDERS TO ALLOW USERS TO CUSTOMIZE
    debug: function (type: string, error: string | Record<string, unknown>) {},
    fetching(payload: RestPayload) {},
    fetched(payload: RestPayload) {},
    fetchSuccess(payload: RestPayload) {},
    fetchFailed(payload: RestPayload, error: unknown) {},
    globallyRateLimited(url: string, resetsAt: number) {},
    retriesMaxed(payload: RestPayload) {},
  },
  /** Handler function for every request. Converts to json, verified authorization & requirements and begins processing the request */
  checkRateLimits,
  cleanupQueues,
  processQueue,
  processRateLimitedPaths,
  processRequestHeaders,
  processRequest,
  createRequestBody,
  runMethod,
  simplifyUrl,
};

export interface RestRequest {
  url: string;
  method: string;
  respond: (payload: { status: number; body?: string }) => unknown;
  reject: (error: unknown) => unknown;
}

export interface RestPayload {
  bucketId?: string;
  body?: Record<string, unknown>;
  retryCount: number;
}

export interface RestRateLimitedPath {
  url: string;
  resetTimestamp: number;
  bucketId?: string;
}
