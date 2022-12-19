import { routes } from '@discordeno/constant'
import type { DiscordApplicationCommand } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommand } from '../../../transformers/applicationCommand.js'
import type { CreateApplicationCommand } from '../../../types.js'

/**
 * Creates an application command accessible globally; across different guilds and channels.
 *
 * @param rest - The rest manager to use to make the request.
 * @param command - The command to create.
 * @returns An instance of the created {@link ApplicationCommand}.
 *
 * @remarks
 * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
 * ⚠️ Global commands once created are cached for periods of __an hour__, so changes made to existing commands will take an hour to surface.
 * ⚠️ You can only create up to 200 _new_ commands daily.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
 */
export async function createGlobalApplicationCommand (
  rest: RestManager,
  command: CreateApplicationCommand
): Promise<ApplicationCommand> {
  const result = await rest.runMethod<DiscordApplicationCommand>(
    rest,
    'POST',
    routes.COMMANDS(rest.applicationId),
    rest.transformers.reverse.createApplicationCommand(rest, command)
  )

  return rest.transformers.applicationCommand(rest, result)
}
