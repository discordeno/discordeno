import { RestCache } from "./types/mod.ts";

export const restCache: RestCache = {
  pathQueues: new Map(),
  processingQueue: false,
  globallyRateLimited: false,
  ratelimitedPaths: new Map(),
  eventHandlers: {
    // By default we will log all errors to console. User can choose to override
    error: function (_type, error) {
      console.error(error);
    },
    // Placeholders to allow users to customize
    fetching() {},
    fetched() {},
    fetchSuccess() {},
    fetchFailed() {},
    globallyRateLimited() {},
    retriesMaxed() {},
  },
};
