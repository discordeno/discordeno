import type {
  ApplicationCommandOptionTypes,
  Attachment,
  CamelizedDiscordApplicationCommandOption,
  ChannelTypes,
  CreateApplicationCommand,
  Interaction,
  Member,
  Role,
  User,
} from '@discordeno/bot'
import { bot } from './bot.js'

export default function createCommand<const TOptions extends CommandOptions>(command: Command<TOptions>): void {
  bot.commands.set(command.name, command as Command)
}

export type Command<TOptions extends CommandOptions = CommandOptions> = CreateApplicationCommand & {
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

export type CommandOption = CamelizedDiscordApplicationCommandOption
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
type GetOptionName<T> = T extends { name: string } ? T['name'] : never
type GetOptionValue<T> = T extends { type: ApplicationCommandOptionTypes; required?: boolean }
  ? T extends { type: SubCommandApplicationCommand; options?: CommandOptions }
    ? BuildOptions<T['options']>
    : ConvertTypeToResolved<T['type']> | (T['required'] extends true ? never : undefined)
  : never

type BuildOptions<T extends CommandOptions | undefined> = {
  [Prop in keyof Omit<T, keyof unknown[]> as GetOptionName<T[Prop]>]: GetOptionValue<T[Prop]>
}
