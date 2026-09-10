import type { BigString, FileContent } from '@discordeno/types';
import type { logger } from '@discordeno/utils';
import type { CamelizedRestEndpoints, RestEndpoints } from './endpoints.js';
import type { InvalidRequestBucket } from './invalidBucket.js';
import type { Queue } from './queue.js';
import type { RestRoutes } from './typings/routes.js';

export interface CreateRestManagerOptions {
  /** The bot token which will be used to make requests. */
  token: string;
  /**
   * For old bots that have a different bot id and application id.
   * @default bot id from token
   */
  applicationId?: BigString;
  /** Configuration when using a proxy. */
  proxy?: {
    /**
     * The base url to connect to. If you create a proxy rest, that url would go here.
     * @default https://discord.com/api
     */
    baseUrl: string;
    /** The authorization header value to attach when sending requests to the proxy. */
    authorization?: string;
    /**
     * The authorization header name to use when sending requests to the proxy
     *
     * @remarks
     * If the header name is set to `authorization`, it will override any authorization that is given even if
     * the requests uses OAuth2 Bearer tokens / Basic tokens
     *
     * @default "authorization" // For compatibility purposes
     */
    authorizationHeader?: string;
    /**
     * The endpoint to use in the rest proxy to update the bearer tokens
     *
     * @remarks
     * Should not include a `/` in the start
     *
     * This value is actually required if you want to use `updateTokenQueues`
     */
    updateBearerTokenEndpoint?: string;
    /**
     * Whether an attempt that failed without producing a response should be re-sent to the proxy.
     *
     * @remarks
     * This covers both an attempt that hit {@link CreateRestManagerOptions.requestTimeout | requestTimeout} and one whose
     * connection failed. Neither tells us whether the proxy got the request: the timeout only aborts our side of the
     * connection while the proxy keeps processing (it may simply be queued behind a rate limit), and a socket that dies
     * once the request is on the wire may still have delivered it. `fetch` gives no way to tell those apart from never
     * having connected at all, so re-sending can execute non-idempotent requests twice (e.g. duplicate channel creates).
     *
     * Only enable this when re-sending a request to your proxy is safe, for example by attaching an idempotency
     * key to each request that the proxy tracks in a store of your choosing (in memory, redis, ...) so a
     * re-sent request is recognized and executed only once. Discordeno does not provide such a mechanism.
     *
     * Bounded by {@link RestManager.maxRetryCount} and {@link RestManager.maxProxyRetryCount}.
     *
     * @default false
     */
    retryRequests?: boolean;
  };
  /**
   * The api versions which can be used to make requests.
   * @default 10
   */
  version?: ApiVersions;
  /**
   * The logger that the rest manager will use
   * @default logger // The logger exported by `@discordeno/utils`
   */
  logger?: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>;
  /** Events for the rest manager */
  events?: Partial<RestManagerEvents>;
  /**
   * The maximum time in milliseconds a single request attempt may take before it is aborted.
   *
   * @remarks
   * This is a total deadline for each attempt (it also covers reading the response body), not a per-chunk timeout.
   * When talking to Discord directly, a timed-out attempt is retried through the queue up to
   * {@link RestManager.maxRetryCount} times before failing. Without it, a connection that stalls after connecting
   * could keep a queue from ever progressing.
   *
   * When a `proxy` is configured, a timed-out attempt is NOT retried: the proxy keeps processing the request after
   * the timeout aborts our side of the connection (it may simply be queued behind a rate limit), so re-sending it
   * could execute it twice. If re-sending against your proxy is safe, `proxy.retryRequests` opts back into it.
   *
   * Because it is a total deadline rather than a per-chunk one, a slow but healthy request (e.g. uploading a
   * large attachment over a slow connection) can legitimately exceed it and be aborted/retried. Raise this value
   * for upload-heavy bots if you see such requests timing out.
   *
   * Set to `0` to disable it and rely on the runtime's default fetch timeouts.
   *
   * @default 30000 // 30 seconds
   */
  requestTimeout?: number;
}

