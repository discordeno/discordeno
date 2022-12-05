import type { BigString, DiscordGuildWidgetSettings } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { GuildWidgetSettings } from '../../../transformers/widgetSettings.js'

/**
 * Gets the settings of a guild's widget.
 *
 * @param bot - The bot instance to use to make the request.
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
): Promise<GuildWidgetSettings> {
  const result = await rest.runMethod<DiscordGuildWidgetSettings>(
    rest,
    'GET',
    rest.constants.routes.GUILD_WIDGET(guildId)
  )

  return rest.transformers.widgetSettings(rest, result)
}
