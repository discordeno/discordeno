/** Types for: https://discord.com/developers/docs/resources/audit-log */

import type {
  DiscordAutoModerationRule,
  DiscordChannel,
  DiscordEmoji,
  DiscordGuild,
  DiscordGuildOnboarding,
  DiscordGuildOnboardingPrompt,
  DiscordIntegration,
  DiscordInvite,
  DiscordInviteMetadata,
  DiscordMember,
  DiscordOverwrite,
  DiscordRole,
  DiscordScheduledEvent,
  DiscordStageInstance,
  DiscordSticker,
  DiscordThreadMetadata,
  DiscordUser,
  DiscordWebhook,
} from '../discord.js'
import type { DiscordApplicationCommand, DiscordApplicationCommandPermissions } from './interactions.js'

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure */
export interface DiscordAuditLog {
  /** List of webhooks found in the audit log */
  webhooks: DiscordWebhook[]
  /** List of users found in the audit log */
  users: DiscordUser[]
  /** List of audit log entries, sorted from most to least recent */
  audit_log_entries: DiscordAuditLogEntry[]
  /** List of partial integration objects */
  integrations: Partial<DiscordIntegration>[]
  /**
   * List of threads found in the audit log.
   * Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are included in the threads map since archived threads might not be kept in memory by clients.
   */
  threads: DiscordChannel[]
  /** List of guild scheduled events found in the audit log */
  guild_scheduled_events?: DiscordScheduledEvent[]
  /** List of auto moderation rules referenced in the audit log */
  auto_moderation_rules?: DiscordAutoModerationRule[]
  /** List of application commands referenced in the audit log */
  application_commands: DiscordApplicationCommand[]
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface DiscordAuditLogEntry {
  /** ID of the affected entity (webhook, user, role, etc.) */
  target_id: string | null
  /** Changes made to the `target_id` */
  changes?: DiscordAuditLogChange[]
  /** User or app that made the changes */
  user_id: string | null
  /** ID of the entry */
  id: string
  /** Type of action that occurred */
  action_type: AuditLogEvents
  /** Additional info for certain event types */
  options?: DiscordOptionalAuditEntryInfo
  /** Reason for the change (1-512 characters) */
  reason?: string
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
export enum AuditLogEvents {
  /** Server settings were updated */
  GuildUpdate = 1,
  /** Channel was created */
  ChannelCreate = 10,
  /** Channel settings were updated */
  ChannelUpdate,
  /** Channel was deleted */
  ChannelDelete,
  /** Permission overwrite was added to a channel */
  ChannelOverwriteCreate,
  /** Permission overwrite was updated for a channel */
  ChannelOverwriteUpdate,
  /** Permission overwrite was deleted from a channel */
  ChannelOverwriteDelete,
  /** Member was removed from server */
  MemberKick = 20,
  /** Members were pruned from server */
  MemberPrune,
  /** Member was banned from server */
  MemberBanAdd,
  /** Server ban was lifted for a member */
  MemberBanRemove,
  /** Member was updated in server */
  MemberUpdate,
  /** Member was added or removed from a role */
  MemberRoleUpdate,
  /** Member was moved to a different voice channel */
  MemberMove,
  /** Member was disconnected from a voice channel */
  MemberDisconnect,
  /** Bot user was added to server */
  BotAdd,
  /** Role was created */
  RoleCreate = 30,
  /** Role was edited */
  RoleUpdate,
  /** Role was deleted */
  RoleDelete,
  /** Server invite was created */
  InviteCreate = 40,
  /** Server invite was updated */
  InviteUpdate,
  /** Server invite was deleted */
  InviteDelete,
  /** Webhook was created */
  WebhookCreate = 50,
  /** Webhook properties or channel were updated */
  WebhookUpdate,
  /** Webhook was deleted */
  WebhookDelete,
  /** Emoji was created */
  EmojiCreate = 60,
  /** Emoji name was updated */
  EmojiUpdate,
  /** Emoji was deleted */
  EmojiDelete,
  /** Single message was deleted */
  MessageDelete = 72,
  /** Multiple messages were deleted */
  MessageBulkDelete,
  /** Messaged was pinned to a channel */
  MessagePin,
  /** Message was unpinned from a channel */
  MessageUnpin,
  /** App was added to server */
  IntegrationCreate = 80,
  /** App was updated (as an example, its scopes were updated) */
  IntegrationUpdate,
  /** App was removed from server */
  IntegrationDelete,
  /** Stage instance was created (stage channel becomes live) */
  StageInstanceCreate,
  /** Stage instace details were updated */
  StageInstanceUpdate,
  /** Stage instance was deleted (stage channel no longer live) */
  StageInstanceDelete,
  /** Sticker was created */
  StickerCreate = 90,
  /** Sticker details were updated */
  StickerUpdate,
  /** Sticker was deleted */
  StickerDelete,
  /** Event was created */
  GuildScheduledEventCreate = 100,
  /** Event was updated */
  GuildScheduledEventUpdate,
  /** Event was cancelled */
  GuildScheduledEventDelete,
  /** Thread was created in a channel */
  ThreadCreate = 110,
  /** Thread was updated */
  ThreadUpdate,
  /** Thread was deleted */
  ThreadDelete,
  /** Permissions were updated for a command */
  ApplicationCommandPermissionUpdate = 121,
  /** Soundboard sound was created */
  SoundboardSoundCreate = 130,
  /** Soundboard sound was updated */
  SoundboardSoundUpdate,
  /** Soundboard sound was deleted */
  SoundboardSoundDelete,
  /** Auto moderation rule was created */
  AutoModerationRuleCreate = 140,
  /** Auto moderation rule was updated */
  AutoModerationRuleUpdate,
  /** Auto moderation rule was deleted */
  AutoModerationRuleDelete,
  /** Message was blocked by AutoMod according to a rule. */
  AutoModerationBlockMessage,
  /** Message was flagged by AutoMod */
  AudoModerationFlagMessage,
  /** Member was timed out by AutoMod */
  AutoModerationMemberTimedOut,
  /** Creator monetization request was created */
  CreatorMonetizationRequestCreated = 150,
  /** Creator monetization terms were accepted */
  CreatorMonetizationTermsAccepted,
  /** Guild Onboarding Question was created */
  OnBoardingPromptCreate = 163,
  /** Guild Onboarding Question was updated */
  OnBoardingPromptUpdate,
  /** Guild Onboarding Question was deleted */
  OnBoardingPromptDelete,
  /** Guild Onboarding was created */
  OnBoardingCreate,
  /** Guild Onboarding was updated */
  OnBoardingUpdate,
  /** Guild Server Guide was created */
  HomeSettingsCreate = 190,
  /** Guild Server Guide was updated */
  HomeSettingsUpdate,
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
export type DiscordAuditLogChange =
  | DiscordAuditLogChangeObject<DiscordGuild>
  | DiscordAuditLogChangeObject<DiscordChannel>
  | DiscordAuditLogChangeObject<DiscordOverwrite>
  | DiscordAuditLogChangeObject<DiscordMember>
  | DiscordAuditLogChangePartialRole
  | DiscordAuditLogChangeObject<DiscordRole>
  | DiscordAuditLogChangeInvite
  | DiscordAuditLogChangeInviteMetadata
  | DiscordAuditLogChangeWebhook
  | DiscordAuditLogChangeObject<DiscordEmoji>
  | DiscordAuditLogChangeObject<DiscordIntegration>
  | DiscordAuditLogChangeObject<DiscordStageInstance>
  | DiscordAuditLogChangeObject<DiscordSticker>
  | DiscordAuditLogChangeObject<DiscordThreadMetadata>
  | DiscordAuditLogChangeApplicationCommandPermissions
  | DiscordAuditLogChangeObject<DiscordAutoModerationRule>
  | DiscordAuditLogChangeObject<DiscordGuildOnboardingPrompt>
  | DiscordAuditLogChangeObject<DiscordGuildOnboarding>

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface DiscordOptionalAuditEntryInfo {
  /**
   * ID of the app whose permissions were targeted.
   *
   * @remarks
   * Oly present on event of type: `APPLICATION_COMMAND_PERMISSION_UPDATE`
   */
  application_id?: string
  /**
   * Name of the Auto Moderation rule that was triggered.
   *
   * @remarks
   * Only present on event of types: `AUTO_MODERATION_BLOCK_MESSAGE`, `AUTO_MODERATION_FLAG_TO_CHANNEL`, `AUTO_MODERATION_USER_COMMUNICATION_DISABLED`
   */
  auto_moderation_rule_name?: string
  /**
   * Trigger type of the Auto Moderation rule that was triggered.
   *
   * @remarks
   * Only present on event of types: `AUTO_MODERATION_BLOCK_MESSAGE`, `AUTO_MODERATION_FLAG_TO_CHANNEL`, `AUTO_MODERATION_USER_COMMUNICATION_DISABLED`
   */
  auto_moderation_rule_trigger_type?: string
  /**
   * Channel in which the entities were targeted.
   *
   * @remarks
   * Only present on event of types: `MEMBER_MOVE`, `MESSAGE_PIN`, `MESSAGE_UNPIN`, `MESSAGE_DELETE`, `STAGE_INSTANCE_CREATE`, `STAGE_INSTANCE_UPDATE`, `STAGE_INSTANCE_DELETE`
   */
  channel_id?: string
  /**
   * Number of entities that were targeted.
   *
   * @remarks
   * Only present on event of types: `MESSAGE_DELETE`, `MESSAGE_BULK_DELETE`, `MEMBER_DISCONNECT`, `MEMBER_MOVE`
   */
  count?: string
  /**
   * Number of days after which inactive members were kicked.
   *
   * @remarks
   * Only present on event of type: `MEMBER_PRUNE`
   */
  delete_member_days?: string
  /**
   * ID of the overwritten entity.
   *
   * @remarks
   * Only present on event of types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`
   */
  id?: string
  /**
   * Number of members removed by the prune.
   *
   * @remarks
   * Only present on event of types: `MEMBER_PRUNE`
   */
  members_removed?: string
  /**
   * ID of the message that was targeted.
   *
   * @remarks
   * Only present on event of types: `MESSAGE_PIN`, `MESSAGE_UNPIN`, `STAGE_INSTANCE_CREATE`, `STAGE_INSTANCE_UPDATE`, `STAGE_INSTANCE_DELETE`
   */
  message_id?: string
  /**
   * Name of the role if type is "0" (not present if type is "1").
   *
   * @remarks
   * Only present on event of types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`
   */
  role_name?: string
  /**
   * Type of overwritten entity - "0", for "role", or "1" for "member".
   *
   * @remarks
   * Only present on event of types: `CHANNEL_OVERWRITE_CREATE`, `CHANNEL_OVERWRITE_UPDATE`, `CHANNEL_OVERWRITE_DELETE`
   */
  type?: string
  /**
   * The type of integration which performed the action
   *
   * @remarks
   * Only present on event of types: `MEMBER_KICK`, `MEMBER_ROLE_UPDATE`
   */
  integration_type?: string
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export type DiscordAuditLogChangeObject<T> = {
  [K in keyof T]: {
    new_value?: T[K]
    old_value?: T[K]
    key: K
  }
}[keyof T]

// Done manually as it is clearer in this way
/** Partial role audit log entry change exception */
export type DiscordAuditLogChangePartialRole = { new_value: { id: string; name: string }[]; key: '$add' | '$remove' }

/**
 * Invite audit log entry change exception
 *
 * @remarks
 * While the docs say that 'channel.id' will never exist, we keep it as it is very complex to remove, the user should not use it and use the provided 'channel_id' value instead
 */
export type DiscordAuditLogChangeInvite = DiscordAuditLogChangeObject<DiscordInvite> | DiscordAuditLogChangeObject<{ channel_id: string }>

/**
 * Invite Metadata audit log entry change exception
 *
 * @remarks
 * While the docs say that 'channel.id' will never exist, we keep it as it is very complex to remove, the user should not use it and use the provided 'channel_id' value instead
 */
export type DiscordAuditLogChangeInviteMetadata =
  | DiscordAuditLogChangeObject<DiscordInviteMetadata>
  | DiscordAuditLogChangeObject<{ channel_id: string }>

/** Webhook audit log entry change exception */
export type DiscordAuditLogChangeWebhook =
  | DiscordAuditLogChangeObject<Omit<DiscordWebhook, 'avatar'>>
  | DiscordAuditLogChangeObject<{ avatar_hash: DiscordWebhook['avatar'] }>

// Done manually as it is clearer in this way
/** Command Permission audit log entry change exception */
export type DiscordAuditLogChangeApplicationCommandPermissions = {
  new_value?: DiscordApplicationCommandPermissions
  old_value?: DiscordApplicationCommandPermissions
  key: `${number}`
}
