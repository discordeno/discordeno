import { RunMethodOptions } from "./requests.ts";

export interface RestServerOptions {
  /** The port number where the server will be hosted. */
  port: number;
  /** The authorization secret key that all requests must provide in its headers. This prevents anyone from making your server do something. */
  authorization: string;
  /** The bot token that will be used for authorization. */
  token: string;
  /** When a request is rate limited, how many times should it keep retrying the request. Recommended: 10 */
  maxRetryCount: number;
  /** The api version you would like to use */
  apiVersion?: number;
}

export interface RestEventHandlers {
  /** Runs whenever an error occurs. Use this to log to sentry or log to discord with a webhook. */
  error: (
    type: RestErrorEventTypes,
    // deno-lint-ignore no-explicit-any
    ...data: any[]
  ) => unknown | Promise<unknown>;
  /** Runs before every request is about to be fetched. Can be useful for things like analytics and debugging. */
  fetching: (data: RunMethodOptions) => unknown | Promise<unknown>;
  /** Runs right after a request is complete whether it worked or not. Useful for analytics and debugging. */
  fetched: (data: RunMethodOptions) => unknown | Promise<unknown>;
  /** The fetch request was successfully executed. Useful for analytics. */
  fetchSuccess: (data: RunMethodOptions) => unknown | Promise<unknown>;
  /** The fetch request errored somewhere. Useful for analytics and debugging */
  fetchFailed: (
    data: RunMethodOptions,
    // deno-lint-ignore no-explicit-any
    error: any,
  ) => unknown | Promise<unknown>;
  /** Runs whenever the token is globally rate limited. Useful for analytics, debugging */
  globallyRateLimited: (
    url: string,
    resetAt: number,
  ) => unknown | Promise<unknown>;
  /** Runs when the maximum amount of retries has been reached. Useful for logging and debugging */
  retriesMaxed: (data: RunMethodOptions) => unknown | Promise<unknown>;
}

export type RestErrorEventTypes =
  | "serverRequest"
  | "processRequest"
  | "httpError";
