import { RestCache } from "./types/mod.ts";

export const cache: RestCache = {
  pathQueues: new Map(),
  processingQueue: false,
  globallyRateLimited: false,
  ratelimitedPaths: new Map(),
  eventHandlers: {
    // BY DEFAULT WE WILL LOG ALL ERRORS TO CONSOLE. USER CAN CHOOSE TO OVERRIDE
    error: function (_type, error) {
      console.error(error);
    },
    // PLACEHOLDERS TO ALLOW USERS TO CUSTOMIZE
    fetching: function () {},
    fetched: function () {},
    fetchSuccess: function () {},
    fetchFailed: function () {},
    globallyRateLimited: function () {},
    retriesMaxed: function () {},
  },
};
