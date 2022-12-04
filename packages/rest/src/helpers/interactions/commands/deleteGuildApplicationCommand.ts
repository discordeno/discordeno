import { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

// TODO: `guildId` and `commandId` should be swapped.

/**
 * Deletes an application command registered in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to delete the command from.
 * @param commandId - The ID of the command to delete from the guild.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command}
 */
export async function deleteGuildApplicationCommand (
  rest: RestManager,
  commandId: BigString,
  guildId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.COMMANDS_GUILD_ID(
      rest.applicationId,
      guildId,
      commandId
    )
  )
}
