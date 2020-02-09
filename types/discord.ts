export interface DiscordPayload {
	/** OP code for the payload */
	op: number
	/** The real event data. Any JSON value basically. */
	d: unknown
	/** The sequence number, used for resuming sessions and heartbeats. ONLY for OPCode 0 */
	s?: number
	/** The event name for this payload. ONLY for OPCode 0 */
	t?: string
}

export interface DiscordBotGateway {
	/** The WSS URL that can be used for connecting to the gateway. */
	url: string
	/** The recommended number of shards to use when connecting. */
	shards: number
	/** Info on the current start limit. */
	session_start_limit: {
		/** The total number of session starts the current user is allowed. */
		total: number
		/** The remaining number of session starts the current user is allowed. */
		remaining: number
		/** Milliseconds left until limit is reset. */
		reset_after: number
	}
}

export enum OpCode {
	Dispatch = 0,
	Heartbeat,
	Identify,
	StatusUpdate,
	VoiceStateUpdate,
	Resume,
	Reconnect,
	RequestGuildMembers,
	InvalidSession,
	Hello,
	HeartbeatACK
}

export enum GatewayCloseEvent {
	UnknownError = 4000,
	UnknownOpcode,
	DecodeError,
	NotAuthenticated,
	AuthenticationFailed,
	AlreadyAuthenticated,
	InvalidSeq = 4007,
	RateLimited,
	SessionTimeout,
	InvalidShard,
	ShardingRequired
}