import { DiscordInteractionCommand } from "./interaction.ts";
import { DiscordChannel, DiscordChannelPinsUpdateEvent, DiscordGatewayOpcodes, DiscordGuild, DiscordGuildBanAddEvent, DiscordGuildBanRemoveEvent, DiscordGuildEmojisUpdateEvent, DiscordGuildIntegrationsUpdateEvent, DiscordGuildMemberAddExtra, DiscordGuildMemberRemoveEvent, DiscordGuildMembersChunkEvent, DiscordGuildMemberUpdateEvent, DiscordGuildRoleCreateEvent, DiscordGuildRoleDeleteEvent, DiscordGuildRoleUpdateEvent, DiscordHelloEvent, DiscordIntegrationCreate, DiscordIntegrationDelete, DiscordIntegrationUpdate, DiscordInviteCreateEvent, DiscordInviteDeleteEvent, DiscordMember, DiscordMessage, DiscordMessageDeleteBulkEvent, DiscordMessageDeleteEvent, DiscordMessageReactionAddEvent, DiscordMessageReactionRemoveAllEvent, DiscordMessageReactionRemoveEmoji, DiscordMessageReactionRemoveEvent, DiscordPresenceUpdateEvent, DiscordReadyEvent, DiscordTypingStartEvent, DiscordUnavailableGuild, DiscordUser, DiscordVoiceServerUpdateEvent, DiscordVoiceStateUpdateEvent, DiscordWebhooksUpdateEvent } from "./mod.ts";

/** https://discord.com/developers/docs/topics/gateway#payloads */
export interface DiscordGateway {
  /** opcode for the payload */
  op: DiscordGatewayOpcodes;
  /** event data */
  d: DiscordGatewayDTypes;
  /** sequence number, used for resuming sessions and heartbeats */
  s: number | null;
  /** the event name for this payload */
  t: DiscordGatewayTTypes;
}

/** GatewayPayload event data type list */
export type DiscordGatewayDTypes =
  | DiscordHelloEvent
  | DiscordReadyEvent
  | DiscordResume
  | DiscordChannel
  | DiscordChannelPinsUpdateEvent
  | DiscordGuild
  | DiscordUnavailableGuild
  | DiscordGuildBanAddEvent
  | DiscordGuildBanRemoveEvent
  | DiscordGuildEmojisUpdateEvent
  | DiscordGuildIntegrationsUpdateEvent
  | DiscordMember
  | DiscordGuildMemberAddExtra
  | DiscordGuildMemberRemoveEvent
  | DiscordGuildMemberUpdateEvent
  | DiscordGuildMembersChunkEvent
  | DiscordGuildRoleCreateEvent
  | DiscordGuildRoleUpdateEvent
  | DiscordGuildRoleDeleteEvent
  | DiscordIntegrationCreate
  | DiscordIntegrationUpdate
  | DiscordIntegrationDelete
  | DiscordInviteCreateEvent
  | DiscordInviteDeleteEvent
  | DiscordMessage
  | DiscordMessageDeleteEvent
  | DiscordMessageDeleteBulkEvent
  | DiscordMessageReactionAddEvent
  | DiscordMessageReactionRemoveEvent
  | DiscordMessageReactionRemoveAllEvent
  | DiscordMessageReactionRemoveEmoji
  | DiscordPresenceUpdateEvent
  | DiscordTypingStartEvent
  | DiscordUser
  | DiscordVoiceStateUpdateEvent
  | DiscordVoiceServerUpdateEvent
  | DiscordWebhooksUpdateEvent
  | DiscordInteractionCommand
  | false
  | null;

/** GatewayPayload event name list */
export type DiscordGatewayTTypes =
  | "HELLO"
  | "READY"
  | "RESUMED"
  | "RECONNECT"
  | "INVALID_SESSION"
  | "CHANNEL_CREATE"
  | "CHANNEL_UPDATE"
  | "CHANNEL_DELETE"
  | "CHANNEL_PINS_UPDATE"
  | "GUILD_CREATE"
  | "GUILD_UPDATE"
  | "GUILD_DELETE"
  | "GUILD_BAN_ADD"
  | "GUILD_BAN_REMOVE"
  | "GUILD_EMOJIS_UPDATE"
  | "GUILD_INTEGRATIONS_UPDATE"
  | "GUILD_MEMBER_ADD"
  | "GUILD_MEMBER_REMOVE"
  | "GUILD_MEMBER_UPDATE"
  | "GUILD_MEMBERS_CHUNK"
  | "GUILD_ROLE_CREATE"
  | "GUILD_ROLE_UPDATE"
  | "GUILD_ROLE_DELETE"
  | "INTEGRATION_CREATE"
  | "INTEGRATION_UPDATE"
  | "INTEGRATION_DELETE"
  | "INVITE_CREATE"
  | "INVITE_DELETE"
  | "MESSAGE_CREATE"
  | "MESSAGE_UPDATE"
  | "MESSAGE_DELETE"
  | "MESSAGE_DELETE_BULK"
  | "MESSAGE_REACTION_ADD"
  | "MESSAGE_REACTION_REMOVE"
  | "MESSAGE_REACTION_REMOVE_ALL"
  | "MESSAGE_REACTION_REMOVE_EMOJI"
  | "PRESENCE_UPDATE"
  | "TYPING_START"
  | "USER_UPDATE"
  | "VOICE_STATE_UPDATE"
  | "VOICE_SERVER_UPDATE"
  | "WEBHOOKS_UPDATE"
  | "INTERACTION_CREATE"
  // Not in DC documentation
  | "APPLICATION_COMMAND_CREATE"
  | null;

