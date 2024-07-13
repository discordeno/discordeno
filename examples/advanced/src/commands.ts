import { type ApplicationCommandOption, type ApplicationCommandTypes, Collection, type Interaction } from '@discordeno/bot'

export const commands = new Collection<string, Command>()

export function createCommand(command: Command): void {
  commands.set(command.name, command)
}

export interface Command {
  /** The name of this command. */
  name: string
  /** What does this command do? */
  description: string
  /** The type of command this is. */
  type: ApplicationCommandTypes
  /** The options for this command */
  options?: ApplicationCommandOption[]
  /** This will be executed when the command is run. */
  execute: (interaction: Interaction, options: Record<string, unknown>) => unknown
}
