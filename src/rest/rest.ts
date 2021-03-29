import { checkRateLimits } from "./check_rate_limits.ts";
import { cleanupQueues } from "./cleanup_queue.ts";
import { createRequestBody } from "./create_request_body.ts";
import { handlePayload } from "./handle_payload.ts";
import { processQueue } from "./process_queue.ts";
import { processRateLimitedPaths } from "./process_rate_limited_paths.ts";
import { processRequest } from "./process_request.ts";
import { processRequestHeaders } from "./process_request_headers.ts";
import { RequestManager } from "./request_manager.ts";
import { runMethod } from "./run_method.ts";

export const rest: RestCache = {
  /** The secret authorization key to confirm that this was a request made by you and not a DDOS attack. */
  authorization: "discordeno_best_lib_ever",
  pathQueues: new Map(),
  processingQueue: false,
  processingRateLimitedPaths: false,
  globallyRateLimited: false,
  ratelimitedPaths: new Map(),
  eventHandlers: {
    // BY DEFAULT WE WILL LOG ALL ERRORS TO CONSOLE. USER CAN CHOOSE TO OVERRIDE
    error: function (_type, error) {
      console.error(error);
    },
    // PLACEHOLDERS TO ALLOW USERS TO CUSTOMIZE
    fetching() {},
    fetched() {},
    fetchSuccess() {},
    fetchFailed() {},
    globallyRateLimited() {},
    retriesMaxed() {},
  },

  // TODO: add propeer docs dcomments
  manager: RequestManager,

  /** Handler function for every request. Converts to json, verified authorization & requirements and begins processing the request */
  handlePayload,
  checkRateLimits,
  cleanupQueues,
  processQueue,
  processRateLimitedPaths,
  processRequestHeaders,
  processRequest,
  createRequestBody,
  runMethod,
};
