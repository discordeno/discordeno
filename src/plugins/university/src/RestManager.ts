import { RestPayload, RestRequest } from "../../../rest/rest.ts";
import { ModifyChannel } from "../../../types/channels/modify_channel.ts";
import { DiscordHTTPResponseCodes } from "../../../types/codes/http_response_codes.ts";
import { FileContent } from "../../../types/discordeno/file_content.ts";
import { Collection } from "../../../util/collection.ts";
import { BASE_URL, IMAGE_BASE_URL, USER_AGENT } from "../../../util/constants.ts";
import { camelize, delay } from "../../../util/utils.ts";
import Client from "./Client.ts";

export class RestManager {
  /** The bot client this is managing for. */
  client: Client;
  /** The bot token */
  token: string;
  /** The paths that have been rate limited. */
  ratelimitedPaths: Collection<
    string,
    {
      resetTimestamp: number;
      url: string;
      bucketId?: string;
    }
  >;
  /** The queues that are waiting to be sent for each path. */
  pathQueues: Collection<
    string,
    {
      request: RestRequest;
      payload: RestPayload;
    }[]
  >;
  /** Whether or not the queues are being processed. */
  processingQueue: boolean;
  /** Whether or not all requests should be stopped because the token is globally rate limited. */
  globallyRateLimited: boolean;
  /** The maximum number of retries to attempt if a request fails. Defaults to 10. */
  maxRetryCount: number;
  /** Whether or not rate limit paths are being processed. */
  processingRateLimitedPaths: boolean;
  /** The rest api version to use */
  version: number;
  /** The authorization secret used if you are using a proxy rest server. */
  authorization?: string;
  /** The queue to editing the channel names or topics since they have special subratelimits. */
  editChannelNameTopicQueue = new Map<bigint, EditChannelRequest>();
  /** Whether or not the edit channel queue is currently being processed. */
  editChannelProcessing = false;

  constructor(client: Client) {
    this.client = client;
    this.token = this.client.token;
    this.ratelimitedPaths = new Collection();
    this.pathQueues = new Collection();
    this.processingQueue = false;
    this.globallyRateLimited = false;
    this.maxRetryCount = 10;
    this.processingRateLimitedPaths = false;
    this.version = 9;
  }

  /** Check the rate limits for a url or a bucket. */
  checkRateLimits(url: string) {
    const ratelimited = this.ratelimitedPaths.get(url);
    const global = this.ratelimitedPaths.get("global");
    const now = Date.now();

    if (ratelimited && now < ratelimited.resetTimestamp) {
      return ratelimited.resetTimestamp - now;
    }
    if (global && now < global.resetTimestamp) {
      return global.resetTimestamp - now;
    }

    return false;
  }

  /** Cleans up the queues by checking if there is nothing left and removing it. */
  cleanupQueues() {
    for (const [key, queue] of this.pathQueues) {
      this.client.emit("DEBUG", "loop", "Running for of loop in cleanupQueues function.");
      if (queue.length) continue;

      // REMOVE IT FROM CACHE
      this.pathQueues.delete(key);
    }

    // NO QUEUE LEFT, DISABLE THE QUEUE
    if (!this.pathQueues.size) this.processingQueue = false;
  }

