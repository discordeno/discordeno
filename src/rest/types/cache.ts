import { QueuedRequest, RateLimitedPath } from "./queue.ts";
import { RestEventHandlers } from "./server.ts";

export interface RestCache {
  /** The queues that are currently needing to be executed. Key is the url path and the value is all the requests in this same path. Paths are mapped by MAJOR params. */
  pathQueues: Map<string, QueuedRequest[]>;
  /** Whether or not the queues are currently processing. */
  processingQueue: boolean;
  /** Whether or not this token has been globally rate limited. */
  globallyRateLimited: boolean;
  /** The paths that have been rate limited */
  ratelimitedPaths: Map<string, RateLimitedPath>;
  /** The event handlers are functions that run when something is happening internally. Users can customize this for analytics, debugging, logging or anything their heart desires. */
  eventHandlers: RestEventHandlers;
}
