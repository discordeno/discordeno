import type { BigString, DiscordApplicationCommand } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'
import type { CreateApplicationCommand } from '../../../types'

// TODO: Swap `commandId` and `guildId` parameters.

/**
 * Edits an application command registered in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the command is registered in.
 * @param commandId - The ID of the command to edit.
 * @param options - The parameters for the edit of the command.
 * @returns An instance of the edited {@link ApplicationCommand}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command}
 */
export async function editGuildApplicationCommand (
  rest: RestManager,
  commandId: BigString,
  guildId: BigString,
  options: CreateApplicationCommand
): Promise<ApplicationCommand> {
  const result = await rest.runMethod<DiscordApplicationCommand>(
    rest,
    'PATCH',
    rest.constants.routes.COMMANDS_GUILD_ID(
      rest.applicationId,
      guildId,
      commandId
    ),
    rest.transformers.reverse.createApplicationCommand(rest, options)
  )

  return rest.transformers.applicationCommand(rest, result)
}
