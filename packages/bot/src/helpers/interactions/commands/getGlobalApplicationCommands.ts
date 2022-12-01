import { DiscordApplicationCommand } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Bot } from '../../../bot.js'
import { ApplicationCommand } from '../../../transformers/applicationCommand.js'

// TODO: Implement `with_localizations` options field.

/**
 * Gets the list of your bot's global application commands.
 *
 * @param bot - The bot instance to use to make the request.
 * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands}
 */
export async function getGlobalApplicationCommands (bot: Bot): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await bot.rest.runMethod<DiscordApplicationCommand[]>(
    bot.rest,
    'GET',
    bot.constants.routes.COMMANDS(bot.applicationId)
  )

  return new Collection(
    results.map((result) => {
      const command = bot.transformers.applicationCommand(bot, result)
      return [command.id, command]
    })
  )
}
