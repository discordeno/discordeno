import { routes } from '@discordeno/constant'
import type { BigString, DiscordApplicationCommand } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'
import type { CreateApplicationCommand } from '../../../types.js'

/**
 * Creates an application command only accessible in a specific guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param command - The command to create.
 * @param guildId - The ID of the guild to create the command for.
 * @returns An instance of the created {@link ApplicationCommand}.
 *
 * @remarks
 * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
 * ⚠️ You can only create up to 200 _new_ commands daily.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command}
 */
export async function createGuildApplicationCommand (
  rest: RestManager,
  command: CreateApplicationCommand,
  guildId: BigString
): Promise<ApplicationCommand> {
  const result = await rest.runMethod<DiscordApplicationCommand>(
    rest,
    'POST',
    routes.COMMANDS_GUILD(rest.applicationId, guildId),
    rest.transformers.reverse.createApplicationCommand(rest, command)
  )

  return rest.transformers.applicationCommand(rest, result)
}
