import { Activity } from "./message.ts";
import { Client_Status_Payload } from "./presence.ts";
import { Partial_User } from "./guild.ts";
import { MemberCreatePayload } from "./member.ts";

export interface DiscordPayload {
  /** OP code for the payload */
  op: number;
  /** The real event data. Any JSON value basically. */
  d: unknown;
  /** The sequence number, used for resuming sessions and heartbeats. ONLY for OPCode 0 */
  s?: number;
  /** The event name for this payload. ONLY for OPCode 0 */
  t?: string;
}

export interface DiscordBotGatewayData {
  /** The WSS URL that can be used for connecting to the gateway. */
  url: string;
  /** The recommended number of shards to use when connecting. */
  shards: number;
  /** Info on the current start limit. */
  session_start_limit: {
    /** The total number of session starts the current user is allowed. */
    total: number;
    /** The remaining number of session starts the current user is allowed. */
    remaining: number;
    /** Milliseconds left until limit is reset. */
    reset_after: number;
  };
}

export interface DiscordHeartbeatPayload {
  heartbeat_interval: number;
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
  ResourceOverloaded = 130000,
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

export enum StatusType {
  Online = "online",
  DoNotDisturb = "dnd",
  Idle = "idle",
  Invisible = "invisible",
  Offline = "offline",
}

export type Status_Type = "online" | "dnd" | "idle" | "invisible" | "offline";

export interface Status {
  afk: boolean;
  status: StatusType;
}

export interface WebhookUpdatePayload {
  channel_id: string;
  guild_id: string;
}

export interface PresenceUpdatePayload {
  /** The user presence is being updated for. */
  user: Partial_User;
  /** The roles this user is in */
  roles: string[];
  /** null, or the user's current activity */
  game: Activity | null;
  /** The id of the guild */
  guild_id: string;
  /** Either idle, dnd, online, or offline */
  status: Status_Type;
  /** All user's current activity */
  activities: Activity[];
  /** The user's platform dependent status */
  client_status: Client_Status_Payload;
  /** When the user has started boosting the guild */
  premium_since?: string | null;
  /** This users guild nickname (if one is set) */
  nick?: string | null;
}

export interface TypingStartPayload {
  /** The id of the channel */
  channel_id: string;
  /** The id of the guild */
  guild_id?: string;
  /** The id of the user */
  user_id: string;
  /** The unix time in seconds of when the user started typing */
  timestamp: number;
  /** The member who started typing if this happened in a guild */
  member?: MemberCreatePayload;
}

export interface VoiceStateUpdatePayload {
  /** The guild id this voice state is for */
  guild_id?: string;
  /** The channel id this user is connected to */
  channel_id: string | null;
  /** The user id this voice state is for */
  user_id: string;
  /** The guild member this voice state is for */
  member?: MemberCreatePayload;
  /** The session id for this voice state */
  session_id: string;
  /** Whether this user is deafened by the server */
  deaf: boolean;
  /** Whether this user is muted by the server */
  mute: boolean;
  /** Whether this user is locally deafened */
  self_deaf: boolean;
  /** Whether this user is locally muted */
  self_mute: boolean;
  /** Whether this user is streaming using Go Live */
  self_stream?: boolean;
  /** Whether this user is muted by the bot */
  suppress: boolean;
}

export interface ReadyPayload {
  /** used for resuming connections */
  session_id: string;
  /** (shard_id, num_shards)	the shard information associated with this session, if sent when identifying */
  shard?: [number, number];
}