  /** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
  createRequestBody(queuedRequest: { request: RestRequest; payload: RestPayload }) {
    const headers: { [key: string]: string } = {
      Authorization: this.token,
      "User-Agent": USER_AGENT,
    };

    // GET METHODS SHOULD NOT HAVE A BODY
    if (queuedRequest.request.method.toUpperCase() === "GET") {
      queuedRequest.payload.body = undefined;
    }

    // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
    if (queuedRequest.payload.body?.reason) {
      headers["X-Audit-Log-Reason"] = encodeURIComponent(queuedRequest.payload.body.reason as string);
    }

    // IF A FILE/ATTACHMENT IS PRESENT WE NEED SPECIAL HANDLING
    if (queuedRequest.payload.body?.file) {
      if (!Array.isArray(queuedRequest.payload.body.file)) {
        queuedRequest.payload.body.file = [queuedRequest.payload.body.file];
      }

      const form = new FormData();

      for (let i = 0; i < (queuedRequest.payload.body.file as FileContent[]).length; i++) {
        form.append(
          `file${i}`,
          (queuedRequest.payload.body.file as FileContent[])[i].blob,
          (queuedRequest.payload.body.file as FileContent[])[i].name
        );
      }

      form.append("payload_json", JSON.stringify({ ...queuedRequest.payload.body, file: undefined }));
      queuedRequest.payload.body.file = form;
    } else if (queuedRequest.payload.body && !["GET", "DELETE"].includes(queuedRequest.request.method)) {
      headers["Content-Type"] = "application/json";
    }

    return {
      headers,
      body: (queuedRequest.payload.body?.file || JSON.stringify(queuedRequest.payload.body)) as FormData | string,
      method: queuedRequest.request.method.toUpperCase(),
    };
  }

  /** Processes the queue by looping over each path separately until the queues are empty. */
  async processQueue(id: string) {
    const queue = this.pathQueues.get(id);
    if (!queue) return;

    while (queue.length) {
      this.client.emit("DEBUG", "loop", "Running while loop in processQueue function.");
      // IF THE BOT IS GLOBALLY RATELIMITED TRY AGAIN
      if (this.globallyRateLimited) {
        setTimeout(() => {
          this.client.emit("DEBUG", "loop", `Running setTimeout in processQueue function.`);
          this.processQueue(id);
        }, 1000);

        break;
      }
      // SELECT THE FIRST ITEM FROM THIS QUEUE
      const [queuedRequest] = queue;
      // IF THIS DOESNT HAVE ANY ITEMS JUST CANCEL, THE CLEANER WILL REMOVE IT.
      if (!queuedRequest) return;

      const basicURL = this.simplifyUrl(queuedRequest.request.url, queuedRequest.request.method.toUpperCase());

      // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
      const urlResetIn = this.checkRateLimits(basicURL);
      if (urlResetIn) {
        // PAUSE FOR THIS SPECIFC REQUEST
        await delay(urlResetIn);
        continue;
      }

      // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
      const bucketResetIn = queuedRequest.payload.bucketId
        ? this.checkRateLimits(queuedRequest.payload.bucketId)
        : false;
      // THIS BUCKET IS STILL RATELIMITED, RE-ADD TO QUEUE
      if (bucketResetIn) continue;

      // EXECUTE THE REQUEST

      // IF THIS IS A GET REQUEST, CHANGE THE BODY TO QUERY PARAMETERS
      const query =
        queuedRequest.request.method.toUpperCase() === "GET" && queuedRequest.payload.body
          ? Object.entries(queuedRequest.payload.body)
              .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
              .join("&")
          : "";
      const urlToUse =
        queuedRequest.request.method.toUpperCase() === "GET" && query
          ? `${queuedRequest.request.url}?${query}`
          : queuedRequest.request.url;

      // CUSTOM HANDLER FOR USER TO LOG OR WHATEVER WHENEVER A FETCH IS MADE
      this.client.emit("fetching", queuedRequest.payload);

      try {
        const response = await fetch(urlToUse, this.createRequestBody(queuedRequest));

        this.client.emit("fetched", queuedRequest.payload);
        const bucketIdFromHeaders = this.processRequestHeaders(basicURL, response.headers);
        // SET THE BUCKET Id IF IT WAS PRESENT
        if (bucketIdFromHeaders) {
          queuedRequest.payload.bucketId = bucketIdFromHeaders;
        }

        if (response.status < 200 || response.status >= 400) {
          this.client.emit("error", "httpError", queuedRequest.payload, response);

          let error = "REQUEST_UNKNOWN_ERROR";
          switch (response.status) {
            case DiscordHTTPResponseCodes.BadRequest:
              error = "The request was improperly formatted, or the server couldn't understand it.";
              break;
            case DiscordHTTPResponseCodes.Unauthorized:
              error = "The Authorization header was missing or invalid.";
              break;
            case DiscordHTTPResponseCodes.Forbidden:
              error = "The Authorization token you passed did not have permission to the resource.";
              break;
            case DiscordHTTPResponseCodes.NotFound:
              error = "The resource at the location specified doesn't exist.";
              break;
            case DiscordHTTPResponseCodes.MethodNotAllowed:
              error = "The HTTP method used is not valid for the location specified.";
              break;
            case DiscordHTTPResponseCodes.GatewayUnavailable:
              error = "There was not a gateway available to process your request. Wait a bit and retry.";
              break;
          }

          queuedRequest.request.reject?.(new Error(`[${response.status}] ${error}`));

          // If Rate limited should not remove from queue
          if (response.status !== 429) queue.shift();
          continue;
        }

        // SOMETIMES DISCORD RETURNS AN EMPTY 204 RESPONSE THAT CAN'T BE MADE TO JSON
        if (response.status === 204) {
          this.client.emit("fetchSuccess", queuedRequest.payload);
          // REMOVE FROM QUEUE
          queue.shift();
          queuedRequest.request.respond({ status: 204 });
        } else {
          // CONVERT THE RESPONSE TO JSON
          const json = await response.json();
          // IF THE RESPONSE WAS RATE LIMITED, HANDLE ACCORDINGLY
          if (json.retry_after || json.message === "You are being rate limited.") {
            // IF IT HAS MAXED RETRIES SOMETHING SERIOUSLY WRONG. CANCEL OUT.
            if (queuedRequest.payload.retryCount >= this.maxRetryCount) {
              this.client.emit("retriesMaxed", queuedRequest.payload);
              queuedRequest.request.respond({
                status: 200,
                body: JSON.stringify({
                  error: "The request was rate limited and it maxed out the retries limit.",
                }),
              });
              // REMOVE ITEM FROM QUEUE TO PREVENT RETRY
              queue.shift();
              continue;
            }

            // SINCE IT WAS RATELIMITE, RETRY AGAIN
            continue;
          }

          this.client.emit("fetchSuccess", queuedRequest.payload);
          // REMOVE FROM QUEUE
          queue.shift();
          queuedRequest.request.respond({
            status: 200,
            body: JSON.stringify(json),
          });
        }
      } catch (error) {
        // SOMETHING WENT WRONG, LOG AND RESPOND WITH ERROR
        this.client.emit("fetchFailed", queuedRequest.payload, error);
        queuedRequest.request.reject?.(error);
        // REMOVE FROM QUEUE
        queue.shift();
      }
    }

    // ONCE QUEUE IS DONE, WE CAN TRY CLEANING UP
    this.cleanupQueues();
  }

