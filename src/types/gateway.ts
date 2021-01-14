import { ChannelPayload, MessagePayload } from "./channel.ts";
import { EmojiPayload } from "./emoji.ts";
import {
  GuildMemberPayload,
  GuildPayload,
  UnavailableGuildPayload,
} from "./guild.ts";
import { InteractionPayload } from "./interaction.ts";
import { ApplicationPayload } from "./oauth2.ts";
import { GatewayOpcodes } from "./opcodes_status_codes.ts";
import { RolePayload } from "./permissions.ts";
import { UserPayload } from "./user.ts";
import { VoiceStateUpdateEventPayload } from "./voice.ts";

/** https://discord.com/developers/docs/topics/gateway#payloads */
export interface GatewayPayload {
  /** opcode for the payload */
  op: GatewayOpcodes;
  /** event data */
  d: GatewayPayloadDTypes;
  /** sequence number, used for resuming sessions and heartbeats */
  s: number | null;
  /** the event name for this payload */
  t: GatewayPayloadTTypes;
}

/** GatewayPayload event data type list */
export type GatewayPayloadDTypes =
  | HelloEventPayload
  | ReadyEventPayload
  | ResumePayload
  | InvalidSession
  | ChannelPayload
  | ChannelPinsUpdateEventPayload
  | GuildPayload
  | UnavailableGuildPayload
  | GuildBanAddEventPayload
  | GuildBanRemoveEventPayload
  | GuildEmojisUpdateEventPayload
  | GuildIntegrationsUpdateEventPayload
  | GuildMemberPayload
  | GuildMemberPayload & GuildMemberAddExtraPayload
  | GuildMemberRemoveEventPayload
  | GuildMemberUpdateEventPayload
  | GuildMembersChunkEventPayload
  | GuildRoleCreateEventPayload
  | GuildRoleUpdateEventPayload
  | GuildRoleDeleteEventPayload
  | InviteCreateEventPayload
  | InviteDeleteEventPayload
  | MessagePayload
  | MessageDeleteEventPayload
  | MessageDeleteBulkEventPayload
  | MessageReactionAddEventPayload
  | MessageReactionRemoveEventPayload
  | MessageReactionRemoveAllEventPayload
  | MessageReactionRemoveEmojiPayload
  | PresenceUpdateEventPayload
  | TypingStartEventPayload
  | UserPayload
  | VoiceStateUpdateEventPayload
  | VoiceServerUpdateEventPayload
  | WebhooksUpdateEventPayload
  | InteractionPayload
  | null;

/** GatewayPayload event name list */
export type GatewayPayloadTTypes =
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
export interface GatewayURLParams {
  /** gateway Version to use */
  v: number;
  /** the encoding of recieved gateway packets */
  encoding: string;
  /** the (optional) compression of gateway packets */
  compress?: string;
}

/** https://discord.com/developers/docs/topics/gateway#gateway-intents */
export enum GatewayIntents {
  GUILDS = 1 << 0,
  GUILD_MEMBERS = 1 << 1,
  GUILD_BANS = 1 << 2,
  GUILD_EMOJIS = 1 << 3,
  GUILD_INTEGRATIONS = 1 << 4,
  GUILD_WEBHOOKS = 1 << 5,
  GUILD_INVITES = 1 << 6,
  GUILD_VOICE_STATES = 1 << 7,
  GUILD_PRESENCES = 1 << 8,
  GUILD_MESSAGES = 1 << 9,
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  GUILD_MESSAGE_TYPING = 1 << 11,
  DIRECT_MESSAGES = 1 << 12,
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  DIRECT_MESSAGE_TYPING = 1 << 14,
}

/** https://discord.com/developers/docs/topics/gateway#identify */
export interface IdentifyPayload {
  /** authentication token */
  token: string;
  /** connection properties */
  properties: IdentifyConnectionProps;
  /** whether this connection supports compression of packets, default: false */
  compress?: boolean;
  /** value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list, default: 50 */
  large_threshold?: number;
  /** used for Guild Sharding */
  shard: [number, number];
  /** presence structure for initial presence information */
  presence?: UpdateStatusPayload;
  /** enables dispatching of guild subscription events (presence and typing events), default: true */
  guild_subscriptions?: boolean;
  /** the Gateway Intents you wish to receive */
  intents: number;
}

