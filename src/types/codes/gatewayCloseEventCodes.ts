/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#opcodes-and-status-codes */
export enum GatewayCloseEventCodes {
  UnknownError = 4000,
  UnknownOpcode,
  DecodeError,
  NotAuthenticated,
  AuthenticationFailed,
  AlreadyAuthenticated,
  InvalidSeq = 4007,
  RateLimited,
  SessionTimedOut,
  InvalidShard,
  ShardingRequired,
  InvalidApiVersion,
  InvalidIntents,
  DisallowedIntents,
}
