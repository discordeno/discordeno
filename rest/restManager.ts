import { API_VERSION, baseEndpoints } from "../util/constants.ts";
import { removeTokenPrefix } from "../util/token.ts";
import { checkRateLimits } from "./checkRateLimits.ts";
import { cleanupQueues } from "./cleanupQueues.ts";
import { convertRestError } from "./convertRestError.ts";
import { createInvalidRequestBucket } from "./createInvalidRequestBucket.ts";
import { QueueBucket } from "./createQueueBucket.ts";
import { createRequestBody } from "./createRequestBody.ts";
import { processGlobalQueue } from "./processGlobalQueue.ts";
import { processQueue } from "./processQueue.ts";
import { processRateLimitedPaths } from "./processRateLimitedPaths.ts";
import { processRequest } from "./processRequest.ts";
import { processRequestHeaders } from "./processRequestHeaders.ts";
import { RestPayload, RestRateLimitedPath, RestRequest } from "./rest.ts";
import { runMethod } from "./runMethod.ts";
import { RestSendRequestOptions, sendRequest } from "./sendRequest.ts";
import { simplifyUrl } from "./simplifyUrl.ts";

export function createRestManager(options: CreateRestManagerOptions) {
  const version = options.version || API_VERSION;

  if (options.customUrl) {
    baseEndpoints.BASE_URL = `${options.customUrl}/v${version}`;
  }

  const rest = {
    invalidBucket: createInvalidRequestBucket({}),
    version,
    token: removeTokenPrefix(options.token),
    maxRetryCount: options.maxRetryCount || 10,
    secretKey: options.secretKey || "discordeno_best_lib_ever",
    customUrl: options.customUrl || "",
    pathQueues: new Map<string, QueueBucket>(),
    processingQueue: false,
    processingRateLimitedPaths: false,
    globallyRateLimited: false,
    globalQueue: [] as {
      request: RestRequest;
      payload: RestPayload;
      basicURL: string;
      urlToUse: string;
    }[],
    globalQueueProcessing: false,
    rateLimitedPaths: new Map<string, RestRateLimitedPath>(),

    debug: options.debug || function (_text: string) {},
    checkRateLimits: options.checkRateLimits || checkRateLimits,
    cleanupQueues: options.cleanupQueues || cleanupQueues,
    processQueue: options.processQueue || processQueue,
    processRateLimitedPaths: options.processRateLimitedPaths ||
      processRateLimitedPaths,
    processRequestHeaders: options.processRequestHeaders ||
      processRequestHeaders,
    processRequest: options.processRequest || processRequest,
    createRequestBody: options.createRequestBody || createRequestBody,
    runMethod: options.runMethod || runMethod,
    simplifyUrl: options.simplifyUrl || simplifyUrl,
    processGlobalQueue: options.processGlobalQueue || processGlobalQueue,
    convertRestError: options.convertRestError || convertRestError,
    sendRequest: options.sendRequest || sendRequest,

    fetching: options.fetching || function (opts: RestSendRequestOptions) {
      options.debug?.(
        `[REST - fetching] URL: ${opts.url} | ${JSON.stringify(opts)}`,
      );
    },
    fetched: options.fetched || function (
      opts: RestSendRequestOptions,
      response: Response,
    ) {
      options.debug?.(
        `[REST - fetched] URL: ${opts.url} | Status: ${response.status} ${JSON.stringify(opts)}`,
      );
    },
  };

  return rest;
}

export interface CreateRestManagerOptions {
  token: string;
  customUrl?: string;
  maxRetryCount?: number;
  version?: number;
  secretKey?: string;
  debug?: (text: string) => unknown;
  checkRateLimits?: typeof checkRateLimits;
  cleanupQueues?: typeof cleanupQueues;
  processQueue?: typeof processQueue;
  processRateLimitedPaths?: typeof processRateLimitedPaths;
  processRequestHeaders?: typeof processRequestHeaders;
  processRequest?: typeof processRequest;
  createRequestBody?: typeof createRequestBody;
  runMethod?: typeof runMethod;
  simplifyUrl?: typeof simplifyUrl;
  processGlobalQueue?: typeof processGlobalQueue;
  convertRestError?: typeof convertRestError;
  sendRequest?: typeof sendRequest;
  fetching?: (options: RestSendRequestOptions) => void;
  fetched?: (options: RestSendRequestOptions, response: Response) => void;
}

export type RestManager = ReturnType<typeof createRestManager>;