/** https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties */
export interface IdentifyConnectionProps {
  /** your operating system */
  $os: string;
  /** your library name */
  $browser: string;
  /** your library name */
  $device: string;
}

/** https://discord.com/developers/docs/topics/gateway#resume */
export interface ResumePayload {
  /** session token */
  token: string;
  /** session id */
  session_id: string;
  /** last sequence number received */
  seq: number;
}

/** https://discord.com/developers/docs/topics/gateway#heartbeat */
export type HeartbeatPayload = number;

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface RequestGuildMembersPayload {
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
export interface UpdateVoiceStatePayload {
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
export interface UpdateStatusPayload {
  /** unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null;
  /** null, or the user's activities */
  activities: ActivityPayload[];
  /** the user's new status */
  status: StatusTypes;
  /** whether or not the client is afk */
  afk: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-status-status-types */
export enum StatusTypes {
  ONLINE = "online",
  DND = "dnd",
  IDLE = "idle",
  INVISIBLE = "invisible",
  OFFLINE = "offline",
}

/** https://discord.com/developers/docs/topics/gateway#hello */
export interface HelloEventPayload {
  /** the interval (in milliseconds) the client should heartbeat with */
  heartbeat_interval: number;
}

/** https://discord.com/developers/docs/topics/gateway#ready */
export interface ReadyEventPayload {
  /** gateway version */
  v: number;
  /** information about the user including email */
  user: UserPayload;
  /** empty array */
  private_channels: [];
  /** the guilds the user is in */
  guilds: UnavailableGuildPayload[];
  /** used for resuming connections */
  session_id: string;
  /** the shard information associated with this session, if sent when identifying */
  shard?: [number, number];
  /** contains id and flags */
  application: Partial<ApplicationPayload>;
}

/** https://discord.com/developers/docs/topics/gateway#invalid-session */
export type InvalidSession = boolean;

/** https://discord.com/developers/docs/topics/gateway#channel-pins-update-channel-pins-update-event-fields */
export interface ChannelPinsUpdateEventPayload {
  /** the id of the guild */
  guild_id?: string;
  /** the id of the channel */
  channel_id: string;
  /** the time at which the most recent pinned message was pinned */
  last_pin_timestamp?: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add-guild-ban-add-event-fields */
export interface GuildBanAddEventPayload {
  /** id of the guild */
  guild_id: string;
  /** the banned user */
  user: UserPayload;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-remove-guild-ban-remove-event-fields */
export interface GuildBanRemoveEventPayload {
  /** id of the guild */
  guild_id: string;
  /** the unbanned user */
  user: UserPayload;
}

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update-guild-emojis-update-event-fields */
export interface GuildEmojisUpdateEventPayload {
  /** id of the guild */
  guild_id: string;
  /** array of emojis */
  emojis: EmojiPayload[];
}

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update-guild-integrations-update-event-fields */
export interface GuildIntegrationsUpdateEventPayload {
  /** id of the guild whose integrations were updated */
  guild_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-add-guild-member-add-extra-fields */
export interface GuildMemberAddExtraPayload extends GuildMemberPayload {
  /** id of the guild */
  guild_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove-guild-member-remove-event-fields */
export interface GuildMemberRemoveEventPayload {
  /** the id of the guild */
  guild_id: string;
  /** the user who was removed */
  user: UserPayload;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-update-guild-member-update-event-fields */
export interface GuildMemberUpdateEventPayload {
  /** the id of the guild */
  guild_id: string;
  /** user role ids */
  roles: string[];
  /** the user */
  user: UserPayload;
  /** nickname of the user in the guild */
  nick?: string | null;
  /** when the user joined the guild */
  joied_at: string;
  /** when the user starting boosting the guild */
  premium_since?: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#guild-members-chunk-guild-members-chunk-event-fields */
export interface GuildMembersChunkEventPayload {
  /** the id of the guild */
  guild_id: string;
  /** set of guild members */
  members: GuildMemberPayload[];
  /** the chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count) */
  chunk_index: number;
  /** the total number of expected chunks for this response */
  chunk_count: number;
  /** if passing an invalid id to REQUEST_GUILD_MEMBERS, it will be returned here */
  not_found?: [];
  /** if passing true REQUEST_GUILD_MEMBERS, presences of the returned members will be here */
  presences?: PresenceUpdateEventPayload[];
  /** the nonce used in the Guild Members Request */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-create-guild-role-create-event-fields */
export interface GuildRoleCreateEventPayload {
  /** the id of the guild */
  guild_id: string;
  /** the role created */
  role: RolePayload;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-update-guild-role-update-event-fields */
export interface GuildRoleUpdateEventPayload {
  /** the id of the guild */
  guild_id: string;
  /** the role updated */
  role: RolePayload;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-delete-guild-role-delete-event-fields */
export interface GuildRoleDeleteEventPayload {
  /** id of the guild */
  guild_id: string;
  /** id of the role */
  role_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#invite-create-invite-create-event-fields */
export interface InviteCreateEventPayload {
  /** the channel the invite is for */
  channel_id: string;
  /** the unique invite code */
  code: string;
  /** the time at which the invite was created */
  created_at: string;
  /** the guild of the invite */
  guild_id?: string;
  /** the user that created the invite */
  inviter?: UserPayload;
  /** how long the invite is valid for (in seconds) */
  max_age: number;
  /** the maximum number of times the invite can be used */
  max_uses: number;
  /** the target user for this invite */
  target_user?: Partial<UserPayload>;
  /** the type of user target for this invite */
  target_user_type?: number;
  /** whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean;
  /** how many times the invite has been used (always will be 0) */
  uses: number;
}

/** https://discord.com/developers/docs/topics/gateway#invite-delete-invite-delete-event-fields */
export interface InviteDeleteEventPayload {
  /** the channel of the invite */
  channel_id: string;
  /** the guild of the invite */
  guild_id?: string;
  /** the unique invite code */
  code: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-message-delete-event-fields */
export interface MessageDeleteEventPayload {
  /** the id of the message */
  id: string;
  /** the id of the channel */
  channel_id: string;
  /** the id of the guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk-message-delete-bulk-event-fields */
export interface MessageDeleteBulkEventPayload {
  /** the ids of the messages */
  ids: string[];
  /** the id of the channel */
  channel_id: string;
  /** the id of the guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add-message-reaction-add-event-fields */
export interface MessageReactionAddEventPayload {
  /** the id of the user */
  user_id: string;
  /** the id of the channel */
  channel_id: string;
  /** the id of the message */
  message_id: string;
  /** the id of the guild */
  guild_id?: string;
  /** the member who reacted if this happened in a guild */
  member?: GuildMemberPayload;
  /** the emoji used to react */
  emoji: Partial<EmojiPayload>;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-message-reaction-remove-event-fields */
export interface MessageReactionRemoveEventPayload {
  /** the id of the user */
  user_id: string;
  /** the id of the channel */
  channel_id: string;
  /** the id of the message */
  message_id: string;
  /** the id of the guild */
  guild_id?: string;
  /** the emoji used to react */
  emoji: Partial<EmojiPayload>;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface MessageReactionRemoveAllEventPayload {
  /** the id of the channel */
  channel_id: string;
  /** the id of the message */
  message_id: string;
  /** the id of the guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji-message-reaction-remove-emoji */
export interface MessageReactionRemoveEmojiPayload {
  /** the id of the channel */
  channel_id: string;
  /** the id of the guild */
  guild_id?: string;
  /** the id of the message */
  message_id: string;
  /** the emoji that was removed */
  emoji: Partial<EmojiPayload>;
}

/** https://discord.com/developers/docs/topics/gateway#presence-update-presence-update-event-fields */
export interface PresenceUpdateEventPayload {
  /** the user presence is being updated for */
  user: UserPayload;
  /** id of the guild */
  guild_id: string;
  /** either "idle", "dnd", "online", or "offline" */
  status: StatusTypes;
  /** user's current activities */
  activities: ActivityPayload[];
  /** user's platform-dependent status */
  client_status: ClientStatusPayload;
}

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export interface ClientStatusPayload {
  /** the user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string;
  /** the user's status set for an active mobile (iOS, Android) application session */
  mobile?: string;
  /** the user's status set for an active web (browser, bot account) application session */
  web?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface ActivityPayload {
  /** the activity's id */
  id?: string;
  /** the activity's name */
  name: string;
  /** activity type */
  type: ActivityTypes;
  /** stream url, is validated when type is 1 */
  url?: string | null;
  /** unix timestamp of when the activity was added to the user's session */
  created_at: number;
  /** unix timestamps for start and/or end of the game */
  timestamps?: ActivityTimestampsPayload;
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
  emoji?: ActivityEmojiPayload | null;
  /** the id of the game or Spotify session */
  session_id?: string;
  /** information for the current party of the player */
  party?: ActivityPartyPayload;
  /** images for the presence and their hover texts */
  assets?: ActivityAssetsPayload;
  /** secrets for Rich Presence joining and spectating */
  secrets?: ActivitySecretsPayload;
  /** whether or not the activity is an instanced game session */
  instance?: boolean;
  /** activity flags OR d together, describes what the payload includes */
  flags?: ActivityFlags;
  /** the custom buttons shown in the Rich Presence (max 2) */
  buttons?: ActivityButton[];
}

export interface ActivityButton {
  /** the text shown on the button (1-32 characters) */
  label: string;
  /** the url opened when clicking the button (1-512 characters) */
  url: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-types */
export enum ActivityTypes {
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
export interface ActivityTimestampsPayload {
  /** unix time (in milliseconds) of when the activity started */
  start?: number;
  /** unix time (in milliseconds) of when the activity ends */
  end?: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface ActivityEmojiPayload {
  /** the name of the emoji */
  name: string;
  /** the id of the emoji */
  id?: string;
  /** whether this emoji is animated */
  animated?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface ActivityPartyPayload {
  /** the id of the party */
  id?: string;
  /** used to show the party's currrent and maximum size */
  size?: [number, number];
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface ActivityAssetsPayload {
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
export interface ActivitySecretsPayload {
  /** the secret for joining a party */
  join?: string;
  /** the secret for spectating a game */
  spectate?: string;
  /** the secret for a specific instanced match */
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

/** https://discord.com/developers/docs/topics/gateway#typing-start-typing-start-event-fields */
export interface TypingStartEventPayload {
  /** id of the channel */
  channel_id: string;
  /** id of the guild */
  guild_id?: string;
  /** id of the user */
  user_id: string;
  /** unix time (in seconds) of when the user started typing */
  timestamp: number;
  /** the member who started typing if this happened in a guild */
  member?: GuildMemberPayload;
}

/** https://discord.com/developers/docs/topics/gateway#voice-server-update-voice-server-update-event-fields */
export interface VoiceServerUpdateEventPayload {
  /** voice connection token */
  token: string;
  /** the guildd this voice server update is for */
  guild_id: string;
  /** the voice server host */
  endpoint: string;
}

/** https://discord.com/developers/docs/topics/gateway#webhooks-update-webhook-update-event-fields */
export interface WebhooksUpdateEventPayload {
  /** id of the guild */
  guild_id: string;
  /** id of the channel */
  channel_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot-json-response */
export interface GetGatewayBotPayload {
  /** the WSS URL that can be used for connecting to the gateway */
  url: string;
  /** the recommended number of shards to use when connecting */
  shards: number;
  /** information on the current session start limit */
  session_start_limit: SessionStartLimitPayload;
}

/** https://discord.com/developers/docs/topics/gateway#session-start-limit-object-session-start-limit-structure */
export interface SessionStartLimitPayload {
  /** the total number of session starts the current user is allowed */
  total: number;
  /** the remaining number of session starts the current user is allowed */
  remaining: number;
  /** the number of milliseconds after which the limit resets */
  reset_after: number;
  /** the number of identify requests allowed per 5 seconds */
  max_concurrency: number;
}
