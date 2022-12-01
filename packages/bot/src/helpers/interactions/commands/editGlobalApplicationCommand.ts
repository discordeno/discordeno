import type { Bot } from '../../../bot.js'
import { ApplicationCommand } from '../../../transformers/applicationCommand.js'
import { BigString, CreateApplicationCommand, DiscordApplicationCommand } from '../../../types/index.js'

/**
 * Edits a global application command.
 *
 * @param bot - The bot instance to use to make the request.
 * @param commandId - The ID of the command to edit.
 * @param options - The parameters for the edit of the command.
 * @returns An instance of the edited {@link ApplicationCommand}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command}
 */
export async function editGlobalApplicationCommand (
  bot: Bot,
  commandId: BigString,
  options: CreateApplicationCommand
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    'PATCH',
    bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
    bot.transformers.reverse.createApplicationCommand(bot, options)
  )

  return bot.transformers.applicationCommand(bot, result)
}
