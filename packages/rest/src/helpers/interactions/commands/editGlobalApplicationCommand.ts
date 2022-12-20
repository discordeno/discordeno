import { routes } from '@discordeno/constant'
import type { BigString, DiscordApplicationCommand } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'
import type { CreateApplicationCommand } from '../../../types'

/**
 * Edits a global application command.
 *
 * @param rest - The rest manager to use to make the request.
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

    'PATCH',
    routes.COMMANDS_ID(rest.applicationId, commandId),
    rest.transformers.reverse.createApplicationCommand(rest, options)
  )

  return rest.transformers.applicationCommand(rest, result)
}
