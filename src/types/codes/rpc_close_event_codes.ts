/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum DiscordRpcCloseEventCodes {
  InvalidClientId = 4000,
  InvalidOrigin,
  RateLimited,
  TokenRevoked,
  InvalidVersion,
  InvalidEncoding,
}

export type RpcCloseEventCodes = DiscordRpcCloseEventCodes;
export const RpcCloseEventCodes = DiscordRpcCloseEventCodes;
