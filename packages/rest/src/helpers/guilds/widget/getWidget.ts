import type { BigString, DiscordGuildWidget } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { GuildWidget } from '../../../transformers/widget.js'

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
): Promise<GuildWidget> {
  const result = await rest.runMethod<DiscordGuildWidget>(
    rest,
    'GET',
    rest.constants.routes.GUILD_WIDGET_JSON(guildId)
  )

  return rest.transformers.widget(rest, result)
}
