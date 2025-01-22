import type { Locales } from './discord/reference.js'

export type BigString = bigint | string

/** https://discord.com/developers/docs/topics/permissions#role-object-role-flags */
export enum RoleFlags {
  None,
  /** Role can be selected by members in an onboarding prompt */
  InPrompt = 1 << 0,
}

/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum TeamMembershipStates {
  Invited = 1,
  Accepted,
}

/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export const BitwisePermissionFlags = {
  /** Allows creation of instant invites */
  CREATE_INSTANT_INVITE: 1n << 0n,
  /** Allows kicking members */
  KICK_MEMBERS: 1n << 1n,
  /** Allows banning members */
  BAN_MEMBERS: 1n << 2n,
  /** Allows all permissions and bypasses channel permission overwrites */
  ADMINISTRATOR: 1n << 3n,
  /** Allows management and editing of channels */
  MANAGE_CHANNELS: 1n << 4n,
  /** Allows management and editing of the guild */
  MANAGE_GUILD: 1n << 5n,
  /** Allows for the addition of reactions to messages */
  ADD_REACTIONS: 1n << 6n,
  /** Allows for viewing of audit logs */
  VIEW_AUDIT_LOG: 1n << 7n,
  /** Allows for using priority speaker in a voice channel */
  PRIORITY_SPEAKER: 1n << 8n,
  /** Allows the user to go live */
  STREAM: 1n << 9n,
  /** Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels */
  VIEW_CHANNEL: 1n << 10n,
  /** Allows for sending messages in a channel. (does not allow sending messages in threads) */
  SEND_MESSAGES: 1n << 11n,
  /** Allows for sending of /tts messages */
  SEND_TTS_MESSAGES: 1n << 12n,
  /** Allows for deletion of other users messages */
  MANAGE_MESSAGES: 1n << 13n,
  /** Links sent by users with this permission will be auto-embedded */
  EMBED_LINKS: 1n << 14n,
  /** Allows for uploading images and files */
  ATTACH_FILES: 1n << 15n,
  /** Allows for reading of message history */
  READ_MESSAGE_HISTORY: 1n << 16n,
  /** Allows for using the \@everyone tag to notify all users in a channel, and the \@here tag to notify all online users in a channel */
  MENTION_EVERYONE: 1n << 17n,
  /** Allows the usage of custom emojis from other servers */
  USE_EXTERNAL_EMOJIS: 1n << 18n,
  /** Allows for viewing guild insights */
  VIEW_GUILD_INSIGHTS: 1n << 19n,
  /** Allows for joining of a voice channel */
  CONNECT: 1n << 20n,
  /** Allows for speaking in a voice channel */
  SPEAK: 1n << 21n,
  /** Allows for muting members in a voice channel */
  MUTE_MEMBERS: 1n << 22n,
  /** Allows for deafening of members in a voice channel */
  DEAFEN_MEMBERS: 1n << 23n,
  /** Allows for moving of members between voice channels */
  MOVE_MEMBERS: 1n << 24n,
  /** Allows for using voice-activity-detection in a voice channel */
  USE_VAD: 1n << 25n,
  /** Allows for modification of own nickname */
  CHANGE_NICKNAME: 1n << 26n,
  /** Allows for modification of other users nicknames */
  MANAGE_NICKNAMES: 1n << 27n,
  /** Allows management and editing of roles */
  MANAGE_ROLES: 1n << 28n,
  /** Allows management and editing of webhooks */
  MANAGE_WEBHOOKS: 1n << 29n,
  /** Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users */
  MANAGE_GUILD_EXPRESSIONS: 1n << 30n,
  /** Allows members to use application commands in text channels */
  USE_SLASH_COMMANDS: 1n << 31n,
  /** Allows for requesting to speak in stage channels. */
  REQUEST_TO_SPEAK: 1n << 32n,
  /** Allows for editing and deleting scheduled events created by all users */
  MANAGE_EVENTS: 1n << 33n,
  /** Allows for deleting and archiving threads, and viewing all private threads */
  MANAGE_THREADS: 1n << 34n,
  /** Allows for creating public and announcement threads */
  CREATE_PUBLIC_THREADS: 1n << 35n,
  /** Allows for creating private threads */
  CREATE_PRIVATE_THREADS: 1n << 36n,
  /** Allows the usage of custom stickers from other servers */
  USE_EXTERNAL_STICKERS: 1n << 37n,
  /** Allows for sending messages in threads */
  SEND_MESSAGES_IN_THREADS: 1n << 38n,
  /** Allows for launching activities (applications with the `EMBEDDED` flag) in a voice channel. */
  USE_EMBEDDED_ACTIVITIES: 1n << 39n,
  /** Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels */
  MODERATE_MEMBERS: 1n << 40n,
  /** Allows for viewing role subscription insights. */
  VIEW_CREATOR_MONETIZATION_ANALYTICS: 1n << 41n,
  /** Allows for using soundboard in a voice channel. */
  USE_SOUNDBOARD: 1n << 42n,
  /** Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user */
  CREATE_GUILD_EXPRESSIONS: 1n << 43n,
  /** Allows for creating scheduled events, and editing and deleting those created by the current user */
  CREATE_EVENTS: 1n << 44n,
  /** Allows the usage of custom soundboards sounds from other servers */
  USE_EXTERNAL_SOUNDS: 1n << 45n,
  /** Allows sending voice messages */
  SEND_VOICE_MESSAGES: 1n << 46n,
  /** Allows sending polls */
  SEND_POLLS: 1n << 49n,
  /** Allows user-installed apps to send public responses. When disabled, users will still be allowed to use their apps but the responses will be ephemeral. This only applies to apps not also installed to the server. */
  USE_EXTERNAL_APPS: 1n << 50n,
} as const

export type PermissionStrings = keyof typeof BitwisePermissionFlags

export type GatewayDispatchEventNames =
  | 'READY'
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

export type GatewayEventNames = GatewayDispatchEventNames | 'RESUMED'

export type Localization = Partial<Record<Locales, string>>

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
export type CamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<CamelCase<U>>}` : S
export type SnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Lowercase<T> ? '' : '_'}${Lowercase<T>}${SnakeCase<U>}` : S

export type Camelize<T> = T extends any[]
  ? T extends Record<any, any>[]
    ? Camelize<T[number]>[]
    : T
  : T extends Record<any, any>
    ? { [K in keyof T as CamelCase<K & string>]: Camelize<T[K]> }
    : T

export type Snakelize<T> = T extends any[]
  ? T extends Record<any, any>[]
    ? Snakelize<T[number]>[]
    : T
  : T extends Record<any, any>
    ? { [K in keyof T as SnakeCase<K & string>]: Snakelize<T[K]> }
    : T

export type PickPartial<T, K extends keyof T> = { [P in keyof T]?: T[P] | undefined } & { [P in K]: T[P] }

// Functions are objects for TS, so we need to check for them explicitly
export type RecursivePartial<T> = T extends object ? (T extends (...args: never[]) => unknown ? T : { [K in keyof T]?: RecursivePartial<T[K]> }) : T
