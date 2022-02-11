/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum VoiceCloseEventCodes {
  /** You sent an invalid [opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes). */
  UnknownOpcode = 4001,
  /** You sent a invalid payload in your [identifying](https://discord.com/developers/docs/topics/gateway#identify) to the Gateway. */
  FailedToDecodePayload,
  /** You sent a payload before [identifying](https://discord.com/developers/docs/topics/gateway#identify) with the Gateway. */
  NotAuthenticated,
  /** The token you sent in your [identify](https://discord.com/developers/docs/topics/gateway#identify) payload is incorrect. */
  AuthenticationFailed,
  /** You sent more than one [identify](https://discord.com/developers/docs/topics/gateway#identify) payload. Stahp. */
  AlreadyAuthenticated,
  /** Your session is no longer valid. */
  SessionNoLongerValid,
  /** Your session has timed out. */
  SessionTimedOut = 4009,
  /** We can't find the server you're trying to connect to. */
  ServerNotFound = 4011,
  /** We didn't recognize the [protocol](https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection-example-select-protocol-payload) you sent. */
  UnknownProtocol,
  /** Channel was deleted, you were kicked, voice server changed, or the main gateway session was dropped. Should not reconnect. */
  Disconnect = 4014,
  /** The server crashed. Our bad! Try [resuming](https://discord.com/developers/docs/topics/voice-connections#resuming-voice-connection). */
  VoiceServerCrashed,
  /** We didn't recognize your [encryption](https://discord.com/developers/docs/topics/voice-connections#encrypting-and-sending-voice). */
  UnknownEncryptionMode,
}
