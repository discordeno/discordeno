import { BigString, DiscordApplicationCommand } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { ApplicationCommand } from '../../../transformers/applicationCommand.js'
import { CreateApplicationCommand } from '../../../types'

/**
 * Edits a global application command.
 *
 * @param bot - The bot instance to use to make the request.
 * @param commandId - The ID of the command to edit.
 * @param options - The parameters for the edit of the command.
 * @returns An instance of the edited {@link ApplicationCommand}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command}
 */
export async function editGlobalApplicationCommand (
  rest: RestManager,
  commandId: BigString,
  options: CreateApplicationCommand
): Promise<ApplicationCommand> {
  const result = await rest.runMethod<DiscordApplicationCommand>(
    rest,
    'PATCH',
    rest.constants.routes.COMMANDS_ID(rest.applicationId, commandId),
    rest.transformers.reverse.createApplicationCommand(rest, options)
  )

  return rest.transformers.applicationCommand(rest, result)
}
