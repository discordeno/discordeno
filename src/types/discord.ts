import {
  CreateGuildPayload,
  Integration,
  PartialUser,
  UserPayload,
} from "./guild.ts";
import { MemberCreatePayload } from "./member.ts";
import { Activity, Application } from "./message.ts";
import { ActivityPayload } from "./mod";
import { ClientStatusPayload } from "./presence.ts";

export interface DiscordPayload {
  /** OP code for the payload */
  op: number;
  /** The real event data. Any JSON value basically. */
  d: unknown;
  /** The sequence number, used for resuming sessions and heartbeats. ONLY for OPCode 0 */
  s?: number;
  /** The event name for this payload. ONLY for OPCode 0 */
  t?:
    | "APPLICATION_COMMAND_CREATE"
    | "APPLICATION_COMMAND_UPDATE"
    | "APPLICATION_COMMAND_DELETE"
    | "CHANNEL_CREATE"
    | "CHANNEL_DELETE"
    | "CHANNEL_UPDATE"
    | "GUILD_CREATE"
    | "GUILD_DELETE"
    | "GUILD_UPDATE"
    | "GUILD_BAN_ADD"
    | "GUILD_BAN_REMOVE"
    | "GUILD_EMOJIS_UPDATE"
    | "GUILD_MEMBER_ADD"
    | "GUILD_MEMBER_REMOVE"
    | "GUILD_MEMBER_UPDATE"
    | "GUILD_MEMBERS_CHUNK"
    | "GUILD_ROLE_CREATE"
    | "GUILD_ROLE_DELETE"
    | "GUILD_ROLE_UPDATE"
    | "INTERACTION_CREATE"
    | "MESSAGE_CREATE"
    | "MESSAGE_DELETE"
    | "MESSAGE_DELETE_BULK"
    | "MESSAGE_UPDATE"
    | "MESSAGE_REACTION_ADD"
    | "MESSAGE_REACTION_REMOVE"
    | "MESSAGE_REACTION_REMOVE_ALL"
    | "MESSAGE_REACTION_REMOVE_EMOJI"
    | "PRESENCE_UPDATE"
    | "READY"
    | "TYPING_START"
    | "USER_UPDATE"
    | "VOICE_STATE_UPDATE"
    | "WEBHOOKS_UPDATE"
    | "INTEGRATION_CREATE"
    | "INTEGRATION_UPDATE"
    | "INTEGRATION_DELETE"
    | "INVITE_CREATE"
    | "INVITE_DELETE";
}

export interface DiscordBotGatewayData {
  /** The WSS URL that can be used for connecting to the gateway. */
  url: string;
  /** The recommended number of shards to use when connecting. */
  shards: number;
  /** Info on the current start limit. */
  "session_start_limit": {
    /** The total number of session starts the current user is allowed. */
    total: number;
    /** The remaining number of session starts the current user is allowed. */
    remaining: number;
    /** Milliseconds left until limit is reset. */
    "reset_after": number;
    /** The number of identify requests allowed per 5 seconds.
     * So, if you had a max concurrency of 16, and 16 shards for example, you could start them all up at the same time.
     * Whereas if you had 32 shards, if you tried to start up shard 0 and 16 at the same time for example, it would not work. You can start shards 0-15 concurrently, then 16-31...
     * */
    "max_concurrency": number;
  };
}

export interface DiscordHeartbeatPayload {
  "heartbeat_interval": number;
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
  HeartbeatACK,
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
  ShardingRequired,
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
  ClientDisconnect = 13,
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
  UnknownEncryptionMode,
}

export enum HttpResponseCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  NotModified = 304,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
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
  ResourceOverloaded = 130000,
}

export interface Properties {
  $os: string;
  $browser: string;
  $device: string;
}

export interface Emoji {
  name: string;
  id?: string;
  animated?: boolean;
}

export enum StatusTypes {
  Online = "online",
  DoNotDisturb = "dnd",
  Idle = "idle",
  Invisible = "invisible",
  Offline = "offline",
}

export type StatusType = "online" | "dnd" | "idle" | "invisible" | "offline";

