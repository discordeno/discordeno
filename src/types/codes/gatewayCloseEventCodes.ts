/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#opcodes-and-status-codes */
export enum DiscordGatewayCloseEventCodes {
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

export type GatewayCloseEventCodes = DiscordGatewayCloseEventCodes;
export const GatewayCloseEventCodes = DiscordGatewayCloseEventCodes;
