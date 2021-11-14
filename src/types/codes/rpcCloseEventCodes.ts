/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum RpcCloseEventCodes {
  InvalidClientId = 4000,
  InvalidOrigin,
  RateLimited,
  TokenRevoked,
  InvalidVersion,
  InvalidEncoding,
}
