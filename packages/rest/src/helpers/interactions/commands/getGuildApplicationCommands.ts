import { BigString, DiscordApplicationCommand } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import { ApplicationCommand } from '../../../transformers/applicationCommand.js'

/**
 * Gets the list of application commands registered by your bot in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the commands are registered in.
 * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commandss}
 */
export async function getGuildApplicationCommands (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await rest.runMethod<DiscordApplicationCommand[]>(
    rest,
    'GET',
    rest.constants.routes.COMMANDS_GUILD(rest.applicationId, guildId)
  )

  return new Collection(
    results.map((result) => {
      const command = rest.transformers.applicationCommand(rest, result)
      return [command.id, command]
    })
  )
}
