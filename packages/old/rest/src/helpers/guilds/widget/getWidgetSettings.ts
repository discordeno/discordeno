import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordGuildWidgetSettings } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Gets the settings of a guild's widget.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the widget of.
 * @returns An instance of {@link GuildWidgetSettings}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-settings}
 */
export async function getWidgetSettings (
  rest: RestManager,
  guildId: BigString
): Promise<Camelize<DiscordGuildWidgetSettings>> {
  const result = await rest.runMethod<DiscordGuildWidgetSettings>(

    'GET',
    routes.GUILD_WIDGET(guildId)
  )

  return TRANSFORMERS.widgetSettings(result)
}
