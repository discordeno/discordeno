/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#http */
export enum HTTPResponseCodes {
  Ok = 200,
  Created,
  NoContent = 204,
  NotModified = 304,
  BadRequest = 400,
  Unauthorized,
  Forbidden = 403,
  NotFound,
  MethodNotAllowed,
  TooManyRequests = 429,
  GatewayUnavailable = 502,
}
