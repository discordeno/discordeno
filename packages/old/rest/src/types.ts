import { ApplicationCommandTypes } from '@discordeno/types'

export function isContextApplicationCommand (
  command: CreateApplicationCommand
): command is CreateContextApplicationCommand {
  return (
    command.type === ApplicationCommandTypes.Message ||
    command.type === ApplicationCommandTypes.User
  )
}
