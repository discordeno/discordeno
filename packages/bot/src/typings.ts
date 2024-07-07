import {
  ApplicationCommandTypes,
  type AllowedMentions,
  type ButtonStyles,
  type ChannelTypes,
  type CreateApplicationCommand,
  type CreateContextApplicationCommand,
  type DiscordAllowedMentions,
  type DiscordApplicationCommandOptionChoice,
  type DiscordAttachment,
  type DiscordChannel,
  type DiscordEmbed,
  type DiscordInteractionMember,
  type DiscordMessage,
  type DiscordRole,
  type DiscordSelectOption,
  type DiscordUser,
  type FileContent,
  type InteractionResponseTypes,
  type MessageComponentTypes,
  type MessageComponents,
  type TextStyles,
} from '@discordeno/types'
import type * as handlers from './handlers/index.js'
import type { ApplicationCommandOptionChoice } from './transformers/applicationCommandOptionChoice.js'
import type { Embed } from './transformers/embed.js'

export function isContextApplicationCommand(command: CreateApplicationCommand): command is CreateContextApplicationCommand {
  return command.type === ApplicationCommandTypes.Message || command.type === ApplicationCommandTypes.User
}

export interface DiscordInteractionResponse {
  type: InteractionResponseTypes
  data?: DiscordInteractionCallbackData
}

export interface DiscordInteractionCallbackData {
  tts?: boolean
  title?: string
  flags?: number
  content?: string
  choices?: DiscordApplicationCommandOptionChoice[]
  custom_id?: string
  embeds?: DiscordEmbed[]
  allowed_mentions?: DiscordAllowedMentions
  components?: DiscordComponent[]
}

export interface DiscordComponent {
  /** component type */
  type: MessageComponentTypes
  /** a developer-defined identifier for the component, max 100 characters */
  custom_id?: string
  /** whether the component is disabled, default false */
  disabled?: boolean
  /** For different styles/colors of the buttons */
  style?: ButtonStyles | TextStyles
  /** text that appears on the button (max 80 characters) */
  label?: string
  /** the dev-define value of the option, max 100 characters for select or 4000 for input. */
  value?: string
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: string
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string
  /** List of channel types to include in a channel select menu options list */
  channel_types?: ChannelTypes[]
  /** The choices! Maximum of 25 items. */
  options?: DiscordSelectOption[]
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  min_values?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  max_values?: number
  /** The minimum input length for a text input. Between 0-4000. */
  min_length?: number
  /** The maximum input length for a text input. Between 1-4000. */
  max_length?: number
  /** a list of child components */
  components?: DiscordComponent[]
  /** whether this component is required to be filled, default true */
  required?: boolean
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface BotInteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes
  /** An optional response message */
  data?: BotInteractionCallbackData
}

export interface BotInteractionCallbackData {
  /** The message contents (up to 2000 characters) */
  content?: string
  /** True if this is a TTS message */
  tts?: boolean
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** The contents of the files being sent */
  files?: FileContent[]
  /** The customId you want to use for this modal response. */
  customId?: string
  /** The title you want to use for this modal response. */
  title?: string
  /** The components you would like to have sent in this message */
  components?: MessageComponents
  /** Message flags combined as a bit field (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
  flags?: number
  /** Autocomplete choices (max of 25 choices) */
  choices?: ApplicationCommandOptionChoice[]
}

export interface DiscordInteractionDataResolved {
  /** The Ids and Message objects */
  messages?: Record<string, DiscordMessage>
  /** The Ids and User objects */
  users?: Record<string, DiscordUser>
  /** The Ids and partial Member objects */
  members?: Record<string, Omit<DiscordInteractionMember, 'user' | 'deaf' | 'mute'>>
  /** The Ids and Role objects */
  roles?: Record<string, DiscordRole>
  /** The Ids and partial Channel objects */
  channels?: Record<string, Pick<DiscordChannel, 'id' | 'name' | 'type' | 'permissions'>>
  /** The Ids and attachments objects */
  attachments?: Record<string, DiscordAttachment>
}

export interface DiscordThreadMemberGuildCreate {
  /** Any user-thread settings, currently only used for notifications */
  flags: number
  /** The time the current user last joined the thread */
  join_timestamp: string
}

export interface BotGatewayHandlerOptions {
  READY: typeof handlers.handleReady
  APPLICATION_COMMAND_PERMISSIONS_UPDATE: typeof handlers.handleApplicationCommandPermissionsUpdate
  AUTO_MODERATION_ACTION_EXECUTION: typeof handlers.handleAutoModerationActionExecution
  AUTO_MODERATION_RULE_CREATE: typeof handlers.handleAutoModerationRuleCreate
  AUTO_MODERATION_RULE_DELETE: typeof handlers.handleAutoModerationRuleDelete
  AUTO_MODERATION_RULE_UPDATE: typeof handlers.handleAutoModerationRuleUpdate

