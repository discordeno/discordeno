import { AllowedMentions, FileContent, MessageComponents } from '@discordeno/types'
import {
  ApplicationCommandTypes, InteractionResponseTypes,
  Localization, PermissionStrings
} from '@discordeno/types/src/shared.js'
import { ApplicationCommandOption } from './transformers/applicationCommandOption.js'
import { ApplicationCommandOptionChoice } from './transformers/applicationCommandOptionChoice.js'
import { Embed } from './transformers/embed.js'

export type CreateApplicationCommand = CreateSlashApplicationCommand | CreateContextApplicationCommand

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateSlashApplicationCommand {
  /**
   * Name of command, 1-32 characters.
   * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
   */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localization
  /** 1-100 character description */
  description: string
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localization
  /** Type of command, defaults `ApplicationCommandTypes.ChatInput` if not set  */
  type?: ApplicationCommandTypes
  /** Parameters for the command */
  options?: ApplicationCommandOption[]
  /** Set of permissions represented as a bit set */
  defaultMemberPermissions?: PermissionStrings[]
  /** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
  dmPermission?: boolean
}

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateContextApplicationCommand
  extends Omit<CreateSlashApplicationCommand, 'options' | 'description' | 'descriptionLocalizations'> {
  /** The type of the command */
  type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User
}

export function isContextApplicationCommand (
  command: CreateApplicationCommand
): command is CreateContextApplicationCommand {
  return command.type === ApplicationCommandTypes.Message || command.type === ApplicationCommandTypes.User
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionCallbackData {
  /** The message contents (up to 2000 characters) */
  content?: string
  /** True if this is a TTS message */
  tts?: boolean
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** The contents of the file being sent */
  file?: FileContent | FileContent[]
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

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes
  /** An optional response message */
  data?: InteractionCallbackData
}