  /** This will create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
  processRateLimitedPaths() {
    const now = Date.now();

    for (const [key, value] of this.ratelimitedPaths.entries()) {
      this.client.emit("DEBUG", "loop", `Running forEach loop in process_rate_limited_paths file.`);
      // IF THE TIME HAS NOT REACHED CANCEL
      if (value.resetTimestamp > now) continue;

      // RATE LIMIT IS OVER, DELETE THE RATE LIMITER
      this.ratelimitedPaths.delete(key);
      // IF IT WAS GLOBAL ALSO MARK THE GLOBAL VALUE AS FALSE
      if (key === "global") this.globallyRateLimited = false;
    }

    // ALL PATHS ARE CLEARED CAN CANCEL OUT!
    if (!this.ratelimitedPaths.size) {
      this.processingRateLimitedPaths = false;
      return;
    } else {
      this.processingRateLimitedPaths = true;
      // RECHECK IN 1 SECOND
      setTimeout(() => {
        this.client.emit("DEBUG", "loop", `Running setTimeout in processRateLimitedPaths function.`);
        this.processRateLimitedPaths();
      }, 1000);
    }
  }

  /** Processes the rate limit headers and determines if it needs to be ratelimited and returns the bucket id if available */
  processRequestHeaders(url: string, headers: Headers) {
    let ratelimited = false;

    // GET ALL NECESSARY HEADERS
    const remaining = headers.get("x-ratelimit-remaining");
    const retryAfter = headers.get("x-ratelimit-reset-after");
    const reset = Date.now() + Number(retryAfter) * 1000;
    const global = headers.get("x-ratelimit-global");
    // undefined override null needed for typings
    const bucketId = headers.get("x-ratelimit-bucket") || undefined;

    // IF THERE IS NO REMAINING RATE LIMIT, MARK IT AS RATE LIMITED
    if (remaining === "0") {
      ratelimited = true;

      // SAVE THE URL AS LIMITED, IMPORTANT FOR NEW REQUESTS BY USER WITHOUT BUCKET
      this.ratelimitedPaths.set(url, {
        url,
        resetTimestamp: reset,
        bucketId,
      });

      // SAVE THE BUCKET AS LIMITED SINCE DIFFERENT URLS MAY SHARE A BUCKET
      if (bucketId) {
        this.ratelimitedPaths.set(bucketId, {
          url,
          resetTimestamp: reset,
          bucketId,
        });
      }
    }

    // IF THERE IS NO REMAINING GLOBAL LIMIT, MARK IT RATE LIMITED GLOBALLY
    if (global) {
      const retryAfter = headers.get("retry-after");
      const globalReset = Date.now() + Number(retryAfter) * 1000;
      this.client.emit("globallyRateLimited", url, globalReset);
      this.globallyRateLimited = true;
      ratelimited = true;

      this.ratelimitedPaths.set("global", {
        url: "global",
        resetTimestamp: globalReset,
        bucketId,
      });

      if (bucketId) {
        this.ratelimitedPaths.set(bucketId, {
          url: "global",
          resetTimestamp: globalReset,
          bucketId,
        });
      }
    }

    if (ratelimited && !this.processingRateLimitedPaths) {
      this.processRateLimitedPaths();
    }
    return ratelimited ? bucketId : undefined;
  }

