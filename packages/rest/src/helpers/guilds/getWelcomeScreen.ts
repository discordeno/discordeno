import { routes } from '@discordeno/constant'
import type { BigString, DiscordWelcomeScreen } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { WelcomeScreen } from '../../transformers/welcomeScreen.js'

/**
 * Gets the welcome screen for a guild.
 *
 * @param rest - The rest manager used to make the request
 * @param guildId - The ID of the guild to get the welcome screen for.
 * @returns An instance of {@link WelcomeScreen}.
 *
 * @remarks
 * If the welcome screen is not enabled:
 * - Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen}
 */
export async function getWelcomeScreen (
  rest: RestManager,
  guildId: BigString
): Promise<WelcomeScreen> {
  const result = await rest.runMethod<DiscordWelcomeScreen>(
    rest,
    'GET',
    routes.GUILD_WELCOME_SCREEN(guildId)
  )

  return rest.transformers.welcomeScreen(rest, result)
}
