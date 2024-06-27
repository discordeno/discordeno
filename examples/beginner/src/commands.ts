import { Collection, type ApplicationCommandOption, type ApplicationCommandTypes, type Interaction } from '@discordeno/bot'

export const commands = new Collection<string, Command>()

export function createCommand(command: Command): void {
  commands.set(command.name, command)
}

export interface Command {
  name: string
  description: string
  usage?: string[]
  options?: ApplicationCommandOption[]
  type: ApplicationCommandTypes
  /** Defaults to `Guild` */
  scope?: 'Global' | 'Guild'
  execute: (interaction: Interaction) => unknown
  subcommands?: Array<SubCommandGroup | SubCommand>
}

export type SubCommand = Omit<Command, 'subcommands'>

export interface SubCommandGroup {
  name: string
  subCommands: SubCommand[]
}
