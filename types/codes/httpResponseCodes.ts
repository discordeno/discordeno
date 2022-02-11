/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#http */
export enum HTTPResponseCodes {
  /** The request completed successfully. */
  Ok = 200,
  /** The entity was created successfully. */
  Created,
  /** The request completed successfully but returned no content. */
  NoContent = 204,
  /** The entity was not modified (no action was taken). */
  NotModified = 304,
  /** The request was improperly formatted, or the server couldn't understand it. */
  BadRequest = 400,
  /** The `Authorization` header was missing or invalid. */
  Unauthorized,
  /** The `Authorization` token you passed did not have permission to the resource. */
  Forbidden = 403,
  /** The resource at the location specified doesn't exist. */
  NotFound,
  /** The HTTP method used is not valid for the location specified. */
  MethodNotAllowed,
  /** You are being rate limited, see [Rate Limits](https://discord.com/developers/docs/topics/rate-limits). */
  TooManyRequests = 429,
  /** There was not a gateway available to process your request. Wait a bit and retry. */
  GatewayUnavailable = 502,
}
