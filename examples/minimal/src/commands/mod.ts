import type { ApplicationCommandOption, ApplicationCommandTypes, Bot, Interaction } from '../../deps.ts.js'
import { Collection } from '../../deps.ts.js'

export type subCommand = Omit<Command, 'subcommands'>
export interface subCommandGroup {
  name: string
  subCommands: subCommand[]
}
export interface Command {
  name: string
  description: string
  usage?: string[]
  options?: ApplicationCommandOption[]
  type: ApplicationCommandTypes
  /** Defaults to `Guild` */
  scope?: 'Global' | 'Guild'
  execute: (bot: Bot, interaction: Interaction) => unknown
  subcommands?: Array<subCommandGroup | subCommand>
}

export const commands = new Collection<string, Command>()

export function createCommand(command: Command) {
  commands.set(command.name, command)
}
