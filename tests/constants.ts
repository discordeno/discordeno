export const CACHED_COMMUNITY_GUILD_ID = 907350958810480671n;

// CHANGE TO TRUE WHEN DEBUGGING SANITIZATION ERRORS
export const sanitizeMode = {
  sanitizeResources: false,
  sanitizeOps: false,
  sanitizeExit: false,
};

// USED FOR ROLE CHANGE EVENTS
export const roleChanges = new Map<bigint, bigint[]>();

export const banCounters = new Map<bigint, boolean>();