export interface RestManager extends CamelizedRestEndpoints {
  /** The bot token which will be used to make requests. */
  token: string;
  /** The application id. Normally this is not required for recent bots but old bot's application id is sometimes different from the bot id so it is required for those bots. */
  applicationId: bigint;
  /** The api version to use when making requests. Only the latest supported version will be tested. */
  version: ApiVersions;
  /**
   * The base url to connect to. If you create a proxy rest, that url would go here.
   * IT SHOULD NOT END WITH A /
   * @default https://discord.com/api
   */
  baseUrl: string;
  /**
   * `true` if the `baseUrl` does not start with `https://discord.com/api`.
   *
   * Mostly used only for intern functions.
   */
  isProxied: boolean;
  /** The authorization header value to attach when sending requests to the proxy. */
  authorization?: string;
  /** The authorization header name to attach when sending requests to the proxy */
  authorizationHeader: string;
  /** The endpoint to use for `updateTokenQueues` when working with a rest proxy */
  updateBearerTokenEndpoint?: string;
  /** Whether a proxied attempt that failed without producing a response is re-sent to the proxy. Only safe when re-sending against the proxy is. Defaults to false. */
  retryProxiedRequests: boolean;
  /** The maximum amount of times a request should be retried. Defaults to Infinity */
  maxRetryCount: number;
  /**
   * The maximum amount of times a proxied request should be re-sent. Defaults to 15.
   *
   * @remarks
   * This has its own limit because {@link RestManager.maxRetryCount} is Infinity by default, which would keep every request alive for as
   * long as the proxy stays down.
   *
   * Each further attempt waits {@link RestManager.proxyRetryDelayStep} longer than the one before it, so the defaults span about 30 seconds
   * in total, enough to sit out a proxy being restarted or redeployed.
   *
   * Whichever of the two is lower applies. Only used when {@link RestManager.retryProxiedRequests} is enabled.
   */
  maxProxyRetryCount: number;
  /**
   * How much longer to wait before each further re-send to a proxy, in milliseconds. Defaults to 250.
   *
   * @remarks
   * The nth attempt waits n times this (250ms, then 500ms, then 750ms, ...), so a proxy that is down isn't hammered in a tight loop while
   * still being checked often enough to notice it coming back.
   *
   * An attempt that timed out already sat out {@link RestManager.requestTimeout}, so it is re-sent right away without this delay.
   *
   * Only used when {@link RestManager.retryProxiedRequests} is enabled.
   */
  proxyRetryDelayStep: number;
  /** The maximum time in milliseconds a single request attempt may take before it is aborted. Timed-out attempts are only retried when talking to Discord directly, or through a proxy when `retryProxiedRequests` is enabled. Defaults to 30000 (30 seconds). Set to 0 to disable. */
  requestTimeout: number;
  /** Whether or not the manager is rate limited globally across all requests. Defaults to false. */
  globallyRateLimited: boolean;
  /** Whether or not the rate limited paths are being processed to allow requests to be made once time is up. Defaults to false. */
  processingRateLimitedPaths: boolean;
  /** The time in milliseconds to wait before deleting this queue if it is empty. Defaults to 60000(one minute). */
  deleteQueueDelay: number;
  /** The queues that hold all the requests to be processed. */
  queues: Map<string, Queue>;
  /** The paths that are currently rate limited. */
  rateLimitedPaths: Map<string, RestRateLimitedPath>;
  /** The bucket for handling any invalid requests.  */
  invalidBucket: InvalidRequestBucket;
  /** The routes that are available for this manager. */
  routes: RestRoutes;
  /** The logger to use for the rest manager */
  logger: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>;
  /** Events for the rest manager */
  events: RestManagerEvents;
  /** Allows the user to inject custom headers that will be sent with every request. */
  createBaseHeaders: () => Record<string, string>;
  /** Check the rate limits for a url or a bucket. */
  checkRateLimits: (url: string, identifier: string) => number | false;
  /* Update the queues and ratelimit information to adapt to the new token */
  updateTokenQueues: (oldToken: string, newToken: string) => Promise<void>;
  /** Reshapes and modifies the obj as needed to make it ready for discords api. */
  changeToDiscordFormat: (obj: any) => any;
  /** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
  createRequestBody: (method: RequestMethods, options?: CreateRequestBodyOptions) => RequestBody;
  /** Fills in the message and the cause of the error that is given to the user when a request fails. The error itself is created by the caller because of how stack traces get calculated. */
  createRequestError: (error: Error, reason: RestRequestRejection) => Error;
  /** This will create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
  processRateLimitedPaths: () => void;
  /** Processes the rate limit headers and determines if it needs to be rate limited and returns the bucket id if available */
  processHeaders: (url: string, headers: Headers, identifier: string) => string | undefined;
  /** Sends a request to the api. */
  sendRequest: (options: SendRequestOptions) => Promise<void>;
  /** Split a url to separate rate limit buckets based on major/minor parameters. */
  simplifyUrl: (url: string, method: RequestMethods) => string;
  /** Make a request to be sent to the api. */
  makeRequest: <T = unknown>(method: RequestMethods, url: string, options?: MakeRequestOptions) => Promise<T>;
  /** Takes a request and processes it into a queue. */
  processRequest: (request: SendRequestOptions) => Promise<void>;
  /** Make a get request to the api */
  get: <T = void>(url: string, options?: Omit<MakeRequestOptions, 'body'>) => Promise<T>;
  /** Make a post request to the api. */
  post: <T = void>(url: string, options?: MakeRequestOptions) => Promise<T>;
  /** Make a put request to the api. */
  put: <T = void>(url: string, options?: MakeRequestOptions) => Promise<T>;
  /** Make a delete request to the api. */
  delete: (url: string, options?: Omit<MakeRequestOptions, 'body'>) => Promise<void>;
  /** Make a patch request to the api. */
  patch: <T = void>(url: string, options?: MakeRequestOptions) => Promise<T>;
  /** The functions to call the endpoints but without the response body being camelized. */
  snake: RestEndpoints;
}

