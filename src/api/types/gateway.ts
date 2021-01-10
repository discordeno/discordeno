import { GatewayOpcodes, UnavailableGuildPayload } from "../../types/mod.ts";
import { Channel, Message } from "./channel.ts";
import { Emoji } from "./emoji.ts";
import { Guild, GuildMember } from "./guild.ts";
import { Interaction } from "./interaction.ts";
import { Application } from "./oauth2.ts";
import { Role } from "./permissions.ts";
import { User } from "./user.ts";
import { VoiceStateUpdateEvent } from "./voice.ts";

/** https://discord.com/developers/docs/topics/gateway#payloads */
export interface Gateway {
  /** opcode for the payload */
  op: GatewayOpcodes;
  /** event data */
  d: GatewayDTypes;
  /** sequence number, used for resuming sessions and heartbeats */
  s: number | null;
  /** the event name for this payload */
  t: GatewayTTypes;
}

/** Gateway event data type list */
export type GatewayDTypes =
  | Hello
  | ReadyEventFields
  | Resume
  | InvalidSession
  | Channel
  | ChannelPinsUpdateEvent
  | Guild
  | UnavailableGuildPayload
  | GuildBanAddEvent
  | GuildBanRemoveEvent
  | GuildEmojisUpdateEvent
  | GuildIntegrationsUpdateEvent
  | GuildMember
  | GuildMember & GuildMemberAddExtra
  | GuildMemberRemoveEvent
  | GuildMemberUpdateEvent
  | GuildMembersChunkEvent
  | GuildRoleCreateEvent
  | GuildRoleUpdateEvent
  | GuildRoleDeleteEvent
  | InviteCreateEvent
  | InviteDeleteEvent
  | Message
  | MessageDeleteEvent
  | MessageDeleteBulkEvent
  | MessageReactionAddEvent
  | MessageReactionRemoveEvent
  | MessageReactionRemoveAllEvent
  | MessageReactionRemoveEmoji
  | PresenceUpdateEvent
  | TypingStartEvent
  | User
  | VoiceStateUpdateEvent
  | VoiceServerUpdateEvent
  | WebhookUpdateEvent
  | Interaction
  | null;

/** Gateway event name list */
export type GatewayTTypes =
  | "HELLO"
  | "READY"
  | "RESUMED"
  | "RECONNECT"
  | "INVALIDSESSION"
  | "CHANNELCREATE"
  | "CHANNELUPDATE"
  | "CHANNELDELETE"
  | "CHANNELPINSUPDATE"
  | "GUILDCREATE"
  | "GUILDUPDATE"
  | "GUILDDELETE"
  | "GUILDBANADD"
  | "GUILDBANREMOVE"
  | "GUILDEMOJISUPDATE"
  | "GUILDINTEGRATIONSUPDATE"
  | "GUILDMEMBERADD"
  | "GUILDMEMBERREMOVE"
  | "GUILDMEMBERUPDATE"
  | "GUILDMEMBERSCHUNK"
  | "GUILDROLECREATE"
  | "GUILDROLEUPDATE"
  | "GUILDROLEDELETE"
  | "INVITECREATE"
  | "INVITEDELETE"
  | "MESSAGECREATE"
  | "MESSAGEUPDATE"
  | "MESSAGEDELETE"
  | "MESSAGEDELETEBULK"
  | "MESSAGEREACTIONADD"
  | "MESSAGEREACTIONREMOVE"
  | "MESSAGEREACTIONREMOVEALL"
  | "MESSAGEREACTIONREMOVEEMOJI"
  | "PRESENCEUPDATE"
  | "TYPINGSTART"
  | "USERUPDATE"
  | "VOICESTATEUPDATE"
  | "VOICESERVERUPDATE"
  | "WEBHOOKSUPDATE"
  | "INTERACTIONCREATE"
  // Not in DC documentation
  | "APPLICATIONCOMMANDCREATE"
  | null;

/** https://discord.com/developers/docs/topics/gateway#connecting-to-the-gateway */
export interface GatewayUrlOptions {
  /** gateway Version to use */
  v: number;
  /** the encoding of recieved gateway packets */
  encoding: string;
  /** the (optional) compression of gateway packets */
  compress?: string;
}

/** https://discord.com/developers/docs/topics/gateway#gateway-intents */
export type GatewayIntent =
  | "GUILDS"
  | "GUILDMEMBERS"
  | "GUILDBANS"
  | "GUILDEMOJIS"
  | "GUILDINTEGRATIONS"
  | "GUILDWEBHOOKS"
  | "GUILDINVITES"
  | "GUILDVOICESTATES"
  | "GUILDPRESENCES"
  | "GUILDMESSAGES"
  | "GUILDMESSAGEREACTIONS"
  | "GUILDMESSAGETYPING"
  | "DIRECTMESSAGES"
  | "DIRECTMESSAGEREACTIONS"
  | "DIRECTMESSAGETYPING";

/** https://discord.com/developers/docs/topics/gateway#identify */
export interface Identify {
  /** authentication token */
  token: string;
  /** connection properties */
  properties: IdentifyConnectionProps;
  /** whether this connection supports compression of packets, default: false */
  compress?: boolean;
  /** value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list, default: 50 */
  largeThreshold?: number;
  /** used for Guild Sharding */
  shard?: [number, number];
  /** presence structure for initial presence information */
  presence?: UpdateStatus;
  /** enables dispatching of guild subscription events (presence and typing events), default: true */
  guildSubscriptions?: boolean;
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
export interface Resume {
  /** session token */
  token: string;
  /** session id */
  sessionID: string;
  /** last sequence number received */
  seq: number;
}

/** https://discord.com/developers/docs/topics/gateway#heartbeat */
export type Heartbeat = number;

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface RequestGuildMembers {
  /** id of the guild to get members for */
  guildID: string;
  /** string that username starts with, or an empty string to return all members */
  query?: string;
  /** maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number;
  /** used to specify if we want the presence of the matched members */
  presences?: boolean;
  /** used to specify which users you wish to fetch */
  userIDs?: string | string[];
  /** nonce to identify the Guild Members Chunk response */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface UpdateVoiceState {
  /** id of the guild */
  guildID: string;
  /** id of the voice channel client wants to join (null if disconnecting) */
  channelID: string | null;
  /** is the client muted */
  selfMute: boolean;
  /** is the client deafened */
  selfDeaf: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-status */
export interface UpdateStatus {
  /** unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null;
  /** null, or the user's activities */
  activities: Activity[];
  /** the user's new status */
  status: StatusType;
  /** whether or not the client is afk */
  afk: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-status-status-types */
export type StatusType =
  | "ONLINE"
  | "DND"
  | "IDLE"
  | "INVISIBLE"
  | "OFFLINE";

/** https://discord.com/developers/docs/topics/gateway#hello */
export interface Hello {
  /** the interval (in milliseconds) the client should heartbeat with */
  heartbeatInterval: number;
}

/** https://discord.com/developers/docs/topics/gateway#ready */
export interface ReadyEventFields {
  /** gateway version */
  v: number;
  /** information about the user including email */
  user: User;
  /** empty array */
  privateChannels: [];
  /** the guilds the user is in */
  guilds: UnavailableGuildPayload[];
  /** used for resuming connections */
  sessionID: string;
  /** the shard information associated with this session, if sent when identifying */
  shard?: [number, number];
  /** contains id and flags */
  application: Partial<Application>;
}

/** https://discord.com/developers/docs/topics/gateway#invalid-session */
export type InvalidSession = boolean;

/** https://discord.com/developers/docs/topics/gateway#channel-pins-update-channel-pins-update-event-fields */
export interface ChannelPinsUpdateEvent {
  /** the id of the guild */
  guildID?: string;
  /** the id of the channel */
  channelID: string;
  /** the time at which the most recent pinned message was pinned */
  lastPinTimestamp?: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add-guild-ban-add-event-fields */
export interface GuildBanAddEvent {
  /** id of the guild */
  guildID: string;
  /** the banned user */
  user: User;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-remove-guild-ban-remove-event-fields */
export interface GuildBanRemoveEvent {
  /** id of the guild */
  guildID: string;
  /** the unbanned user */
  user: User;
}

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update-guild-emojis-update-event-fields */
export interface GuildEmojisUpdateEvent {
  /** id of the guild */
  guildID: string;
  /** array of emojis */
  emojis: Emoji[];
}

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update-guild-integrations-update-event-fields */
export interface GuildIntegrationsUpdateEvent {
  /** id of the guild whose integrations were updated */
  guildID: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-add-guild-member-add-extra-fields */
export interface GuildMemberAddExtra {
  /** id of the guild */
  guildID: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove-guild-member-remove-event-fields */
export interface GuildMemberRemoveEvent {
  /** the id of the guild */
  guildID: string;
  /** the user who was removed */
  user: User;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-update-guild-member-update-event-fields */
export interface GuildMemberUpdateEvent {
  /** the id of the guild */
  guildID: string;
  /** user role ids */
  roles: string[];
  /** the user */
  user: User;
  /** nickname of the user in the guild */
  nick?: string | null;
  /** when the user joined the guild */
  joiedAt: string;
  /** when the user starting boosting the guild */
  premiumSince?: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#guild-members-chunk-guild-members-chunk-event-fields */
export interface GuildMembersChunkEvent {
  /** the id of the guild */
  guildID: string;
  /** set of guild members */
  members: GuildMember[];
  /** the chunk index in the expected chunks for this response (0 <= chunkIndex < chunkCount) */
  chunkIndex: number;
  /** the total number of expected chunks for this response */
  chunkCount: number;
  /** if passing an invalid id to REQUESTGUILDMEMBERS, it will be returned here */
  notFound?: [];
  /** if passing true REQUESTGUILDMEMBERS, presences of the returned members will be here */
  presences?: PresenceUpdateEvent[];
  /** the nonce used in the Guild Members Request */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-create-guild-role-create-event-fields */
export interface GuildRoleCreateEvent {
  /** the id of the guild */
  guildID: string;
  /** the role created */
  role: Role;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-update-guild-role-update-event-fields */
export interface GuildRoleUpdateEvent {
  /** the id of the guild */
  guildID: string;
  /** the role updated */
  role: Role;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-delete-guild-role-delete-event-fields */
export interface GuildRoleDeleteEvent {
  /** id of the guild */
  guildID: string;
  /** id of the role */
  roleID: string;
}

/** https://discord.com/developers/docs/topics/gateway#invite-create-invite-create-event-fields */
export interface InviteCreateEvent {
  /** the channel the invite is for */
  channelID: string;
  /** the unique invite code */
  code: string;
  /** the time at which the invite was created */
  createdAt: string;
  /** the guild of the invite */
  guildID?: string;
  /** the user that created the invite */
  inviter?: User;
  /** how long the invite is valid for (in seconds) */
  maxAge: number;
  /** the maximum number of times the invite can be used */
  maxUses: number;
  /** the target user for this invite */
  targetUser?: Partial<User>;
  /** the type of user target for this invite */
  targetUserType?: number;
  /** whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean;
  /** how many times the invite has been used (always will be 0) */
  uses: number;
}

/** https://discord.com/developers/docs/topics/gateway#invite-delete-invite-delete-event-fields */
export interface InviteDeleteEvent {
  /** the channel of the invite */
  channelID: string;
  /** the guild of the invite */
  guildID?: string;
  /** the unique invite code */
  code: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-message-delete-event-fields */
export interface MessageDeleteEvent {
  /** the id of the message */
  id: string;
  /** the id of the channel */
  channelID: string;
  /** the id of the guild */
  guildID?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk-message-delete-bulk-event-fields */
export interface MessageDeleteBulkEvent {
  /** the ids of the messages */
  ids: string[];
  /** the id of the channel */
  channelID: string;
  /** the id of the guild */
  guildID?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add-message-reaction-add-event-fields */
export interface MessageReactionAddEvent {
  /** the id of the user */
  userID: string;
  /** the id of the channel */
  channelID: string;
  /** the id of the message */
  messageID: string;
  /** the id of the guild */
  guildID?: string;
  /** the member who reacted if this happened in a guild */
  member?: GuildMember;
  /** the emoji used to react */
  emoji: Partial<Emoji>;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-message-reaction-remove-event-fields */
export interface MessageReactionRemoveEvent {
  /** the id of the user */
  userID: string;
  /** the id of the channel */
  channelID: string;
  /** the id of the message */
  messageID: string;
  /** the id of the guild */
  guildID?: string;
  /** the emoji used to react */
  emoji: Partial<Emoji>;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface MessageReactionRemoveAllEvent {
  /** the id of the channel */
  channelID: string;
  /** the id of the message */
  messageID: string;
  /** the id of the guild */
  guildID?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji-message-reaction-remove-emoji */
export interface MessageReactionRemoveEmoji {
  /** the id of the channel */
  channelID: string;
  /** the id of the guild */
  guildID?: string;
  /** the id of the message */
  messageID: string;
  /** the emoji that was removed */
  emoji: Partial<Emoji>;
}

/** https://discord.com/developers/docs/topics/gateway#presence-update-presence-update-event-fields */
export interface PresenceUpdateEvent {
  /** the user presence is being updated for */
  user: User;
  /** id of the guild */
  guildID: string;
  /** either "idle", "dnd", "online", or "offline" */
  status: StatusType;
  /** user's current activities */
  activities: Activity[];
  /** user's platform-dependent status */
  clientStatus: ClientStatus;
}

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export interface ClientStatus {
  /** the user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string;
  /** the user's status set for an active mobile (iOS, Android) application session */
  mobile?: string;
  /** the user's status set for an active web (browser, bot account) application session */
  web?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface Activity {
  /** the activity's id */
  id?: string;
  /** the activity's name */
  name: string;
  /** activity type */
  type: ActivityType;
  /** stream url, is validated when type is 1 */
  url?: string | null;
  /** unix timestamp of when the activity was added to the user's session */
  createdAt: number;
  /** unix timestamps for start and/or end of the game */
  timestamps?: ActivityTimestamps;
  /** the id of the song on Spotify */
  syncID?: string;
  /** the platform the game is being played on ("desktop", "samsung", or "xbox") */
  platform?: string;
  /** application id for the game */
  applicationID?: string;
  /** what the player is currently doing */
  details?: string | null;
  /** the user's current party status */
  state?: string | null;
  /** the emoji used for a custom status */
  emoji?: ActivityEmoji | null;
  /** the id of the game or Spotify session */
  sessionID?: string;
  /** information for the current party of the player */
  party?: ActivityParty;
  /** images for the presence and their hover texts */
  assets?: ActivityAssets;
  /** secrets for Rich Presence joining and spectating */
  secrets?: ActivitySecrets;
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
export type ActivityType =
  | "GAME"
  | "STREAMING"
  | "LISTENING"
  | "CUSTOM"
  | "COMPETING";

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export interface ActivityTimestamps {
  /** unix time (in milliseconds) of when the activity started */
  start?: number;
  /** unix time (in milliseconds) of when the activity ends */
  end?: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface ActivityEmoji {
  /** the name of the emoji */
  name: string;
  /** the id of the emoji */
  id?: string;
  /** whether this emoji is animated */
  animated?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface ActivityParty {
  /** the id of the party */
  id?: string;
  /** used to show the party's currrent and maximum size */
  size?: [number, number];
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface ActivityAssets {
  /** the id for a large asset of the activity, usually a snowflake */
  largeImage?: string;
  /** text displayed when hovering over the large image of the activity */
  largeText?: string;
  /** the id for a small asset of the activity, usually a snowflake */
  smallImage?: string;
  /** text displlayed when hovering over the small image of the activity */
  smallText?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets */
export interface ActivitySecrets {
  /** the secret for joining a party */
  join?: string;
  /** the secret for spectating a game */
  spectate?: string;
  /** the secret for a specific instanced match */
  match?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags */
export type ActivityFlags =
  | "INSTANCE"
  | "JOIN"
  | "SPECTATE"
  | "JOINREQUEST"
  | "SYNC"
  | "PLAY";

/** https://discord.com/developers/docs/topics/gateway#typing-start-typing-start-event-fields */
export interface TypingStartEvent {
  /** id of the channel */
  channelID: string;
  /** id of the guild */
  guildID?: string;
  /** id of the user */
  userID: string;
  /** unix time (in seconds) of when the user started typing */
  timestamp: number;
  /** the member who started typing if this happened in a guild */
  member?: GuildMember;
}

/** https://discord.com/developers/docs/topics/gateway#voice-server-update-voice-server-update-event-fields */
export interface VoiceServerUpdateEvent {
  /** voice connection token */
  token: string;
  /** the guildd this voice server update is for */
  guildID: string;
  /** the voice server host */
  endpoint: string;
}

/** https://discord.com/developers/docs/topics/gateway#webhooks-update-webhook-update-event-fields */
export interface WebhookUpdateEvent {
  /** id of the guild */
  guildID: string;
  /** id of the channel */
  channelID: string;
}

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot-json-response */
export interface GetGatewayBot {
  /** the WSS URL that can be used for connecting to the gateway */
  url: string;
  /** the recommended number of shards to use when connecting */
  shards: number;
  /** information on the current session start limit */
  sessionStartLimit: SessionStartLimit;
}

/** https://discord.com/developers/docs/topics/gateway#session-start-limit-object-session-start-limit-structure */
export interface SessionStartLimit {
  /** the total number of session starts the current user is allowed */
  total: number;
  /** the remaining number of session starts the current user is allowed */
  remaining: number;
  /** the number of milliseconds after which the limit resets */
  resetAfter: number;
  /** the number of identify requests allowed per 5 seconds */
  maxConcurrency: number;
}
