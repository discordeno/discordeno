import type { DiscordApplicationCommand } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'
import type { CreateApplicationCommand } from '../../../types'

/**
 * Re-registers the list of global application commands, overwriting the previous commands completely.
 *
 * @param bot - The bot instance to use to make the request.
 * @param commands - The list of commands to use to overwrite the previous list.
 * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
 *
 * @remarks
 * ❗ Commands that are not present in the `commands` array will be __deleted__.
 *
 * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands}
 */
export async function upsertGlobalApplicationCommands (
  rest: RestManager,
  commands: CreateApplicationCommand[]
): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await rest.runMethod<DiscordApplicationCommand[]>(
    rest,
    'PUT',
    rest.constants.routes.COMMANDS(rest.applicationId),
    commands.map((command) =>
      rest.transformers.reverse.createApplicationCommand(rest, command)
    )
  )

  return new Collection(
    results.map((result) => {
      const command = rest.transformers.applicationCommand(rest, result)
      return [command.id, command]
    })
  )
}
