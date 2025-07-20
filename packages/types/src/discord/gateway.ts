/**
 * Types for:
 *  - https://discord.com/developers/docs/events/gateway
 *  - https://discord.com/developers/docs/events/gateway-events
 */

import type { DiscordApplication } from './application.js'
import type { AutoModerationTriggerTypes, DiscordAutoModerationAction } from './autoModeration.js'
import type { DiscordChannel, DiscordThreadMember } from './channel.js'
import type { DiscordEmoji } from './emoji.js'
import type { DiscordIntegration, DiscordMember, DiscordMemberWithUser, DiscordUnavailableGuild } from './guild.js'
import type { DiscordScheduledEvent } from './guildScheduledEvent.js'
import type { TargetTypes } from './invite.js'
import type { DiscordReactionType } from './message.js'
import type { DiscordRole } from './permissions.js'
import type { DiscordSoundboardSound } from './soundboard.js'
import type { DiscordStageInstance } from './stageInstance.js'
import type { DiscordSticker } from './sticker.js'
import type { DiscordAvatarDecorationData, DiscordUser } from './user.js'
import type { DiscordVoiceState } from './voice.js'

/** https://discord.com/developers/docs/events/gateway#list-of-intents */
export enum GatewayIntents {
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
   * - THREAD_CREATE
   * - THREAD_UPDATE
   * - THREAD_DELETE
   * - THREAD_LIST_SYNC
   * - THREAD_MEMBER_UPDATE
   * - THREAD_MEMBERS_UPDATE
   * - STAGE_INSTANCE_CREATE
   * - STAGE_INSTANCE_UPDATE
   * - STAGE_INSTANCE_DELETE
   */
  Guilds = 1 << 0,
  /**
   * - GUILD_MEMBER_ADD
   * - GUILD_MEMBER_UPDATE
   * - GUILD_MEMBER_REMOVE
   * - THREAD_MEMBERS_UPDATE
   *
   * This is a privileged intent.
   */
  GuildMembers = 1 << 1,
  /**
   * - GUILD_AUDIT_LOG_ENTRY_CREATE
   * - GUILD_BAN_ADD
   * - GUILD_BAN_REMOVE
   */
  GuildModeration = 1 << 2,
  /**
   * - GUILD_EMOJIS_UPDATE
   * - GUILD_STICKERS_UPDATE
   * - GUILD_SOUNDBOARD_SOUND_CREATE
   * - GUILD_SOUNDBOARD_SOUND_UPDATE
   * - GUILD_SOUNDBOARD_SOUND_DELETE
   * - GUILD_SOUNDBOARD_SOUNDS_UPDATE
   */
  GuildExpressions = 1 << 3,
  /**
   * - GUILD_INTEGRATIONS_UPDATE
   * - INTEGRATION_CREATE
   * - INTEGRATION_UPDATE
   * - INTEGRATION_DELETE
   */
  GuildIntegrations = 1 << 4,
  /**
   * - WEBHOOKS_UPDATE
   */
  GuildWebhooks = 1 << 5,
  /**
   * - INVITE_CREATE
   * - INVITE_DELETE
   */
  GuildInvites = 1 << 6,
  /**
   * - VOICE_STATE_UPDATE
   * - VOICE_CHANNEL_EFFECT_SEND
   */
  GuildVoiceStates = 1 << 7,
  /**
   * - PRESENCE_UPDATE
   *
   * This is a privileged intent.
   */
  GuildPresences = 1 << 8,
  /**
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - MESSAGE_DELETE_BULK
   *
   * The messages do not contain content by default.
   * If you want to receive their content too, you need to turn on the privileged `MESSAGE_CONTENT` intent. */
  GuildMessages = 1 << 9,
  /**
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  GuildMessageReactions = 1 << 10,
  /**
   * - TYPING_START
   */
  GuildMessageTyping = 1 << 11,
  /**
   * - CHANNEL_CREATE
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - CHANNEL_PINS_UPDATE
   */
  DirectMessages = 1 << 12,
  /**
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  DirectMessageReactions = 1 << 13,
  /**
   * - TYPING_START
   */
  DirectMessageTyping = 1 << 14,
  /**
   * This intent will add all content related values to message events.
   *
   * This is a privileged intent.
   */
  MessageContent = 1 << 15,
  /**
   * - GUILD_SCHEDULED_EVENT_CREATE
   * - GUILD_SCHEDULED_EVENT_UPDATE
   * - GUILD_SCHEDULED_EVENT_DELETE
   * - GUILD_SCHEDULED_EVENT_USER_ADD this is experimental and unstable.
   * - GUILD_SCHEDULED_EVENT_USER_REMOVE this is experimental and unstable.
   */
  GuildScheduledEvents = 1 << 16,
  /**
   * - AUTO_MODERATION_RULE_CREATE
   * - AUTO_MODERATION_RULE_UPDATE
   * - AUTO_MODERATION_RULE_DELETE
   */
  AutoModerationConfiguration = 1 << 20,
  /**
   * - AUTO_MODERATION_ACTION_EXECUTION
   */
  AutoModerationExecution = 1 << 21,
  /**
   * - MESSAGE_POLL_VOTE_ADD
   * - MESSAGE_POLL_VOTE_REMOVE
   */
  GuildMessagePolls = 1 << 24,
  /**
   * - MESSAGE_POLL_VOTE_ADD
   * - MESSAGE_POLL_VOTE_REMOVE
   */
  DirectMessagePolls = 1 << 25,
}

