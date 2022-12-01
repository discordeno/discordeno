import { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { Bot } from '../../../bot.js'
import { GuildWidgetSettings } from '../../../transformers/widgetSettings.js'
import { BigString } from '../../../types/shared.js'

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
export async function getWidgetSettings (bot: Bot, guildId: BigString): Promise<GuildWidgetSettings> {
  const result = await bot.rest.runMethod<DiscordGuildWidgetSettings>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD_WIDGET(guildId)
  )

  return bot.transformers.widgetSettings(bot, result)
}
