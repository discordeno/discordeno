import { routes } from '@discordeno/constant'
import type { BigString, DiscordApplicationCommand } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'
import type { CreateApplicationCommand } from '../../../types'

/**
 * Re-registers the list of application commands registered in a guild, overwriting the previous commands completely.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild whose list of commands to overwrite.
 * @param commands - The list of commands to use to overwrite the previous list.
 * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
 *
 * @remarks
 * ❗ Commands that are not present in the `commands` array will be __deleted__.
 *
 * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands}
 */
export async function upsertGuildApplicationCommands (
  rest: RestManager,
  guildId: BigString,
  commands: CreateApplicationCommand[]
): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await rest.runMethod<DiscordApplicationCommand[]>(

    'PUT',
    routes.COMMANDS_GUILD(rest.applicationId, guildId),
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
