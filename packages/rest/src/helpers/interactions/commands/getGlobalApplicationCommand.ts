import type { BigString, DiscordApplicationCommand } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'

/**
 * Gets a global application command by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param commandId - The ID of the command to get.
 * @returns An instance of {@link ApplicationCommand}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-command}
 */
export async function getGlobalApplicationCommand (
  rest: RestManager,
  commandId: BigString
): Promise<ApplicationCommand> {
  const result = await rest.runMethod<DiscordApplicationCommand>(
    rest,
    'GET',
    rest.constants.routes.COMMANDS_ID(rest.applicationId, commandId)
  )

  return rest.transformers.applicationCommand(rest, result)
}
