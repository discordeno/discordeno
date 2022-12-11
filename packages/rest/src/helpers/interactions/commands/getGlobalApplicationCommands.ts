import type { DiscordApplicationCommand } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'

// TODO: Implement `with_localizations` options field.

/**
 * Gets the list of your bot's global application commands.
 *
 * @param rest - The rest manager to use to make the request.
 * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands}
 */
export async function getGlobalApplicationCommands (
  rest: RestManager
): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await rest.runMethod<DiscordApplicationCommand[]>(
    rest,
    'GET',
    rest.constants.routes.COMMANDS(rest.applicationId)
  )

  return new Collection(
    results.map((result) => {
      const command = rest.transformers.applicationCommand(rest, result)
      return [command.id, command]
    })
  )
}
