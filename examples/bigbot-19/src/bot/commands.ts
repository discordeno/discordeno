import type {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  Attachment,
  CamelizedDiscordApplicationCommandOption,
  ChannelTypes,
  CreateSlashApplicationCommand,
  Interaction,
  Member,
  Role,
  User,
} from '@discordeno/bot'
import { bot } from './bot.js'
import type { DefaultLocale, TranslationKey } from './languages/languages.js'
import { translate } from './languages/translate.js'

export default function createCommand<const TOptions extends CommandOptions>(command: Command<TOptions>): void {
  bot.commands.set(translate('english', command.name), command as Command)
}

export type Command<TOptions extends CommandOptions = CommandOptions> =
  | SlashApplicationCommand<TOptions>
  | (Omit<SlashApplicationCommand<TOptions>, 'options' | 'description' | 'descriptionLocalizations'> & {
      /** The type of the command */
      type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User
    })

// This is needed to properly support ApplicationCommandTypes.Message or ApplicationCommandTypes.User commands
type SlashApplicationCommand<TOptions extends CommandOptions> = CreateSlashApplicationCommand & {
  /**
   * @remarks
   * The value should be set to the translation key for the name of this command
   *
   * @inheritdoc
   */
  name: TranslationKey
  /**
   * @remarks
   * The value should be set to the translation key for the name of this command
   *
   * @inheritdoc
   */
  description: TranslationKey
  /** @inheritdoc */
  options?: TOptions
  /**
   * Should this command be only deployed on the Dev guild?
   *
   * @default false
   */
  devOnly?: boolean
  /** Function to run when the interaction is executed */
  run: (interaction: Interaction, options: GetCommandOptions<TOptions>) => unknown
  /** Function to run when an autocomplete interaction is fired */
  autoComplete?: (interaction: Interaction, options: GetCommandOptions<TOptions>) => unknown
}

export type GetCommandOptions<T extends CommandOptions> = T extends CommandOptions
  ? { [Prop in keyof BuildOptions<T> as Prop]: BuildOptions<T>[Prop] }
  : never

export type CommandOption = CamelizedDiscordApplicationCommandOption & {
  /**
   * @remarks
   * The value should be set to the translation key for the name of this command
   *
   * @inheritdoc
   */
  name: TranslationKey
  /**
   * @remarks
   * The value should be set to the translation key for the name of this command
   *
   * @inheritdoc
   */
  description: TranslationKey
}

export type CommandOptions = CommandOption[]

// Option parsing

interface UserResolved {
  user: User
  member: Member | undefined
}

interface ChannelResolved {
  id: bigint
  name: string
  type: ChannelTypes
  permissions: bigint
}

type ResolvedValues = number | boolean | UserResolved | Role | ChannelResolved | Attachment

/**
 * From here SubCommandGroup and SubCommand are missing, this is wanted.
 *
 * The entries are sorted based on the enum value
 */
interface TypeToResolvedMap {
  [ApplicationCommandOptionTypes.String]: string
  [ApplicationCommandOptionTypes.Integer]: number
  [ApplicationCommandOptionTypes.Boolean]: boolean
  [ApplicationCommandOptionTypes.User]: UserResolved
  [ApplicationCommandOptionTypes.Channel]: ChannelResolved
  [ApplicationCommandOptionTypes.Role]: Role
  [ApplicationCommandOptionTypes.Mentionable]: Role | UserResolved
  [ApplicationCommandOptionTypes.Number]: number
  [ApplicationCommandOptionTypes.Attachment]: Attachment
}

type ConvertTypeToResolved<T extends ApplicationCommandOptionTypes> = T extends keyof TypeToResolvedMap ? TypeToResolvedMap[T] : ResolvedValues

type SubCommandApplicationCommand = ApplicationCommandOptionTypes.SubCommand | ApplicationCommandOptionTypes.SubCommandGroup
type GetOptionName<T> = T extends { name: TranslationKey } ? (DefaultLocale[T['name']] extends string ? DefaultLocale[T['name']] : never) : never
type GetOptionValue<T> = T extends { type: ApplicationCommandOptionTypes; required?: boolean }
  ? T extends { type: SubCommandApplicationCommand; options?: CommandOptions }
    ? BuildOptions<T['options']>
    : ConvertTypeToResolved<T['type']> | (T['required'] extends true ? never : undefined)
  : never

type BuildOptions<T extends CommandOptions | undefined> = {
  [Prop in keyof Omit<T, keyof unknown[]> as GetOptionName<T[Prop]>]: GetOptionValue<T[Prop]>
}
