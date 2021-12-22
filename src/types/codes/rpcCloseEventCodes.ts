/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum RpcCloseEventCodes {
  /** You connected to the RPC server with an invalid client ID. */
  InvalidClientId = 4000,
  /** You connected to the RPC server with an invalid origin. */
  InvalidOrigin,
  /** You are being rate limited. */
  RateLimited,
  /** The OAuth2 token associated with a connection was revoked, get a new one! */
  TokenRevoked,
  /** The RPC Server version specified in the connection string was not valid. */
  InvalidVersion,
  /** The encoding specified in the connection string was not valid. */
  InvalidEncoding,
}