/** https://discord.com/developers/docs/topics/gateway#connecting-to-the-gateway */
export interface DiscordGatewayURLParams {
  /** gateway Version to use */
  v: number;
  /** the encoding of recieved gateway packets */
  encoding: string;
  /** the (optional) compression of gateway packets */
  compress?: string;
}

/** https://discord.com/developers/docs/topics/gateway#gateway-intents */
export enum DiscordGatewayIntents {
  /** Enables the following events:
   * - GUILD_CREATE
   * - GUILD_DELETE
   * - GUILD_ROLE_CREATE
   * - GUILD_ROLE_UPDATE
   * - GUILD_ROLE_DELETE
   * - CHANNEL_CREATE
   * - CHANNEL_UPDATE
   * - CHANNEL_DELETE
   * - CHANNEL_PINS_UPDATE
   */
  GUILDS = 1 << 0,
  /** Enables the following events:
   * - GUILD_MEMBER_ADD
   * - GUILD_MEMBER_UPDATE
   * - GUILD_MEMBER_REMOVE
   */
  GUILD_MEMBERS = 1 << 1,
  /** Enables the following events:
   * - GUILD_BAN_ADD
   * - GUILD_BAN_REMOVE
   */
  GUILD_BANS = 1 << 2,
  /** Enables the following events:
   * - GUILD_EMOJIS_UPDATE
   */
  GUILD_EMOJIS = 1 << 3,
  /** Enables the following events:
   * - GUILD_INTEGRATIONS_UPDATE
   * - INTEGRATION_CREATE
   * - INTEGRATION_UPDATE
   * - INTEGRATION_DELETE
   */
  GUILD_INTEGRATIONS = 1 << 4,
  /** Enables the following events:
   * - WEBHOOKS_UPDATE
   */
  GUILD_WEBHOOKS = 1 << 5,
  /** Enables the following events:
   * - INVITE_CREATE
   * - INVITE_DELETE
   */
  GUILD_INVITES = 1 << 6,
  /** Enables the following events:
   * - VOICE_STATE_UPDATE
   */
  GUILD_VOICE_STATES = 1 << 7,
  /** Enables the following events:
   * - PRESENCE_UPDATE
   */
  GUILD_PRESENCES = 1 << 8,
  /** Enables the following events:
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   */
  GUILD_MESSAGES = 1 << 9,
  /** Enables the following events:
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  /** Enables the following events:
   * - TYPING_START
   */
  GUILD_MESSAGE_TYPING = 1 << 11,
  /** Enables the following events:
   * - CHANNEL_CREATE
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - CHANNEL_PINS_UPDATE
   */
  DIRECT_MESSAGES = 1 << 12,
  /** Enables the following events:
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  /** Enables the following events:
   * - TYPING_START
   */
  DIRECT_MESSAGE_TYPING = 1 << 14,
}

/** https://discord.com/developers/docs/topics/gateway#identify */
export interface DiscordIdentify {
  /** authentication token */
  token: string;
  /** connection properties */
  properties: DiscordIdentifyConnectionProps;
  /** whether this connection supports compression of packets, default: false */
  compress?: boolean;
  /** value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list, default: 50 */
  large_threshold?: number;
  /** used for Guild Sharding */
  shard: [number, number];
  /** presence structure for initial presence information */
  presence?: DiscordUpdateStatus;
  /** enables dispatching of guild subscription events (presence and typing events), default: true */
  guild_subscriptions?: boolean;
  /** the Gateway Intents you wish to receive */
  intents: number;
}

/** https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties */
export interface DiscordIdentifyConnectionProps {
  /** your operating system */
  $os: string;
  /** your library name */
  $browser: string;
  /** your library name */
  $device: string;
}

