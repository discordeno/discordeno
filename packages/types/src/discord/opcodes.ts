/** Types for: https://discord.com/developers/docs/topics/opcodes-and-status-codes */

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes */
export enum GatewayOpcodes {
  /** An event was dispatched. */
  Dispatch,
  /** Fired periodically by the client to keep the connection alive. */
  Heartbeat,
  /** Starts a new session during the initial handshake. */
  Identify,
  /** Update the client's presence. */
  PresenceUpdate,
  /** Used to join/leave or move between voice channels. */
  VoiceStateUpdate,
  /** Resume a previous session that was disconnected. */
  Resume = 6,
  /** You should attempt to reconnect and resume immediately. */
  Reconnect,
  /** Request information about offline guild members in a large guild. */
  RequestGuildMembers,
  /** The session has been invalidated. You should reconnect and identify/resume accordingly. */
  InvalidSession,
  /** Sent immediately after connecting, contains the `heartbeat_interval` to use. */
  Hello,
  /** Sent in response to receiving a heartbeat to acknowledge that it has been received. */
  HeartbeatACK,
  /** Used to request soundboard sounds for a list of guilds. */
  RequestSoundboardSounds = 31,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes */
export enum GatewayCloseEventCodes {
  /** A normal closure of the gateway. You may attempt to reconnect. */
  NormalClosure = 1000,
  /** We're not sure what went wrong. Try reconnecting? */
  UnknownError = 4000,
  /** You sent an invalid [Gateway opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes) or an invalid payload for an opcode. Don't do that! */
  UnknownOpcode,
  /** You sent an invalid [payload](https://discord.com/developers/docs/topics/gateway#sending-payloads) to us. Don't do that! */
  DecodeError,
  /** You sent us a payload prior to [identifying](https://discord.com/developers/docs/topics/gateway-events#identify), or this session has been invalidated. */
  NotAuthenticated,
  /** The account token sent with your [identify payload](https://discord.com/developers/docs/topics/gateway-events#identify) is incorrect. */
  AuthenticationFailed,
  /** You sent more than one identify payload. Don't do that! */
  AlreadyAuthenticated,
  /** The sequence sent when [resuming](https://discord.com/developers/docs/topics/gateway-events#resume) the session was invalid. Reconnect and start a new session. */
  InvalidSeq = 4007,
  /** Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this. */
  RateLimited,
  /** Your session timed out. Reconnect and start a new one. */
  SessionTimedOut,
  /** You sent us an invalid [shard when identifying](https://discord.com/developers/docs/topics/gateway#sharding). */
  InvalidShard,
  /** The session would have handled too many guilds - you are required to [shard](https://discord.com/developers/docs/topics/gateway#sharding) your connection in order to connect. */
  ShardingRequired,
  /** You sent an invalid version for the gateway. */
  InvalidApiVersion,
  /** You sent an invalid intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have incorrectly calculated the bitwise value. */
  InvalidIntents,
  /** You sent a disallowed intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have tried to specify an intent that you [have not enabled or are not approved for](https://discord.com/developers/docs/topics/gateway#privileged-intents). */
  DisallowedIntents,
}

// TODO: Add HTTPJsonErrorCodes: https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes
