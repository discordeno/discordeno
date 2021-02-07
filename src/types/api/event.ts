import { DiscordUser, DiscordMember, DiscordRole, DiscordEmoji, DiscordActivity, DiscordClientStatus, DiscordStatusTypes, DiscordUnavailableGuild, DiscordIntegration, DiscordApplication } from "./mod.ts";

/** https://discord.com/developers/docs/topics/gateway#hello */
export interface DiscordHelloEvent {
  /** the interval (in milliseconds) the client should heartbeat with */
  heartbeat_interval: number;
}

/** https://discord.com/developers/docs/topics/gateway#ready */
export interface DiscordReadyEvent {
  /** gateway version */
  v: number;
  /** information about the user including email */
  user: DiscordUser;
  /** empty array */
  private_channels: [];
  /** the guilds the user is in */
  guilds: DiscordUnavailableGuild[];
  /** used for resuming connections */
  session_id: string;
  /** the shard information associated with this session, if sent when identifying */
  shard?: [number, number];
  /** contains id and flags */
  application: Pick<DiscordApplication, "id" | "flags">;
}

/** https://discord.com/developers/docs/topics/gateway#channel-pins-update-channel-pins-update-event-fields */
export interface DiscordChannelPinsUpdateEvent {
  /** the id of the guild */
  guild_id?: string;
  /** the id of the channel */
  channel_id: string;
  /** the time at which the most recent pinned message was pinned */
  last_pin_timestamp?: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add-guild-ban-add-event-fields */
export interface DiscordGuildBanAddEvent {
  /** id of the guild */
  guild_id: string;
  /** the banned user */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-remove-guild-ban-remove-event-fields */
export interface DiscordGuildBanRemoveEvent {
  /** id of the guild */
  guild_id: string;
  /** the unbanned user */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update-guild-emojis-update-event-fields */
export interface DiscordGuildEmojisUpdateEvent {
  /** id of the guild */
  guild_id: string;
  /** array of emojis */
  emojis: DiscordEmoji[];
}

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update-guild-integrations-update-event-fields */
export interface DiscordGuildIntegrationsUpdateEvent {
  /** id of the guild whose integrations were updated */
  guild_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-add-guild-member-add-extra-fields */
export interface DiscordGuildMemberAddExtra extends DiscordMember {
  /** id of the guild */
  guild_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove-guild-member-remove-event-fields */
export interface DiscordGuildMemberRemoveEvent {
  /** the id of the guild */
  guild_id: string;
  /** the user who was removed */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-update-guild-member-update-event-fields */
export interface DiscordGuildMemberUpdateEvent {
  /** the id of the guild */
  guild_id: string;
  /** user role ids */
  roles: string[];
  /** the user */
  user: DiscordUser;
  /** nickname of the user in the guild */
  nick?: string | null;
  /** when the user joined the guild */
  joied_at: string;
  /** when the user starting boosting the guild */
  premium_since?: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#guild-members-chunk-guild-members-chunk-event-fields */
export interface DiscordGuildMembersChunkEvent {
  /** the id of the guild */
  guild_id: string;
  /** set of guild members */
  members: DiscordMember[];
  /** the chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count) */
  chunk_index: number;
  /** the total number of expected chunks for this response */
  chunk_count: number;
  /** if passing an invalid id to REQUEST_GUILD_MEMBERS, it will be returned here */
  not_found?: [];
  /** if passing true REQUEST_GUILD_MEMBERS, presences of the returned members will be here */
  presences?: DiscordPresenceUpdateEvent[];
  /** the nonce used in the Guild Members Request */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-create-guild-role-create-event-fields */
export interface DiscordGuildRoleCreateEvent {
  /** the id of the guild */
  guild_id: string;
  /** the role created */
  role: DiscordRole;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-update-guild-role-update-event-fields */
export interface DiscordGuildRoleUpdateEvent {
  /** the id of the guild */
  guild_id: string;
  /** the role updated */
  role: DiscordRole;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-delete-guild-role-delete-event-fields */
export interface DiscordGuildRoleDeleteEvent {
  /** id of the guild */
  guild_id: string;
  /** id of the role */
  role_id: string;
}

// TODO: Add the documentation Link
export interface DiscordIntegrationCreate extends DiscordIntegration {
  /** id of the guild */
  guild_id: string;
}

export interface DiscordIntegrationUpdate extends DiscordIntegration {
  /** id of the guild */
  guild_id: string;
}

export interface DiscordIntegrationDelete {
  /** integration id */
  id: string;
  /** id of the guild */
  guild_id: string;
  /** id of the bot/OAuth2 application for this discordd integration */
  application_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#invite-create-invite-create-event-fields */
export interface DiscordInviteCreateEvent {
  /** the channel the invite is for */
  channel_id: string;
  /** the unique invite code */
  code: string;
  /** the time at which the invite was created */
  created_at: string;
  /** the guild of the invite */
  guild_id?: string;
  /** the user that created the invite */
  inviter?: DiscordUser;
  /** how long the invite is valid for (in seconds) */
  max_age: number;
  /** the maximum number of times the invite can be used */
  max_uses: number;
  /** the target user for this invite */
  target_user?: Partial<DiscordUser>;
  /** the type of user target for this invite */
  target_user_type?: number;
  /** whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean;
  /** how many times the invite has been used (always will be 0) */
  uses: number;
}

/** https://discord.com/developers/docs/topics/gateway#invite-delete-invite-delete-event-fields */
export interface DiscordInviteDeleteEvent {
  /** the channel of the invite */
  channel_id: string;
  /** the guild of the invite */
  guild_id?: string;
  /** the unique invite code */
  code: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-message-delete-event-fields */
export interface DiscordMessageDeleteEvent {
  /** the id of the message */
  id: string;
  /** the id of the channel */
  channel_id: string;
  /** the id of the guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk-message-delete-bulk-event-fields */
export interface DiscordMessageDeleteBulkEvent {
  /** the ids of the messages */
  ids: string[];
  /** the id of the channel */
  channel_id: string;
  /** the id of the guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add-message-reaction-add-event-fields */
export interface DiscordMessageReactionAddEvent {
  /** the id of the user */
  user_id: string;
  /** the id of the channel */
  channel_id: string;
  /** the id of the message */
  message_id: string;
  /** the id of the guild */
  guild_id?: string;
  /** the member who reacted if this happened in a guild */
  member?: DiscordMember;
  /** the emoji used to react */
  emoji: Partial<DiscordEmoji>;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-message-reaction-remove-event-fields */
export interface DiscordMessageReactionRemoveEvent {
  /** the id of the user */
  user_id: string;
  /** the id of the channel */
  channel_id: string;
  /** the id of the message */
  message_id: string;
  /** the id of the guild */
  guild_id?: string;
  /** the emoji used to react */
  emoji: Partial<DiscordEmoji>;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface DiscordMessageReactionRemoveAllEvent {
  /** the id of the channel */
  channel_id: string;
  /** the id of the message */
  message_id: string;
  /** the id of the guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji-message-reaction-remove-emoji */
export interface DiscordMessageReactionRemoveEmoji {
  /** the id of the channel */
  channel_id: string;
  /** the id of the guild */
  guild_id?: string;
  /** the id of the message */
  message_id: string;
  /** the emoji that was removed */
  emoji: Partial<DiscordEmoji>;
}

/** https://discord.com/developers/docs/topics/gateway#presence-update-presence-update-event-fields */
export interface DiscordPresenceUpdateEvent {
  /** the user presence is being updated for */
  user: DiscordUser;
  /** id of the guild */
  guild_id: string;
  /** either "idle", "dnd", "online", or "offline" */
  status: DiscordStatusTypes;
  /** user's current activities */
  activities: DiscordActivity[];
  /** user's platform-dependent status */
  client_status: DiscordClientStatus;
}

/** https://discord.com/developers/docs/topics/gateway#typing-start-typing-start-event-fields */
export interface DiscordTypingStartEvent {
  /** id of the channel */
  channel_id: string;
  /** id of the guild */
  guild_id?: string;
  /** id of the user */
  user_id: string;
  /** unix time (in seconds) of when the user started typing */
  timestamp: number;
  /** the member who started typing if this happened in a guild */
  member?: DiscordMember;
}

/** https://discord.com/developers/docs/topics/gateway#voice-server-update-voice-server-update-event-fields */
export interface DiscordVoiceServerUpdateEvent {
  /** voice connection token */
  token: string;
  /** the guildd this voice server update is for */
  guild_id: string;
  /** the voice server host */
  endpoint: string;
}

/** https://discord.com/developers/docs/topics/gateway#webhooks-update-webhook-update-event-fields */
export interface DiscordWebhooksUpdateEvent {
  /** id of the guild */
  guild_id: string;
  /** id of the channel */
  channel_id: string;
}

/** https://discord.com/developers/docs/resources/voice#voice-resource */
export interface DiscordVoiceStateUpdateEvent {
  /** the guild id this voice state is for */
  guildID?: string;
  /** the channel id this user is connected to */
  channelID: string;
  /** the user id this voice state is for */
  userID: string;
  /** the guild member this voice state is for */
  member?: DiscordMember;
  /** the session id for this voice state */
  sessionID: string;
  /** whether this user is deafened by the server */
  deaf: boolean;
  /** whether this user is muted by the server */
  mute: boolean;
  /** whether this user is locally deafened */
  self_deaf: boolean;
  /** whether this user is locally muted */
  selfMute: boolean;
  /** whether this user is streaming using "Go Live" */
  selfStream?: boolean;
  /** whether this user's camera is enabled */
  selfVideo: boolean;
  /** whether this user is muted by the current user */
  suppress: boolean;
}