/** https://discord.com/developers/docs/topics/rate-limits#exceeding-a-rate-limit */
export interface DiscordRateLimitResponse {
  /** a message saying you are being rate limited */
  message: string;
  /** the number of seconds to wait before submitting another request. */
  retry_after: number;
  /** a value indicating if you are being globally limited or not */
  global: boolean;
}