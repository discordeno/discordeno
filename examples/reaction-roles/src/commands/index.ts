import type { Interaction } from '@discordeno/bot'
import type { CreateSlashApplicationCommand } from '@discordeno/types'
import roles from './roles.js'

export const commands = new Map<string, Command>([roles].map((cmd) => [cmd.name, cmd]))

export default commands

export interface Command extends CreateSlashApplicationCommand {
  /** Handler that will be executed when this command is triggered */
  execute: (interaction: Interaction, args: Record<string, unknown>) => Promise<unknown>
}
