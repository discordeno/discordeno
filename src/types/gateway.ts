/** https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure */
export interface DiscordGatewayPayload {
  /** opcode for the payload */
  op: number;
  /** Event data */
  d: unknown | null;
  /** Sequence number, used for resuming sessions and heartbeats */
  s: number | null;
  /** The event name for this payload */
  t: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#connecting-gateway-url-params */
export interface DiscordGatewayURLParams {
  /** Gateway version to use */
  v: string;
  /** The encoding of received gateway packets */
  encoding: string;
  /** The (optional) compression of gateway packets */
  compress?: string;
}

/** https://discord.com/developers/docs/topics/gateway#gateway-intents */
export enum DiscordGatewayIntents {
  /** 
   * - GUILD_CREATE
   * - GUILD_UPDATE
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
  /** 
   * - GUILD_MEMBER_ADD
   * - GUILD_MEMBER_UPDATE
   * - GUILD_MEMBER_REMOVE
   */
  GUILD_MEMBERS = 1 << 1,
  /**
   * - GUILD_BAN_ADD
   * - GUILD_BAN_REMOVE
   */
  GUILD_BANS = 1 << 2,
  /** - GUILD_EMOJIS_UPDATE */
  GUILD_EMOJIS = 1 << 3,
  /** - GUILD_INTEGRATIONS_UPDATE */
  GUILD_INTEGRATIONS = 1 << 4,
  /** - WEBHOOKS_UPDATE */
  GUILD_WEBHOOKS = 1 << 5,
  /**
   * - INVITE_CREATE
   * - INVITE_DELETE
   */
  GUILD_INVITES = 1 << 6,
  /** - VOICE_STATE_UPDATE */
  GUILD_VOICE_STATES = 1 << 7,
  /** - PRESENCE_UPDATE */
  GUILD_PRESENCES = 1 << 8,
  /**
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - MESSAGE_DELETE_BULK
   */
  GUILD_MESSAGES = 1 << 9,
  /**
    * - MESSAGE_REACTION_ADD
    * - MESSAGE_REACTION_REMOVE
    * - MESSAGE_REACTION_REMOVE_ALL
    * - MESSAGE_REACTION_REMOVE_EMOJI
    */
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  /** - TYPING_START */
  GUILD_MESSAGE_TYPING = 1 << 11,
  /**
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - CHANNEL_PINS_UPDATE
   */
  DIRECT_MESSAGES = 1 << 12,
  /**
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  /** - TYPING_START */
  DIRECT_MESSAGE_TYPING = 1 << 14,
}

/** https://discord.com/developers/docs/topics/gateway#identify */
export interface DiscordIdentify {
  /** Authentication token */
  token: string;
  /** Connection properties */
  properties: DiscordIdentifyConnectionProperties;
  /** Whether this connection supports compression of packets */
  compress?: boolean;
  /** Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list */
  large_threshold?: number;
  /** Used for Guild Sharding */
  shard?: [number, number];
  /** Presence structure for initial presence information */
  presence?: DiscordUpdateStatus;
  /** Enables dispatching of guild subscription events (presence and typing events) */
  guild_subscriptions?: boolean;
  /** The Gateway Intents you wish to receive */
  intents: number;
}

/** https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties */
export interface DiscordIdentifyConnectionProperties {
  /** Operating system */
  $os: string;
  /** Library name */
  $browser: string;
  /** Library name */
  $device: string;
}

/** https://discord.com/developers/docs/topics/gateway#resume */
export interface DiscordResume {
  /** Session token */
  token: string;
  /** Session id */
  session_id: string;
  /** Last sequence number received */
  seq: number;
}

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface DiscordRequestGuildMembers {
  /** id of the guild to get members for */
  guild_id: string;
  /** String that username starts with, or an empty string to return all members */
  query?: string;
  /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number;
  /** Used to specify if we want the presences of the matched members */
  presences?: boolean;
  /** Used to specify which users you wish to fetch */
  user_ids?: string[];
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface DiscordUpdateVoiceState {
  /** id of the guild */
  guild_id: string;
  /** id of the voice channel client wants to join (null if disconnecting) */
  channel_id: string | null;
  /** Is the client muted */
  self_mute: boolean;
  /** Is the client deafened */
  self_deaf: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-status */
export interface DiscordUpdateStatus {
  /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null;
  /** null, or the user's activities */
  activities: DiscordActivity[] | null;
  /** The user's new status */
  status: DiscordStatusTypes;
  /** Whether or not the client is afk */
  afk: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-status-status-types */
export type DiscordStatusTypes =
  | "online"
  | "dnd"
  | "idle"
  | "invisible"
  | "offline";

/** https://discord.com/developers/docs/topics/gateway#hello */
export interface DiscordHello {
  /** The interval (in milliseconds) the client should heartbeat with */
  heartbeat_interval: number;
}

/** https://discord.com/developers/docs/topics/gateway#ready */
export interface DiscordReady {
  /** Gateway version */
  v: number;
  /** Information about the user including email */
  user: DiscordUser;
  /** Empty array */
  private_channels: [];
  /** The guilds the user is in */
  guilds: DiscordUnavailableGuild[];
  /** Used for resuming connections */
  session_id: string;
  /** The shard information associated with this session, if sent when identifying */
  shard?: [number, number];
  /** Contains id and flags */
  application:
    & Partial<DiscordApplication>
    & Pick<DiscordApplication, "id" | "flags">;
}

/** https://discord.com/developers/docs/topics/gateway#channel-pins-update */
export interface DiscordChannelPinsUpdate {
  /** The id of the guild */
  guild_id?: string;
  /** The id of the channel */
  channel_id: string;
  /** The time at which the most recent pinned message was pinned */
  last_pin_timestamp?: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add */
export interface DiscordGuildBanAddRemove {
  /** id of the guild */
  guild_id: string;
  /** The (un)banned user */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update */
export interface GuildEmojisUpdate {
  /** id of the guild */
  guild_id: string;
  /** Array of emojis */
  emojis: DiscordEmoji[];
}

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update */
export interface DiscordIntegrationsUpdate {
  /** id of the guild whose integrations were updated */
  guild_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-add */
export interface DiscordGuildMemberAdd extends DiscordMember {
  /** id of the guild */
  guild_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
export interface DiscordGetGatewayBot {
  /** The WSS URL that can be used for connecting to the gateway */
  url: string;
  /** The recommended number of shards to use when connecting */
  shards: number;
  /** Information on the current session start limit */
  session_start_limit: DiscordSessionStartLimit;
}

/** https://discord.com/developers/docs/topics/gateway#session-start-limit-object */
export interface DiscordSessionStartLimit {
  /** The total number of session starts the current user is allowed */
  total: number;
  /** The remaining number of session starts the current user is allowed */
  remaining: number;
  /** The number of milliseconds after which the limit resets */
  reset_after: number;
  /** The number of identify requests allowed per 5 seconds */
  max_concurrency: number;
}