  /** Processes a request and assigns it to a queue or creates a queue if none exists for it. */
  async processRequest(request: RestRequest, payload: RestPayload) {
    const route = request.url.substring(request.url.indexOf("api/"));
    const parts = route.split("/");
    // REMOVE THE API
    parts.shift();
    // REMOVES THE VERSION NUMBER
    if (parts[0]?.startsWith("v")) parts.shift();
    // SET THE NEW REQUEST URL
    request.url = `${BASE_URL}/v${this.version}/${parts.join("/")}`;
    // REMOVE THE MAJOR PARAM
    parts.shift();

    const [id] = parts;

    const queue = this.pathQueues.get(id);
    // IF THE QUEUE EXISTS JUST ADD THIS TO THE QUEUE
    if (queue) {
      queue.push({ request, payload });
    } else {
      // CREATES A NEW QUEUE
      this.pathQueues.set(id, [
        {
          request,
          payload,
        },
      ]);
      await this.processQueue(id);
    }
  }

  async runMethod(
    method: "get" | "post" | "put" | "delete" | "patch",
    url: string,
    body?: unknown,
    retryCount = 0,
    bucketId?: string
  ) {
    if (body) {
      body = this.client.loopObject(
        body as Record<string, unknown>,
        (value) =>
          typeof value === "bigint"
            ? value.toString()
            : Array.isArray(value)
            ? value.map((v) => (typeof v === "bigint" ? v.toString() : v))
            : value,
        `Running forEach loop in runMethod function for changing bigints to strings.`
      );
    }

    this.client.emit("DEBUG", "requestCreate", {
      method,
      url,
      body,
      retryCount,
      bucketId,
    });

    const errorStack = new Error("Location:");
    Error.captureStackTrace(errorStack);

    // For proxies we don't need to do any of the legwork so we just forward the request
    if (!url.startsWith(`${BASE_URL}/v${this.version}`) && !url.startsWith(IMAGE_BASE_URL)) {
      const result = await fetch(url, {
        body: JSON.stringify(body || {}),
        headers: {
          authorization: this.authorization || "",
        },
        method: method.toUpperCase(),
      }).catch((error) => {
        console.error(error);
        throw errorStack;
      });

      return result.status !== 204 ? await result.json() : undefined;
    }

    // No proxy so we need to handle all rate limiting and such
    return new Promise((resolve, reject) => {
      this.processRequest(
        {
          url,
          method,
          reject: (error) => {
            console.error(error);
            reject(errorStack);
          },
          respond: (data: { status: number; body?: string }) =>
            resolve(data.status !== 204 ? camelize(JSON.parse(data.body ?? "{}")) : undefined),
        },
        {
          bucketId,
          body: body as Record<string, unknown> | undefined,
          retryCount,
        }
      );
    });
  }

  /** Send a fetch request to the api with this method. */
  get(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("get", url, body, retryCount, bucketId);
  }
  /** Send a fetch request to the api with this method. */
  post(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("post", url, body, retryCount, bucketId);
  }
  /** Send a fetch request to the api with this method. */
  put(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("put", url, body, retryCount, bucketId);
  }
  /** Send a fetch request to the api with this method. */
  delete(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("delete", url, body, retryCount, bucketId);
  }
  /** Send a fetch request to the api with this method. */
  patch(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("patch", url, body, retryCount, bucketId);
  }

  /** Splits the into simpler parts to process. */
  simplifyUrl(url: string, method: string) {
    let route = url
      .replace(/\/([a-z-]+)\/(?:[0-9]{17,19})/g, function (match, p) {
        return ["channels", "guilds", "webhooks"].includes(p) ? match : `/${p}/skillzPrefersID`;
      })
      .replace(/\/reactions\/[^/]+/g, "/reactions/skillzPrefersID")
      .replace(/^\/webhooks\/(\d+)\/[A-Za-z0-9-_]{64,}/, "/webhooks/$1/:itohIsAHoti");

    // GENERAL /reactions and /reactions/emoji/@me share the buckets
    if (route.includes("/reactions")) {
      route = route.substring(0, route.indexOf("/reactions") + "/reactions".length);
    }

    // Delete Messsage endpoint has its own ratelimit
    if (method === "DELETE" && route.endsWith("/messages/skillzPrefersID")) {
      route = method + route;
    }

    return route;
  }
}

export default RestManager;

export interface EditChannelRequest {
  amount: number;
  timestamp: number;
  channelId: bigint;
  items: {
    channelId: bigint;
    reason?: string;
    options: ModifyChannel;
    resolve: (channel: unknown) => void;
    // deno-lint-ignore no-explicit-any
    reject: (error: any) => void;
  }[];
}
