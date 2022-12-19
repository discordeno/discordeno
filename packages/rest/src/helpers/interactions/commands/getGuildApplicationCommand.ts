import { routes } from '@discordeno/constant'
import type { BigString, DiscordApplicationCommand } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'

// TODO: Swap `commandId` and `guildId` parameters.

/**
 * Gets a guild application command by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild the command is registered in.
 * @param commandId - The ID of the command to get.
 * @returns An instance of {@link ApplicationCommand}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command}
 */
export async function getGuildApplicationCommand (
  rest: RestManager,
  commandId: BigString,
  guildId: BigString
): Promise<ApplicationCommand> {
  const result = await rest.runMethod<DiscordApplicationCommand>(
    rest,
    'GET',
    routes.COMMANDS_GUILD_ID(
      rest.applicationId,
      guildId,
      commandId
    )
  )

  return rest.transformers.applicationCommand(rest, result)
}
