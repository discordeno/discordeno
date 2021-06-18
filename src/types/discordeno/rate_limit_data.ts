// TODO(rigormorrtiss): add jsdoc comment description
export interface RateLimitData {
  remaining: string | null;
  retryAfter: string | null;
  global: string | null;
  bucketId?: string;
  url: string;
  reset: number;
}
