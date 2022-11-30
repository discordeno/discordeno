import type { Bot } from '../../../bot.js'
import { GuildWidget } from '../../../transformers/widget.js'
import { DiscordGuildWidget } from '../../../types/discord.js'
import { BigString } from '../../../types/shared.js'

/**
 * Gets the guild widget by guild ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the widget of.
 * @returns An instance of {@link GuildWidget}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-widget}
 */
export async function getWidget(bot: Bot, guildId: BigString): Promise<GuildWidget> {
  const result = await bot.rest.runMethod<DiscordGuildWidget>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD_WIDGET_JSON(guildId)
  )

  return bot.transformers.widget(bot, result)
}
