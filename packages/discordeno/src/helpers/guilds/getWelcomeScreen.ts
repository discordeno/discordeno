import type { Bot } from '../../bot.js'
import { WelcomeScreen } from '../../transformers/welcomeScreen.js'
import { DiscordWelcomeScreen } from '../../types/discord.js'
import { BigString } from '../../types/shared.js'

/**
 * Gets the welcome screen for a guild.
 *
 * @param bot - The bot instance used to make the request
 * @param guildId - The ID of the guild to get the welcome screen for.
 * @returns An instance of {@link WelcomeScreen}.
 *
 * @remarks
 * If the welcome screen is not enabled:
 * - Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen}
 */
export async function getWelcomeScreen(bot: Bot, guildId: BigString): Promise<WelcomeScreen> {
  const result = await bot.rest.runMethod<DiscordWelcomeScreen>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD_WELCOME_SCREEN(guildId)
  )

  return bot.transformers.welcomeScreen(bot, result)
}
