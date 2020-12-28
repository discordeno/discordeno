import { ServerRequest } from "./deps.ts";
import { RestServerOptions, RunMethodOptions } from "./types/mod.ts";

export interface RateLimitedPath {
  /** The url for this request */
  url: string;
  /** The timestamp when this request can be made. */
  resetTimestamp: number;
  /** The bucket id that is assigned to this request path. */
  bucketID: string | null;
}

export interface QueuedRequest {
  /** The request itself, the server received. This will be used to send a response later. */
  request: ServerRequest;
  /** The payload like url, method and such for the request. */
  payload: RunMethodOptions;
  /** The intial start configurations like token which is necessary for headers. */
  options: RestServerOptions;
}
