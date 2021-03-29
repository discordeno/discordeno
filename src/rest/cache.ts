export const restCache: RestCache = {
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
    fetching() {},
    fetched() {},
    fetchSuccess() {},
    fetchFailed() {},
    globallyRateLimited() {},
    retriesMaxed() {},
  },
};
