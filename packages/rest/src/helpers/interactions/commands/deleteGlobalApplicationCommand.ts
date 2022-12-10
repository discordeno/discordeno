import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Deletes an application command registered globally.
 *
 * @param bot - The bot instance to use to make the request.
 * @param commandId - The ID of the command to delete.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command}
 */
export async function deleteGlobalApplicationCommand (
  rest: RestManager,
  commandId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.COMMANDS_ID(rest.applicationId, commandId)
  )
}
