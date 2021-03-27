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
export interface DiscordGuildEmojisUpdate {
  /** id of the guild */
  guild_id: string;
  /** Array of emojis */
  emojis: DiscordEmoji[];
}

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update */
export interface DiscordGuildIntegrationsUpdate {
  /** id of the guild whose integrations were updated */
  guild_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-add */
export interface DiscordGuildMemberAdd extends DiscordMember {
  /** id of the guild */
  guild_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove */
export interface DiscordGuildMemberRemove {
  /** The id of the guild */
  guild_id: string;
  /** The user who was removed */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-update */
export interface DiscordGuildMemberUpdate {
  /** The id of the guild */
  guild_id: string;
  /** User role ids */
  roles: string[];
  /** The user */
  user: DiscordUser;
  /** Nickname of the user in the guild */
  nick?: string | null;
  /** When the user joined the guild */
  joined_at: string;
  /** When the user starting boosting the guild */
  premium_since?: string | null;
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#guild-members-chunk */
export interface DiscordGuildMembersChunk {
  /** The id of the guild */
  guild_id: string;
  /** Set of guild members */
  members: DiscordMember[];
  /** The chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count) */
  chunk_index: number;
  /** The total number of expected chunks for this response */
  chunk_count: number;
  /** If passing an invalid id to `REQUEST_GUILD_MEMBERS`, it will be returned here */
  not_found?: string[];
  /** If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here */
  presences?: DiscordPresence[];
  /** The nonce used in the Guild Members Request */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-create */
export interface DiscordGuildRoleCreateUpdate {
  /** The id of the guild */
  guild_id: string;
  /** The role created/updated */
  role: DiscordRole;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-delete */
export interface DiscordGuildRoleDelete {
  /** id of the guild */
  guild_id: string;
  /** id of the role */
  role_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#invite-create */
export interface DiscordInviteCreate {
  /** The channel the invite is for */
  channel_id: string;
  /** The unique invite code */
  code: string;
  /** The time at which the invite was created */
  created_at: string;
  /** The guild of the invite */
  guild_id?: string;
  /** The user that created the invite */
  inviter?: DiscordUser;
  /** How long the invite is valid for (in seconds) */
  max_age: number;
  /** The maximum number of times the invite can be used */
  max_uses: number;
  /** The target user for this invite */
  target_user?: Partial<DiscordUser>;
  /** The type of user target for this invite */
  target_user_type?: number;
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean;
  /** How many times the invite has been used (always will be 0) */
  uses: number;
}

/** https://discord.com/developers/docs/topics/gateway#invite-delete */
export interface DiscordInviteDelete {
  /** The channel of the invite */
  channel_id: string;
  /** The guild of the invite */
  guild_id?: string;
  /** The unique invite code */
  code: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete */
export interface DiscordMessageDelete {
  /** The id of the message */
  id: string;
  /** The id of the channel */
  channel_id: string;
  /** The id of the guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk */
export interface DiscordMessageDeleteBulk {
  /** The ids of the messages */
  ids: string[];
  /** The id of the channel */
  channel_id: string;
  /** The id of the guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add */
export interface DiscordMessageReactionAdd {
  /** The id of the user */
  user_id: string;
  /** The id of the channel */
  channel_id: string;
  /** The id of the message */
  message_id: string;
  /** The id of the guild */
  guild_id?: string;
  /** The member who reacted if this happened in a guild */
  member?: DiscordMember;
  /** The emoji used to react */
  emoji: Partial<DiscordEmoji>;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove */
export type DiscordMessageReactionRemove = Omit<
  DiscordMessageReactionAdd,
  "member"
>;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all */
export type DiscordMessageReactionRemoveAll = Pick<
  DiscordMessageReactionAdd,
  "channel_id" | "message_id" | "guild_id"
>;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji */
export type DiscordMessageReactionRemoveEmoji = Pick<
  DiscordMessageReactionAdd,
  "channel_id" | "guild_id" | "message_id" | "emoji"
>;

/** https://discord.com/developers/docs/topics/gateway#presence-update */
export interface DiscordPresenceUpdate {
  /** The user presence is being updated for */
  user: DiscordUser;
  /** id of the guild */
  guild_id: string;
  /** Either "idle", "dnd", "online", or "offline" */
  status: "idle" | "dnd" | "online" | "offline";
  /** User's current activities */
  activities: DiscordActivity[];
  /** User's platform-dependent status */
  client_status: DiscordClientStatus;
}

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export interface DiscordClientStatus {
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string;
  /** The user's status set for an active mobile (iOS, Android) application session */
  mobile?: string;
  /** The user's status set for an active web (browser, bot account) application session */
  web?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface DiscordActivity {
  /** The activity's name */
  name: string;
  /** Activity type */
  type: DiscordActivityTypes;
  /** Stream url, is validated when type is 1 */
  url?: string | null;
  /** Unix timestamp of when the activity was added to the user's session */
  created_at: number;
  /** Unix timestamps for start and/or end of the game */
  timestamps?: DiscordActivityTimestamps;
  /** Application id for the game */
  application_id?: string;
  /** What the player is currently doing */
  details?: string | null;
  /** The user's current party status */
  state?: string | null;
  /** The emoji used for a custom status */
  emoji?: DiscordActivityEmoji | null;
  /** Information for the current party of the player */
  party?: DiscordActivityParty;
  /** Images for the presence and their hover texts */
  assets?: DiscordActivityAssets;
  /** Secrets for Rich Presence joining and spectating */
  secrets?: DiscordActivitySecrets;
  /** Whether or not the activity is an instanced game session */
  instance?: boolean;
  /** Activity flags `OR`d together, describes what the payload includes */
  flags?: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-types */
export enum DiscordActivityTypes {
  Game,
  Streaming,
  Listening,
  Custom = 4,
  Competing,
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export interface DiscordActivityTimestamps {
  /** Unix time (in milliseconds) of when the activity started */
  start?: number;
  /** Unix time (in milliseconds) of when the activity ends */
  end?: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface DiscordActivityEmoji {
  /** The name of the emoji */
  name: string;
  /** The id of the emoji */
  id?: string;
  /** Whether this emoji is animated */
  animated?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface DiscordActivityParty {
  /** The id of the party */
  id?: string;
  /** Used to show the party's current and maximum size */
  size?: [current_size: number, max_size: number];
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface DiscordActivityAssets {
  /** The id for a large asset of the activity, usually a snowflake */
  large_image?: string;
  /** Text displayed when hovering over the large image of the activity */
  large_text?: string;
  /** The id for a small asset of the activity, usually a snowflake */
  small_image?: string;
  /** Text displayed when hovering over the small image of the activity */
  small_text?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets */
export interface DiscordActivitySecrets {
  /** The secret for joining a party */
  join?: string;
  /** The secret for spectating a game */
  spectate?: string;
  /** The secret for a specific instanced match */
  match?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags */
export enum ActivityFlags {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
}

/** https://discord.com/developers/docs/topics/gateway#typing-start */
export interface DiscordTypingStart {
  /** id of the channel */
  channel_id: string;
  /** id of the guild */
  guild_id?: string;
  /** id of the user */
  user_id: string;
  /** Unix time (in seconds) of when the user started typing */
  timestamp: number;
  /** The member who started typing if this happened in a guild */
  member?: DiscordMember;
}

/** https://discord.com/developers/docs/topics/gateway#voice-server-update */
export interface DiscordVoiceServerUpdate {
  /** Voice connection token */
  token: string;
  /** The guild this voice server update is for */
  guild_id: string;
  /** The voice server host */
  endpoint: string;
}

/** https://discord.com/developers/docs/topics/gateway#webhooks-update */
export interface DiscordWebhooksUpdate {
  /** id of the guild */
  guild_id: string;
  /** id of the channel */
  channel_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#commands */
export type DiscordApplicationCommandCreateUpdateDelete =
  & DiscordApplicationCommand
  & {
    /** id of the guild the command is in */
    guild_id: string;
  };

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