export { GatewayIntents as Intents }

// TODO: Add TransportCompression: https://discord.com/developers/docs/events/gateway#transport-compression

/** https://discord.com/developers/docs/events/gateway#get-gateway-bot */
export interface DiscordGetGatewayBot {
  /** The WSS URL that can be used for connecting to the gateway */
  url: string
  /** The recommended number of shards to use when connecting */
  shards: number
  /** Information on the current session start limit */
  session_start_limit: DiscordSessionStartLimit
}

/** https://discord.com/developers/docs/events/gateway#session-start-limit-object */
export interface DiscordSessionStartLimit {
  /** The total number of session starts the current user is allowed */
  total: number
  /** The remaining number of session starts the current user is allowed */
  remaining: number
  /** The number of milliseconds after which the limit resets */
  reset_after: number
  /** The number of identify requests allowed per 5 seconds */
  max_concurrency: number
}

/** https://discord.com/developers/docs/events/gateway-events#receive-events */
export type GatewayDispatchEventNames =
  | 'READY'
  | 'RESUMED'
  | 'APPLICATION_COMMAND_PERMISSIONS_UPDATE'
  | 'AUTO_MODERATION_RULE_CREATE'
  | 'AUTO_MODERATION_RULE_UPDATE'
  | 'AUTO_MODERATION_RULE_DELETE'
  | 'AUTO_MODERATION_ACTION_EXECUTION'
  | 'CHANNEL_CREATE'
  | 'CHANNEL_UPDATE'
  | 'CHANNEL_DELETE'
  | 'CHANNEL_PINS_UPDATE'
  | 'THREAD_CREATE'
  | 'THREAD_UPDATE'
  | 'THREAD_DELETE'
  | 'THREAD_LIST_SYNC'
  | 'THREAD_MEMBER_UPDATE'
  | 'THREAD_MEMBERS_UPDATE'
  | 'GUILD_AUDIT_LOG_ENTRY_CREATE'
  | 'GUILD_CREATE'
  | 'GUILD_UPDATE'
  | 'GUILD_DELETE'
  | 'GUILD_BAN_ADD'
  | 'GUILD_BAN_REMOVE'
  | 'GUILD_EMOJIS_UPDATE'
  | 'GUILD_STICKERS_UPDATE'
  | 'GUILD_INTEGRATIONS_UPDATE'
  | 'GUILD_MEMBER_ADD'
  | 'GUILD_MEMBER_REMOVE'
  | 'GUILD_MEMBER_UPDATE'
  | 'GUILD_MEMBERS_CHUNK'
  | 'GUILD_ROLE_CREATE'
  | 'GUILD_ROLE_UPDATE'
  | 'GUILD_ROLE_DELETE'
  | 'GUILD_SCHEDULED_EVENT_CREATE'
  | 'GUILD_SCHEDULED_EVENT_UPDATE'
  | 'GUILD_SCHEDULED_EVENT_DELETE'
  | 'GUILD_SCHEDULED_EVENT_USER_ADD'
  | 'GUILD_SCHEDULED_EVENT_USER_REMOVE'
  | 'GUILD_SOUNDBOARD_SOUND_CREATE'
  | 'GUILD_SOUNDBOARD_SOUND_UPDATE'
  | 'GUILD_SOUNDBOARD_SOUND_DELETE'
  | 'GUILD_SOUNDBOARD_SOUNDS_UPDATE'
  | 'SOUNDBOARD_SOUNDS'
  | 'INTEGRATION_CREATE'
  | 'INTEGRATION_UPDATE'
  | 'INTEGRATION_DELETE'
  | 'INTERACTION_CREATE'
  | 'INVITE_CREATE'
  | 'INVITE_DELETE'
  | 'MESSAGE_CREATE'
  | 'MESSAGE_UPDATE'
  | 'MESSAGE_DELETE'
  | 'MESSAGE_DELETE_BULK'
  | 'MESSAGE_REACTION_ADD'
  | 'MESSAGE_REACTION_REMOVE'
  | 'MESSAGE_REACTION_REMOVE_ALL'
  | 'MESSAGE_REACTION_REMOVE_EMOJI'
  | 'PRESENCE_UPDATE'
  | 'STAGE_INSTANCE_CREATE'
  | 'STAGE_INSTANCE_UPDATE'
  | 'STAGE_INSTANCE_DELETE'
  | 'TYPING_START'
  | 'USER_UPDATE'
  | 'VOICE_CHANNEL_EFFECT_SEND'
  | 'VOICE_STATE_UPDATE'
  | 'VOICE_SERVER_UPDATE'
  | 'WEBHOOKS_UPDATE'
  | 'ENTITLEMENT_CREATE'
  | 'ENTITLEMENT_UPDATE'
  | 'ENTITLEMENT_DELETE'
  | 'SUBSCRIPTION_CREATE'
  | 'SUBSCRIPTION_UPDATE'
  | 'SUBSCRIPTION_DELETE'
  | 'MESSAGE_POLL_VOTE_ADD'
  | 'MESSAGE_POLL_VOTE_REMOVE'

