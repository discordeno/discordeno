import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordGuildWidget } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Gets the guild widget by guild ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the widget of.
 * @returns An instance of {@link GuildWidget}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-widget}
 */
export async function getWidget (
  rest: RestManager,
  guildId: BigString
): Promise<Camelize<DiscordGuildWidget>> {
  const result = await rest.runMethod<DiscordGuildWidget>(

    'GET',
    routes.GUILD_WIDGET_JSON(guildId)
  )

  return TRANSFORMERS.widget(result)
}