export type RequestMethods = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
export type ApiVersions = 9 | 10;

export interface CreateRequestBodyOptions {
  headers?: Record<string, string>;
  body?: any;
  unauthorized?: boolean;
  reason?: string;
  files?: FileContent[];
  /**
   * An `AbortSignal` to cancel the request.
   *
   * @remarks
   * Aborting rejects a request that is still waiting in the queue right away and guarantees it is never sent.
   * An attempt that is already in flight gets its connection cancelled as well, though that cannot recall it:
   * Discord (or the proxy) may have received it and may still process it, only the response is discarded.
   * This lets a rest proxy drop requests that nobody is waiting on anymore (client disconnect, deadline)
   * instead of leaving them in the queue.
   */
  signal?: AbortSignal;
}

export type MakeRequestOptions = Omit<CreateRequestBodyOptions, 'method'> & Pick<SendRequestOptions, 'runThroughQueue'>;

export interface RequestBody {
  headers: Record<string, string>;
  body?: string | FormData;
  method: RequestMethods;
}

export interface SendRequestOptions {
  /** The route to send the request to. */
  route: string;
  /** The method to use for sending the request. */
  method: RequestMethods;
  /** The amount of times this request has been retried. */
  retryCount: number;
  /** Handler to retry a request should it be rate limited. */
  retryRequest?: (options: SendRequestOptions) => Promise<void>;
  /** Resolve handler when a request succeeds. */
  resolve: (value: RestRequestResponse) => void;
  /** Reject handler when a request fails. */
  reject: (value: RestRequestRejection) => void;
  /** If this request has a bucket id which it falls under for rate limit */
  bucketId?: string;
  /** Additional request options, used for things like overriding authorization header. */
  requestBodyOptions?: CreateRequestBodyOptions;
  /**
   * Whether the request should be run through the queue.
   * Useful for routes which do not have any rate limits.
   */
  runThroughQueue?: boolean;
}

export interface RestRateLimitedPath {
  url: string;
  resetTimestamp: number;
  bucketId?: string;
}

export interface RestRequestResponse {
  ok: boolean;
  status: number;
  /** The returned body parsed if it was JSON, otherwise it will be the raw body as a string */
  body?: string | object;
}

export interface RestRequestRejection {
  ok: boolean;
  status: number;
  /** The HTTP 1.1 status code text */
  statusText?: string;
  /** The returned body parsed if it was JSON, otherwise it will be the raw body as a string */
  body?: string | object;
  error?: string;
  errorObject?: Error;
}

export interface RestManagerEvents {
  /**
   * Emitted when a request is made to the API.
   *
   * @remarks
   * The body that will be sent to the API is available in the `extra` parameter. Do not consume the body in the `Request` object and use the one in the `extra` parameter instead.
   */
  request: (request: Request, extra: { body: any }) => void;
  /**
   * Emitted when a response is received from the API.
   *
   * @remarks
   * This is fired for both successful and failed requests, you should check the Response object to determine if the request was successful or not.
   *
   * Both the request and the response body are available in the `extra` parameter. Do not consume the body in the `Request` or `Response` object and use the one in the `extra` parameter instead.
   */
  response: (request: Request, response: Response, extra: { requestBody: any; responseBody: string | object }) => void;
  /**
   * Emitted when a request errors due to fetch error.
   *
   * @remarks
   * The body that was sent to the API is available in the `extra` parameter.
   */
  requestError: (request: Request, error: any, extra: { body: any }) => void;
}