/** https://discord.com/developers/docs/events/gateway-events#receive-events */
export type GatewayEventNames = GatewayDispatchEventNames

/** https://discord.com/developers/docs/events/gateway-events#payload-structure */
export interface DiscordGatewayPayload {
  /** opcode for the payload */
  op: number
  /** Event data */
  d: unknown | null
  /** Sequence number, used for resuming sessions and heartbeats */
  s: number | null
  /** The event name for this payload */
  t: GatewayEventNames | null
}

// TODO: Add Identify: https://discord.com/developers/docs/events/gateway-events#identify-identify-structure
// TODO: Add Identify Connection Properties: https://discord.com/developers/docs/events/gateway-events#identify-identify-connection-properties
// TODO: Add Resume: https://discord.com/developers/docs/events/gateway-events#resume-resume-structure
// TODO: Add Request Guild Members: https://discord.com/developers/docs/events/gateway-events#request-guild-members-request-guild-members-structure
// TODO: Add Request Soundboard Sounds: https://discord.com/developers/docs/events/gateway-events#request-soundboard-sounds-request-soundboard-sounds-structure
// TODO: Add Voice State Update: https://discord.com/developers/docs/events/gateway-events#update-voice-state-gateway-voice-state-update-structure

/** https://discord.com/developers/docs/events/gateway-events#update-presence-gateway-presence-update-structure */
export interface DiscordUpdatePresence {
  /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null
  /** The user's activities */
  activities: DiscordBotActivity[]
  /** The user's new status */
  status: Exclude<keyof typeof PresenceStatus, 'offline'>
  /** Whether or not the client is afk */
  afk: boolean
}

/** https://discord.com/developers/docs/events/gateway-events#update-presence-status-types */
export enum PresenceStatus {
  online,
  dnd,
  idle,
  invisible,
  offline,
}

/** https://discord.com/developers/docs/events/gateway-events#hello-hello-structure */
export interface DiscordHello {
  /** The interval (in milliseconds) the client should heartbeat with */
  heartbeat_interval: number
}

/** https://discord.com/developers/docs/events/gateway-events#ready-ready-event-fields */
export interface DiscordReady {
  /** Gateway version */
  v: number
  /** Information about the user including email */
  user: DiscordUser
  /** The guilds the user is in */
  guilds: DiscordUnavailableGuild[]
  /** Used for resuming connections */
  session_id: string
  /** Gateway url for resuming connections */
  resume_gateway_url: string
  /** The shard information associated with this session, if sent when identifying */
  shard?: [number, number]
  /** Contains id and flags */
  application: Partial<DiscordApplication> & Pick<DiscordApplication, 'id' | 'flags'>
}