  CHANNEL_CREATE: typeof handlers.handleChannelCreate
  CHANNEL_DELETE: typeof handlers.handleChannelDelete
  CHANNEL_PINS_UPDATE: typeof handlers.handleChannelPinsUpdate
  CHANNEL_UPDATE: typeof handlers.handleChannelUpdate
  THREAD_CREATE: typeof handlers.handleThreadCreate
  THREAD_UPDATE: typeof handlers.handleThreadUpdate
  THREAD_DELETE: typeof handlers.handleThreadDelete
  THREAD_LIST_SYNC: typeof handlers.handleThreadListSync
  THREAD_MEMBERS_UPDATE: typeof handlers.handleThreadMembersUpdate
  STAGE_INSTANCE_CREATE: typeof handlers.handleStageInstanceCreate
  STAGE_INSTANCE_UPDATE: typeof handlers.handleStageInstanceUpdate
  STAGE_INSTANCE_DELETE: typeof handlers.handleStageInstanceDelete
  GUILD_AUDIT_LOG_ENTRY_CREATE: typeof handlers.handleGuildAuditLogEntryCreate
  GUILD_BAN_ADD: typeof handlers.handleGuildBanAdd
  GUILD_BAN_REMOVE: typeof handlers.handleGuildBanRemove
  GUILD_CREATE: typeof handlers.handleGuildCreate
  GUILD_DELETE: typeof handlers.handleGuildDelete
  GUILD_EMOJIS_UPDATE: typeof handlers.handleGuildEmojisUpdate
  GUILD_INTEGRATIONS_UPDATE: typeof handlers.handleGuildIntegrationsUpdate
  GUILD_MEMBER_ADD: typeof handlers.handleGuildMemberAdd
  GUILD_MEMBER_REMOVE: typeof handlers.handleGuildMemberRemove
  GUILD_MEMBER_UPDATE: typeof handlers.handleGuildMemberUpdate
  GUILD_MEMBERS_CHUNK: typeof handlers.handleGuildMembersChunk
  GUILD_ROLE_CREATE: typeof handlers.handleGuildRoleCreate
  GUILD_ROLE_DELETE: typeof handlers.handleGuildRoleDelete
  GUILD_ROLE_UPDATE: typeof handlers.handleGuildRoleUpdate
  GUILD_SCHEDULED_EVENT_CREATE: typeof handlers.handleGuildScheduledEventCreate
  GUILD_SCHEDULED_EVENT_DELETE: typeof handlers.handleGuildScheduledEventDelete
  GUILD_SCHEDULED_EVENT_UPDATE: typeof handlers.handleGuildScheduledEventUpdate
  GUILD_SCHEDULED_EVENT_USER_ADD: typeof handlers.handleGuildScheduledEventUserAdd
  GUILD_SCHEDULED_EVENT_USER_REMOVE: typeof handlers.handleGuildScheduledEventUserRemove
  GUILD_STICKERS_UPDATE: typeof handlers.handleGuildStickersUpdate
  GUILD_UPDATE: typeof handlers.handleGuildUpdate
  INTERACTION_CREATE: typeof handlers.handleInteractionCreate
  INVITE_CREATE: typeof handlers.handleInviteCreate
  INVITE_DELETE: typeof handlers.handleInviteCreate
  MESSAGE_CREATE: typeof handlers.handleMessageCreate
  MESSAGE_DELETE_BULK: typeof handlers.handleMessageDeleteBulk
  MESSAGE_DELETE: typeof handlers.handleMessageDelete
  MESSAGE_REACTION_ADD: typeof handlers.handleMessageReactionAdd
  MESSAGE_REACTION_REMOVE_ALL: typeof handlers.handleMessageReactionRemoveAll
  MESSAGE_REACTION_REMOVE_EMOJI: typeof handlers.handleMessageReactionRemoveEmoji
  MESSAGE_REACTION_REMOVE: typeof handlers.handleMessageReactionRemove
  MESSAGE_UPDATE: typeof handlers.handleMessageUpdate
  PRESENCE_UPDATE: typeof handlers.handlePresenceUpdate
  TYPING_START: typeof handlers.handleTypingStart
  USER_UPDATE: typeof handlers.handleUserUpdate
  VOICE_SERVER_UPDATE: typeof handlers.handleVoiceServerUpdate
  VOICE_STATE_UPDATE: typeof handlers.handleVoiceStateUpdate
  WEBHOOKS_UPDATE: typeof handlers.handleWebhooksUpdate
  INTEGRATION_CREATE: typeof handlers.handleIntegrationCreate
  INTEGRATION_UPDATE: typeof handlers.handleIntegrationUpdate
  INTEGRATION_DELETE: typeof handlers.handleIntegrationDelete
  ENTITLEMENT_CREATE: typeof handlers.handleEntitlementCreate
  ENTITLEMENT_UPDATE: typeof handlers.handleEntitlementUpdate
  ENTITLEMENT_DELETE: typeof handlers.handleEntitlementDelete
  MESSAGE_POLL_VOTE_ADD: typeof handlers.handleMessagePollVoteAdd
  MESSAGE_POLL_VOTE_REMOVE: typeof handlers.handleMessagePollVoteRemove
}