export interface Status {
  afk: boolean;
  status: StatusType;
}

export interface WebhookUpdatePayload {
  "channel_id": string;
  "guild_id": string;
}

export interface PresenceUpdatePayload {
  /** The user presence is being updated for. */
  user: PartialUser;
  /** The id of the guild */
  "guild_id": string;
  /** Either idle, dnd, online, or offline */
  status: StatusType;
  /** All user's current activity */
  activities: Activity[];
  /** The user's platform dependent status */
  "client_status": ClientStatusPayload;
}

export interface TypingStartPayload {
  /** The id of the channel */
  "channel_id": string;
  /** The id of the guild */
  "guild_id"?: string;
  /** The id of the user */
  "user_id": string;
  /** The unix time in seconds of when the user started typing */
  timestamp: number;
  /** The member who started typing if this happened in a guild */
  member?: MemberCreatePayload;
}

export interface VoiceStateUpdatePayload {
  /** The guild id this voice state is for */
  "guild_id"?: string;
  /** The channel id this user is connected to */
  "channel_id": string | null;
  /** The user id this voice state is for */
  "user_id": string;
  /** The guild member this voice state is for */
  member?: MemberCreatePayload;
  /** The session id for this voice state */
  "session_id": string;
  /** Whether this user is deafened by the server */
  deaf: boolean;
  /** Whether this user is muted by the server */
  mute: boolean;
  /** Whether this user is locally deafened */
  "self_deaf": boolean;
  /** Whether this user is locally muted */
  "self_mute": boolean;
  /** Whether this user is streaming using Go Live */
  "self_stream"?: boolean;
  /** Whether this user is muted by the bot */
  suppress: boolean;
}

export interface ReadyPayload {
  /** gateway version */
  v: number;
  /** information about the user including email */
  user: UserPayload;
  /** empty array */
  "private_channels": [];
  /** the guilds the user is in */
  guilds: UnavailableGuildPayload[];
  /** used for resuming connections */
  "session_id": string;
  /** (shard_id, num_shards) the shard information associated with this session, if sent when identifying */
  shard?: [number, number];
  /** contains id and flags */
  application: Pick<Application, "id">;
}

export type UnavailableGuildPayload = Pick<
  CreateGuildPayload,
  "id" | "unavailable"
>;

export type IntegrationCreateUpdateEvent = Integration & {
  /** id of the guild */
  guild_id: string;
};

export interface IntegrationDeleteEvent {
  /** integration id */
  id: string;
  /** id of the guild */
  "guild_id": string;
  /** id of the bot/OAuth2 application for this discord integration */
  "application_id"?: string;
}

/** https://discord.com/developers/docs/topics/gateway#invite-create */
export interface InviteCreateEvent {
  /** the channel the invite is for */
  "channel_id": string;
  /** the unique invite code */
  code: string;
  /** the time at which the invite was created */
  "created_at": string;
  /** the guild of the invite */
  "guild_id"?: string;
  /** the user that created the invite */
  inviter?: UserPayload;
  /** how long the invite is valid for (in seconds) */
  "max_age": number;
  /** the maximum number of times the invite can be used */
  "max_uses": number;
  /** the target user for this invite */
  "target_user"?: Partial<UserPayload>;
  /** the type of user target for this invite */
  "target_user_type"?: number;
  /** whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean;
  /** how many times the invite has been used (always will be 0) */
  uses: number;
}

/** https://discord.com/developers/docs/topics/gateway#invite-delete */
export interface InviteDeleteEvent {
  /** the channel of the invite */
  "channel_id": string;
  /** the guild of the invite */
  "guild_id"?: string;
  /** the unique invite code */
  code: string;
}

/** https://discord.com/developers/docs/topics/gateway#update-status-gateway-status-update-structure */
export interface GatewayStatusUpdatePayload {
  /** unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null;
  /** null, or the user's activities */
  activities: Pick<ActivityPayload, "name" | "type" | "url">[] | null;
  /** the user's new status */
  status: StatusType;
  /** whether or not the client is afk */
  afk: boolean;
}
