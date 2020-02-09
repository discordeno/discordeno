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

export interface DiscordBotGatewayData {
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

export interface DiscordHeartbeatPayload {
	heartbeat_interval: number
}

export enum GatewayOpcode {
	Dispatch = 0,
	Heartbeat,
	Identify,
	StatusUpdate,
	VoiceStateUpdate,
	Resume = 6,
	Reconnect,
	RequestGuildMembers,
	InvalidSession,
	Hello,
	HeartbeatACK
}

export enum GatewayCloseEventCode {
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

export enum VoiceOpcode {
	Identify,
	SelectProtocol,
	Ready,
	Heartbeat,
	SessionDescription,
	Speaking,
	HeartbeatACK,
	Resume,
	Hello,
	Resumed,
	ClientDisconnect = 13
}

export enum VoiceCloseEventCode {
	UnknownOpcode = 4001,
	NotAuthenticated = 4003,
	AuthenticationFailed,
	AlreadyAuthenticated,
	SessionNoLongerValid,
	SessionTimeout = 4009,
	ServerNotFound = 4011,
	UnknownProtocol,
	Disconnected = 4014,
	VoiceServerCrashed,
	UnknownEncryptionMode
}

export enum HttpResponseCode {
	Ok = 200,
	Created,
	NoContent = 204,
	NotModified = 304,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound,
	MethodNotAllowed,
	TooManyRequests = 429,
	GatewayUnavailable = 502,
	// ServerError left untyped because it's 5xx.
}

export enum JSONErrorCode {
	UnknownAccount = 10001,
	UnknownApplication,
	UnknownChannel,
	UnknownGuild,
	UnknownIntegration,
	UnknownInvite,
	UnknownMember,
	UnknownMessge,
	UnknownOverwrite,
	UnknownProvider,
	UnknownRole,
	UnknownToken = 10012,
	UnknownUser,
	UnknownEmoji,
	UnknownWebhook,
	BotsCannotUse = 20001,
	OnlyBotsCanUse,
	MaxGuildsReached = 30001,
	MaxFriendsReached,
	MaxPinsReached,
	MaxGuildRolesReached = 30005,
	MaxReactionsReached = 30010,
	MaxGuildChannelsReached = 30013,
	MaxInvitesReached = 30016,
	Unathorized = 40001,
	UserIsBannedFromGuild = 40007,
	MissingAccess = 50001,
	InvalidAccountType = 50002,
	CannotExecuteOnDMChannel,
	WidgetDisabled,
	CannotEditMessageByAnotherUser,
	CannotSendEmptyMessage,
	CannotSendMessageToUser,
	CannotSendMessageInVoiceChannel,
	ChannelVerificationTooHigh,
	OAuth2ApplicationNoBot,
	OAuth2ApplicationLimitReached,
	InvalidOAuthState,
	MissingPermissions,
	InvalidAuthenticationToken,
	NoteIsTooLong,
	TooFewOrTooManyMessagesToDelete,
	MessageCanOnlyBePinnedInParentChannel = 50019,
	InviteCodeTakenOrInvalid,
	CannotExecuteOnSystemMessage,
	InvalidOAuth2AccessToken,
	MessageProvidedTooOldToBulkDelet = 50034,
	InvalidFormBody,
	InviteAcceptedToGuildApplicationBotNotIn,
	InvalidAPIVersion = 50041,
	ReactionBlocked = 90001,
	ResourceOverloaded = 130000
}

export interface Properties {
	$os: string;
	$browser: string;
	$device: string;
}

export interface Timestamps {
	start?: number;
	end?: number;
}

export interface Emoji {
	name: string;
	id?: string;
	animated?: boolean;
}

export interface Activity {
	name: string;
	type: number;
	url?: string;
	created_at: number;
	timestamps: Timestamps;
	details?: string;
}

export enum StatusType {
	Online = 'online',
	DoNotDisturb = 'dnd',
	Idle = 'idle',
	Invisible = 'invisible',
	Offline = 'offline'
}

export interface Status {
	afk: boolean;
	status: StatusType;
}