/** https://discord.com/developers/docs/topics/rate-limits#exceeding-a-rate-limit */
export interface RateLimitResponse {
  /** a message saying you are being rate limited */
  message: string;
  /** the number of seconds to wait before submitting another request. */
  retryAfter: number;
  /** a value indicating if you are being globally limited or not */
  global: boolean;
}
