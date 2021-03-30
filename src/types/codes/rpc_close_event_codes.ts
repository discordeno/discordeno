/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum DiscordRpcCloseEventCodes {
  InvalidClientID = 4000,
  InvalidOrigin,
  RateLimited,
  TokenRevoked,
  InvalidVersion,
  InvalidEncoding,
}