/** https://discord.com/developers/docs/events/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
export interface DiscordAutoModerationActionExecution {
  /** The id of the guild */
  guild_id: string
  /** The id of the rule that was executed */
  rule_id: string
  /** The id of the user which generated the content which triggered the rule */
  user_id: string
  /** The content from the user */
  content: string
  /** Action which was executed */
  action: DiscordAutoModerationAction
  /** The trigger type of the rule that was executed. */
  rule_trigger_type: AutoModerationTriggerTypes
  /** The id of the channel in which user content was posted */
  channel_id?: string | null
  /** The id of the message. Will not exist if message was blocked by automod or content was not part of any message */
  message_id?: string | null
  /** The id of any system auto moderation messages posted as a result of this action */
  alert_system_message_id?: string | null
  /** The word or phrase that triggerred the rule. */
  matched_keyword: string | null
  /** The substring in content that triggered the rule */
  matched_content: string | null
}

/** https://discord.com/developers/docs/events/gateway-events#thread-create */
export interface DiscordThreadCreateExtra {
  /**
   * When a thread is created this will be true on that channel payload for the thread.
   *
   * @remarks
   * The Thread Create event may fire for a few reasons, however this fields only exists when it is fired because a thread was created.
   */
  newly_created?: boolean
}

/** https://discord.com/developers/docs/events/gateway-events#thread-list-sync-thread-list-sync-event-fields */
export interface DiscordThreadListSync {
  /** The id of the guild */
  guild_id: string
  /** The parent channel ids whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channelIds that have no active threads as well, so you know to clear that data */
  channel_ids?: string[]
  /** All active threads in the given channels that the current user can access */
  threads: DiscordChannel[]
  /** All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to */
  members: DiscordThreadMember[]
}

