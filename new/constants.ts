// CHANGE TO TRUE WHEN DEBUGGING SANITIZATION ERRORS
export const sanitizeMode = {
  sanitizeResources: false,
  sanitizeOps: false,
  sanitizeExit: true,
};

// USED FOR ROLE CHANGE EVENTS
export const roleChanges = new Map<bigint, bigint[]>();
export const banCounters = new Map<bigint, boolean>();
export const reactionCounters = new Map<bigint, number>();
