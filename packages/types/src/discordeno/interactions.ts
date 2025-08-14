/**
 * Types for:
 * - https://discord.com/developers/docs/interactions/receiving-and-responding
 * - https://discord.com/developers/docs/interactions/application-commands
 */

import type { DiscordApplicationIntegrationType } from '../discord/application.js'
import type {
  ApplicationCommandTypes,
  DiscordApplicationCommandOption,
  DiscordApplicationCommandOptionChoice,
  DiscordInteractionContextType,
  DiscordInteractionEntryPointCommandHandlerType,
  InteractionResponseTypes,
} from '../discord/interactions.js'
import type { DiscordAttachment, DiscordEmbed } from '../discord/message.js'
import type { PermissionStrings } from '../discord/permissions.js'
import type { Localization } from '../discord/reference.js'
import type { BigString, Camelize } from '../shared.js'
import type { MessageComponents } from './components.js'
import type { AllowedMentions } from './message.js'
import type { CreatePoll } from './poll.js'
import type { FileContent } from './reference.js'

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-response-structure */
export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes
  /** An optional response message */
  data?: InteractionCallbackData
}

// Since this is a merge of 3 types, the properties appear in order of their first appearance in the 3 types
/**
 * - https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-messages
 * - https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-autocomplete
 * - https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-modal
 */
export interface InteractionCallbackData {
  // Messages
  /** True if this is a TTS message */
  tts?: boolean
  /** The message contents (up to 2000 characters) */
  content?: string
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** Message flags combined as a bit field (only `SUPPRESS_EMBEDS`, `EPHEMERAL`, `IS_COMPONENTS_V2`, `IS_VOICE_MESSAGE` and `SUPPRESS_NOTIFICATIONS` can be set) */
  flags?: number
  /** The components you would like to have sent in this message */
  components?: MessageComponents
  /** Attachment objects with filename and description */
  attachments?: Pick<DiscordAttachment, 'filename' | 'description' | 'id'>[]
  /** The contents of the files being sent */
  files?: FileContent[]
  /** Details about the poll */
  poll?: CreatePoll

  // Autocomplete
  /** Autocomplete choices (max of 25 choices) */
  choices?: Camelize<DiscordApplicationCommandOptionChoice>[]

  // Modal
  /** The customId you want to use for this modal response. */
  customId?: string
  /** The title you want to use for this modal response. */
  title?: string
}

/**
 * - https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response-query-string-params
 * - https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command-json-params
 */
export interface InteractionCallbackOptions {
  withResponse?: boolean
}

/**
 * - https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response-query-string-params
 * - https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command-json-params
 */
export type CreateApplicationCommand = CreateSlashApplicationCommand | CreateContextApplicationCommand

/**
 * - https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response-query-string-params
 * - https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command-json-params
 */
export interface CreateSlashApplicationCommand {
  /**
   * Name of command, 1-32 characters.
   * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_ʼ\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
   */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localization | null
  /** 1-100 character description */
  description?: string
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localization | null
  /**
   * Parameters for the command
   *
   * @remarks
   * This is only valid in commands of type {@link ApplicationCommandTypes.ChatInput | ChatInput}
   */
  options?: Camelize<DiscordApplicationCommandOption[]>
  /** Set of permissions represented as a bit set */
  defaultMemberPermissions?: PermissionStrings[] | string | null
  /**
   * Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.
   *
   * @deprecated use {@link contexts} instead
   */
  dmPermission?: boolean | null
  /**
   * Replaced by default_member_permissions and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild.
   *
   * @default true
   */
  defaultPermission?: boolean
  /**
   * Integration types where the command is available
   *
   * @remarks
   * This value is available only for globally-scoped commands
   * Defaults to the application configured contexts
   */
  integrationTypes?: DiscordApplicationIntegrationType[]
  /**
   * Interaction context types where the command is available.
   *
   * @remarks
   * This value is available only for globally-scoped commands.
   */
  contexts?: DiscordInteractionContextType[]
  /** Type of command, defaults `ApplicationCommandTypes.ChatInput` if not set  */
  type?: ApplicationCommandTypes
  /** Indicates whether the command is age-restricted, defaults to `false` */
  nsfw?: boolean
  // Discord seems to have forgot to add this to the docs, however it is in the examples for this feature...
  /**
   * Determines whether the interaction is handled by the app's interactions handler or by Discord
   *
   * @remarks
   * This can only be set for application commands of type `PRIMARY_ENTRY_POINT` for applications with the `EMBEDDED` flag (i.e. applications that have an Activity).
   */
  handler?: DiscordInteractionEntryPointCommandHandlerType
}

// TODO: Aside from one single note on `description` i can't find anywhere that says something about context commands having a special need, so, should we remove this?
/**
 * - https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response-query-string-params
 * - https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command-json-params
 */
export interface CreateContextApplicationCommand extends Omit<CreateSlashApplicationCommand, 'options' | 'description' | 'descriptionLocalizations'> {
  /** The type of the command */
  type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User
}

export interface CreateGlobalApplicationCommandOptions {
  /** The bearer token of the developer of the application */
  bearerToken: string
}

export interface CreateGuildApplicationCommandOptions {
  /** The bearer token of the developer of the application */
  bearerToken: string
}

export interface UpsertGlobalApplicationCommandOptions {
  /** The bearer token of the developer of the application */
  bearerToken: string
}

export interface UpsertGuildApplicationCommandOptions {
  /** The bearer token of the developer of the application */
  bearerToken: string
}

/** Additional properties for https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions and https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
export interface GetApplicationCommandPermissionOptions {
  /** Access token of the user. Requires the `applications.commands.permissions.update` scope */
  accessToken: string
  /** Id of the application */
  applicationId: BigString
}
