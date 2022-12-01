import type { Bot } from '../../bot.js'
import { Application } from '../../transformers/application.js'
import { DiscordApplication } from '../../types/discord.js'

/** Get the applications info */
export async function getApplicationInfo (bot: Bot): Promise<Application> {
  const result = await bot.rest.runMethod<DiscordApplication>(
    bot.rest,
    'GET',
    bot.constants.routes.OAUTH2_APPLICATION()
  )

  return bot.transformers.application(bot, result)
}