/** https://discord.com/developers/docs/events/gateway-events#thread-member-update-thread-member-update-event-extra-fields */
export interface DiscordThreadMemberUpdateExtra {
  /** Id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#thread-member-update-thread-member-update-event-extra-fields */
export interface DiscordThreadMemberUpdate extends DiscordThreadMember, DiscordThreadMemberUpdateExtra {}

/** https://discord.com/developers/docs/events/gateway-events#thread-members-update-thread-members-update-event-fields */
export interface DiscordThreadMembersUpdate {
  /** The id of the thread */
  id: string
  /** The id of the guild */
  guild_id: string
  /** The users who were added to the thread */
  added_members?: DiscordThreadMember[]
  /** The id of the users who were removed from the thread */
  removed_member_ids?: string[]
  /** the approximate number of members in the thread, capped at 50 */
  member_count: number
}

/** https://discord.com/developers/docs/events/gateway#channel-pins-update */
export interface DiscordChannelPinsUpdate {
  /** The id of the guild */
  guild_id?: string
  /** The id of the channel */
  channel_id: string
  /** The time at which the most recent pinned message was pinned */
  last_pin_timestamp?: string | null
}

/** https://discord.com/developers/docs/events/gateway-events#guild-create-guild-create-extra-fields */
export interface DiscordGuildCreateExtra {
  /** When this guild was joined at */
  joined_at: string
  /** If this is considered a large guild */
  large: boolean
  /** If the guild is unavailable due to an outage */
  unavailable?: boolean
  /** Total number of member in this guild */
  member_count: number
  /**
   * States of members currently in voice channels
   *
   * @remarks
   * Lacks the `guild_id` key
   */
  voice_states: Omit<DiscordVoiceState, "guild_id">[]
  /** Users in the guild */
  members: DiscordMemberWithUser[]
  /** Channels in the guild */
  channels: DiscordChannel[]
  /** All active threads in the guild that the current user has permission to view */
  threads: DiscordChannel[]
  /**
   * Presences of the members in the guild
   *
   * @remarks
   * Will only include non-offline members if the size is greater than the large threshold.
   */
  presences?: Partial<DiscordPresenceUpdate>[]
  /** Stage instances in the guild */
  stage_instances?: DiscordStageInstance[]
  /** Scheduled events in the guild */
  guild_scheduled_events: DiscordScheduledEvent[]
  /** Soundboard sounds in the guild */
  soundboard_sounds: DiscordSoundboardSound[]
}

/** https://discord.com/developers/docs/events/gateway-events#guild-audit-log-entry-create-guild-audit-log-entry-create-event-extra-fields */
export interface DiscordGuildAuditLogEntryCreateExtra {
  /** The id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-add-guild-ban-add-event-fields */
export interface DiscordGuildBanAdd {
  /** id of the guild */
  guild_id: string
  /** The banned user */
  user: DiscordUser
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-remove-guild-ban-remove-event-fields */
export interface DiscordGuildBanRemove {
  /** id of the guild */
  guild_id: string
  /** The banned user */
  user: DiscordUser
}

/**
 * https://discord.com/developers/docs/events/gateway-events#guild-ban-add-guild-ban-add-event-fields
 * https://discord.com/developers/docs/events/gateway-events#guild-ban-remove-guild-ban-remove-event-fields
 *
 * @deprecated
 * Use {@link DiscordGuildBanAdd} and {@link DiscordGuildBanRemove} instead.
 */
export interface DiscordGuildBanAddRemove extends DiscordGuildBanAdd {}

/** https://discord.com/developers/docs/events/gateway-events#guild-emojis-update-guild-emojis-update-event-fields */
export interface DiscordGuildEmojisUpdate {
  /** id of the guild */
  guild_id: string
  /** Array of emojis */
  emojis: DiscordEmoji[]
}

/** https://discord.com/developers/docs/events/gateway-events#guild-stickers-update-guild-stickers-update-event-fields */
export interface DiscordGuildStickersUpdate {
  /** id of the guild */
  guild_id: string
  /** Array of sticker */
  stickers: DiscordSticker[]
}

/** https://discord.com/developers/docs/events/gateway-events#guild-integrations-update-guild-integrations-update-event-fields */
export interface DiscordGuildIntegrationsUpdate {
  /** id of the guild whose integrations were updated */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-add-guild-member-add-extra-fields */
export interface DiscordGuildMemberAddExtra {
  /** id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-add-guild-member-add-extra-fields */
export interface DiscordGuildMemberAdd extends DiscordMemberWithUser, DiscordGuildMemberAddExtra {}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-remove-guild-member-remove-event-fields */
export interface DiscordGuildMemberRemove {
  /** The id of the guild */
  guild_id: string
  /** The user who was removed */
  user: DiscordUser
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-update-guild-member-update-event-fields */
export interface DiscordGuildMemberUpdate {
  /** The id of the guild */
  guild_id: string
  /** User role ids */
  roles: string[]
  /** The user */
  user: DiscordUser
  /** Nickname of the user in the guild */
  nick?: string | null
  /** the member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting) */
  avatar: string
  /** the member's guild banner hash */
  banner: string
  /** When the user joined the guild */
  joined_at: string
  /** When the user starting boosting the guild */
  premium_since?: string | null
  /** whether the user is deafened in voice channels */
  deaf?: boolean
  /** whether the user is muted in voice channels */
  mute?: boolean
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean
  /** when the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out. Will throw a 403 error if the user has the ADMINISTRATOR permission or is the owner of the guild */
  communication_disabled_until?: string
  /** Data for the member's guild avatar decoration */
  avatar_decoration_data?: DiscordAvatarDecorationData
  /** Guild member flags */
  flags?: number
}

/** https://discord.com/developers/docs/events/gateway-events#guild-members-chunk-guild-members-chunk-event-fields */
export interface DiscordGuildMembersChunk {
  /** The id of the guild */
  guild_id: string
  /** Set of guild members */
  members: DiscordMemberWithUser[]
  /** The chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count) */
  chunk_index: number
  /** The total number of expected chunks for this response */
  chunk_count: number
  /** If passing an invalid id to `REQUEST_GUILD_MEMBERS`, it will be returned here */
  not_found?: string[]
  /** If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here */
  presences?: DiscordPresenceUpdate[]
  /** The nonce used in the Guild Members Request */
  nonce?: string
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-create-guild-role-create-event-fields */
export interface DiscordGuildRoleCreate {
  /** The id of the guild */
  guild_id: string
  /** The role created */
  role: DiscordRole
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-update-guild-role-update-event-fields */
export interface DiscordGuildRoleUpdate {
  /** The id of the guild */
  guild_id: string
  /** The role updated */
  role: DiscordRole
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-delete-guild-role-delete-event-fields */
export interface DiscordGuildRoleDelete {
  /** id of the guild */
  guild_id: string
  /** id of the role */
  role_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#guild-scheduled-event-user-add-guild-scheduled-event-user-add-event-fields */
export interface DiscordScheduledEventUserAdd {
  /** id of the guild scheduled event */
  guild_scheduled_event_id: string
  /** id of the user */
  user_id: string
  /** id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#guild-scheduled-event-user-remove-guild-scheduled-event-user-remove-event-fields */
export interface DiscordScheduledEventUserRemove {
  /** id of the guild scheduled event */
  guild_scheduled_event_id: string
  /** id of the user */
  user_id: string
  /** id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-soundboard-sound-delete-guild-soundboard-sound-delete-event-fields */
export interface DiscordSoundboardSoundDelete {
  /** ID of the sound that was deleted */
  sound_id: string
  /** ID of the guild the sound was in */
  guild_id: string
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-soundboard-sounds-update-guild-soundboard-sounds-update-event-fields */
export interface DiscordSoundboardSoundsUpdate {
  /** The guild's soundboard sounds */
  soundboard_sounds: DiscordSoundboardSound[]
  /** ID of the guild the sound was in */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#soundboard-sounds-soundboard-sounds-event-fields */
export interface DiscordSoundboardSounds {
  /** The guild's soundboard sounds */
  soundboard_sounds: DiscordSoundboardSound[]
  /** ID of the guild the sound was in */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#integration-create-integration-create-event-additional-fields */
export interface DiscordIntegrationCreateExtra {
  /** Id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#integration-update-integration-update-event-additional-fields */
export interface DiscordIntegrationUpdateExtra {
  /** Id of the guild */
  guild_id: string
}

/**
 * https://discord.com/developers/docs/events/gateway-events#integration-create-integration-create-event-additional-fields
 * https://discord.com/developers/docs/events/gateway-events#integration-update-integration-update-event-additional-fields
 */
export interface DiscordIntegrationCreateUpdate extends DiscordIntegration {
  /** Id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#integration-delete-integration-delete-event-fields */
export interface DiscordIntegrationDelete {
  /** Integration id */
  id: string
  /** Id of the guild */
  guild_id: string
  /** Id of the bot/OAuth2 application for this discord integration */
  application_id?: string
}

/** https://discord.com/developers/docs/events/gateway-events#invite-create-invite-create-event-fields */
export interface DiscordInviteCreate {
  /** The channel the invite is for */
  channel_id: string
  /** The unique invite code */
  code: string
  /** The time at which the invite was created */
  created_at: string
  /** The guild of the invite */
  guild_id?: string
  /** The user that created the invite */
  inviter?: DiscordUser
  /** How long the invite is valid for (in seconds) */
  max_age: number
  /** The maximum number of times the invite can be used */
  max_uses: number
  /** The type of target for this voice channel invite */
  target_type: TargetTypes
  /** The target user for this invite */
  target_user?: DiscordUser
  /** The embedded application to open for this voice channel embedded application invite */
  target_application?: Partial<DiscordApplication>
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean
  /** How many times the invite has been used (always will be 0) */
  uses: number
}

/** https://discord.com/developers/docs/events/gateway-events#invite-delete-invite-delete-event-fields */
export interface DiscordInviteDelete {
  /** The channel of the invite */
  channel_id: string
  /** The guild of the invite */
  guild_id?: string
  /** The unique invite code */
  code: string
}

/** https://discord.com/developers/docs/events/gateway-events#message-create-message-create-extra-fields */
export interface DiscordMessageCreateExtra {
  /** ID of the guild the message was sent in - unless it is an ephemeral message */
  guild_id?: string
  /** Member properties for this message's author. Missing for ephemeral messages and messages from webhooks */
  member?: Partial<DiscordMemberWithUser>
  /** Users specifically mentioned in the message */
  mentions: Array<DiscordUser & { member?: Partial<DiscordMember> }>
}

/** https://discord.com/developers/docs/events/gateway-events#message-update */
export type DiscordMessageUpdateExtra = DiscordMessageCreateExtra

/** https://discord.com/developers/docs/events/gateway-events#message-delete-message-delete-event-fields */
export interface DiscordMessageDelete {
  /** The id of the message */
  id: string
  /** The id of the channel */
  channel_id: string
  /** The id of the guild */
  guild_id?: string
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
export interface DiscordMessageDeleteBulk {
  /** The ids of the messages */
  ids: string[]
  /** The id of the channel */
  channel_id: string
  /** The id of the guild */
  guild_id?: string
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-add-message-reaction-add-event-fields */
export interface DiscordMessageReactionAdd {
  /** The id of the user */
  user_id: string
  /** The id of the channel */
  channel_id: string
  /** The id of the message */
  message_id: string
  /** The id of the guild */
  guild_id?: string
  /** The member who reacted if this happened in a guild */
  member?: DiscordMemberWithUser
  /** The emoji used to react */
  emoji: Partial<DiscordEmoji>
  /** The id of the author of this message */
  message_author_id?: string
  /** true if this is a super-reaction */
  burst: boolean
  /** Colors used for super-reaction animation in "#rrggbb" format */
  burst_colors?: string[]
  /** The type of reaction */
  type: DiscordReactionType
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-message-reaction-remove-event-fields */
export interface DiscordMessageReactionRemove {
  /** The id of the user */
  user_id: string
  /** The id of the channel */
  channel_id: string
  /** The id of the message */
  message_id: string
  /** The id of the guild */
  guild_id?: string
  /** The emoji used to react */
  emoji: Partial<DiscordEmoji>
  /** true if this is a super-reaction */
  burst: boolean
  /** The type of reaction */
  type: DiscordReactionType
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface DiscordMessageReactionRemoveAll {
  /** The id of the channel */
  channel_id: string
  /** The id of the message */
  message_id: string
  /** The id of the guild */
  guild_id?: string
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-emoji-message-reaction-remove-emoji-event-fields */
export interface DiscordMessageReactionRemoveEmoji {
  /** The id of the channel */
  channel_id: string
  /** The id of the message */
  message_id: string
  /** The id of the guild */
  guild_id?: string
  /** The emoji used to react */
  emoji: Partial<DiscordEmoji>
}

/** https://discord.com/developers/docs/events/gateway-events#presence-update-presence-update-event-fields */
export interface DiscordPresenceUpdate {
  /** Either "idle", "dnd", "online", or "offline" */
  status: 'idle' | 'dnd' | 'online' | 'offline'
  /** The user presence is being updated for */
  user: DiscordUser
  /** id of the guild */
  guild_id: string
  /** User's current activities */
  activities: DiscordActivity[]
  /** User's platform-dependent status */
  client_status: DiscordClientStatus
}

/** https://discord.com/developers/docs/events/gateway-events#client-status-object */
export interface DiscordClientStatus {
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string
  /** The user's status set for an active mobile (iOS, Android) application session */
  mobile?: string
  /** The user's status set for an active web (browser, bot account) application session */
  web?: string
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object */
export interface DiscordActivity {
  /** The activity's name */
  name: string
  /** Activity type */
  type: ActivityTypes
  /** Stream url, is validated when type is 1 */
  url?: string | null
  /** Unix timestamp of when the activity was added to the user's session */
  created_at: number
  /** What the player is currently doing */
  details?: string | null
  /** The user's current party status */
  state?: string | null
  /** Whether or not the activity is an instanced game session */
  instance?: boolean
  /** Activity flags `OR`d together, describes what the payload includes */
  flags?: number
  /** Unix timestamps for start and/or end of the game */
  timestamps?: DiscordActivityTimestamps
  /** Application id for the game */
  application_id?: string
  /** The emoji used for a custom status */
  emoji?: DiscordActivityEmoji | null
  /** Information for the current party of the player */
  party?: DiscordActivityParty
  /** Images for the presence and their hover texts */
  assets?: DiscordActivityAssets
  /** Secrets for Rich Presence joining and spectating */
  secrets?: DiscordActivitySecrets
  /** The custom buttons shown in the Rich Presence (max 2) */
  buttons?: DiscordActivityButton[]
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object - Note at the bottom */
export type DiscordBotActivity = Pick<DiscordActivity, 'name' | 'state' | 'type' | 'url'>

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-types */
export enum ActivityTypes {
  Playing = 0,
  Streaming = 1,
  Listening = 2,
  Watching = 3,
  Custom = 4,
  Competing = 5,
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-timestamps */
export interface DiscordActivityTimestamps {
  /** Unix time (in milliseconds) of when the activity started */
  start?: number
  /** Unix time (in milliseconds) of when the activity ends */
  end?: number
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-emoji */
export interface DiscordActivityEmoji {
  /** The name of the emoji */
  name: string
  /** Whether this emoji is animated */
  animated?: boolean
  /** The id of the emoji */
  id?: string
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-party */
export interface DiscordActivityParty {
  /** Used to show the party's current and maximum size */
  size?: [currentSize: number, maxSize: number]
  /** The id of the party */
  id?: string
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-assets */
export interface DiscordActivityAssets {
  /** Text displayed when hovering over the large image of the activity */
  large_text?: string
  /** Text displayed when hovering over the small image of the activity */
  small_text?: string
  /** The id for a large asset of the activity, usually a snowflake */
  large_image?: string
  /** The id for a small asset of the activity, usually a snowflake */
  small_image?: string
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-secrets */
export interface DiscordActivitySecrets {
  /** The secret for joining a party */
  join?: string
  /** The secret for spectating a game */
  spectate?: string
  /** The secret for a specific instanced match */
  match?: string
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-flags */
export enum ActivityFlags {
  Instance = 1 << 0,
  Join = 1 << 1,
  Spectate = 1 << 2,
  JoinRequest = 1 << 3,
  Sync = 1 << 4,
  Play = 1 << 5,
  PartyPrivacyFriends = 1 << 6,
  PartyPrivacyVoiceChannel = 1 << 7,
  Embedded = 1 << 8,
}

/** https://discord.com/developers/docs/events/gateway#activity-object-activity-buttons */
export interface DiscordActivityButton {
  /** The text shown on the button (1-32 characters) */
  label: string
  /** The url opened when clicking the button (1-512 characters) */
  url: string
}

/** https://discord.com/developers/docs/events/gateway-events#typing-start-typing-start-event-fields */
export interface DiscordTypingStart {
  /** Unix time (in seconds) of when the user started typing */
  timestamp: number
  /** id of the channel */
  channel_id: string
  /** id of the guild */
  guild_id?: string
  /** id of the user */
  user_id: string
  /** The member who started typing if this happened in a guild */
  member?: DiscordMember
}

/** https://discord.com/developers/docs/events/gateway-events#voice-channel-effect-send-voice-channel-effect-send-event-fields */
export interface DiscordVoiceChannelEffectSend {
  /** ID of the channel the effect was sent in */
  channel_id: string
  /** ID of the guild the effect was sent in */
  guild_id: string
  /** ID of the user who sent the effect */
  user_id: string
  /** The emoji sent, for emoji reaction and soundboard effects */
  emoji?: DiscordEmoji | null
  /** The type of emoji animation, for emoji reaction and soundboard effects */
  animation_type?: DiscordVoiceChannelEffectAnimationType | null
  /** The ID of the emoji animation, for emoji reaction and soundboard effects */
  animation_id?: number | null
  /** The ID of the soundboard sound, for soundboard effects */
  sound_id?: string | number
  /** The volume of the soundboard sound, from 0 to 1, for soundboard effects */
  sound_volume?: number
}

/** https://discord.com/developers/docs/events/gateway-events#voice-channel-effect-send-animation-types */
export enum DiscordVoiceChannelEffectAnimationType {
  /** A fun animation, sent by a Nitro subscriber */
  Premium = 0,
  /** The standard animation */
  Basic = 1,
}

/** https://discord.com/developers/docs/events/gateway-events#voice-server-update-voice-server-update-event-fields */
export interface DiscordVoiceServerUpdate {
  /** Voice connection token */
  token: string
  /** The guild this voice server update is for */
  guild_id: string
  /** The voice server host */
  endpoint: string | null
}

/** https://discord.com/developers/docs/events/gateway-events#webhooks-update-webhooks-update-event-fields */
export interface DiscordWebhookUpdate {
  /** id of the guild */
  guild_id: string
  /** id of the channel */
  channel_id: string
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-add-message-poll-vote-add-fields */
export interface DiscordPollVoteAdd {
  /** ID of the user. Usually a snowflake */
  user_id: string
  /** ID of the channel. Usually a snowflake */
  channel_id: string
  /** ID of the message. Usually a snowflake */
  message_id: string
  /** ID of the guild. Usually a snowflake */
  guild_id?: string
  /** ID of the answer. */
  answer_id: number
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-remove-message-poll-vote-remove-fields */
export interface DiscordPollVoteRemove {
  /** ID of the user. Usually a snowflake */
  user_id: string
  /** ID of the channel. Usually a snowflake */
  channel_id: string
  /** ID of the message. Usually a snowflake */
  message_id: string
  /** ID of the guild. Usually a snowflake */
  guild_id?: string
  /** ID of the answer. */
  answer_id: number
}
