import type {
  ApplicationCommandOptionTypes,
  Bot,
  Camelize,
  CreateApplicationCommand,
  DiscordApplicationCommandOption,
  ParsedInteractionOption,
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
  run: (interaction: typeof bot.transformers.$inferredTypes.interaction, options: GetCommandOptions<TOptions>) => unknown
  /** Function to run when an autocomplete interaction is fired */
  autoComplete?: (interaction: typeof bot.transformers.$inferredTypes.interaction, options: GetCommandOptions<TOptions>) => unknown
}

export type GetCommandOptions<T extends CommandOptions> = T extends CommandOptions
  ? { [Prop in keyof BuildOptions<T> as Prop]: BuildOptions<T>[Prop] }
  : never

export type CommandOption = Camelize<DiscordApplicationCommandOption>
export type CommandOptions = CommandOption[]

// Option parsing

type ResolvedValues = ParsedInteractionOption<ExtractDesiredProps<typeof bot>, ExtractDesiredBehavior<typeof bot>>[string]

// Using omit + exclude is a slight trick to avoid a type error on Pick
export type InteractionResolvedChannel = Omit<
  typeof bot.transformers.$inferredTypes.channel,
  Exclude<keyof typeof bot.transformers.$inferredTypes.channel, 'id' | 'name' | 'type' | 'permissions' | 'threadMetadata' | 'parentId'>
>
export type InteractionResolvedMember = Omit<typeof bot.transformers.$inferredTypes.member, 'user' | 'deaf' | 'mute'>

export interface InteractionResolvedUser {
  user: typeof bot.transformers.$inferredTypes.user
  member: InteractionResolvedMember
}

/**
 * From here SubCommandGroup and SubCommand are missing, this is wanted.
 *
 * The entries are sorted based on the enum value
 */
interface TypeToResolvedMap {
  [ApplicationCommandOptionTypes.String]: string
  [ApplicationCommandOptionTypes.Integer]: number
  [ApplicationCommandOptionTypes.Boolean]: boolean
  [ApplicationCommandOptionTypes.User]: InteractionResolvedUser
  [ApplicationCommandOptionTypes.Channel]: InteractionResolvedChannel
  [ApplicationCommandOptionTypes.Role]: typeof bot.transformers.$inferredTypes.role
  [ApplicationCommandOptionTypes.Mentionable]: typeof bot.transformers.$inferredTypes.role | InteractionResolvedUser
  [ApplicationCommandOptionTypes.Number]: number
  [ApplicationCommandOptionTypes.Attachment]: typeof bot.transformers.$inferredTypes.attachment
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

type ExtractDesiredProps<T> = T extends Bot<infer Props, infer _Behavior> ? Props : never
type ExtractDesiredBehavior<T> = T extends Bot<infer _Props, infer Behavior> ? Behavior : never