/** https://discord.com/developers/docs/topics/gateway#resume */
export interface DiscordResume {
  /** session token */
  token: string;
  /** session id */
  session_id: string;
  /** last sequence number received */
  seq: number;
}

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface DiscordRequestGuildMembers {
  /** id of the guild to get members for */
  guild_id: string;
  /** string that username starts with, or an empty string to return all members */
  query?: string;
  /** maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number;
  /** used to specify if we want the presence of the matched members */
  presences?: boolean;
  /** used to specify which users you wish to fetch */
  user_ids?: string | string[];
  /** nonce to identify the Guild Members Chunk response */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface DiscordUpdateVoiceState {
  /** id of the guild */
  guild_id: string;
  /** id of the voice channel client wants to join (null if disconnecting) */
  channel_id: string | null;
  /** is the client muted */
  self_mute: boolean;
  /** is the client deafened */
  self_deaf: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-status */
export interface DiscordUpdateStatus {
  /** unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null;
  /** null, or the user's activities */
  activities: DiscordActivity[];
  /** the user's new status */
  status: DiscordStatusTypes;
  /** whether or not the client is afk */
  afk: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-status-status-types */
export enum DiscordStatusTypes {
  ONLINE = "online",
  DND = "dnd",
  IDLE = "idle",
  INVISIBLE = "invisible",
  OFFLINE = "offline",
}

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export interface DiscordClientStatus {
  /** the user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string;
  /** the user's status set for an active mobile (iOS, Android) application session */
  mobile?: string;
  /** the user's status set for an active web (browser, bot account) application session */
  web?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface DiscordActivity {
  /** the activity's id */
  id?: string;
  /** the activity's name */
  name: string;
  /** activity type */
  type: DiscordActivityTypes;
  /** stream url, is validated when type is 1 */
  url?: string | null;
  /** unix timestamp of when the activity was added to the user's session */
  created_at: number;
  /** unix timestamps for start and/or end of the game */
  timestamps?: DiscordActivityTimestamps;
  /** the id of the song on Spotify */
  sync_id?: string;
  /** the platform the game is being played on ("desktop", "samsung", or "xbox") */
  platform?: string;
  /** application id for the game */
  application_id?: string;
  /** what the player is currently doing */
  details?: string | null;
  /** the user's current party status */
  state?: string | null;
  /** the emoji used for a custom status */
  emoji?: DiscordActivityEmoji | null;
  /** the id of the game or Spotify session */
  session_id?: string;
  /** information for the current party of the player */
  party?: DiscordActivityParty;
  /** images for the presence and their hover texts */
  assets?: DiscordActivityAssets;
  /** secrets for Rich Presence joining and spectating */
  secrets?: DiscordActivitySecrets;
  /** whether or not the activity is an instanced game session */
  instance?: boolean;
  /** activity flags OR d together, describes what the payload includes */
  flags?: DiscordActivityFlags;
  /** the custom buttons shown in the Rich Presence (max 2) */
  buttons?: DiscordActivityButton[];
}

export interface DiscordActivityButton {
  /** the text shown on the button (1-32 characters) */
  label: string;
  /** the url opened when clicking the button (1-512 characters) */
  url: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-types */
export enum DiscordActivityTypes {
  /** Playing {name} */
  GAME,
  /** Streaming {details} */
  STREAMING,
  /** Listening to {name} */
  LISTENING,
  /** {emoji} {name} */
  CUSTOM = 4,
  /** Competing in {name} */
  COMPETING,
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export interface DiscordActivityTimestamps {
  /** unix time (in milliseconds) of when the activity started */
  start?: number;
  /** unix time (in milliseconds) of when the activity ends */
  end?: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface DiscordActivityEmoji {
  /** the name of the emoji */
  name: string;
  /** the id of the emoji */
  id?: string;
  /** whether this emoji is animated */
  animated?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface DiscordActivityParty {
  /** the id of the party */
  id?: string;
  /** used to show the party's currrent and maximum size */
  size?: [number, number];
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface DiscordActivityAssets {
  /** the id for a large asset of the activity, usually a snowflake */
  large_image?: string;
  /** text displayed when hovering over the large image of the activity */
  large_text?: string;
  /** the id for a small asset of the activity, usually a snowflake */
  small_image?: string;
  /** text displlayed when hovering over the small image of the activity */
  small_text?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets */
export interface DiscordActivitySecrets {
  /** the secret for joining a party */
  join?: string;
  /** the secret for spectating a game */
  spectate?: string;
  /** the secret for a specific instanced match */
  match?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags */
export enum DiscordActivityFlags {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
}

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot-json-response */
export interface DiscordGetGatewayBot {
  /** the WSS URL that can be used for connecting to the gateway */
  url: string;
  /** the recommended number of shards to use when connecting */
  shards: number;
  /** information on the current session start limit */
  session_start_limit: DiscordSessionStartLimit;
}

/** https://discord.com/developers/docs/topics/gateway#session-start-limit-object-session-start-limit-structure */
export interface DiscordSessionStartLimit {
  /** the total number of session starts the current user is allowed */
  total: number;
  /** the remaining number of session starts the current user is allowed */
  remaining: number;
  /** the number of milliseconds after which the limit resets */
  reset_after: number;
  /** the number of identify requests allowed per 5 seconds */
  max_concurrency: number;
}
