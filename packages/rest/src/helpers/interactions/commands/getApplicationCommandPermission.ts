import {
  BigString,
  DiscordGuildApplicationCommandPermissions
} from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { ApplicationCommandPermission } from '../../../transformers/applicationCommandPermission.js'

/**
 * Gets the permissions of a guild application command.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the command is registered in.
 * @param commandId - The ID of the command to get the permissions of.
 * @returns An instance of {@link ApplicationCommandPermission}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions}
 */
export async function getApplicationCommandPermission (
  rest: RestManager,
  guildId: BigString,
  commandId: BigString
): Promise<ApplicationCommandPermission> {
  const result =
    await rest.runMethod<DiscordGuildApplicationCommandPermissions>(
      rest,
      'GET',
      rest.constants.routes.COMMANDS_PERMISSION(
        rest.applicationId,
        guildId,
        commandId
      )
    )

  return rest.transformers.applicationCommandPermission(rest, result)
}
