/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum VoiceCloseEventCodes {
  UnknownOpcode = 4001,
  FailedToDecodePayload,
  NotAuthenticated,
  AuthenticationFailed,
  AlreadyAuthenticated,
  SessionNoLongerValid,
  SessionTimedOut = 4009,
  ServerNotFound = 4011,
  UnknownProtocol,
  /** Channel was deleted, you were kicked, voice server changed, or the main gateway session was dropped. Should not reconnect. */
  Disconnect = 4014,
  VoiceServerCrashed,
  UnknownEncryptionMode,
}
